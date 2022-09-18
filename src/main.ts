import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import {
  SwaggerModule,
  DocumentBuilder,
} from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  const options = new DocumentBuilder()
    .setTitle('List of all APIs')
    .setDescription(
      'The list of all APIs of the application. This is a sample description',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // true = only validate fields that are defined in the DTO
    }),
  );
  app.use(cookieParser());
  app.enableCors({
    credentials: true,
    origin: true,
  });
  const document = SwaggerModule.createDocument(
    app,
    options,
  );
  SwaggerModule.setup('/', app, document);
  await app.listen(3001);
}
bootstrap();
