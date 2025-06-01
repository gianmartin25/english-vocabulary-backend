import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { HttpClientAxiosService } from 'src/infrastructure/services/http-client-axios/http-client-axios.service';
import { ScrapperService } from 'src/infrastructure/services/scrapper/scrapper.service';
import { ArticlesController } from './articles.controller';
import { ArticleService } from './articles.service';

@Module({
  imports: [HttpModule],
  controllers: [ArticlesController],
  providers: [ArticleService,ScrapperService, HttpClientAxiosService],
  exports: [ArticleService, ScrapperService, HttpClientAxiosService],
})
export class ArticlesModule {}
