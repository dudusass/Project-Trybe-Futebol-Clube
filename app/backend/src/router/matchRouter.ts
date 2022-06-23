import { Router, Request, Response } from 'express';
import MatchController from '../controllers/matchController';

const matchController = new MatchController();

const matchRouter = Router();

matchRouter.get(
  '/',
  async (req: Request, res: Response) => {
    await matchController.getMatches(req, res);
  },
);

matchRouter.post(
  '/',
  async (req: Request, res: Response) => {
    await matchController.inProgressMatch(req, res);
  },
)

matchRouter.patch(
  '/matches/:id/finish',
  async (req: Request, res: Response) => {
    await matchController.finishedMatch(req, res);
  }

)

export default matchRouter;
