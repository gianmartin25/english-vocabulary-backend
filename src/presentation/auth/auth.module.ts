import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { UserModule } from 'src/infrastructure/user/user.module';
import { RegisterController } from './controllers/register/register.controller';
import { LoginController } from './controllers/login/login.controller';

@Module({
  imports: [HttpModule,UserModule],
  controllers: [RegisterController,LoginController],
})
export class AuthModule {}
