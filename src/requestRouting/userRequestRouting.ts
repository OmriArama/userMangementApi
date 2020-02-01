import { Request, Response, NextFunction } from 'express';
import { Config } from '../config';
import userController from '../controllers/userController';

export const queryRequestRouting = (req: Request, res: Response, next: NextFunction) => {
    const isPagination = Config.paginationRequestRequiredParams.every(currParms => {
        return req.query[currParms] !== undefined
    })
    if (isPagination) {
        userController.searchByQueryWithPagination(req,res,next)
    }
    else {
        userController.searchByQuery(req,res,next)
    }
}