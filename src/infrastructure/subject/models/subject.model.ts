import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("subjects")
export class SubjectModel{
    @PrimaryGeneratedColumn()
    public id: string;

    @Column()
    public text: string;
    @Column()
    public person: string;
    @Column()
    public number: string;
}