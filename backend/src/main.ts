import * as helmet from 'helmet';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import validationOptions from './utils/validation_options';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true
  });

  const configService = app.get(ConfigService);

  app.enableShutdownHooks();
  app.useGlobalPipes(new ValidationPipe(validationOptions));
  app.setGlobalPrefix(configService.get('app.apiPrefix'));
  app.use(helmet());

  const options = new DocumentBuilder()
    .setDescription(
      'NEST Boilerplate API description.'
    )
    .setVersion(configService.get('app.appVersion'))
    .addBearerAuth()
    .setTitle(configService.get('app.name'))
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('docs', app, document);

  await app.listen(configService.get('app.port'));
}
bootstrap();
