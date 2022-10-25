import { config } from 'config';
import crypto from 'crypto';
import { Request, Response} from 'express';
import { UserModel } from 'models/user/user.model';
import { sendEmail } from 'services/mail.service';
import { generateRandomCode, getFutureTime } from 'util/util';

export const insert = async (req: Request, res: Response) => {
    let salt = crypto.randomBytes(16).toString('base64');
    let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");
    req.body.password = salt + "$" + hash;
    req.body.permissionLevel = 1;

    try {
        const result =  await UserModel.create(req.body)
        res.status(201).send({id: result});

    } catch(e) {
        res.status(500).send({});
    }
};

export const getAllUsers = (req: Request, res: Response) => {
    UserModel.findAll()
        .then((result) => {
            // res.set('Cache-control', 'public, max-age=300');
            res.status(200).send({data: result});
        });
};

export const resetPassordToEmail = async (req: Request, res: Response) => {
    const { email } = req.body;
    try {
        const resetCode = generateRandomCode(config.resetPasswordDigits);
        const resetCodeExpire = getFutureTime(new Date().getTime(), config.resetPasswordValidityMinutes);
        const result = await UserModel.update({ resetCode, resetCodeExpire }, {
            where: {
              email
            }
          });
          console.log('changed', result, email)
        await sendEmail(email, 'Reset password', `Please click <a href="${config.feUrl}/user/reset/${resetCode}">here</a> if you want to reset the password`);
        res.status(201).send({data: { email, count: result[0]}});
    } catch(e) {
        res.status(500).send(e);
    }
};


// exports.list = (req, res) => {
//     let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
//     let page = 0;
//     if (req.query) {
//         if (req.query.page) {
//             req.query.page = parseInt(req.query.page);
//             page = Number.isInteger(req.query.page) ? req.query.page : 0;
//         }
//     }
//     UserModel.list(limit, page)
//         .then((result) => {
//             res.status(200).send(result);
//         })
// };

// exports.getById = (req, res) => {
//     UserModel.findById(req.params.userId)
//         .then((result) => {
//             res.status(200).send(result);
//         });
// };
// exports.patchById = (req, res) => {
//     if (req.body.password) {
//         let salt = crypto.randomBytes(16).toString('base64');
//         let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");
//         req.body.password = salt + "$" + hash;
//     }

//     UserModel.patchUser(req.params.userId, req.body)
//         .then((result) => {
//             res.status(204).send({});
//         });

// };

// exports.removeById = (req, res) => {
//     UserModel.removeById(req.params.userId)
//         .then((result)=>{
//             res.status(204).send({});
//         });
// };