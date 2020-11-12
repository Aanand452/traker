import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../connector';

class ProgramLifecycle extends Model {}

ProgramLifecycle.init({
  programLifecycleId: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.STRING,
    field: 'program_lifecycle_id',
  },
  programId: {
    type: DataTypes.STRING,
    field: 'program_id',
    allowNull: false,
  },
  lifecycleId: {
    type: DataTypes.STRING,
    field: 'lifecycle_id',
    allowNull: false,
  }
}, {
  tableName: 'program_lifecycle',
  sequelize: sequelize, 
  timestamps: false
});

export default ProgramLifecycle;
