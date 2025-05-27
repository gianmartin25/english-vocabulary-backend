import { Body, Controller, Post } from "@nestjs/common";
import { LoginUserUseCase } from "src/application/user/use-cases/login-user.use-case";
import { RegisterUserUseCase } from "src/application/user/use-cases/register-user.use-case";
import { CreateUserDto } from "src/infrastructure/user/dtos/create-user.dto";


@Controller('auth/register')
export class RegisterController {
  constructor(
    private readonly registerUser: RegisterUserUseCase,
    private readonly loginUser: LoginUserUseCase
  ) {}

  @Post()
  async register(@Body() dto: CreateUserDto) {
    const user = await this.registerUser.execute(dto);
    const loginDto = {
      email: dto.email,
      password: dto.password,
    }
    const loginResponse = await this.loginUser.execute(loginDto);
    return {
      user,
      access_token: loginResponse.access_token,
    };
  }
}