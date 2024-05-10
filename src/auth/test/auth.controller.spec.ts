import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';

import { AuthController } from '../controllers/auth.controller';
import { AuthService } from '../services/auth.service';
import { AuthMockedService } from './mocks';
import { RolesRepository } from 'src/roles/repositories';
import { RolesMockedRepository, RolesMockedService } from 'src/roles/test/role.mock';
import { UsersRepository } from 'src/users/repositories';
import { UserMockedRepository, UserMockedService } from 'src/users/test/mock';
import { UsersService } from 'src/users/services';
import { RolesService } from 'src/roles/services/roles.service';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [
        AuthService,
        { provide: AuthService, useValue: AuthMockedService },
        { provide: RolesRepository, useValue: RolesMockedRepository },
        { provide: UsersRepository, useValue: UserMockedRepository },
        { provide: UsersService, useValue: UserMockedService },
        { provide: RolesService, useValue: RolesMockedService },
      ],
      controllers: [AuthController],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
