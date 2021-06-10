import mongoose from 'mongoose';

import { mongoConnect, mongoDisconnect } from '../../src/config/db';
import { env } from '../../src/config/env';
import {
  AccessController,
  makeAccessController,
} from '../../src/controllers/AccessController';
import { UserRegister } from '../../src/models/domain/User';
import { makeUserRepository } from '../../src/repository/UserRepository';
import { getResponse, mockRequest, mockResponse } from '../helpers/httpMocks';

interface SutTypes {
  sut: AccessController;
}

const mockAccount = (): UserRegister => ({
  name: 'Luan',
  email: 'luanpanno@gmail.com',
  password: '123',
  passwordConfirmation: '123',
});

const makeSut = (): SutTypes => {
  const sut = makeAccessController();

  return {
    sut,
  };
};

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

  describe('Signup', () => {
    test('Should return status code 400 if all fields are empty', async () => {
      const { sut } = makeSut();
      const req = mockRequest({
        body: {},
      });
      const res = mockResponse();
      const response = getResponse(await sut.signup(req, res));

      expect(response.statusCode).toBe(400);
      expect(response.data?.message).toBe('All fields are required');
    });

    test('Should return status code 400 if missing a required param', async () => {
      const { sut } = makeSut();
      const req = mockRequest({
        body: {
          name: 'Luan',
        },
      });
      const res = mockResponse();
      const response = getResponse(await sut.signup(req, res));

      expect(response.statusCode).toBe(400);
      expect(response.data?.message).toBe(
        'Missing Params: Email, Password, Password Confirmation'
      );
    });

    test('Should return status code 400 if the provided email is invalid', async () => {
      const { sut } = makeSut();
      const req = mockRequest({
        body: {
          ...mockAccount(),
          email: 'luan',
        },
      });
      const res = mockResponse();
      const response = getResponse(await sut.signup(req, res));

      expect(response.statusCode).toBe(400);
      expect(response.data?.message).toBe('Provided email is invalid');
    });

    test('Should return status code 403 if the provided email is already in use', async () => {
      const { sut } = makeSut();
      const account = mockAccount();
      const req = mockRequest({
        body: account,
      });
      const res = mockResponse();
      getResponse(await sut.signup(req, res));
      const response2 = getResponse(await sut.signup(req, res));

      expect(response2.statusCode).toBe(400);
      expect(response2.data?.message).toBe('Provided email is already in use');
    });

    test('Should return status code 204 on success', async () => {
      const { sut } = makeSut();
      const account = mockAccount();
      const req = mockRequest({
        body: account,
      });
      const res = mockResponse();
      const response = getResponse(await sut.signup(req, res));

      expect(response.statusCode).toBe(204);
    });
  });

  describe('Login', () => {
    test('Should return status code 400 if all fields are empty', async () => {
      const { sut } = makeSut();
      const req = mockRequest({
        body: {},
      });
      const res = mockResponse();
      const response = getResponse(await sut.login(req, res));

      expect(response.statusCode).toBe(400);
      expect(response.data?.message).toBe('All fields are required');
    });

    test('Should return status code 400 if missing a required param', async () => {
      const { sut } = makeSut();
      const req = mockRequest({
        body: {
          email: 'luanpanno@gmail.com',
        },
      });
      const res = mockResponse();
      const response = getResponse(await sut.login(req, res));

      expect(response.statusCode).toBe(400);
      expect(response.data?.message).toBe('Missing Params: Password');
    });

    test('Should return status code 400 if the provided email is invalid', async () => {
      const { sut } = makeSut();
      const req = mockRequest({
        body: {
          email: 'luan',
          password: '123',
        },
      });
      const res = mockResponse();
      const response = getResponse(await sut.login(req, res));

      expect(response.statusCode).toBe(400);
      expect(response.data?.message).toBe('Provided email is invalid');
    });

    test('Should return status code 403 on wrong credentials', async () => {
      const { sut } = makeSut();
      const req = mockRequest({
        body: {
          email: 'luanpanno2@gmail.com',
          password: '123',
        },
      });
      const res = mockResponse();

      await makeUserRepository().create(mockAccount());

      const response = getResponse(await sut.login(req, res));

      expect(response.statusCode).toBe(403);
      expect(response.data?.message).toBe('Wrong credentials');
    });

    test('Should return status code 200 on success', async () => {
      const { sut } = makeSut();
      const req = mockRequest({
        body: {
          email: 'luanpanno@gmail.com',
          password: '123',
        },
      });
      const res = mockResponse();

      await makeUserRepository().create(mockAccount());

      const response = getResponse(await sut.login(req, res));

      expect(response.statusCode).toBe(200);
    });
  });
});
