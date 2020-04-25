import * as faker from 'faker';
import * as request from 'supertest';
import * as dotenv from 'dotenv';

dotenv.config();

import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { ValidationPipe } from '@nestjs/common';

export const createTestingServer = async () => {
  const moduleFixture = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  const app = moduleFixture.createNestApplication();
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
