import * as faker from 'faker';
import * as request from 'supertest';
import * as dotenv from 'dotenv';

dotenv.config();

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from '../src/app.module';

export const createTestingServer = async () => {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await app.init();
  return { app, server: app.getHttpServer() };
};

export const car = {
  price: faker.random.number(),
  firstRegistrationDate: '2020-04-25T14:39:45.273Z',
  manufacturer: {
    name: faker.name.findName(),
    phone: '+380994154440',
    siret: faker.random.number(),
  },
  owners: [
    {
      name: faker.name.findName(),
      purchaseDate: '2020-04-25T14:39:45.273Z',
    },
  ],
};

export const createCar = server =>
  request(server)
    .post('/cars')
    .send(car)
    .expect(201);
