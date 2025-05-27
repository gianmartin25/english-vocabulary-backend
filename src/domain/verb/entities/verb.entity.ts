import { SentenceEntity } from 'src/domain/sentence/sentence.entity';
import { VerbFormEntity } from './verb-form.entity';
import { WordImageEntity } from '../../word/word-image.entity';
import { WordEntity } from 'src/domain/word/word.entity';

enum TypeVerb {
  REGULAR = 'regular',
  IRREGULAR = 'irregular',
}


export class VerbEntity {
  private id: number;
  private typeVerb: TypeVerb;
  private verbForms: VerbFormEntity[];
  private sentences: SentenceEntity[];
  private wordId: WordEntity;
  private createdAt: Date;
  private updatedAt: Date;

  constructor(
    id: number,
    typeVerb: TypeVerb,
    verbForms: VerbFormEntity[],
    verbImages: WordImageEntity[],
    sentences: SentenceEntity[],
    wordId: WordEntity,
  ) {
    this.id = id;
    this.typeVerb = typeVerb;
    this.verbForms = verbForms;
    this.sentences = sentences;
    this.wordId = wordId;
    this.createdAt = new Date();
  }

  
}
