import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { WordModel } from "./word.model";


@Entity("word_images")
export class WordImageModel {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public verbId: string;

    @Column()
    public name: string;

    @Column()
    public url: string;

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    public createdAt: Date;

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
    })
    public updatedAt: Date;

    @ManyToOne(() => WordModel, (word) => word.images)
    public word: WordModel;
    

}