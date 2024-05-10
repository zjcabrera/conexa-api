import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { UserEntity } from '../entities/user.entity';
import { CreateUserDTO } from '../dto/create-user.dto';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  /**
   * Creates a new user.
   *
   * @param {CreateUserDTO} body - The data of the user to be created.
   * @returns {Promise<UserEntity>} The created user.
   */
  public async createUser(body: CreateUserDTO): Promise<UserEntity> {
    return this.userRepository.save(body);
  }

  /**
   * Fetches all users.
   *
   * @returns {Promise<UserEntity[]>} The list of users.
   */
  public async findUsers(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  /**
   * Fetches a user by their ID.
   *
   * @param {string} id - The ID of the user to fetch.
   * @returns {Promise<UserEntity>} The fetched user.
   */
  public async findUserById(id: string): Promise<UserEntity> {
    return await this.userRepository.findOne({
      where: {
        id,
      },
      relations: {
        role: true,
      },
    });
  }

  /**
   * Fetches a user by custom parm.
   *
   * @param {string} key - Name of key.
   * @param {any} value - Value of key.
   * @returns {Promise<UserEntity>} The fetched user.
   */
  public async findUserBy(key: string, value: any): Promise<UserEntity> {
    return await this.userRepository.findOne({
      where: {
        [key]: value,
      },
      relations: {
        role: true,
      },
    });
  }
}
