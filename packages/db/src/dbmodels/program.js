import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../connector';

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
  },
  budget: {
    allowNull: true,
    type: DataTypes.STRING,
    field: 'budget',
  },
  metrics: {
    allowNull: true,
    type: DataTypes.TEXT,
    field: 'metrics',
  },
  parentCampaignId: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'parent_campaign_id',
  },
  targetRegion: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'target_region',
  },
  lifecycleStage: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'lifecycle_stage',
  },
  apm1: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'apm1',
  },
  apm2: {
    allowNull: true,
    type: DataTypes.STRING,
    field: 'apm2',
  },
  industry: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'industry',
  },
  segment: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'segment',
  },
  persona: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'persona',
  },
  customerMessage: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'customer_message',
  },
  businessGoals: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'business_goal',
  }
}, {
  tableName: 'program',
  sequelize: sequelize, 
  timestamps: false
});

Program.associate = models => {
  Program.belongsToMany(models.User, { 
    through: 'program_user',
    foreignKey: 'program_id'
  });
  //Program.hasMany(models.User, {foreignKey: 'program_id'});
  Program.belongsTo(models.Region, {foreignKey: 'target_region'});
}

export default Program;