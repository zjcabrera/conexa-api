import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { configValidation } from './config/validations/config-validation';
import configuration from './config/env.config';
import { DataSourceConfig } from './config/database/data.source';

import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env`,
      isGlobal: true,
      load: [configuration],
      validationSchema: configValidation,
      validationOptions: {
        allowUnknown: true,
        abortEarly: true,
      },
    }),
    TypeOrmModule.forRoot({ ...DataSourceConfig }),

    UsersModule,

    RolesModule,

    AuthModule,
  ],
  providers: [],
  controllers: [],
})
export class AppModule {}
