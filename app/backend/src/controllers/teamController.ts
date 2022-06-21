import { Request, Response } from 'express';
import TeamsServices from '../services/teamServices';

class TeamsController {
  private teamsService: TeamsServices;

  constructor() {
    this.teamsService = new TeamsServices();
  }

  async teamsName(req: Request, res: Response) {
    const getTeam = await this.teamsService.findTeam();

    return res.status(200).json(getTeam);
  }

  getTeamsById = async (req:Request, res: Response) => {
    const { id } = req.params;
    const getById = await this.teamsService.findTeamById(id);
    return res.status(200).json(getById);
  };
}

export default TeamsController;
