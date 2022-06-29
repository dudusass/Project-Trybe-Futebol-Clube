export interface Ilogin {
  email: string;
  password: string;
}

export interface ITeams {
  teamName: string;
}

export interface IMatchGoals {
  goalsFavor: number;
  goalsOwn: number;
}

export interface IMatch {
  id?: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: boolean;
  teamHome?: {
    teamName: string
  };
  teamAway?: {
    teamName: string
  };
}

export interface ITeam {
  id: number;
  teamName: string;
}

export interface IParamsLeaderBoard {
  matches: IMatch[];
  teams: ITeam[]
}

export interface IClassification {
  name: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency: number
}
