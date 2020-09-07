import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../connector';
import Program from './program';
import User from './user';

class ProgramUser extends Model {}

ProgramUser.init({
  programUserId: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.STRING,
    field: 'program_user_id',
  },
  programId: {
    type: DataTypes.STRING,
    field: 'program_id',
    references: {
      model: Program, 
      key: 'program_id'
    }
  },
  userId: {
    type: DataTypes.STRING,
    field: 'user_id',
    references: {
      model: User, 
      key: 'user_id'
    }
  }
}, {
  tableName: 'program_user',
  sequelize: sequelize, 
  timestamps: false
});

export default ProgramUser;
