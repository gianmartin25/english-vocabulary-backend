// src/users/entity/users.entity.ts
import { SentenceModel } from 'src/infrastructure/sentence/models/sentence.model';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { VerbFormModel } from './verb-form.model';
import { VerbImageModel } from './verb-image.model';

@Entity('verbs')
export class VerbModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    enum: ['regular', 'irregular'],
  })
  typeVerb: string;

  @OneToMany(() => VerbFormModel, (verbForm) => verbForm.verb)
  verbForms: VerbFormModel[];

  @OneToMany(() => VerbImageModel, (verbImage) => verbImage.verb)
  verbImages: VerbImageModel[];

  @OneToMany(() => SentenceModel, (sentence) => sentence.verb)
  sentences: SentenceModel[];

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
