import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { UsersService } from 'src/users/services/users.service';
import { UsersModule } from 'src/users/users.module';
import { UsersRepository } from 'src/users/repositories';

@Global()
@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: process.env.SERVER_JWT_SECRET,
      signOptions: { expiresIn: process.env.SERVER_JWT_EXPIRATION_TIME || '180s' },
    }),
  ],
  providers: [UsersRepository, AuthService, UsersService],
  controllers: [AuthController],
})
export class AuthModule {}
