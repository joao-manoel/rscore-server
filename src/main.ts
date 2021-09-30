import * as helmet from 'helmet';
import * as csurf from 'csurf';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());
  app.use(csurf());

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3333);
}
bootstrap();
