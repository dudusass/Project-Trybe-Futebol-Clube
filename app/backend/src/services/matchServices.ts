import matches from '../database/models/Matches';
import teams from '../database/models/Teams';

class MatchServices {
  getMatch = async (inProgress: string | undefined) : Promise<matches[]> => (
    inProgress ? await matches.findAll({
      where: { inProgress: inProgress === 'true' },
      include: [
        { model: teams, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: teams, as: 'teamAway', attributes: { exclude: ['id'] } }],
    }) as matches[] : await matches.findAll({
      include: [{
        model: teams, as: 'teamHome', attributes: { exclude: ['id'] } },
      { model: teams, as: 'teamAway', attributes: { exclude: ['id'] } }],
    }) as matches[]
  );

  create = async (data: matches) => {
    const createdMatch = await matches.create({ ...data, inProgress: true });

    console.log(createdMatch);
    return createdMatch;
  };

  finished = async (id: string) => {
    await matches.update({ inProgress: false }, { where: { id } });
  };

  update = async (id: string, homeTeamGoals: number, awayTeamGoals: number) => {
    await matches.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
  };
}

export default MatchServices;
