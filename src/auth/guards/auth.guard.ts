import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { Request } from 'express';
import { PUBLIC_KEY } from 'src/constants';

import { UsersService } from 'src/users/services/users.service';
import { IAuthTokenResult, IUseToken } from '../interfaces/auth.interface';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UsersService,
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService
  ) {}

  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.get<boolean>(PUBLIC_KEY, context.getHandler());

    if (isPublic) return true;

    const req = context.switchToHttp().getRequest<Request>();

    const token = this.extractTokenFromHeader(req);

    if (!token || Array.isArray(token)) throw new UnauthorizedException('Invalid token');

    const manageToken: IUseToken | string = this.useToken(token);

    if (typeof manageToken === 'string') throw new UnauthorizedException(manageToken);

    if (manageToken.isExpired) throw new UnauthorizedException('Token expired');

    const { sub } = manageToken;

    const user = await this.userService.findOne(sub);

    if (!user) throw new UnauthorizedException('Invalid user');

    req.idUser = user.id;
    req.roleUser = user.role.id;
    return true;
  }

  private useToken = (token: string): IUseToken | string => {
    try {
      const { sub, role } = this.jwtService.verify(token, {
        secret: this.configService.get('SERVER_JWT_SECRET'),
      }) as IAuthTokenResult;

      return {
        sub,
        role,
        isExpired: false,
      };
    } catch (error) {
      if (error.expiredAt) {
        return 'Token is Expired!';
      } else {
        return 'Token is invalid';
      }
    }
  };

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
