import { PronunciationTypesCountry } from "../verb/entities/verb-pronunciation.entity";

export class SoundEntity {
    private id: number;
    private fileName: string;
    private characterId: number;
    private soundType: keyof typeof PronunciationTypesCountry;    
}