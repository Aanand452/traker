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
    allowNull: true,
    type: DataTypes.STRING,
    field: 'user_id',
  },
  title: {
    allowNull: true,
    type: DataTypes.STRING,
    field: 'title',
  },
  campaignId: {
    allowNull: true,
    type: DataTypes.STRING,
    field: 'campaign_id',
  },
  formatId: {
    allowNull: true,
    type: DataTypes.STRING,
    field: 'format_id',
  },
  abstract: {
    allowNull: true,
    type: DataTypes.TEXT,
    field: 'abstract',
  },
  regionId: {
    allowNull: true,
    type: DataTypes.TEXT,
    field: 'region_id',
  },
  startDate: {
    allowNull: true,
    type: DataTypes.DATE,
    field: 'start_date',
  },
  endDate: {
    allowNull: true,
    type: DataTypes.DATE,
    field: 'end_date',
  },
  asset: {
    allowNull: true,
    type: DataTypes.TEXT,
    field: 'asset',
  },
  programId: {
    allowNull: true,
    type: DataTypes.TEXT,
    field: 'program_id',
  }
}, {
  tableName: 'activity',
  sequelize: sequelize, 
  timestamps: false
});

Activity.associate = models => {
  Activity.belongsTo(models.User, {foreignKey: 'user_id'});
  Activity.belongsTo(models.Format, {foreignKey: 'format_id'});
  Activity.belongsTo(models.Region, {foreignKey: 'region_id'});
  Activity.belongsTo(models.Program, {foreignKey: 'program_id'});
}

export default Activity;