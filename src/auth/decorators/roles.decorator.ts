import { SetMetadata } from '@nestjs/common';

import { ROLES_KEY } from 'src/constants';
import { RoleEntity } from 'src/roles/entities';

export const Roles = (...roles: Array<keyof typeof RoleEntity>) => SetMetadata(ROLES_KEY, roles);
