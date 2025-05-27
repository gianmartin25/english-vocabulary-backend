import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { VerbModel } from './verb.model';

@Entity('verb_images')
export class VerbImageModel {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => VerbModel, (verb) => verb.verbImages)
  verb: VerbModel;

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
