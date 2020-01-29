import { userDAL, IUserModal } from '../Schemas/userSchema';
import { Request, Response, NextFunction } from 'express';

export default class UserController {

    public static addNewUser = (req: Request, res: Response, next: NextFunction): void => {
        new userDAL(req.body).save((err, user: IUserModal) => {
            if (err) {
                res.status(400).send(err.message);
                next();
            }
            res.send(user);
            next()
        })
    }
    public static getUserById = (req: Request, res: Response, next: NextFunction): void => {
        userDAL.findById(req.params.userId).lean()
            .then((selectedUser: IUserModal) => {
                res.send(selectedUser)
                next();
            })
            .catch(err => { 
               res.status(400).send(err.message);
            })
    }

    public static updateUserById = (req: Request, res: Response, next: NextFunction): void => {
        userDAL.findByIdAndUpdate(req.params.userId, {
            $set: req.body
        })
            .then((updatedUser: IUserModal) => {
                res.send(updatedUser);
                next();
            })
            .catch(err => { 
                res.status(400).send(err.message);
            })
    }
    public static searchUsersByQuery = (req: Request, res: Response, next: NextFunction): void => {

    }

}
