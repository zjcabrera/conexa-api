import { Injectable } from '@nestjs/common';
import { RoleEntity } from 'src/roles/entities';
import { EntityManager } from 'typeorm';
import { Roles } from '../roles.seed';

@Injectable()
export class SeedingService {
  constructor(private readonly entityManager: EntityManager) {}

  async seed(): Promise<void> {
    const rolesToInsert = new Roles().getRoles();
    const roles = await this.entityManager.find(RoleEntity);
    if (!roles.length) this.entityManager.save(RoleEntity, rolesToInsert);
  }
}
