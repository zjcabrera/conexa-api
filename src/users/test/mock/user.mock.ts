import { faker } from '@faker-js/faker';

export const UserMockedService = {
  create: jest.fn(() => {
    return true;
  }),
  findAll: jest.fn(() => {
    return true;
  }),
  findOne: jest.fn(() => {
    return true;
  }),
  findBy: jest.fn(() => {
    return true;
  }),
};

export const UserMockedRepository = {
  createUser: jest.fn(() => {
    return true;
  }),
  findUsers: jest.fn(() => {
    return true;
  }),
  findUserById: jest.fn(() => {
    return true;
  }),
  findUserBy: jest.fn(() => {
    return true;
  }),
};

export const createUserMocked = {
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  email: faker.internet.email(),
  username: faker.internet.userName(),
  password: 'contra123A?',
  role: null,
};
