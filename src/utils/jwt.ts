import jwt, { SignOptions, Secret } from 'jsonwebtoken';
import { config } from '../config/env.js';

export type JwtPayload = { sub: string; role: 'CUSTOMER'|'SELLER'|'ADMIN' };

export const signJwt = (payload: JwtPayload) => {
  const options: SignOptions = {
    expiresIn: config.jwtExpiresIn as SignOptions['expiresIn'],
  };
  return jwt.sign(payload as object, config.jwtSecret as Secret, options);
};

export const verifyJwt = (token: string) =>
  jwt.verify(token, config.jwtSecret as Secret) as JwtPayload;
