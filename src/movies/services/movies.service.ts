import { Injectable } from '@nestjs/common';
import { MoviesRepository } from 'src/movies/repositories';
import { ErrorManager } from 'src/utils/managers';
import { CreateMovieDTO, UpdateMovieDTO } from '../dto';
import { MovieEntity } from '../entities';
import { UsersRepository } from 'src/users/repositories';
import { RolesEnum } from 'src/roles/entities/enums/roles.enum';
import { IJwtPayload } from 'src/auth/interfaces/jwt-payload.interface';
import { GetMoviesResponseDTO, GetOneMovieResponseDTO } from '../responsesDto';

@Injectable()
export class MoviesService {
  constructor(
    private readonly moviesRepository: MoviesRepository,
    private readonly usersRepository: UsersRepository
  ) {}

  async create(createMovieDto: CreateMovieDTO, { idUser }: IJwtPayload): Promise<{ id: string }> {
    try {
      const user = await this.usersRepository.findUserById(idUser);

      //TODO  Dynamic action rules
      if (user.role.name !== RolesEnum.ADMIN)
        throw new ErrorManager({
          type: 'UNAUTHORIZED',
          message: 'You do not have permissions to create Movies!.',
        });

      const { id } = await this.moviesRepository.createMovie({
        ...createMovieDto,
        createdBy: user,
      });

      return { id };
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async findAll(): Promise<GetMoviesResponseDTO[]> {
    try {
      const movies = await this.moviesRepository.findMovies();
      if (!movies.length)
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'No movies found.',
        });

      return movies.map(({ title, id, createdAt }: MovieEntity) => ({ id, title, createdAt }));
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async findOne(id: string, { idUser }: IJwtPayload): Promise<GetOneMovieResponseDTO> {
    try {
      const user = await this.usersRepository.findUserById(idUser);
      const movie = await this.moviesRepository.findMovieById(id);
      if (!movie)
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'No movie found.',
        });

      //TODO  Dynamic action rules
      if (user.role.name !== RolesEnum.ADMIN)
        throw new ErrorManager({
          type: 'UNAUTHORIZED',
          message: 'You are not allowed to do this!.',
        });

      return { ...movie, createdBy: movie.id };
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async findOneBy({ key, value }: { key: string; value: string }): Promise<MovieEntity> {
    try {
      const movie = await this.moviesRepository.findMovieBy(key, value);
      if (!movie)
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'No movie found.',
        });

      return movie;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async update(id: string, updateMovieDTO: UpdateMovieDTO): Promise<void> {
    try {
      const country = await this.moviesRepository.updateMovie(id, updateMovieDTO);
      if (!country.affected)
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Failed to update.',
        });
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async remove(id: string): Promise<void> {
    try {
      const country = await this.moviesRepository.deleteMovie(id);
      if (!country.affected)
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Failed to delete.',
        });
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
