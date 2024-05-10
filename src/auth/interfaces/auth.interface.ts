export interface IPayloadToken {
  sub: string;
  role: string;
}

export interface IAuthBody {
  username: string;
  password: string;
}

export interface IUseToken {
  role: string;
  sub: string;
  isExpired: boolean;
}

export interface IAuthTokenResult {
  role: string;
  sub: string;
  iat: number;
  exp: number;
}
