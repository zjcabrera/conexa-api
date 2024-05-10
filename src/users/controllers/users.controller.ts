import { Controller, Post, Body, UseGuards } from '@nestjs/common';

import { UsersService } from '../services/users.service';
import { CreateUserDTO } from '../dto';

import { PublicAccess } from 'src/auth/decorators';
import { AuthGuard, RolesGuard } from 'src/auth/guards';

@UseGuards(AuthGuard, RolesGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @PublicAccess()
  @Post('/register')
  public async registerUser(@Body() body: CreateUserDTO) {
    return await this.usersService.create(body);
  }
}
