import { VerbModel } from 'src/infrastructure/verb/models/verb.model';
import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { PhonemePronunciationModel } from './phoneme-pronunciation.model';

@Entity('phoneme_examples')
export class PhonemeExampleModel {
  @PrimaryColumn()
  public id: number;
  
  @ManyToOne(() => PhonemePronunciationModel, (phonemePronunciation) => phonemePronunciation.id)
  public verb: VerbModel;

}
