import { Module } from '@nestjs/common';

import { MoviesRepository } from './repositories';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieEntity } from './entities';
import { MoviesService } from './services';
import { MoviesController } from './controllers/movies.controller';
import { UsersService } from 'src/users/services/users.service';
import { RolesService } from 'src/roles/services/roles.service';
import { UsersRepository } from 'src/users/repositories';
import { UserEntity } from 'src/users/entities/user.entity';
import { RolesRepository } from 'src/roles/repositories';
import { RoleEntity } from 'src/roles/entities';
import { JwtService } from '@nestjs/jwt';
@Module({
  imports: [TypeOrmModule.forFeature([MovieEntity, UserEntity, RoleEntity])],
  controllers: [MoviesController],
  providers: [
    MoviesRepository,
    MoviesService,
    UsersService,
    UsersRepository,
    RolesService,
    RolesRepository,
    JwtService,
  ],
  exports: [UsersService, TypeOrmModule],
})
export class MoviesModule {}
