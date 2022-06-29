import { Request, Response } from 'express';

import LeaderBoardService from '../services/leaderBoard/leaderBoardServices';

class LeaderBoardController {
  private leaderBoardService: LeaderBoardService;

  constructor() {
    this.leaderBoardService = new LeaderBoardService();
  }

  async getClassificationHome(_req: Request, res: Response) {
    const classification = await this.leaderBoardService.getClassificationHome();

    return res.status(200).json(classification);
  }

  async getClassificationAway(_req: Request, res: Response) {
    const classification = await this.leaderBoardService.getClassificationAway();

    return res.status(200).json(classification);
  }
}

export default LeaderBoardController;
