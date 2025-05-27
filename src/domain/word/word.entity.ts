import { WordImageEntity } from "./word-image.entity";
import { WordTypesEntity } from "./word_types.entity";

export class WordEntity {
  private id: number;
  private name: string;
  private type: WordTypesEntity;
  private images: WordImageEntity[];

  
  public getId(): number {
    return this.id;
  }

  public setId(id: number): void {
    this.id = id;
  }

  public getName(): string {
    return this.name;
  }

  public setName(name: string): void {
    this.name = name;
  }

  public getType(): WordTypesEntity {
    return this.type;
  }

  public setType(type: WordTypesEntity): void {
    this.type = type;
  }

  public getImages(): WordImageEntity[] {
    return this.images;
  }

  public setImages(images: WordImageEntity[]): void {
    this.images = images;
  }
}
