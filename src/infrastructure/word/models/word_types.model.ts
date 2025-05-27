import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity("word_types")
export class WordTypesModel {

  @PrimaryGeneratedColumn()
  public id: number;   

  @Column()
  public name: string; 
}
