import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './infrastructure/database/database.module';
import { VerbsModule } from './presentation/verb/controllers/verbs/verbs.module';
import { AuthModule } from './presentation/auth/auth.module';
import { AdjectivesModule } from './presentation/adjective/controllers/verbs/adjectives.module';
import { ArticlesModule } from './presentation/adjective copy/controllers/articles/articles.module';
import { SubjectsModule } from './presentation/subject/controllers/subjects/subjects.module';
import { NounsModule } from './presentation/noun/controllers/subjects/nouns.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    VerbsModule,
    AdjectivesModule,
    ArticlesModule,
    SubjectsModule,
    NounsModule,
    AuthModule,
    HttpModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
