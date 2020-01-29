import { Router } from 'express';
import UserController from '../controllers/userController'
export const userRouter = Router();

userRouter
    .route('/')
    .post(UserController.addNewUser)

    userRouter
    .route('/:userId')
    .get(UserController.getUserById)
    .put(UserController.updateUserById)
