import teams from "../database/models/Teams";

class TeamsServices {
  public findTeam = async () => {
    const team = await teams.findAll();

    return team;
  }
}

export default TeamsServices;