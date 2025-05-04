import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VerbForm } from './models/verb-form.model';
import { VerbImage } from './models/verb-image.model';
import { Verb } from './models/verb.model';

@Module({
  imports: [TypeOrmModule.forFeature([Verb, VerbForm, VerbImage])],
})
export class VerbModule {}