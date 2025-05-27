import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleModel } from './models/article.model';

@Module({
  imports: [TypeOrmModule.forFeature([ArticleModel])],
})
export class ArticleModule {}