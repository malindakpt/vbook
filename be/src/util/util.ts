import { sign } from "jsonwebtoken";
import { UserModel } from "models/user/user.model";
import dotenv from "dotenv";
import { config } from "config";

dotenv.config();

export const generateRandomCode = (length: number) => {
  return Math.round(Math.random() * Math.pow(10, length));
};

export const getFutureTime = (date: number, periodMinutes: number) => {
  return date + periodMinutes * 60 * 1000;
};

export const createAccessToken = (user: UserModel) => {
  const obj = {
    id: user.id,
    firstName: user.firstName,
    country: user.country,
    email: user.email,
    phone: user.phone,
  };
  const accessToken = sign(obj, config.accessTokenSecret, { expiresIn: config.accessTokenValidity});
  return accessToken;
};

export const createRefreshToken = (user: UserModel) => {
  const obj = {
    id: user.id,
    firstName: user.firstName,
    country: user.country,
    email: user.email,
    phone: user.phone,
  };
  const accessToken = sign(obj, config.refreshTokenSecret, { expiresIn: config.refreshTokenValidity });
  return accessToken;
};
