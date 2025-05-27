import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdjectiveModule } from '../adjective/adjective.module';
import { ArticleModule } from '../article/article.module';
import { NounModule } from '../noun/noun.module';
import { PhonemeModule } from '../phoneme/phoneme.module';
import { SentenceModule } from '../sentence/sentence.module';
import { SubjectModule } from '../subject/subject.module';
import { VerbModule } from '../verb/verb.module';
import { WordModule } from '../word/word.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [
        ConfigModule,
        SentenceModule,
        VerbModule,
        WordModule,
        AdjectiveModule,
        ArticleModule,
        PhonemeModule,
        NounModule,
        SubjectModule
      ],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get('POSTGRES_HOST'),
          port: configService.get('POSTGRES_PORT'),
          username: configService.get('POSTGRES_USER'),
          password: configService.get('POSTGRES_PASSWORD'),
          database: configService.get('POSTGRES_DB'),
          entities: [],
          // entities: [__dirname + '/../**/*.entity{.ts,.js}'],
          synchronize: true, // Be cautious about using synchronize in production
          autoLoadEntities: true,
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
