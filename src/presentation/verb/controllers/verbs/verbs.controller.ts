import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateVerbDto } from '../../dto/create-verb.dto';
import { VerbsService } from './verbs.service';
import { UpdateVerbDto } from '../../dto/update-verb.dto';
import { ScrapperService } from 'src/infrastructure/services/scrapper/scrapper.service';
import * as fs from 'fs/promises';
import * as path from 'path';

export interface IVerb {
  wordName: string;
  images: string[];
}

@Controller('verbs')
export class VerbsController {
  constructor(
    private readonly verbsService: VerbsService,
    private readonly scrapperService: ScrapperService,
  ) {}

  @Post()
  create(@Body() createVerbDto: CreateVerbDto) {
    return this.verbsService.create(createVerbDto);
  }

  @Get()
  async findAll() {
    const dataPath = path.resolve(process.cwd(), 'src', 'infrastructure', 'data', 'verbs.json');
    const rawData = await fs.readFile(dataPath, 'utf-8');
    const verbs = JSON.parse(rawData) as IVerb[];


    console.log(verbs);

    const scrapePromises = verbs.map((verb) =>
      this.scrapperService.scrapeWebsite(
        'https://dictionary.cambridge.org/pronunciation/english/',
        verb
      ) 
    );

    
    const results = await Promise.all(scrapePromises);
    return results;

   
    // return this.verbsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.verbsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVerbDto: UpdateVerbDto) {
    return this.verbsService.update(+id, updateVerbDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.verbsService.remove(+id);
  }
}
