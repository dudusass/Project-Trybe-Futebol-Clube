import { Router, Request, Response } from 'express';
import TeamsController from '../controllers/teamController';

const teamsController = new TeamsController();

const teamRouter = Router();

teamRouter.get(
  '/',
  async (req: Request, res: Response) => {
    await teamsController.teamsName(req, res);
  },
);

teamRouter.get(
  '/teams/:id',
  async (req: Request, res: Response) => {
    await teamsController.getTeamsById(req, res);
  },
);

export default teamRouter;
