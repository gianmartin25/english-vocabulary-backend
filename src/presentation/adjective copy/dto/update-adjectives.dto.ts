import { PartialType } from '@nestjs/mapped-types';
import { CreateVerbDto } from './create-adjectives.dto';

export class UpdateVerbDto extends PartialType(CreateVerbDto) {}
