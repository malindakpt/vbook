import { sign } from 'jsonwebtoken';
import { User } from 'models/user/user';

export const generateRandomCode = (length: number) => {
  return Math.round(Math.random() * Math.pow(10, length));
};

export const getFutureTime = (date: number, periodMinutes: number) => {
  return date + periodMinutes * 60 * 1000;
};

export const createTokens = (user: User) => {
  const accessToken = sign(user, 'colombosecret');
  return accessToken;
};
