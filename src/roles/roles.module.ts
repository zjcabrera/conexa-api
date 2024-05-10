import { Module } from '@nestjs/common';
import { RolesService } from './services/roles.service';

import { RolesRepository } from './repositories';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from './entities';
@Module({
  imports: [TypeOrmModule.forFeature([RoleEntity])],
  controllers: [],
  providers: [RolesRepository, RolesService],
})
export class RolesModule {}
