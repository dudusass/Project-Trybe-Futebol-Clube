import { Router, Request, Response } from 'express';
import MatchController from '../controllers/matchController';
import auth from '../middleware/auth';
import { matchMiddleware, validateTeams } from '../middleware/matches';

const matchController = new MatchController();

const matchRouter = Router();

matchRouter.get(
  '/matches',
  matchController.getMatches,
);

matchRouter.post(
  '/',
  auth,
  matchMiddleware,
  validateTeams,
  matchController.createdMatch,
);

matchRouter.patch(
  '/:id/finish',
matchController.finishMatch,
);

export default matchRouter;
