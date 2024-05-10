import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from '../services/movies.service';
import { MoviesRepository } from 'src/movies/repositories';
import { UsersRepository } from '../../users/repositories';

describe('MoviesService', () => {
  let moviesService: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MoviesService,
        {
          provide: MoviesRepository,
          useValue: {
            createMovie: jest.fn(),
            findMovies: jest.fn(),
            findMovieById: jest.fn(),
            findMovieBy: jest.fn(),
            updateMovie: jest.fn(),
            deleteMovie: jest.fn(),
          },
        },
        {
          provide: UsersRepository,
          useValue: {
            findUserById: jest.fn(),
          },
        },
      ],
    }).compile();

    moviesService = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(moviesService).toBeDefined();
  });
});
