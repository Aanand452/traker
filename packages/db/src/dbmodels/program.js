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
    allowNull: true,
    type: DataTypes.TEXT,
    field: 'name',
  },
  owner: {
    allowNull: true,
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
    allowNull: true,
    type: DataTypes.STRING,
    field: 'parent_campaign_id',
  },
  targetRegion: {
    allowNull: true,
    type: DataTypes.STRING,
    field: 'target_region',
  },
  lifecycleStage: {
    allowNull: true,
    type: DataTypes.STRING,
    field: 'lifecycle_stage',
  },
  apm1: {
    allowNull: true,
    type: DataTypes.STRING,
    field: 'apm1',
  },
  apm2: {
    allowNull: true,
    type: DataTypes.STRING,
    field: 'apm2',
  },
  industry: {
    allowNull: true,
    type: DataTypes.STRING,
    field: 'industry',
  },
  segment: {
    allowNull: true,
    type: DataTypes.STRING,
    field: 'segment',
  },
  persona: {
    allowNull: true,
    type: DataTypes.STRING,
    field: 'persona',
  },
  customerMessage: {
    allowNull: true,
    type: DataTypes.TEXT,
    field: 'customer_message',
  },
  businessGoals: {
    allowNull: true,
    type: DataTypes.STRING,
    field: 'business_goal',
  }
}, {
  tableName: 'program',
  sequelize: sequelize, 
  timestamps: false
});

Program.associate = models => {
/*  
  Program.belongsToMany(models.User, { 
    through: 'program_user',
    foreignKey: 'program_id'
  });
  Program.belongsTo(models.Region, {foreignKey: 'target_region'});
  Program.belongsTo(models.LifecycleStage, {foreignKey: 'lifecycle_stage'});
  Program.belongsTo(models.APM1, {foreignKey: 'apm1'});
  Program.belongsTo(models.APM2, {foreignKey: 'apm2'});
  Program.belongsTo(models.Industry, {foreignKey: 'industry'});
  Program.belongsTo(models.Segment, {foreignKey: 'segment'});
  Program.belongsTo(models.Persona, {foreignKey: 'persona'});
*/
}

export default Program;