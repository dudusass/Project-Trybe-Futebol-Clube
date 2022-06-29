import { Request, Response, Router } from 'express';
import LeaderBoardController from '../controllers/leaderBoardController';

const leaderBoardController = new LeaderBoardController();

const leaderBoardRouter = Router();

leaderBoardRouter.get(
  '/home',
  async (req: Request, res: Response) => {
    await leaderBoardController.getClassification(req, res);
  },
);

export default leaderBoardRouter;
