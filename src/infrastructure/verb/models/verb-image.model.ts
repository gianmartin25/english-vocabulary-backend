import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Verb } from './verb.model';

@Entity('verb_images')
export class VerbImage {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Verb, (verb) => verb.verbImages)
  verb: Verb;

  @Column()
  name: string;

  @Column()
  url: string;

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
