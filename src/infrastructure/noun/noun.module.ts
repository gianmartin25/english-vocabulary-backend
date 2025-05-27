import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NounModel } from './models/noun.model';

@Module({
  imports: [TypeOrmModule.forFeature([NounModel])],
})
export class NounModule {}