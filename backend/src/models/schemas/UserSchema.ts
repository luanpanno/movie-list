import mongoose from 'mongoose';

import { User } from '../domain/User';

const userSchema = new mongoose.Schema<User>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { collection: 'users', versionKey: false, timestamps: true }
);

export const UserSchema = mongoose.model<User>('User', userSchema);
