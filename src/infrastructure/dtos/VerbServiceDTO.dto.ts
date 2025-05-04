import { VerbCountryServiceDTO } from './VerbCountryServiceDTO.dto';

export class VerbServiceDTO {
  private countriesVerb: VerbCountryServiceDTO[] = [];
  private images: string[] = [];

  constructor() {
    this.countriesVerb = [];
    this.images = [];
  }

  getImages(): string[] {
    return this.images;
  }

  addImage(image: string): void {
    this.images.push(image);
  }

  getCountriesVerb(): VerbCountryServiceDTO[] {
    return this.countriesVerb;
  }

 setCountryVerb(countriesVerb: VerbCountryServiceDTO[]): void {
    this.countriesVerb = countriesVerb;
  }
}
