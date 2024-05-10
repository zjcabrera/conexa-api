import { ConfigModule, ConfigService } from '@nestjs/config';

interface ServerConfig {
  port: number;
  secret: string;
  expirationTime: string;
}

export interface DatabaseConfig {
  type: string;
  host: string;
  username: string;
  password: string;
  database: string;
  port: number;
  entities: string[];
  synchronize: boolean;
  dropSchema: boolean;
  logging: boolean;
  migrationsTableName: string;
  migrations: string[];
  cli: { migrationsDir: string };
  migrationsRun: boolean;
}

ConfigModule.forRoot({
  envFilePath: '.env',
});

const configService = new ConfigService();

export default () => {
  const serverConfig: ServerConfig = {
    port: configService.get<number>('process.env.SERVER_PORT') || 3000,
    secret: configService.get<string>('SERVER_JWT_SECRET') || 'TopseyCret',
    expirationTime: configService.get<string>('SERVER_JWT_EXPIRATION_TIME') || '180s',
  };

  const databaseConfig: DatabaseConfig = {
    type: 'postgres',
    host: configService.get<string>('DATABASE_HOST') || 'localhost',
    username: configService.get<string>('DATABASE_USERNAME'),
    password: configService.get<string>('DATABASE_PASSWORD'),
    database: configService.get<string>('DATABASE_NAME'),
    port: configService.get<number>('DATABASE_PORT') || 5432,
    entities: [`dist/**/*.entity{.ts,.js}`],
    synchronize: false,
    dropSchema: false,
    logging: false,
    migrationsTableName: 'database_migration',
    migrations: ['dist/migration/*{.ts,.js}'],
    cli: {
      migrationsDir: 'src/migration',
    },
    migrationsRun: true,
  };

  return {
    server: serverConfig,
    database: databaseConfig,
  };
};
