import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VerbFormTypeModel } from './models/verb-form-type.model';
import { VerbFormModel } from './models/verb-form.model';
import { VerbImageModel } from './models/verb-image.model';
import { VerbModel } from './models/verb.model';

@Module({
  imports: [TypeOrmModule.forFeature([VerbModel, VerbFormModel,VerbFormTypeModel, VerbImageModel])],
})
export class VerbModule {}