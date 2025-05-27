import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SoundModel } from '../sound/models/sound.model';
import { PhonemeExampleModel } from './models/phoneme-example.model';
import { PhonemePronunciationModel } from './models/phoneme-pronunciation.model';
import { PhonemeModel } from './models/phoneme.model';

@Module({
  imports: [TypeOrmModule.forFeature([PhonemeModel,PhonemeExampleModel,PhonemePronunciationModel,SoundModel])],
})
export class PhonemeModule {}