import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateVerbDto } from '../../dto/create-adjectives.dto';
import { AdjectiveService } from './adjectives.service';
import { UpdateVerbDto } from '../../dto/update-adjectives.dto';
import { ScrapperService } from 'src/infrastructure/services/scrapper/scrapper.service';
import * as fs from 'fs/promises';
import * as path from 'path';

export interface IAdjective {
  wordName: string;
  images: string[];
  comparative: string;
  superlative: string;
}


@Controller('adjectives')
export class AdjectivesController {
  constructor(
    private readonly adjectiveService: AdjectiveService,
    private readonly scrapperService: ScrapperService,
  ) {}

  @Post()
  create(@Body() createVerbDto: CreateVerbDto) {
    return this.adjectiveService.create(createVerbDto);
  }

@Get()
async findAll() {
  const dataPath = path.resolve(process.cwd(), 'src', 'infrastructure', 'data', 'adjectives.json');
  const rawData = await fs.readFile(dataPath, 'utf-8');
  const adjectives = JSON.parse(rawData) as IAdjective[];

  // Scrapea cada adjetivo y agrega comparative/superlative a cada país
  const scrapePromises = adjectives.map(async (adjective) => {
    // Scrapea la info base
    const wordData = await this.scrapperService.scrapeWebsite(
      'https://dictionary.cambridge.org/pronunciation/english/',
      adjective
    );
    // Agrega comparative y superlative a cada país
    const countriesWord = wordData.getCountriesWord().map((country) => ({
      ...country,
      comparative: adjective.comparative,
      superlative: adjective.superlative,
    }));

    return {
      countriesWord,
      images: wordData.getImages(),
    };
  });

  // Devuelve un array de resultados (uno por adjetivo)
  const results = await Promise.all(scrapePromises);
  return results;
}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adjectiveService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVerbDto: UpdateVerbDto) {
    return this.adjectiveService.update(+id, updateVerbDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adjectiveService.remove(+id);
  }
}
