import crypto from 'crypto';
import { Request, Response} from 'express';
import { UserModel } from 'models/user/user.model';

export const insert = async (req: Request, res: Response) => {
    let salt = crypto.randomBytes(16).toString('base64');
    let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");
    req.body.password = salt + "$" + hash;
    req.body.permissionLevel = 1;

    try {
        const result =  await UserModel.create(req.body)
        res.status(201).send({id: result});

    } catch(e) {
        res.status(400).send({});
    }
};

export const getAllUsers = (req: Request, res: Response) => {
    UserModel.findAll()
        .then((result) => {
            res.status(200).send({data: result});
        });
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