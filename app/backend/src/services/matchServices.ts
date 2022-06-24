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

  public create = async (match: any) => {
    const { homeTeam, homeTeamGoals, awayTeam, awayTeamGoals, inProgress } = match;

    const createdMatch = await matches.create({
      homeTeam,
      homeTeamGoals,
      awayTeam,
      awayTeamGoals,
      inProgress,
    });

    const tHome = await teams.findByPk(homeTeam);

    const tAway = await teams.findByPk(awayTeam);

    if (!tHome || !tAway) return { message: 'There is no team with such id!', statusCode: 404 };

    return createdMatch;
  };

  public finished = async (id: number) => {
    await matches.update({ inProgress: false }, {
      where: { id } });

    return { message: 'Finished' };
  };
}

export default MatchServices;
