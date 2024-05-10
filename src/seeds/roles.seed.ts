import { CreateRoleDTO } from '../roles/dto/roles';

const roles = [
  {
    name: 'admin',
    active: true,
  },
  {
    name: 'regular',
    active: true,
  },
];

export class Roles {
  private readonly roles: CreateRoleDTO[];
  constructor() {
    this.roles = roles;
  }

  public getRoles(): CreateRoleDTO[] {
    return this.roles;
  }
}
