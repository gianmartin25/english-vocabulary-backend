import { SoundEntity } from "../sound/sound.entity";

export class PhonemeEntity {
    private id: number;
    private phonemeIPA: string;
    private phonemeExampleId: number;
    private sounds: SoundEntity[];
}