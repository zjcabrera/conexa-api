import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { CreateRoleDTO } from '../dto/roles';
import { RoleEntity } from '../entities';

@Injectable()
export class RolesRepository {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>
  ) {}

  /**
   * Creates a new role.
   *
   * @param {CreateRoleDTO} body - The data of the role to be created.
   * @returns {Promise<RoleEntity>} The created role.
   */
  public async createRole(body: CreateRoleDTO): Promise<RoleEntity> {
    return await this.roleRepository.save(body);
  }

  /**
   * Fetches all roles.
   *
   * @returns {Promise<RoleEntity[]>} The list of roles.
   */
  public async findRoles(): Promise<RoleEntity[]> {
    return await this.roleRepository.find();
  }

  /**
   * Fetches a role by their ID.
   *
   * @param {string} id - The ID of the role to fetch.
   * @returns {Promise<RoleEntity>} The fetched role.
   */
  public async findRoleById(id: string): Promise<RoleEntity> {
    return await this.roleRepository.findOne({
      where: {
        id,
      },
    });
  }

  public async findRoleBy(key: string, value: any): Promise<RoleEntity> {
    return await this.roleRepository.findOne({
      where: {
        [key]: value,
      },
    });
  }
}
