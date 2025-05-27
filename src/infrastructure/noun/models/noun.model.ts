import { WordModel } from "src/infrastructure/word/models/word.model";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";



@Entity('nouns')
export class NounModel {

    @PrimaryGeneratedColumn()
    public id: number;

    @OneToOne(() => WordModel, (word) => word.id)
    public word: WordModel;

    @Column()
    public plural: string;
}