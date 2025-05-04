import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Verb } from './verb.model';

@Entity('verb_forms')
export class VerbForm {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Verb, (verb) => verb.verbForms)
  verb: Verb;

  @Column()
  name: string;
  //   private verbFormTypeId: number;
  //   private verbPronunciations: VerbPronunciation[];
  
}
