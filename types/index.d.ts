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
    RATE_LIMIT_WINDOWS_MS_PER_SECONDS: number;
    RATE_LIMIT_WINDOWS_MAX_PER_SECONDS: number;
    RATE_LIMIT_WINDOWS_MS_PER_MINUTES: number;
    RATE_LIMIT_WINDOWS_MAX_PER_MINUTES: number;
    RATE_LIMIT_WINDOWS_MS_PER_HOURS: number;
    RATE_LIMIT_WINDOWS_MAX_PER_HOURS: number;
  }
}
