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

  async createdMatch(req: Request, res: Response) {
    const { data } = req.body;

    const newMatch = await this.matchService.create(data);
      
    return res.status(201).json(newMatch);
  }

  async finishMatch(req: Request, res: Response) {
    const { id } = req.params;

    await this.matchService.finished(id);

    return res.status(200).json({ message: 'Finished' });
  }

  updateMatch = async (req: Request, res: Response) => {
      const { id } = req.params;
      const { homeTeamGoals, awayTeamGoals } = req.body;

      const updated = await this.matchService.update(id, homeTeamGoals, awayTeamGoals);
      return res.status(200).json(updated);  
  }
}

export default MatchController;
