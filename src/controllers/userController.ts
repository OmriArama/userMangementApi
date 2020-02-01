import { userDAL, IUserModal } from '../Schemas/userSchema';
import { Request, Response, NextFunction, request, json } from 'express';
import { Config } from '../config';



export const staticRouteQueryRequest = (req: Request, res: Response, next: NextFunction) => {
    const isPagination = Config.paginationRequestRequiredParams.every(currParms => {
        return req.params[currParms]
    })
    if (isPagination) {
        this.searchByQueryWithPagination(req, res, next)
    }
}

export default class UserController {

    public static addNewUser = (req: Request, res: Response, next: NextFunction): void => {
        userDAL.findOne({ userName: req.body.userName }).lean()
            .then(foundUser => {
                if (foundUser) {
                    res.status(400).send('user name is already taken');
                }
                else {
                    new userDAL(req.body).save((err, user: IUserModal) => {
                        if (err) {
                            res.status(400).send(err.message);
                            next();
                        }
                        res.send(user);
                        next()
                    })
                }
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
    public static getUsersByPage = (req: Request, res: Response, next: NextFunction): void => {
        userDAL.find().skip(parseInt(req.query.skip)).limit(parseInt(req.query.limit)).lean()
            .then((UsersPage: IUserModal[]) => {
                res.status(200).send(UsersPage)
            })
            .catch(err =>
                res.status(400).send(err)
            )
    }

    public static searchByQuery = (req: Request, res: Response, next: NextFunction): void => {
        userDAL.find(res.locals.findQuery).lean()
            .then((user: IUserModal[]) => {
                res.send(user);
            })
            .catch(err => {
                res.status(400).send(err);
            })
    }


    public static searchByQueryWithPagination = (req: Request, res: Response, next: NextFunction): void => {
        userDAL.find(res.locals.findQuery).skip(parseInt(req.query.skip)).limit(parseInt(req.query.limit)).lean()
            .then((user: IUserModal[]) => {
                res.send(user);
            })
            .catch(err => {
                res.status(400).send(err);
            })
    }

    public static Login = (req: Request, res: Response, next: NextFunction): void => {
        userDAL.findOne({ 'userName': req.body.userName,'password':req.body.password }).lean()
            .then((user: IUserModal) => {
                if(!user){
                    res.status(400).send('bad userName or password')
                }
                res.send(user);
            })
            .catch(err => {
                res.status(400).send(err);
            })
    }

}

