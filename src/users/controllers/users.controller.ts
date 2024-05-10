import { Controller, Post, Body, UseGuards } from '@nestjs/common';

import { UsersService } from '../services/users.service';
import { CreateUserDTO } from '../dto';

import { PublicAccess } from 'src/auth/decorators';
import { AuthGuard, RolesGuard } from 'src/auth/guards';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { RegisterUserResponseDTO } from '../responsesDTo';

@ApiTags('Auth')
@UseGuards(AuthGuard, RolesGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @PublicAccess()
  @ApiCreatedResponse({
    description: 'User successfully created.',
    type: RegisterUserResponseDTO,
  })
  @Post('/register')
  public async registerUser(@Body() body: CreateUserDTO): Promise<RegisterUserResponseDTO> {
    return await this.usersService.create(body);
  }
}
