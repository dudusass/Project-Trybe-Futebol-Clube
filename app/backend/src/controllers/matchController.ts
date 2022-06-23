import { Request, Response } from 'express';
import MatchServices from '../services/matchServices';

class MatchController {
  private matchService: MatchServices;

  constructor() {
    this.matchService = new MatchServices();
  }

  async getMatches(req: Request, res: Response) {
    const listmatches = await this.matchService.getMatch();

    return res.status(200).json(listmatches);
  }

  async inProgressMatch(req: Request, res: Response) {
    const { inProgress } = req.query;

    if (inProgress === 'true') {
      const inProgressMatch = await this.matchService.getMatch();

      return res.status(200).json(inProgressMatch);
    }
  }
  
  async finishedMatch(req: Request, res: Response) {
    const { inProgress } = req.query;

    if (inProgress === 'false') {
      const inProgressMatch = await this.matchService.getMatch();

      return res.status(200).json(inProgressMatch);
    }
  }
}

export default MatchController;
