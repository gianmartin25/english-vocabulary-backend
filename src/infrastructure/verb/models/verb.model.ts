// src/users/entity/users.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { VerbForm } from './verb-form.model';
import { VerbImage } from './verb-image.model';
import { Sentence } from 'src/infrastructure/sentence/models/sentence.model';

@Entity('verbs')
export class Verb {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    enum: ['regular', 'irregular'],
  })
  typeVerb: string;

  @OneToMany(() => VerbForm, (verbForm) => verbForm.verb)
  verbForms: VerbForm[];

  @OneToMany(() => VerbImage, (verbImage) => verbImage.verb)
  verbImages: VerbImage[];

  @OneToMany(() => Sentence, (sentence) => sentence.verb)
  sentences: Sentence[];oc

  //   private sentences: SentenceEntity[];
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
