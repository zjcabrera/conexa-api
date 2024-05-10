import { IRole } from '.';

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  role: IRole;
}
