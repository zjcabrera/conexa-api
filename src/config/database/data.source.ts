import { DataSource, DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import configuration from '../env.config';

const { host, port, username, password, database } = configuration().database;

// Configuración para migraciones
export const DataSourceConfig: DataSourceOptions = {
  type: 'postgres',
  host,
  port,
  username,
  password,
  database,
  entities: [`dist/**/*.entity{.ts,.js}`],
  migrations: ['dist/src/migrations/*{.ts,.js}'],
  synchronize: false,
  migrationsRun: true,
  logging: false,
  namingStrategy: new SnakeNamingStrategy(),
};

export const AppDs = new DataSource(DataSourceConfig);
