import * as request from 'supertest';
import * as faker from 'faker';

import { createCar, createTestingServer } from './utils';
import { INestApplication } from '@nestjs/common';

describe('ManufacturersController (e2e)', () => {
  let app: INestApplication;
  let server;

  beforeAll(async () => {
    const testingServer = await createTestingServer();
    server = testingServer.server;
    app = testingServer.app;
  });

  it('GET /manufacturers/{id} (success)', async () => {
    const { body } = await createCar(server);
    return request(server)
      .get(`/manufacturers/${body.manufacturer.id}`)
      .expect(200);
  });

  it('GET /manufacturers/{id} (error)', async () =>
    request(server)
      .get(`/manufacturers/12312`)
      .expect(404));

  it('PUT /manufacturers/{id} (success)', async () => {
    const { body } = await createCar(server);

    const newManufacturers = {
      name: faker.name.findName(),
      phone: '+380994154440',
      siret: faker.random.number(),
    };

    const { body: newManufacturersBody } = await request(server)
      .put(`/manufacturers/${body.manufacturer.id}`)
      .send(newManufacturers)
      .expect(200);

    expect(newManufacturers).toEqual({
      name: newManufacturersBody.name,
      phone: newManufacturersBody.phone,
      siret: newManufacturersBody.siret,
    });
  });

  it('PUT /manufacturers/{id} (error)', async () =>
    request(server)
      .put(`/manufacturers/12211`)
      .send({})
      .expect(400));

  it('GET ​/manufacturers​/car​/{carId} (success)', async () => {
    const { body } = await createCar(server);
    return request(server)
      .get(`/manufacturers/car/${body.id}`)
      .expect(200);
  });

  it('GET ​/manufacturers​/car​/{carId} (error)', async () =>
    request(server)
      .get(`/manufacturers/car/12311`)
      .expect(404));

  afterAll(async () => {
    await app.close();
  });
});
