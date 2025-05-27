import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("articles")
export class ArticleModel {
    @PrimaryGeneratedColumn()
    public id: string;

    @Column()
    public type: string;

    @Column()
    public text: string;
}