import { Injectable } from '@nestjs/common';

import * as bcrypt from 'bcrypt';

import { UserEntity } from '../entities/user.entity';
import { CreateUserDTO } from '../dto';
import { UsersRepository } from '../repositories';

import { ErrorManager } from 'src/utils/managers';
import { RolesService } from 'src/roles/services/roles.service';
import { RolesEnum } from 'src/roles/entities/enums/roles.enum';
@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly rolesService: RolesService
  ) {}

  async create(createUserDto: CreateUserDTO): Promise<UserEntity> {
    try {
      createUserDto.password = await bcrypt.hash(createUserDto.password, +process.env.HASH_SALT);
      createUserDto.role = await this.rolesService.findOneBy({ key: 'name', value: RolesEnum.REGULAR });
      return await this.usersRepository.createUser(createUserDto);
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async findAll(): Promise<UserEntity[]> {
    try {
      const users = await this.usersRepository.findUsers();
      if (!users.length)
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'No users found.',
        });
      return users;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  async findOne(id: string): Promise<UserEntity> {
    const user = await this.usersRepository.findUserById(id);
    if (!user)
      throw new ErrorManager({
        type: 'NOT_FOUND',
        message: 'No user found.',
      });

    return user;
  }

  async findBy({ key, value }: { key: keyof CreateUserDTO; value: any }): Promise<UserEntity> {
    const user = await this.usersRepository.findUserBy(key, value);
    return user;
  }
}
