import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PhonemeModel } from "./phoneme.model";


@Entity("phoneme_pronunciations")
export class PhonemePronunciationModel {
    @PrimaryGeneratedColumn()
    public id: number;
    
    @ManyToOne(() => PhonemeModel, (phoneme) => phoneme.id)
    public phoeneme:PhonemeModel;
}

