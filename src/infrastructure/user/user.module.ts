// src/infrastructure/user/user.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModel } from './models/user.model';
import { UserRepository } from './repositories/user.repository';
import { RegisterUserUseCase } from 'src/application/user/use-cases/register-user.use-case';
import { LoginUserUseCase } from 'src/application/user/use-cases/login-user.use-case';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserModel]),
    JwtModule.register({
      secret: 'your_jwt_secret', // Usa variables de entorno en producción
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [
    { provide: 'IUserRepository', useClass: UserRepository },
    RegisterUserUseCase,
    LoginUserUseCase,
  ],
  exports: [RegisterUserUseCase, LoginUserUseCase],
})
export class UserModule {}