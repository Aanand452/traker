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
    field: 'region_id',
  },
  lifecycleStage: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'lifecycle_stage_id',
  },
  apm1: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'apm1_id',
  },
  apm2: {
    allowNull: true,
    type: DataTypes.STRING,
    field: 'apm2_id',
  },
  industry: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'industry_id',
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
  Program.belongsTo(models.Region, {foreignKey: 'region_id'});
  Program.belongsTo(models.LifecycleStage, {foreignKey: 'lifecycle_stage_id'});
  Program.belongsTo(models.APM1, {foreignKey: 'apm1_id'});
  Program.belongsTo(models.APM2, {foreignKey: 'apm2_id'});
  Program.belongsTo(models.Industry, {foreignKey: 'industry_id'});
  Program.belongsTo(models.Segment, {foreignKey: 'segment'});
  Program.belongsTo(models.Persona, {foreignKey: 'persona'});
}

export default Program;