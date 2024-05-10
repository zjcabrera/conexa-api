import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * This decorator returns the user in Request.user or any of its properties if provided in the param
 * @param {string} property string describing the desired property to return
 * @return Request.user or Request.user[property]
 * @example
 *
 * Request.user = {
 *  id: 45
 * }
 *
 * GetCurrentUser() = {
 *  id: 45
 * }
 *
 * GetCurrentUser("id") = 45
 *
 */
export const GetCurrentUser = createParamDecorator((property: string, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest();
  if (property) return request.user[property];
  return request.idUser;
});
