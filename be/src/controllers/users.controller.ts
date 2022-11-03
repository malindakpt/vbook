import crypto from "crypto";
import { Request, Response } from "express";
import { User, UserModel } from "models/user/user.model";
import bcrypt from "bcrypt";
import { createAccessToken, createRefreshToken } from "util/util";
import { sign, verify } from "jsonwebtoken";

export const signUp = async (req: Request, res: Response) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 10);
    req.body.password = hash;
    const user = await UserModel.create(req.body);

    const accessToken = createAccessToken(user.toJSON());
    const refreshToken = createRefreshToken(user.toJSON());

    res.cookie("access-token", accessToken, {
      maxAge: 60 * 60 * 24 * 30 * 1000,
    });
    res.cookie("refresh-token", refreshToken, {
      maxAge: 60 * 60 * 24 * 30 * 1000,
      httpOnly: true,
    });

    const responseData = {
      name: user.firstName,
      country: user.country,
      email: user.email,
      phone: user.phone,
    };
    res.status(201).send(responseData);
  } catch (e) {
    res.status(500).send({ error: e });
  }
};

export const signIn = async (req: Request, res: Response) => {
  try {
    const { identifier, password } = req.body;
    const matchWith = identifier.includes("@") ? "email" : "phone";
    const foundUser = await UserModel.findOne({
      where: {
        [matchWith]: identifier,
      },
    });

    if (!foundUser) {
      res.status(401).send({ error: "unauthorized" });
      return;
    }

    const passwordMatched = await bcrypt.compare(password, foundUser.password);

    if (!passwordMatched) {
      res.status(401).send({ error: "unauthorized" });
      return;
    }

    const accessToken = createAccessToken(foundUser.toJSON());
    const refreshToken = createRefreshToken(foundUser.toJSON());

    await foundUser.update({ refreshToken });

    res.cookie("access-token", accessToken, {
      maxAge: 60 * 60 * 24 * 30 * 1000,
    });
    res.cookie("refresh-token", refreshToken, {
      maxAge: 60 * 60 * 24 * 30 * 1000,
      httpOnly: true,
    });
    res.status(200).send({ data: foundUser });
  } catch (e) {
    res.status(500).send({ error: e });
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  try {
    let refreshToken = req.cookies["refresh-token"];
 
    const foundUser = await UserModel.findOne({
      where: { refreshToken },
    });

    // refresh-token reuse or hacked
    // TODO: invalidate other sessions
    if (!foundUser) {
      res.status(401).send({ error: "unauthorized" });
      return;
    }
   
    const decodedUser = verify(refreshToken, '123') as User;

    if(decodedUser.firstName !== foundUser.firstName){
        res.status(401).send({ error: "unauthorized" });
        return;
    }

    // has a valid refresh-token 
    const accessToken = createAccessToken(foundUser.toJSON());
    refreshToken = createRefreshToken(foundUser.toJSON());

    await foundUser.update({ refreshToken });

    res.cookie("access-token", accessToken, {
      maxAge: 60 * 60 * 24 * 30 * 1000,
    });
    res.cookie("refresh-token", refreshToken, {
      maxAge: 60 * 60 * 24 * 30 * 1000,
      httpOnly: true,
    });
    res.status(200).send({ data: foundUser });
  } catch (e) {
    res.status(500).send({ error: e });
  }
};

export const getAllUsers = (req: Request, res: Response) => {
  UserModel.findAll().then((result) => {
    // res.set('Cache-control', 'public, max-age=300');
    res.status(200).send({ data: result });
  });
};
