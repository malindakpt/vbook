import { Request, Response } from "express";
import { User, UserModel } from "models/user/user.model";
import bcrypt from "bcrypt";
import { createAccessToken, createRefreshToken } from "util/util";
import { verify } from "jsonwebtoken";
import { config } from "config";
import { sendEmail } from  "../services/mail.service";

const resetPasswordCodes: any = {};

export const signUp = async (req: Request, res: Response) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 10);
    req.body.password = hash;
    const user = await UserModel.create(req.body);

    const accessToken = createAccessToken(user.toJSON());
    const refreshToken = createRefreshToken(user.toJSON());

    res.cookie("access-token", accessToken, {
      maxAge: config.accessTokenValidity * 1000,
    });
    res.cookie("refresh-token", refreshToken, {
      maxAge: config.refreshTokenValidity * 1000,
      httpOnly: true,
    });

    const responseData = {
      name: user.name,
      country: user.country,
      email: user.email,
      phone: user.phone,
    };

    res.status(201).send(responseData);
  } catch (e) {
    res.status(500).send(JSON.stringify(e));
  }
};

export const signIn = async (req: Request, res: Response) => {
  try {
    const { identifier, password } = req.body;
    const foundUser = await UserModel.findOne({
      where: { identifier },
    });

    if (!foundUser) {
      res.status(401).send('User not found');
      return;
    }

    const passwordMatched = await bcrypt.compare(password, foundUser.password);

    if (!passwordMatched) {
      res.status(401).send('Invalid password');
      return;
    }

    const accessToken = createAccessToken(foundUser.toJSON());
    const refreshToken = createRefreshToken(foundUser.toJSON());

    await foundUser.update({ refreshToken });

    res.cookie("access-token", accessToken, {
      maxAge: config.accessTokenValidity * 1000,
    });
    res.cookie("refresh-token", refreshToken, {
      maxAge: config.refreshTokenValidity * 1000,
      httpOnly: true,
    });
    res.status(200).send(foundUser);
  } catch (e) {
    res.status(500).send(JSON.stringify(e));
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
      res.status(401).send("User not found");
      return;
    }
   
    const decodedUser = verify(refreshToken, config.refreshTokenSecret) as User;

    if(decodedUser.name !== foundUser.name){
        res.status(401).send('Token ownership validation failed');
        return;
    }

    // has a valid refresh-token 
    const accessToken = createAccessToken(foundUser.toJSON());
    refreshToken = createRefreshToken(foundUser.toJSON());

    await foundUser.update({ refreshToken });

    res.cookie("access-token", accessToken, {
      maxAge: config.accessTokenValidity * 1000,
    });
    res.cookie("refresh-token", refreshToken, {
      maxAge: config.refreshTokenValidity * 1000,
      httpOnly: true,
    });
    res.status(200).send(foundUser);
  } catch (e) {
    res.status(500).send(JSON.stringify(e));
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies["refresh-token"];
    const decodedUser = verify(refreshToken, config.accessTokenSecret) as User;

    const foundUser = await UserModel.findOne({
      where: { id: decodedUser.id },
    });

    if(!foundUser){;
      return res.status(500).send('User not found');
    }
    await foundUser.update({ refreshToken: '' });

    res.clearCookie("access-token");
    res.clearCookie("refresh-token");

    res.status(200).send('Successfully logged out');

  } catch (e) {
    res.status(500).send(JSON.stringify(e));
  }
};

export const sendResetCode = async (req: Request, res: Response) => {
  try {
    const { identifier } = req.body;
    const randomCode = Math.round(Math.random()*Math.pow(10, 6));
    resetPasswordCodes[identifier] = `${randomCode}`;

    setTimeout(() => {
      delete resetPasswordCodes[identifier];
    }, config.resetPasswordTimeout);

    await sendEmail(identifier, 'Reset password', `Please use following code as the reset code: <b>${randomCode}</b>`);
    res.status(200).send('Reset code sent');

  } catch (e) {
    res.status(500).send(JSON.stringify(e));
  }
};

export const changePassword = async (req: Request, res: Response) => {
  try {
    const { resetCode, identifier, password } = req.body; 

    if(resetPasswordCodes[identifier] !== resetCode){
      res.status(500).send('Invalid reset code');
      return;
    }

    const foundUser = await UserModel.findOne({
      where: { identifier },
    });

    if (!foundUser) {
      res.status(401).send('User not found');
      return;
    }
    const newPassword = await bcrypt.hash(password, 10);
    await foundUser.update({ password: newPassword });
    res.status(200).send('Password changed successfully');

  } catch (e) {
    res.status(500).send('JSON.stringify(e)');
  }
};

export const getAllUsers = (req: Request, res: Response) => {
  UserModel.findAll().then((result) => {
    res.status(200).send(result);
  });
};
 

