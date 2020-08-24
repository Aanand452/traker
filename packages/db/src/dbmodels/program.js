import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../db';

class Program extends Model {}

Program.init({
  programId: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.STRING,
    field: 'program_id',
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'name',
  },
  owner: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'owner',
  }
}, {
  tableName: 'program',
  sequelize: sequelize,
  timestamps: false
});

export default Program;


