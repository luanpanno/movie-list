export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserRegister {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export interface UserLogin {
  email: string;
  password: string;
}
