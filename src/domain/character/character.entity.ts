import { SoundEntity } from "../sound/sound.entity";

export class CharacterEntity {
    private id: number;
    private characterIPA: string;
    private characterExampleId: number;
    private sounds: SoundEntity[];
}