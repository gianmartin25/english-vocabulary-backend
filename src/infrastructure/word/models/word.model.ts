import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { WordImageModel } from "./word-image.model";
import { WordTypesModel } from "./word_types.model";



@Entity("words")
export class WordModel {

  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;


  // @OneToOne(() => WordTypesModel, (wordType) => wordType.id)
  // public typeId: WordTypesModel;

  @ManyToOne(() => WordTypesModel, (wordType) => wordType.id)
  public type: WordTypesModel;
  
  @OneToMany(() => WordImageModel, (wordImage) => wordImage.word)
  public images: WordImageModel[];
}
