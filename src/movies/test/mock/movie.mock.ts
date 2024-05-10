import { faker } from '@faker-js/faker';
import { CreateMovieDTO } from 'src/movies/dto';

export const MovieMockedService = {
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

export const MovieMockedRepository = {
  createMovie: jest.fn(() => {
    return true;
  }),
  findMovies: jest.fn(() => {
    return true;
  }),
  findMovieById: jest.fn(() => {
    return true;
  }),
  findMovieBy: jest.fn(() => {
    return true;
  }),
  updateMovie: jest.fn(() => {
    return true;
  }),
  deleteMovie: jest.fn(() => {
    return true;
  }),
};

export const createMovieMocked: CreateMovieDTO = {
  title: faker.lorem.words(3),
  opening_crawl: faker.lorem.sentence(),
  releaseDate: faker.date.past().toISOString().split('T')[0],
  genre: faker.helpers.arrayElement([
    'Action',
    'Adventure',
    'Comedy',
    'Drama',
    'Horror',
    'Mystery',
    'Thriller',
    'Western',
  ]),
  director: `${faker.person.firstName()} ${faker.person.lastName()} `,
  producer: `${faker.person.firstName()} ${faker.person.lastName()} `,
  createdBy: null,
};
