import { NestFactory, Reflector } from '@nestjs/core';
import { ClassSerializerInterceptor, INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import rateLimit from 'express-rate-limit';

import * as morgan from 'morgan';
import helmet from 'helmet';

import { AppModule } from './app.module';
import { CORS } from './constants';
import { MethodNotAllowedExceptionFilter } from './middlewares/not-found-exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(morgan('dev'));

  const configService = app.get(ConfigService);
  app.useGlobalPipes(
    new ValidationPipe({
      transformOptions: {
        enableImplicitConversion: true,
      },
    })
  );

  app.useGlobalFilters(new MethodNotAllowedExceptionFilter());

  // Values in miliseconds
  const limiterPerSecond = rateLimit({
    windowMs: configService.get<number>('RATE_LIMIT_WINDOWS_MS_PER_SECONDS'),
    max: configService.get<number>('RATE_LIMIT_WINDOWS_MAX_PER_SECONDS'),
  });

  const limiterPerMinute = rateLimit({
    windowMs: configService.get<number>('RATE_LIMIT_WINDOWS_MS_PER_MINUTES'),
    max: configService.get<number>('RATE_LIMIT_WINDOWS_MAX_PER_MINUTES'),
  });

  const limiterPerHour = rateLimit({
    windowMs: configService.get<number>('RATE_LIMIT_WINDOWS_MS_PER_HOURS'),
    max: configService.get<number>('RATE_LIMIT_WINDOWS_MAX_PER_HOURS'),
  });

  // Aplicar los l�mites a todas las rutas
  app.use(limiterPerSecond);
  app.use(limiterPerMinute);
  app.use(limiterPerHour);

  app.use(
    helmet({
      crossOriginEmbedderPolicy: false,
      contentSecurityPolicy: {
        directives: {
          imgSrc: [`'self'`, 'data:', 'apollo-server-landing-page.cdn.apollographql.com'],
          scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
          manifestSrc: [`'self'`, 'apollo-server-landing-page.cdn.apollographql.com'],
          frameSrc: [`'self'`, 'sandbox.embed.apollographql.com'],
        },
      },
    })
  );

  const reflector = app.get(Reflector);

  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));

  app.enableCors(CORS);

  app.setGlobalPrefix('api');

  if (configService.get<string>('ENVIRONMENT') === 'development') {
    const configureSwagger = (app: INestApplication) => {
      const options = new DocumentBuilder()
        .addBearerAuth()
        .setTitle('Conexa API')
        .setDescription('The Conexa API documentation')
        .setVersion('1.0')
        .addTag('APIs')
        .build();

      const document = SwaggerModule.createDocument(app, options);
      SwaggerModule.setup('api', app, document, {
        explorer: true,
        swaggerOptions: { filter: true, showRequestDuration: true },
      });
    };
    configureSwagger(app);
  }

  await app.listen(configService.get('SERVER_PORT'));
  console.log(`Application running on: ${await app.getUrl()}`);
}
bootstrap();
