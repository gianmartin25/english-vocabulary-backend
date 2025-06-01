import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { HttpClientAxiosService } from 'src/infrastructure/services/http-client-axios/http-client-axios.service';
import { ScrapperService } from 'src/infrastructure/services/scrapper/scrapper.service';
import { NounsController } from './nouns.controller';
import { NounService } from './nouns.service';

@Module({
  imports: [HttpModule],
  controllers: [NounsController],
  providers: [NounService, ScrapperService, HttpClientAxiosService],
  exports: [NounService,ScrapperService,HttpClientAxiosService],
})
export class NounsModule {}
