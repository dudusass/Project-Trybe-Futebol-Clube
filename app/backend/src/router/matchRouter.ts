import { Router, Request, Response } from 'express';
import MatchController from '../controllers/matchController';

const matchController = new MatchController();

const matchRouter = Router();

matchRouter.get(
  '/matches',
  async (req: Request, res: Response) => {
    await matchController.getMatches(req, res);
  },
);

export default matchRouter;
