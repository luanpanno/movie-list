import jwt from 'jsonwebtoken';

import { env } from '../config/env';
import { User } from '../models/domain/User';
import { getToken } from './GetToken';

export function findUserByToken(authorization: string): User {
  if (!authorization) return null;

  return jwt.verify(getToken(authorization), env.SECRET) as User;
}
