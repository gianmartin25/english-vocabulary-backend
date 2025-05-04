import { VerbPronunciation } from "./verb-pronunciation.entity";

export class VerbFormEntity {
    private id: number;
    private verbId: string;
    private name: string;
    private verbFormTypeId: number;
    private verbPronunciations: VerbPronunciation[];
}