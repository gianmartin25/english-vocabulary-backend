// src/presentation/auth/controllers/login/login.controller.ts
import { Body, Controller, Post } from '@nestjs/common';
import { LoginUserUseCase } from 'src/application/user/use-cases/login-user.use-case';
import { LoginUserDto } from 'src/infrastructure/user/dtos/login-user.dto';

@Controller('auth/login')
export class LoginController {
  constructor(private readonly loginUser: LoginUserUseCase) {}

  @Post()
  async login(@Body() dto: LoginUserDto) {
    return this.loginUser.execute(dto);
  }
}