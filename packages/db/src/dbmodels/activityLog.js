import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../connector';

class ActivityLog extends Model {}

ActivityLog.init({
  activityLogId: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.STRING,
    field: 'activity_log_id',
  },
  activityId: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'activity_id',
  },
  userId: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'user_id',
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
  tableName: 'activity_logs',
  sequelize: sequelize, 
  timestamps: false
});

export default ActivityLog;