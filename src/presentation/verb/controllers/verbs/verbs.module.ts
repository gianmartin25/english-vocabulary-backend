import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { HttpClientAxiosService } from 'src/infrastructure/services/http-client-axios/http-client-axios.service';
import { ScrapperService } from 'src/infrastructure/services/scrapper/scrapper.service';
import { VerbsController } from './verbs.controller';
import { VerbsService } from './verbs.service';

@Module({
  imports: [HttpModule],
  controllers: [VerbsController],
  providers: [VerbsService, ScrapperService, HttpClientAxiosService],
  exports: [VerbsService,ScrapperService,HttpClientAxiosService],
})
export class VerbsModule {}
