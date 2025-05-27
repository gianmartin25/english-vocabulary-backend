import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("verb_form_types")
export class VerbFormTypeModel {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public name: string;
}