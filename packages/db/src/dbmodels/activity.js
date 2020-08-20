import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../db';

class Activity extends Model {}

Activity.init({
  activityId: {
    allowNull: false,
    primaryKey: true,
    type: Sequelize.STRING,
    field: 'activity_id',
  },
  title: {
    allowNull: false,
    type: Sequelize.STRING,
    field: 'title',
  },
  campaignId: {
    allowNull: false,
    type: Sequelize.STRING,
    field: 'campaign_id',
  },
  tacticId: {
    allowNull: false,
    type: Sequelize.STRING,
    field: 'tactic_id',
  },
  formatId: {
    allowNull: false,
    type: Sequelize.STRING,
    field: 'format_id',
  },
  abstract: {
    allowNull: false,
    type: Sequelize.TEXT,
    field: 'abstract',
  },
  regionId: {
    allowNull: false,
    type: Sequelize.TEXT,
    field: 'region_id',
  },
  startDate: {
    allowNull: false,
    type: Sequelize.DATE,
    field: 'start_date',
  },
  endDate: {
    allowNull: false,
    type: Sequelize.DATE,
    field: 'end_date',
  },
  asset: {
    allowNull: false,
    type: Sequelize.TEXT,
    field: 'asset',
  }
}, {
  tableName: 'activity',
  sequelize: sequelize, 
});

export default Activity;