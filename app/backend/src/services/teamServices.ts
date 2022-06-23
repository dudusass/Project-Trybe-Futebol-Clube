import teams from '../database/models/Teams';

class TeamsServices {
  public findTeam = async () => {
    const team = await teams.findAll();
    
    return team;
  };

  public findTeamById = async (id: string) => {
    const findTeam = await teams.findByPk(id);

    return findTeam;
  };
}

export default TeamsServices;
