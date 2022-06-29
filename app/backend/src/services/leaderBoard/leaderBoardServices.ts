import MatchServices from '../matchServices';
import TeamServices from '../teamServices';
import {getLeaderBoardHome, getLeaderBoardAway} from './classification';

class LeaderboardService {
  private matchServices: MatchServices;
  private teamServices: TeamServices;

  constructor() {
    this.matchServices = new MatchServices();
    this.teamServices = new TeamServices();
  }

  getClassificationHome = async () => {
    const matches = await this.matchServices.getMatch('false');
    const teams = await this.teamServices.findTeam();

    const classificationHome = getLeaderBoardHome({ teams, matches });

    return classificationHome;

  };

  getClassificationAway = async () => {
    const matches = await this.matchServices.getMatch('false');
    const teams = await this.teamServices.findTeam();

    const classificationHome = getLeaderBoardAway({ teams, matches });

    return classificationHome;

  };
}

export default LeaderboardService;
