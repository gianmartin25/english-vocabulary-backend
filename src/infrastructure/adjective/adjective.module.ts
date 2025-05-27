import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdjectiveModel } from './models/adjective.model';

@Module({
  imports: [TypeOrmModule.forFeature([AdjectiveModel])],
})
export class AdjectiveModule {}