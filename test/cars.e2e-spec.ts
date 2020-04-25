import * as request from 'supertest';
import * as dotenv from 'dotenv';
import * as faker from 'faker';

dotenv.config();

import { Test } from '@nestjs/testing';

import { INestApplication, ValidationPipe } from '@nestjs/common';

import { AppModule } from '../src/app.module';

describe('CarsController (e2e)', () => {
  let app: INestApplication;
  let server;

  const car = {
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

  const createCar = () =>
    request(server)
      .post('/cars')
      .send(car)
      .expect(201);

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    await app.init();
    server = app.getHttpServer();
  });

  it('POST /cars (success)', async () => {
    return createCar();
  });

  it('POST /cars (error)', async () => {
    return request(server)
      .post('/cars')
      .send({})
      .expect(400);
  });

  it('GET /cars', async () => {
    await createCar();
    const { body } = await request(server)
      .get('/cars')
      .expect(200);

    expect(body.length > 1).toEqual(true);
  });

  it('GET /cars/{id} (success)', async () => {
    const { body } = await createCar();
    return request(server)
      .get(`/cars/${body.id}`)
      .expect(200);
  });

  it('GET /cars/{id} (error)', async () => {
    return request(server)
      .get(`/cars/89732789`)
      .expect(404);
  });

  it('GET /cars/manufacturer/{manufacturerId} (success)', async () => {
    const { body } = await createCar();
    return request(server)
      .get(`/cars/manufacturer/${body.manufacturer.id}`)
      .expect(200);
  });

  it('GET /cars/manufacturer/{manufacturerId} (error)', async () => {
    return request(server)
      .get(`/cars/manufacturer/99999`)
      .expect(404);
  });

  it('PUT /cars/{id} (success)', async () => {
    const { body } = await createCar();

    const newCar = {
      price: faker.random.number(),
      firstRegistrationDate: '2020-04-25T14:39:45.273Z',
    };

    const { body: newCarBody } = await request(server)
      .put(`/cars/${body.id}`)
      .send(newCar)
      .expect(200);

    expect(newCar).toEqual({
      price: newCarBody.price,
      firstRegistrationDate: newCarBody.firstRegistrationDate,
    });
  });

  it('PUT /cars/{id} (error)', async () => {
    return request(server)
      .put(`/cars/99999`)
      .send({})
      .expect(400);
  });

  it('DELETE /cars/{id}', async () => {
    const { body } = await createCar();

    await request(server)
      .delete(`/cars/${body.id}`)
      .expect(200);

    return request(server)
      .get(`/cars/${body.id}`)
      .expect(404);
  });

  afterAll(async () => {
    await app.close();
  });
});
