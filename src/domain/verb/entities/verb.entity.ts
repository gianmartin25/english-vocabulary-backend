import { SentenceEntity } from 'src/domain/sentence/sentence.entity';
import { VerbFormEntity } from './verb-form.entity';
import { VerbImageEntity } from './verb-image.entity';

enum TypeVerb {
  REGULAR = 'regular',
  IRREGULAR = 'irregular',
}


export class VerbEntity {
  private id: number;
  private typeVerb: TypeVerb;
  private verbForms: VerbFormEntity[];
  private verbImages: VerbImageEntity[];
  private sentences: SentenceEntity[];
  private createdAt: Date;
  private updatedAt: Date;

  constructor(
    id: number,
    typeVerb: TypeVerb,
    verbForms: VerbFormEntity[],
    verbImages: VerbImageEntity[],
    sentences: SentenceEntity[],
  ) {
    this.id = id;
    this.typeVerb = typeVerb;
    this.verbForms = verbForms;
    this.verbImages = verbImages;
    this.sentences = sentences;
    this.createdAt = new Date();
  }

  get getId(): number {
    return this.id;
  }
  
}
