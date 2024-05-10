import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../controllers/users.controller';
import { UsersService } from '../services';
import { UserMockedRepository, UserMockedService } from './mock';
import { UsersRepository } from '../repositories';
import { RolesRepository } from '../../roles/repositories';
import { RolesService } from '../../roles/services/roles.service';
import { RolesMockedRepository, RolesMockedService } from 'src/roles/test/role.mock';
import { JwtService } from '@nestjs/jwt';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [
        UsersService,
        { provide: UsersService, useValue: UserMockedService },
        { provide: UsersRepository, useValue: UserMockedRepository },
        ConfigService,
        JwtService,
        { provide: RolesRepository, useValue: RolesMockedRepository },

        { provide: RolesService, useValue: RolesMockedService },
      ],
      controllers: [UsersController],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
