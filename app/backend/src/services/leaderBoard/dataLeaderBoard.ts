import { IMatchGoals } from '../../utils/interface';

class DataLeaderBoard {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
  efficiency: number;

  constructor(teamName: string, matchsGoals: IMatchGoals[]) {
    this.name = teamName;
    this.totalPoints = DataLeaderBoard.getTotalPoints(matchsGoals);
    this.totalGames = matchsGoals.length;
    this.totalVictories = DataLeaderBoard.getTotalVictories(matchsGoals);
    this.totalDraws = DataLeaderBoard.getTotalDraws(matchsGoals);
    this.totalLosses = DataLeaderBoard.getTotalLosses(matchsGoals);
    this.goalsFavor = DataLeaderBoard.getTotalGoalsFavor(matchsGoals);
    this.goalsOwn = DataLeaderBoard.getTotalGoalsOwn(matchsGoals);
    this.goalsBalance = this.goalsFavor - this.goalsOwn;
    this.efficiency = DataLeaderBoard.getEfficiency(this.totalPoints, this.totalGames);
  }

  static getTotalPoints(matchsGoals: IMatchGoals[]): number {
    let points = 0;
    matchsGoals.forEach((match) => {
      if (match.goalsFavor > match.goalsOwn) {
        points += 3;
      }
      if (match.goalsFavor === match.goalsOwn) {
        points += 1;
      }
    });
    return points;
  }

  static getTotalVictories(matchsGoals: IMatchGoals[]): number {
    let victories = 0;
    matchsGoals.forEach((match) => {
      if (match.goalsFavor > match.goalsOwn) {
        victories += 1;
      }
    });
    return victories;
  }

  static getTotalLosses(matchsGoals: IMatchGoals[]): number {
    let losses = 0;
    matchsGoals.forEach((match) => {
      if (match.goalsFavor < match.goalsOwn) {
        losses += 1;
      }
    });
    return losses;
  }

  static getTotalDraws(matchsGoals: IMatchGoals[]) {
    let draws = 0;
    matchsGoals.forEach((match) => {
      if (match.goalsFavor < match.goalsOwn) {
        draws += 1;
      }
    });
    return draws;
  }

  static getTotalGoalsFavor(matchsGoals: IMatchGoals[]) {
    let gols = 0;
    matchsGoals.forEach((match) => {
      gols += match.goalsFavor;
    });
    return gols;
  }

  static getTotalGoalsOwn(matchsGoals: IMatchGoals[]) {
    let gols = 0;
    matchsGoals.forEach((match) => {
      gols += match.goalsOwn;
    });
    return gols;
  }

  static getEfficiency(totalPoints: number, totalGames: number) {
    const calc = Number(((totalPoints * 100) / (totalGames * 3)).toFixed(2)) || 0;
    return calc;
  }
}

export default DataLeaderBoard;
