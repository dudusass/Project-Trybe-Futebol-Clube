import { IClassification, IParamsLeaderBoard, IMatchGoals } from '../../utils/interface';
import DataLeaderBoard from './dataLeaderBoard';

const order = (data: IClassification[]) => data.sort((a, b) => {
  if (a.totalPoints > b.totalPoints) return -1;
  if (a.totalPoints < b.totalPoints) return 1;
  if (a.totalVictories > b.totalVictories) return -1;
  if (a.totalVictories < b.totalVictories) return 1;
  if (a.goalsBalance > b.goalsBalance) return -1;
  if (a.goalsBalance < b.goalsBalance) return 1;
  if (a.goalsFavor > b.goalsFavor) return -1;
  if (a.goalsFavor < b.goalsFavor) return 1;
  if (a.goalsOwn > b.goalsOwn) return -1;
  if (a.goalsOwn < b.goalsOwn) return 1;
  return 0;
});

 function getLeaderBoardHome({ matches, teams }: IParamsLeaderBoard) {
  const data = teams.map((team) => {
    const matchsGoals: IMatchGoals[] = matches
      .filter((match) => Number(match.homeTeam) === team.id)
      .map((match) => ({
        goalsFavor: Number(match.homeTeamGoals), goalsOwn: Number(match.awayTeamGoals) }));
    return new DataLeaderBoard(team.teamName, matchsGoals);
  });
  return order(data);
 }

  function getLeaderBoardAway({ matches, teams }: IParamsLeaderBoard) {
    const data = teams.map((team) => {
      const matchsGoals: IMatchGoals[] = matches
      .filter((match) => Number(match.awayTeam) === team.id)
      .map((match) => ({
        goalsFavor: Number(match.awayTeamGoals), goalsOwn: Number(match.homeTeamGoals) }));
      return new DataLeaderBoard(team.teamName, matchsGoals);
    })
    return order(data);
  }

export { getLeaderBoardHome, getLeaderBoardAway };
