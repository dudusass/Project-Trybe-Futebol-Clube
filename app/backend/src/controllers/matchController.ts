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
    const { homeTeam, homeTeamGoals, awayTeam, awayTeamGoals, inProgress } = req.body;
    const createdMatch = await this.matchService.create(
      { homeTeam, homeTeamGoals, awayTeam, awayTeamGoals, inProgress },
    );

    return res.status(201).json(createdMatch);
  }

  async finishmatch(req: Request, res: Response) {
    const { id } = req.params;

    const matchFinished = await this.matchService.finished(Number(id));

    return res.status(200).json(matchFinished);
  }
}

export default MatchController;
