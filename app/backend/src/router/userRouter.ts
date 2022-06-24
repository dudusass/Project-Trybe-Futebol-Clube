import { Router, Request, Response } from 'express';
import UserController from '../controllers/userController';
import validateEmailandPassword from '../middleware/user';

const userController = new UserController();

const userRouter = Router();

userRouter.post(
  '/',
  validateEmailandPassword,
  async (req: Request, res: Response) => {
    await userController.login(req, res);
  },
);

userRouter.get(
  '/',
  async (req: Request, res: Response) => {
    await userController.validate(req, res);
  },
);

export default userRouter;
