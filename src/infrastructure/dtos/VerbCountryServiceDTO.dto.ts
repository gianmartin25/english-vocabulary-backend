import { PronunciationTypesCountry } from 'src/domain/verb/entities/verb-pronunciation.entity';

export class VerbCountryServiceDTO {
  typeVerb: string;
  country: keyof typeof PronunciationTypesCountry;
  verbName: string;
  audioUrl: string;
  phonetic: string;
  characters: CharacterDTO[] = [];


  get getCharacters(): CharacterDTO[] {
    return this.characters;
  }

  addCharacter(character: CharacterDTO): void {
    this.characters.push(character);
  }

  getPhonetic(): string {
    return this.phonetic;
  }

  setPhonetic(phonetic: string) {
    this.phonetic = phonetic;
  }

  getVerbName(): string {
    return this.verbName;
  }

  setVerbName(verbName: string) {
    this.verbName = verbName;
  }

  getCountry(): keyof typeof PronunciationTypesCountry {
    return this.country;
  }

  setCountry(country: keyof typeof PronunciationTypesCountry) {
    this.country = country;
  }

  setAudioUrl(audioUrl: string) {
    this.audioUrl = audioUrl;
  }

  getAudioUrl(): string {
    return this.audioUrl;
  }
}

export class CharacterDTO {
  phoneticCharacter: string;
  wordExample: string;
  private audioCharacterUrl: string;

  getPhoneticCharacter(): string {
    return this.phoneticCharacter;
  }

  setPhoneticCharacter(phoneticCharacter: string) {
    this.phoneticCharacter = phoneticCharacter;
  }

  getWordExample(): string {
    return this.wordExample;
  }

  setWordExample(wordExample: string) {
    this.wordExample = wordExample;
  }

  getAudioCharacterUrl(): string {
    return this.audioCharacterUrl;
  }

  setAudioCharacterUrl(audioCharacterUrl: string) {
    this.audioCharacterUrl = audioCharacterUrl;
  }
}
