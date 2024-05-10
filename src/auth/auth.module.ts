import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { UsersService } from 'src/users/services/users.service';
import { UsersModule } from 'src/users/users.module';
import { UsersRepository } from 'src/users/repositories';
import { RolesService } from 'src/roles/services/roles.service';
import { RolesRepository } from 'src/roles/repositories';

@Global()
@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: process.env.SERVER_JWT_SECRET,
      signOptions: { expiresIn: process.env.SERVER_JWT_EXPIRATION_TIME || '180s' },
    }),
  ],
  providers: [RolesRepository, UsersRepository, AuthService, UsersService, RolesService],
  controllers: [AuthController],
})
export class AuthModule {}
