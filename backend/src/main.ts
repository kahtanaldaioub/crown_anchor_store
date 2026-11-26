
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { AppModule } from './app.module.js';
import { requestIdMiddleware } from './common/middleware/request-id.middleware.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(requestIdMiddleware);

  app.setGlobalPrefix('api');

  app.use(helmet());

  app.enableCors({
    origin: 'https://crown-anchor-store.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const port = process.env.PORT || 3000;

  await app.listen(port, '0.0.0.0');

  console.log(`Application running on port ${port}`);
}

bootstrap();
