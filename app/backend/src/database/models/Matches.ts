import { BOOLEAN, INTEGER, Model } from 'sequelize';
import db from '.';
import Teams from './Teams';

class matches extends Model {
  public id: number;

  public homeTeam: number;

  public homeTeamGoals: number;

  public awayTeam: number;

  public awayTeamGoals: number;

  public inProgress: boolean;
}

matches.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER,
  },
  home_team: {
    allowNull: false,
    type: INTEGER,
  },
  home_team_goals: {
    allowNull: false,
    type: INTEGER,
  },
  away_team: {
    allowNull: false,
    type: INTEGER,
  },
  away_team_goals: {
    allowNull: false,
    type: INTEGER,
  },
  in_progress: {
    allowNull: false,
    type: BOOLEAN,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
});

matches.belongsTo(Teams, {
  foreignKey: 'homeTeam', as: 'teamHome' });
matches.belongsTo(Teams, {
  foreignKey: 'awayTeam', as: 'teamAway' });
Teams.hasMany(matches, {
  foreignKey: 'homeTeam', as: 'homeTeams' });
Teams.hasMany(matches, {
  foreignKey: 'awayTeam', as: 'awayTeams' });

export default matches;