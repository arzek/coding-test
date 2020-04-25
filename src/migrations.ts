import * as dotenv from 'dotenv';

dotenv.config();

import { Connection } from 'typeorm';

import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const context = await NestFactory.createApplicationContext(AppModule);
  const module = await context.select<AppModule>(AppModule);
  const connection = module.get<Connection>(Connection);

  await connection.synchronize();
  process.exit();
}
bootstrap();
