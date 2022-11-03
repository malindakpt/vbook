import crypto from "crypto";
import { Request, Response } from "express";
import { UserModel } from "models/user/user.model";
import bcrypt from "bcrypt";
import { createAccessToken, createRefreshToken } from "util/util";

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

export const insert = async (req: Request, res: Response) => {
  let salt = crypto.randomBytes(16).toString("base64");
  let hash = crypto
    .createHmac("sha512", salt)
    .update(req.body.password)
    .digest("base64");
  req.body.password = salt + "$" + hash;
  req.body.permissionLevel = 1;

  try {
    const result = await UserModel.create(req.body);
    res.status(201).send({ id: result });
  } catch (e) {
    res.status(500).send({});
  }
};

export const getAllUsers = (req: Request, res: Response) => {
  UserModel.findAll().then((result) => {
    // res.set('Cache-control', 'public, max-age=300');
    res.status(200).send({ data: result });
  });
};
