import MatchServices from '../matchServices';
import TeamServices from '../teamServices';
import classification from './classification';

class LeaderboardService {
  private matchServices: MatchServices;
  private teamServices: TeamServices;

  constructor() {
    this.matchServices = new MatchServices();
    this.teamServices = new TeamServices();
  }

  getClassification = async () => {
    const matches = await this.matchServices.getMatch('false');
    const teams = await this.teamServices.findTeam();

    const classificationHome = classification({ teams, matches });

    return classificationHome;
  };

}

export default LeaderboardService;