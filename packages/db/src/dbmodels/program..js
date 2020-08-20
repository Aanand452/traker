import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../db';

class Program extends Model {}

Program.init( {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  uuid: {
    type: DataTypes.STRING
  }
}, {
  tableName: 'program',
  sequelize: sequelize, 
});

export default Program;


