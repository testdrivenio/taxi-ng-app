import * as faker from 'faker';

import { Token, User, createUser } from '../services/auth.service';

export const createFakeUser = (data?: any): User => {
  return createUser(Object.assign({
    id: faker.random.uuid(),
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
