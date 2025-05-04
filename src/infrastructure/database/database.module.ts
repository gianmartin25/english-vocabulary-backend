import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Verb } from '../verb/models/verb.model';
import { VerbImage } from '../verb/models/verb-image.model';
import { VerbForm } from '../verb/models/verb-form.model';
import { Sentence } from '../sentence/models/sentence.model';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get('POSTGRES_HOST'),
          port: configService.get('POSTGRES_PORT'),
          username: configService.get('POSTGRES_USER'),
          password: configService.get('POSTGRES_PASSWORD'),
          database: configService.get('POSTGRES_DB'),
          entities: [Verb, VerbForm, VerbImage, Sentence],
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
