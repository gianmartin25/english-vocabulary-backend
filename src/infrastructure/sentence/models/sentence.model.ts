import { VerbModel } from 'src/infrastructure/verb/models/verb.model';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('sentences')
export class SentenceModel {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => VerbModel, (verb) => verb.sentences)
  verb: VerbModel;

  @Column()
  descripcion: string;
 
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

