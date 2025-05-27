import { PronunciationTypesCountry } from "src/domain/verb/entities/verb-pronunciation.entity";
import { PhonemeModel } from "src/infrastructure/phoneme/models/phoneme.model";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("sounds")
export class SoundModel  {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public fileName: string;
    
    @ManyToOne(() => PhonemeModel, (phoneme) => phoneme.id)
    public phoneme: PhonemeModel;
    
    public soundType: keyof typeof PronunciationTypesCountry;    
}