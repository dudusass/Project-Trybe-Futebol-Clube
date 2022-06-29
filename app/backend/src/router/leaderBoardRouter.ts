import { Request, Response, Router } from 'express';
import LeaderBoardController from '../controllers/leaderBoardController';

const leaderBoardController = new LeaderBoardController();

const leaderBoardRouter = Router();

leaderBoardRouter.get(
  '/home',
  async (req: Request, res: Response) => {
    await leaderBoardController.getClassificationHome(req, res);
  },
);

leaderBoardRouter.get(
  '/away',
  async (req: Request, res: Response) => {
    await leaderBoardController.getClassificationAway(req, res);
  },
);

export default leaderBoardRouter;
