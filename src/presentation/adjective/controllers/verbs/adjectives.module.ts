import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { HttpClientAxiosService } from 'src/infrastructure/services/http-client-axios/http-client-axios.service';
import { ScrapperService } from 'src/infrastructure/services/scrapper/scrapper.service';
import { AdjectivesController } from './adjectives.controller';
import { AdjectiveService } from './adjectives.service';

@Module({
  imports: [HttpModule],
  controllers: [AdjectivesController],
  providers: [AdjectiveService,ScrapperService, HttpClientAxiosService],
  exports: [AdjectiveService, ScrapperService, HttpClientAxiosService],
})
export class AdjectivesModule {}
