import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WordImageModel } from './models/word-image.model';
import { WordModel } from './models/word.model';
import { WordTypesModel } from './models/word_types.model';

@Module({
  imports: [TypeOrmModule.forFeature([WordModel,WordImageModel,WordTypesModel])],
})
export class WordModule {}