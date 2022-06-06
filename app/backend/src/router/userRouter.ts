import { Router, Request, Response } from 'express';
import UserController from '../controllers/userController';
import { validateEmail, validatePassword } from '../middleware/user';

const userController = new UserController();

const userRouter = Router();

userRouter.post(
  '/',
  validateEmail,
  validatePassword,
  async (req: Request, res: Response) => {
    await userController.login(req, res);
  },
);

export default userRouter;
