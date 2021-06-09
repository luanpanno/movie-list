import mongoose from 'mongoose';

import { mongoConnect, mongoDisconnect } from '../../src/config/db';
import { env } from '../../src/config/env';

describe('Access Controller', () => {
  let accountCollection: any;

  beforeAll(async () => {
    await mongoConnect(env.MONGO_URL);
  });

  afterAll(async () => {
    await mongoDisconnect();
  });

  beforeEach(async () => {
    accountCollection = mongoose.connection.db.collection('users');

    await accountCollection?.deleteMany({});
  });

  test('Should pass', () => {
    expect(1).toBe(1);
  });
});
