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
}

export default MatchServices;
