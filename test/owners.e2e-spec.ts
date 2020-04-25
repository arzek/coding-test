import * as request from 'supertest';
import * as faker from 'faker';

import { createCar, createTestingServer } from './utils';
import { INestApplication } from '@nestjs/common';

describe('OwnersController (e2e)', () => {
  let app: INestApplication;
  let server;

  beforeAll(async () => {
    const testingServer = await createTestingServer();
    server = testingServer.server;
    app = testingServer.app;
  });

  it('PUT /owners/{id} (success)', async () => {
    const { body } = await createCar(server);

    const newOwner = {
      name: faker.name.findName(),
      purchaseDate: '2020-04-25T16:10:00.975Z',
    };

    const { body: newOwnerBody } = await request(server)
      .put(`/owners/${body.manufacturer.id}`)
      .send(newOwner)
      .expect(200);

    expect(newOwner).toEqual({
      name: newOwnerBody.name,
      purchaseDate: newOwnerBody.purchaseDate,
    });
  });

  it('PUT /owners/{id} (error)', async () =>
    request(server)
      .put(`/owners/12211`)
      .send({})
      .expect(400));

  afterAll(async () => {
    await app.close();
  });
});
