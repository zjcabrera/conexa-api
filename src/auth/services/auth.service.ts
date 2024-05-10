import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import * as bcrypt from 'bcrypt';

import { UserEntity } from 'src/users/entities/user.entity';

import { UsersService } from 'src/users/services/users.service';
import { ErrorManager } from 'src/utils/managers';
import { IAuthBody, IPayloadToken } from '../interfaces/auth.interface';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}
  public async validateUser({ username, password }: IAuthBody) {
    try {
      const userByUsername = await this.userService.findBy({ key: 'username', value: username });
      const userByEmail = await this.userService.findBy({ key: 'email', value: username });

      const user = userByUsername || userByEmail;

      const match = await bcrypt.compare(password, user.password);

      if (!match)
        throw new ErrorManager({
          type: 'NOT_FOUND',
          message: 'No user found.',
        });

      return await this.generateJWT(user);
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  private signJWT({ payload, secret, expires }) {
    return this.jwtService.sign({ payload, secret, expiresIn: expires });
  }

  private async generateJWT(user: UserEntity): Promise<any> {
    const payload: IPayloadToken = {
      role: user.role.id,
      sub: user.id,
    };

    return {
      accessToken: this.signJWT({
        payload,
        secret: this.configService.get('SERVER_JWT_SECRET'),
        expires: this.configService.get('SERVER_JWT_EXPIRATION_TIME'),
      }),
      user,
    };
  }
}
