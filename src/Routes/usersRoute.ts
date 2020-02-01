import { Router } from 'express';
import UserController from '../controllers/userController'
import { validateSearchRequestParams, findQueryOfQueryRequest } from '../Middlewares/validateRequestParams';
import { queryRequestRouting } from '../requestRouting/userRequestRouting';

export const userRouter = Router();

userRouter
    .route('/')
    .get(validateSearchRequestParams, UserController.getUsersByPage)
    .post(UserController.addNewUser)

userRouter
    .route('/searchByQuery')
    .get(findQueryOfQueryRequest, queryRequestRouting)

userRouter
    .route('/searchByUserName/:userName')
    .get(UserController.searchByUserName)
