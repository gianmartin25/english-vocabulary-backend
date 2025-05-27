import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SentenceModel } from './models/sentence.model';

@Module({
  imports: [TypeOrmModule.forFeature([SentenceModel])],
})
export class SentenceModule {}
