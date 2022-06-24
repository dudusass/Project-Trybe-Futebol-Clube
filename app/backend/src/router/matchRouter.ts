import { Router, Request, Response } from 'express';
import auth from '../middleware/auth';
import MatchController from '../controllers/matchController';
import { matchMiddleware, validateTeams} from '../middleware/matches';

const matchController = new MatchController();

const matchRouter = Router();

matchRouter.get(
  '/matches',
  async (req: Request, res: Response) => {
    await matchController.getMatches(req, res);
  },
);

matchRouter.post(
  '/',
  auth,
  matchMiddleware,
  validateTeams,
  async (req: Request, res: Response) => {
    await matchController.createdMatch(req, res);
  },
);


matchRouter.patch(
  '/:id/finish',
  async (req: Request, res: Response) => {
    await matchController.finishMatch(req, res);
  },

);

export default matchRouter;
