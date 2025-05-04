
export const PronunciationTypesCountry = {
    US : 'US',
    UK : 'UK'
}

export class VerbPronunciation {
    private id: number;
    private verbFormId: string;
    private phonetic: string;
    private pronunciationTypeCountry: keyof typeof PronunciationTypesCountry;
    private characterPronunciationId: number;
}