import bcrypt from 'bcryptjs';
import { v4 as uuid } from 'uuid';

import { env } from '../config/env';
import { User, UserRegister } from '../models/domain/User';
import { UserSchema } from '../models/schemas/UserSchema';

export class UserRepository {
  async create(user: UserRegister): Promise<void> {
    const hashedPassword = await bcrypt.hash(user.password, env.PASSWORD_HASH);

    await UserSchema.create({
      ...user,
      id: uuid(),
      password: hashedPassword,
    });
  }

  async findByEmail(email: string, showPassword = false): Promise<User> {
    const filter: any = {
      _id: 0,
    };

    if (!showPassword) filter.password = 0;

    return UserSchema.findOne(
      {
        email,
      },
      filter
    );
  }

  update(): void {
    return null;
  }

  delete(): void {
    return null;
  }
}

export const makeUserRepository = (): UserRepository => new UserRepository();
