import * as faker from 'faker';

import { Token, User, createUser } from '../services/auth.service';
import { Trip } from '../services/trip.service';

export const createFakeUser = (data?: any): User => {
  return createUser(Object.assign({
    id: faker.random.number(),
    username: faker.internet.email(),
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    group: 'rider',
    photo: faker.image.imageUrl()
  }, data));
};

export const createFakeToken = (data?: any): Token => {
  const header = faker.random.alphaNumeric(36);
  const payload = window.btoa(JSON.stringify(data));
  const signature = faker.random.alphaNumeric(43);
  return {
    access: `${header}.${payload}.${signature}`,
    refresh: faker.random.alphaNumeric(100)
  };
};

export const createFakeTrip = (data?: any): Trip => {
  return Object.assign({
    id: faker.random.uuid(),
    created: faker.date.past(),
    updated: faker.date.past(),
    pick_up_address: faker.address.streetAddress(),
    drop_off_address: faker.address.streetAddress(),
    status: 'REQUESTED',
    driver: createFakeUser({ group: 'driver' }),
    rider: createFakeUser()
  }, data);
};
