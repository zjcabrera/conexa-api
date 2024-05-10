import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { configValidation } from './config/validations/config-validation';
import configuration from './config/env.config';
import { DataSourceConfig } from './config/database/data.source';

import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';
import { SeedingService } from './seeds/services/seeds.service';
import { SeedsModule } from './seeds/seeds.module';
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
    TypeOrmModule.forRoot({ ...DataSourceConfig, autoLoadEntities: true }),

    UsersModule,

    RolesModule,

    AuthModule,

    SeedsModule,
  ],
  providers: [SeedingService],
  controllers: [],
})
export class AppModule implements OnApplicationBootstrap {
  constructor(private readonly seedingService: SeedingService) {}

  async onApplicationBootstrap(): Promise<void> {
    await this.seedingService.seed();
  }
}
