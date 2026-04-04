import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: false,
    }),
  );

  app.enableCors({
    origin: true,
    credentials: true,
  });

  const port = process.env.PORT || 5000;
  await app.listen(port);

  console.log(`🍽️ Recipe Service running at http://localhost:${port}`);
}

bootstrap();