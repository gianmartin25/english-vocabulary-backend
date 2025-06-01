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
import { ArticleService } from './articles.service';
import { UpdateVerbDto } from '../../dto/update-adjectives.dto';
import { ScrapperService } from 'src/infrastructure/services/scrapper/scrapper.service';
import * as fs from 'fs/promises';
import * as path from 'path';

export interface IArticle {
  wordName: string;
  images: string[];
  type: string;
}

@Controller('articles')
export class ArticlesController {
  constructor(
    private readonly adjectiveService: ArticleService,
    private readonly scrapperService: ScrapperService,
  ) {}

  @Post()
  create(@Body() createVerbDto: CreateVerbDto) {
    return this.adjectiveService.create(createVerbDto);
  }

  @Get()
  async findAll() {
    const dataPath = path.resolve(
      process.cwd(),
      'src',
      'infrastructure',
      'data',
      'articles.json',
    );
    const rawData = await fs.readFile(dataPath, 'utf-8');
    const articles = JSON.parse(rawData) as IArticle[];

    const scrapePromises = articles.map(async (article) => {
      // Scrapea la info base
      const wordData = await this.scrapperService.scrapeWebsite(
        'https://dictionary.cambridge.org/pronunciation/english/',
        article,
      );
      // Agrega comparative y superlative a cada país
      const countriesWord = wordData.getCountriesWord().map((country) => ({
        ...country,
      }));

      return {
        countriesWord,
        images: wordData.getImages(),
        type: article.type,
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
