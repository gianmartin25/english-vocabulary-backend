import { Injectable } from '@nestjs/common';
import * as cheerio from 'cheerio';
import { PronunciationTypesCountry } from 'src/domain/verb/entities/verb-pronunciation.entity';
import {
  PhoenemeDTO,
  WordCountryServiceDTO,
} from 'src/infrastructure/dtos/WordCountryServiceDTO.dto';
import { WordServiceDTO } from 'src/infrastructure/dtos/WordServiceDTO.dto';
import { HttpClientAxiosService } from '../http-client-axios/http-client-axios.service';

interface IWord {
  wordName: string;
  images: string[];
}

@Injectable()
export class ScrapperService {
  constructor(private httpClientAxiosService: HttpClientAxiosService) {}

  async scrapeWebsite(url: string, word: IWord): Promise<WordServiceDTO> {
    const verbServiceDTO = new WordServiceDTO();
    const verbsCountryServiceDTO: WordCountryServiceDTO[] = [];
    try {
      const html = await this.httpClientAxiosService.get<string>(
        url + word.wordName,
      );
      // console.log(html);
      const $ = cheerio.load(html);
      const $containerDivPronunciation = $('div.lp-10.lb.lbt0').first();

      console.log($containerDivPronunciation);
      // Seleccionar por ID
      const headerElement = $('#49_AMP_header_0');
      // Verificar si el elemento fue encontrado
      if (headerElement.length > 0) {
        console.log('Elemento encontrado:', headerElement.html());
      } else {
        console.log('Elemento no encontrado.');
      }
      const $containersCountryPronunciation =
        $containerDivPronunciation.children();
      console.log($containersCountryPronunciation.attr('class'));
      $containersCountryPronunciation.each((index, element) => {
        const verbCountryServiceDTO = new WordCountryServiceDTO();
        const $countryElement = $(element).find('.daud.t.tb.fs16.lmr-15');
        const $titlePronunciation = $(element).find('.section-header.lmb-10');
        const audioUrl = $titlePronunciation
          .find('audio source[type="audio/mpeg"]')
          .attr('src');
        verbCountryServiceDTO.setAudioUrl(
          `https://dictionary.cambridge.org${audioUrl}`,
        );
        console.log('Audio:', audioUrl);
        const $wordPronunciation = $titlePronunciation.find('.term.tb.lml-5');
        const $containerCharacters = $(element).find('.hul-u');
        $containerCharacters.children().each((index, characterElement) => {
          const characterServiceDTO = new PhoenemeDTO();
          const $character = $(characterElement);
          const audioCharacterUrl = $character
            .find('audio source[type="audio/mpeg"]')
            .first()
            .attr('src');
          // const audioExampleUrl = $character.find('audio source[type="audio/mpeg"]').last().attr('src');
          console.log(`Audio character: ${audioCharacterUrl}`);
          // console.log(`Audio example: ${audioExampleUrl}`);
          const phoneticCharacter = $character
            .find('span[data-title="Written pronunciation"].pron')
            .text();
          const wordExample = $character.find('.word').text();
          characterServiceDTO.setAudioPhonemeUrl(
            `https://dictionary.cambridge.org${audioCharacterUrl}`,
          );
          characterServiceDTO.setPhoneme(phoneticCharacter);
          characterServiceDTO.setWordExample(wordExample);
          console.log(`${phoneticCharacter}\n`);
          console.log(`Example: ${wordExample}\n`);
          verbCountryServiceDTO.addCharacter(characterServiceDTO);
        });
        // data-title="Written pronunciation" class="pron"
        const pron = $titlePronunciation.find(
          '[data-title="Written pronunciation"].pron',
        );
        const country =
          $countryElement.text() === PronunciationTypesCountry.UK
            ? PronunciationTypesCountry.UK
            : PronunciationTypesCountry.US;
        verbCountryServiceDTO.setPhonetic(pron.text());
        verbCountryServiceDTO.setWordName($wordPronunciation.text());
        verbCountryServiceDTO.setCountry(
          country as keyof typeof PronunciationTypesCountry,
        );
        verbsCountryServiceDTO.push(verbCountryServiceDTO);
        console.log(verbsCountryServiceDTO);
        console.log($wordPronunciation.text());
        console.log(pron.text());
        console.log('Country:', $countryElement.text());
      });

      word.images.forEach((image) => {
        verbServiceDTO.addImage(image);
      });

      verbServiceDTO.setCountryWord(verbsCountryServiceDTO);

      // console.log($containerDivPronunciation.html());
      // console.log($containerDivPronunciation.children().length);
      return verbServiceDTO;
    } catch (e) {
      console.log(e);
      return verbServiceDTO;
    }
  }
}
