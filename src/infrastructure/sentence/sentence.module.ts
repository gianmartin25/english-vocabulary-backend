import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sentence } from './models/sentence.model';

@Module({
  imports: [TypeOrmModule.forFeature([Sentence])],
})
export class SentenceModule {}
