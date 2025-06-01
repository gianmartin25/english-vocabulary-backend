import { Controller, Delete, Get, Param } from '@nestjs/common';
import * as fs from 'fs/promises';
import * as path from 'path';
import { ScrapperService } from 'src/infrastructure/services/scrapper/scrapper.service';
import { SubjectService } from './subjects.service';

export interface ISubject {
  wordName: string;
  images: string[];
  person: string;
  number: string;
}

@Controller('subjects')
export class SubjectsController {
  constructor(
    private readonly subjectService: SubjectService,
    private readonly scrapperService: ScrapperService,
  ) {}

  @Get()
  async findAll() {
    const dataPath = path.resolve(
      process.cwd(),
      'src',
      'infrastructure',
      'data',
      'subjects.json',
    );
    const rawData = await fs.readFile(dataPath, 'utf-8');
    const adjectives = JSON.parse(rawData) as ISubject[];

    // Scrapea cada adjetivo y agrega comparative/superlative a cada país
    const scrapePromises = adjectives.map(async (adjective) => {
      // Scrapea la info base
      const wordData = await this.scrapperService.scrapeWebsite(
        'https://dictionary.cambridge.org/pronunciation/english/',
        adjective,
      );
      // Agrega comparative y superlative a cada país
      const countriesWord = wordData.getCountriesWord().map((country) => ({
        ...country
      }));

      return {
        countriesWord,
        images: wordData.getImages(),
        person: adjective.person,
        number: adjective.number,
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
