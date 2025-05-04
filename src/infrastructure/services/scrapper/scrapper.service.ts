import { Injectable } from '@nestjs/common';
import { HttpClientAxiosService } from '../http-client-axios/http-client-axios.service';
import * as cheerio from 'cheerio';
import { PronunciationTypesCountry } from 'src/domain/verb/entities/verb-pronunciation.entity';
import { IVerb } from 'src/presentation/verb/controllers/verbs/verbs.controller';
import { CharacterDTO, VerbCountryServiceDTO } from 'src/infrastructure/dtos/VerbCountryServiceDTO.dto';
import { VerbServiceDTO } from 'src/infrastructure/dtos/VerbServiceDTO.dto';

@Injectable()
export class ScrapperService {
  constructor(private httpClientAxiosService: HttpClientAxiosService) {}

  async scrapeWebsite(url: string, verb: IVerb): Promise<VerbServiceDTO> {
    const verbServiceDTO = new VerbServiceDTO();
    const verbsCountryServiceDTO: VerbCountryServiceDTO[] = [];
    try {
      const html = await this.httpClientAxiosService.get<string>(url + verb.word);
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
        const verbCountryServiceDTO = new VerbCountryServiceDTO();
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
          const characterServiceDTO = new CharacterDTO();
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
          characterServiceDTO.setAudioCharacterUrl(
            `https://dictionary.cambridge.org${audioCharacterUrl}`,
          );
          characterServiceDTO.setPhoneticCharacter(phoneticCharacter);
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
        verbCountryServiceDTO.setVerbName($wordPronunciation.text());
        verbCountryServiceDTO.setCountry(
          country as keyof typeof PronunciationTypesCountry,
        );
        verbsCountryServiceDTO.push(verbCountryServiceDTO);
        console.log(verbsCountryServiceDTO);
        console.log($wordPronunciation.text());
        console.log(pron.text());
        console.log('Country:', $countryElement.text());
      });


      verb.images.forEach((image) => {
        verbServiceDTO.addImage(image);
      });

      verbServiceDTO.setCountryVerb(verbsCountryServiceDTO);

      // console.log($containerDivPronunciation.html());
      // console.log($containerDivPronunciation.children().length);
      return verbServiceDTO;
    } catch (e) {
      console.log(e);
      return verbServiceDTO;
    }
  }
}
