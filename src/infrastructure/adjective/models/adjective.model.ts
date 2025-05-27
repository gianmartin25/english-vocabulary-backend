import { WordModel } from "src/infrastructure/word/models/word.model";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('adjectives')
export class AdjectiveModel {
    @PrimaryGeneratedColumn()
    public id: number;

    @OneToOne(() => WordModel, (word) => word.id)
    public word: string;

    @Column()
    public comparative: string;

    @Column()
    public superlative: string;
}