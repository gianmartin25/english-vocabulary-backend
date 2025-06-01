import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { HttpClientAxiosService } from 'src/infrastructure/services/http-client-axios/http-client-axios.service';
import { ScrapperService } from 'src/infrastructure/services/scrapper/scrapper.service';
import { SubjectsController } from './subjects.controller';
import { SubjectService } from './subjects.service';

@Module({
  imports: [HttpModule],
  controllers: [SubjectsController],
  providers: [SubjectService, ScrapperService, HttpClientAxiosService],
  exports: [SubjectService,ScrapperService,HttpClientAxiosService],
})
export class SubjectsModule {}
