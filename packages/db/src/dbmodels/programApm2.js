import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../connector';

class ProgramApm2 extends Model {}

ProgramApm2.init({
  programApm2Id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.STRING,
    field: 'program_apm2_id',
  },
  programId: {
    type: DataTypes.STRING,
    field: 'program_id',
    allowNull: false,
  },
  apm2Id: {
    type: DataTypes.STRING,
    field: 'apm2_id',
    allowNull: false,
  }
}, {
  tableName: 'program_apm2',
  sequelize: sequelize, 
  timestamps: false
});

export default ProgramApm2;
