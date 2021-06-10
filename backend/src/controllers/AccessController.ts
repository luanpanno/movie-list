import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import validator from 'validator';

import { env } from '../config/env';
import { checkMissingParams } from '../helpers/checkMissingParams';
import {
  badRequest,
  forbidden,
  noContent,
  serverError,
  statusOk,
} from '../helpers/Http';
import { isEmptyObject } from '../helpers/isEmptyObject';
import { UserLogin, UserRegister } from '../models/domain/User';
import { makeUserRepository } from '../repository/UserRepository';

export class AccessController {
  public async signup(
    req: Request<any, any, UserRegister>,
    res: Response
  ): Promise<any> {
    try {
      if (isEmptyObject(req.body)) {
        return badRequest(res, 'All fields are required');
      }

      const { name, email, password, passwordConfirmation } = req.body;

      const missingParams = checkMissingParams(req.body, [
        {
          label: 'Name',
          name: 'name',
        },
        {
          label: 'Email',
          name: 'email',
        },
        {
          label: 'Password',
          name: 'password',
        },
        {
          label: 'Password Confirmation',
          name: 'passwordConfirmation',
        },
      ]);

      if (missingParams) {
        return badRequest(res, missingParams);
      }

      if (!validator.isEmail(email)) {
        return badRequest(res, 'Provided email is invalid');
      }

      const user = await makeUserRepository().findByEmail(email);

      if (user) {
        return badRequest(res, 'Provided email is already in use');
      }

      await makeUserRepository().create({
        name,
        email,
        password,
        passwordConfirmation,
      });

      return noContent(res);
    } catch (error) {
      return serverError(res, error);
    }
  }

  async login(req: Request<any, any, UserLogin>, res: Response): Promise<any> {
    try {
      if (isEmptyObject(req.body)) {
        return badRequest(res, 'All fields are required');
      }

      const { email, password } = req.body;

      const missingParams = checkMissingParams(req.body, [
        {
          label: 'Email',
          name: 'email',
        },
        {
          label: 'Password',
          name: 'password',
        },
      ]);

      if (missingParams) {
        return badRequest(res, missingParams);
      }

      if (!validator.isEmail(email)) {
        return badRequest(res, 'Provided email is invalid');
      }

      const user = await makeUserRepository().findByEmail(email, true);
      const passwordMatch = await bcrypt.compare(
        password,
        user?.password ?? ''
      );

      if (!user || !passwordMatch) {
        return forbidden(res, 'Wrong credentials');
      }

      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          name: user.name,
        },
        env.SECRET,
        {
          expiresIn: '1d',
        }
      );

      return statusOk(res, { token });
    } catch (error) {
      return serverError(res, error);
    }
  }
}

export const makeAccessController = (): AccessController =>
  new AccessController();
