import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { VerbFormTypeModel } from './verb-form-type.model';
import { VerbModel } from './verb.model';

@Entity('verb_forms')
export class VerbFormModel {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => VerbModel, (verb) => verb.verbForms)
  public verb: string;

  @Column()
  public name: string;

  @OneToOne(() => VerbFormTypeModel, (verbFormType) => verbFormType.id)
  public verbFormType: VerbFormTypeModel;

  // public verbPronunciations: VerbPronunciation[];
}
