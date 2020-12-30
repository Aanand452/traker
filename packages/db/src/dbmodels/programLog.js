import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../connector';

class ProgramLog extends Model {}

ProgramLog.init({
  programLogId: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.STRING,
    field: 'program_log_id',
  },
  programId: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'program_id',
  },
  userId: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'user_id',
  },
  method: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'method',
  },
  change: {
    allowNull: false,
    type: DataTypes.TEXT,
    field: 'change',
  },
  changeDate: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'change_date',
  }
}, {
  tableName: 'program_logs',
  sequelize: sequelize,
  timestamps: false
});

export default ProgramLog;
