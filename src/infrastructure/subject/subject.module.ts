import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubjectModel } from './models/subject.model';

@Module({
  imports: [TypeOrmModule.forFeature([SubjectModel])],
})
export class SubjectModule {}
