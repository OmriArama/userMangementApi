import { Request, Response, NextFunction } from 'express';
import { Config } from '../config';


export const validateSearchRequestParams = (req: Request, res: Response, next: NextFunction): void => {
    Config.paginationRequestRequiredParams.forEach(currRequiredField => {
        if (!req.query[currRequiredField]) {
            res.status(400).send(`required query field ${currRequiredField}`);
            return;
        }
    })
    next();
}

export const findQueryOfQueryRequest = (req: Request, res: Response, next: NextFunction) => {
    let findQuery = {
        $or: []
    };
    Config.queryRequestOptionalParams.forEach(currParam => {
        if (req.query[currParam]) {
            findQuery['$or'].push({
                [currParam]: {
                    ['$regex']: `.*${req.query[currParam]}.*`
                }
            })
        }
    })
    res.locals.findQuery = findQuery
    next();
}