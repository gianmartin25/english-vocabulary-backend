import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { IUserRepository } from '../user.repository.interface';
import { LoginUserDto } from 'src/infrastructure/user/dtos/login-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoginUserUseCase {
  constructor(
    @Inject('IUserRepository') private readonly userRepository: IUserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(dto: LoginUserDto) {
    const user = await this.userRepository.findByEmail(dto.email);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isMatch = await bcrypt.compare(dto.password, user.password);
    if (!isMatch) throw new UnauthorizedException('Invalid credentials');

    const payload = { sub: user.id, email: user.email };
    const access_token = this.jwtService.sign(payload);

    return { user, access_token };
  }
}
