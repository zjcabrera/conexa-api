import * as Joi from 'joi';
export const configValidation = Joi.object({
  SERVER_PORT: Joi.number(),
  ENVIRONMENT: Joi.string().required(),
  SERVER_JWT_SECRET: Joi.string(),
  SERVER_JWT_EXPIRATION_TIME: Joi.string(),
  DATABASE_USERNAME: Joi.string().required(),
  DATABASE_PASSWORD: Joi.string().required(),
  DATABASE_NAME: Joi.string().required(),
  DATABASE_HOST: Joi.string(),
  DATABASE_PORT: Joi.number(),
});
