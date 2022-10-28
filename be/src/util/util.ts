import { sign } from 'jsonwebtoken';
import { UserModel } from 'models/user/user.model';

export const generateRandomCode = (length: number) => {
  return Math.round(Math.random() * Math.pow(10, length));
};

export const getFutureTime = (date: number, periodMinutes: number) => {
  return date + periodMinutes * 60 * 1000;
};

export const createTokens = (user: UserModel) => {
    const obj = {
        name: user.firstName,
        country: user.country,
        email: user.email,
        phone: user.phone
    }
  const accessToken = sign(obj, 'colombosecret');
  return accessToken;
};
