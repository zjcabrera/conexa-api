import { Column, Entity, ManyToOne } from 'typeorm';

import { BaseEntity } from '../../config/database/base.entity';
import { RoleEntity } from '../../roles/entities';

import { IUser } from '../../interfaces/user.interface';
@Entity('users')
export class UserEntity extends BaseEntity implements IUser {
  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @ManyToOne(() => RoleEntity, (role: RoleEntity) => role.users)
  role: RoleEntity;
}
