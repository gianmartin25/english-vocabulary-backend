import { SoundModel } from "src/infrastructure/sound/models/sound.model";
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { PhonemeExampleModel } from "./phoneme-example.model";


@Entity("phonemes")
export class PhonemeModel {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public phonemeIPA: string;

    @OneToOne(() => PhonemeExampleModel, (example) => example.id)
    public phonemeExample: PhonemeExampleModel;

    @OneToMany(() => SoundModel, (sound) => sound.phoneme)
    public sounds: SoundModel[];
}