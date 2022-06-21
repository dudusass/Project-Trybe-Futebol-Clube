/* import { Request, Response } from 'express';
import TeamsServices from '../services/teamServices';

class TeamsController {
  private teamsService: TeamsServices;

  constructor() {
    this.teamsService = new TeamsServices();
  }

  async teamsName(req: Request, res: Response) {
    const { teamName } = req.body;

    const teamNames = await this.teamsService.findTeam({ teamName });
    return res.status(200).json(teamNames);

  }
}

export default TeamsController;
 */
