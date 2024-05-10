import { Injectable } from '@nestjs/common';

import { RoleEntity } from '../entities/role.entity';
import { CreateRoleDTO } from '../dto/roles';
import { RolesRepository } from '../repositories';

import { ErrorManager } from 'src/utils/managers';

@Injectable()
export class RolesService {
  constructor(private readonly rolesRepository: RolesRepository) {}

  async create(createRoleDto: CreateRoleDTO): Promise<RoleEntity> {
    try {
      return this.rolesRepository.createRole(createRoleDto);
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async findAll(): Promise<RoleEntity[]> {
    try {
      const roles = await this.rolesRepository.findRoles();
      if (!roles.length)
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'No roles found.',
        });
      return roles;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async findOne(id: string): Promise<RoleEntity> {
    const role = await this.rolesRepository.findRoleById(id);
    if (!role)
      throw new ErrorManager({
        type: 'NOT_FOUND',
        message: 'No role found.',
      });

    return role;
  }
}
