import matches from '../database/models/Matches';
import teams from '../database/models/Teams';

class MatchServices {
  public getMatch = async () => {
    const listMatches = await matches.findAll({ include: [
      { model: teams, as: 'teamHome', attributes: { exclude: ['id'] } },
      { model: teams, as: 'teamAway', attributes: { exclude: ['id'] } },
    ],
    attributes: { exclude: ['homeTeam', 'awayTeam'] } });

    return listMatches;
  };

  create = async (match: matches) => {
    await matches.create({ ...match, inProgress: true })
  };

  finished = async (id: string) => {
    await matches.update({ inProgress: false }, { where: { id } });
  };

  update = async (id: string, homeTeamGoals: number, awayTeamGoals: number) => {
    await matches.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
  };
}

export default MatchServices;
