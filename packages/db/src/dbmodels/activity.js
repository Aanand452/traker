import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../connector';

class Activity extends Model {}

Activity.init({
  activityId: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.STRING,
    field: 'activity_id',
  },
  userId: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'user_id',
  },
  title: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'title',
  },
  campaignId: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'campaign_id',
  },
  tacticId: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'tactic_id',
  },
  formatId: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'format_id',
  },
  abstract: {
    allowNull: false,
    type: DataTypes.TEXT,
    field: 'abstract',
  },
  regionId: {
    allowNull: false,
    type: DataTypes.TEXT,
    field: 'region_id',
  },
  startDate: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'start_date',
  },
  endDate: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'end_date',
  },
  asset: {
    allowNull: false,
    type: DataTypes.TEXT,
    field: 'asset',
  },
  programId: {
    allowNull: false,
    type: DataTypes.TEXT,
    field: 'program_id',
  }
}, {
  tableName: 'activity',
  sequelize: sequelize, 
  timestamps: false
});

export default Activity;