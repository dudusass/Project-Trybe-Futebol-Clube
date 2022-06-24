import { Router, Request, Response } from 'express';
import auth from '../middleware/auth';
import MatchController from '../controllers/matchController';
import matchMiddleware from '../middleware/matches';

const matchController = new MatchController();

const matchRouter = Router();

matchRouter.post(
  '/matches',
  auth,
  matchMiddleware,
  matchController.createdMatch,
  async (req: Request, res: Response) => {
    await matchController.inProgressMatch(req, res);
  },
);

matchRouter.get(
  '/matches',
  async (req: Request, res: Response) => {
    await matchController.getMatches(req, res);
  },
);

matchRouter.patch(
  '/matches/:id/finish',
  async (req: Request, res: Response) => {
    await matchController.finishmatch(req, res);
  },

);

export default matchRouter;
