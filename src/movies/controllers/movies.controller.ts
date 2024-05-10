import { Controller, Post, Body, Get, Param, Patch, Delete, UseGuards, HttpCode } from '@nestjs/common';

import { MoviesService } from '../services';
import { CreateMovieDTO, UpdateMovieDTO } from '../dto';

import { IJwtPayload } from 'src/auth/interfaces/jwt-payload.interface';

import { AuthGuard, RolesGuard } from 'src/auth/guards';
import { GetCurrentUser } from 'src/auth/decorators/get-current-user.decorator';
import { CreateMovieResponseDTO, GetMoviesResponseDTO, GetOneMovieResponseDTO } from '../responsesDto';
import { ApiCreatedResponse, ApiNoContentResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Movies')
@UseGuards(AuthGuard, RolesGuard)
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @ApiCreatedResponse({
    description: 'Movie successfully created.',
    type: CreateMovieResponseDTO,
  })
  @Post('/')
  public async registerMovie(
    @Body() body: CreateMovieDTO,
    @GetCurrentUser() user: IJwtPayload
  ): Promise<CreateMovieResponseDTO> {
    return await this.moviesService.create(body, user);
  }

  @HttpCode(200)
  @ApiOkResponse({
    description: 'Movies successfully found.',
    type: [GetMoviesResponseDTO],
  })
  @Get('/')
  public async getAllMovies(): Promise<GetMoviesResponseDTO[]> {
    return await this.moviesService.findAll();
  }

  @HttpCode(200)
  @ApiOkResponse({
    description: 'Movie successfully found.',
    type: [GetOneMovieResponseDTO],
  })
  @Get('/:id')
  public async getMovieById(
    @Param('id') id: string,
    @GetCurrentUser() user: IJwtPayload
  ): Promise<GetOneMovieResponseDTO> {
    return await this.moviesService.findOne(id, user);
  }

  @HttpCode(204)
  @ApiNoContentResponse({
    description: 'Movie updated.',
  })
  @Patch('/:id')
  public async updateMovie(@Param('id') id: string, @Body() body: UpdateMovieDTO): Promise<void> {
    await this.moviesService.update(id, body);
  }

  @HttpCode(204)
  @HttpCode(204)
  @ApiNoContentResponse({
    description: 'Movie deleted.',
  })
  @Delete('/:id')
  public async deleteMovie(@Param('id') id: string): Promise<void> {
    await this.moviesService.remove(id);
  }
}
