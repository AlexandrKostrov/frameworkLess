import { NestFactory } from '@nestjs/core';
import * as Sentry from '@sentry/node';
import * as cors from 'cors';
import { AppModule } from './app.module';
import { ConfigService } from './config/config.service';
import { HttpExceptionFilter } from './filters/httpException.filter';
import { HttpException, ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  const config = new ConfigService(`${process.env.NODE_ENV}.env`);
  if (config.get('NODE_ENV') === 'production') {
    Sentry.init({ dsn: config.get('SENTRY_DSN') });
  }
  const app = await NestFactory.create(AppModule);
  app.use(cors());
  app.useGlobalPipes(new ValidationPipe({ transform: true, }));
  app.useGlobalFilters(new HttpExceptionFilter());
  app.setGlobalPrefix('v1');

  const PORT = config.get('PORT');
  await app.listen(PORT);

  console.log(`App listening port ${PORT}`);
}
bootstrap();
