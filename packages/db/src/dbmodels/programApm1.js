import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../connector';

class ProgramApm1 extends Model {}

ProgramApm1.init({
  programApm1Id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.STRING,
    field: 'program_apm1_id',
  },
  programId: {
    type: DataTypes.STRING,
    field: 'program_id',
    allowNull: false,
  },
  apm1Id: {
    type: DataTypes.STRING,
    field: 'apm1_id',
    allowNull: false,
  }
}, {
  tableName: 'program_apm1',
  sequelize: sequelize, 
  timestamps: false
});

export default ProgramApm1;
