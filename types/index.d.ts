declare namespace NodeJS {
  interface ProcessEnv {
    SERVER_PORT: string;
    ENVIRONMENT: string;
    DATABASE_HOST: string;
    DATANASE_PORT: string;
    DATABASE_USERNAME: string;
    DATABASE_PASSWORD: string;
    DATABASE_NAME: string;
    SERVER_JWT_SECRET: string;
    SERVER_JWT_EXPIRATION_TIME: string;
  }
}
