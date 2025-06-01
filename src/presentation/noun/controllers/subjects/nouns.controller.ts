import { Controller, Delete, Get, Param } from '@nestjs/common';
import * as fs from 'fs/promises';
import * as path from 'path';
import { ScrapperService } from 'src/infrastructure/services/scrapper/scrapper.service';
import { NounService } from './nouns.service';

export interface ISubject {
  wordName: string;
  images: string[];
  plural: string;
}

@Controller('nouns')
export class NounsController {
  constructor(
    private readonly subjectService: NounService,
    private readonly scrapperService: ScrapperService,
  ) {}

  @Get()
  async findAll() {
    const dataPath = path.resolve(
      process.cwd(),
      'src',
      'infrastructure',
      'data',
      'nouns.json',
    );
    const rawData = await fs.readFile(dataPath, 'utf-8');
    const nouns = JSON.parse(rawData) as ISubject[];

    // Scrapea cada adjetivo y agrega comparative/superlative a cada país
    const scrapePromises = nouns.map(async (noun) => {
      // Scrapea la info base
      const wordData = await this.scrapperService.scrapeWebsite(
        'https://dictionary.cambridge.org/pronunciation/english/',
        noun,
      );
      // Agrega comparative y superlative a cada país
      const countriesWord = wordData.getCountriesWord().map((country) => ({
        ...country
      }));

      return {
        countriesWord,
        images: wordData.getImages(),
        plural: noun.plural,
      };
    });

    // Devuelve un array de resultados (uno por adjetivo)
    const results = await Promise.all(scrapePromises);
    return results;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subjectService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subjectService.remove(+id);
  }
}
