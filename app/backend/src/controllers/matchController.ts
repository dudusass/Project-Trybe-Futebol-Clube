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
}
export default MatchController;
