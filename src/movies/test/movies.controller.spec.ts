import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesController } from 'src/movies/controllers/movies.controller';
import { MoviesService } from '../services';
import { MoviesRepository } from '../repositories';
import { MovieMockedRepository, MovieMockedService } from './mock/movie.mock';
import { UsersService } from '../../users/services';
import { UserMockedRepository, UserMockedService } from '../../users/test/mock';
import { RolesService } from '../../roles/services/roles.service';
import { RolesMockedRepository, RolesMockedService } from 'src/roles/test/role.mock';
import { RolesRepository } from '../../roles/repositories';
import { UsersRepository } from 'src/users/repositories';
import { JwtService } from '@nestjs/jwt';

describe('MoviesController', () => {
  let controller: MoviesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [
        { provide: MoviesRepository, useValue: MovieMockedRepository },
        { provide: MoviesService, useValue: MovieMockedService },
        { provide: UsersService, useValue: UserMockedService },
        { provide: UsersRepository, useValue: UserMockedRepository },
        { provide: RolesService, useValue: RolesMockedService },
        { provide: RolesRepository, useValue: RolesMockedRepository },
        JwtService,
      ],
      controllers: [MoviesController],
    }).compile();

    controller = module.get<MoviesController>(MoviesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
