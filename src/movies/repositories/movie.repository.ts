import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { CreateMovieDTO, UpdateMovieDTO } from '../dto/';
import { MovieEntity } from '../entities';

@Injectable()
export class MoviesRepository {
  constructor(
    @InjectRepository(MovieEntity)
    private readonly movieRepository: Repository<MovieEntity>
  ) {}

  /**
   * Creates a new movie.
   *
   * @param {CreateMovieDTO} body - The data of the movie to be created.
   * @returns {Promise<MovieEntity>} The created movie.
   */
  public async createMovie(body: CreateMovieDTO): Promise<MovieEntity> {
    return await this.movieRepository.save(body);
  }

  /**
   * Fetches all movies.
   *
   * @returns {Promise<MovieEntity[]>} The list of movies.
   */
  public async findMovies(): Promise<MovieEntity[]> {
    return await this.movieRepository.find();
  }

  /**
   * Fetches a movie by their ID.
   *
   * @param {string} id - The ID of the movie to fetch.
   * @returns {Promise<MovieEntity>} The fetched movie.
   */
  public async findMovieById(id: string): Promise<MovieEntity> {
    return await this.movieRepository.findOne({
      where: {
        id,
      },
    });
  }

  public async findMovieBy(key: string, value: any): Promise<MovieEntity> {
    return await this.movieRepository.findOne({
      where: {
        [key]: value,
      },
    });
  }

  public async updateMovie(id: string, body: UpdateMovieDTO): Promise<UpdateResult> {
    return await this.movieRepository.update(id, body);
  }

  /**
   * Deletes a country.
   *
   * @param {string} id - The ID of the country to delete.
   * @returns {Promise<DeleteResult>} The result of the delete operation.
   */
  public async deleteMovie(id: string): Promise<DeleteResult> {
    return await this.movieRepository.delete(id);
  }
}
