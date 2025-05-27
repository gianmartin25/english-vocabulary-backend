// src/application/user/use-cases/register-user.use-case.ts
import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { IUserRepository } from '../user.repository.interface';
import { CreateUserDto } from 'src/infrastructure/user/dtos/create-user.dto';

@Injectable()
export class RegisterUserUseCase {
  constructor(    
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,) {}

  async execute(dto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    return this.userRepository.create({
      ...dto,
      password: hashedPassword,
    });
  }
}