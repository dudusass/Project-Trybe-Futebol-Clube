import { INTEGER, Model, STRING } from 'sequelize';
import db from '.';

class teams extends Model {
  public id: number;

  public teamName: string;
}

teams.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER,
  },
  teamName: {
    allowNull: false,
    type: STRING,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'teams',
  timestamps: false,
});

export default teams;
