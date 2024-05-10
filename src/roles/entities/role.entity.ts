import { UserEntity } from 'src/users/entities/user.entity';
import { BaseEntity } from '../../config/database/base.entity';
import { IRole } from '../../interfaces/role.interface';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('roles')
export class RoleEntity extends BaseEntity implements IRole {
  @Column()
  name: string;

  @Column()
  active: boolean;

  @OneToMany(() => UserEntity, (user: UserEntity) => user.role)
  users: UserEntity[];
}
