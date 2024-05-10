import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

import { PUBLIC_KEY } from 'src/constants';
import { UsersService } from 'src/users/services/users.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly userService: UsersService,
    private readonly reflector: Reflector
  ) {}
  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.get<boolean>(PUBLIC_KEY, context.getHandler());

    if (isPublic) return true;

    const { roleUser, idUser } = context.switchToHttp().getRequest<Request>();

    const user = await this.userService.findOne(idUser);
    if (roleUser === undefined || user.role.id !== roleUser) {
      throw new UnauthorizedException('Invalid user');
    }

    return true;
  }
}
