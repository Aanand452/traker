import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../connector';

class Program extends Model {}

Program.init({
  programId: {
    allowNull: false,
    primaryKey: true,
    type: Sequelize.STRING,
    field: 'program_id',
  },
  name: {
    allowNull: false,
    type: Sequelize.STRING,
    field: 'name',
  },
  owner: {
    allowNull: false,
    type: Sequelize.STRING,
    field: 'owner',
  },
  budget: {
    allowNull: true,
    type: Sequelize.INTEGER,
    field: 'budget',
  },
  metrics: {
    allowNull: true,
    type: Sequelize.TEXT,
    field: 'metrics',
  },
  parentCampaignId: {
    allowNull: false,
    type: Sequelize.STRING,
    field: 'parent_campaign_id',
  },
  targetRegion: {
    allowNull: false,
    type: Sequelize.STRING,
    field: 'target_region',
  },
  lifecycleStage: {
    allowNull: false,
    type: Sequelize.STRING,
    field: 'lifecycle_stage',
  },
  apm1: {
    allowNull: false,
    type: Sequelize.STRING,
    field: 'apm_1',
  },
  apm2: {
    allowNull: true,
    type: Sequelize.STRING,
    field: 'apm_2',
  },
  industry: {
    allowNull: true,
    type: Sequelize.STRING,
    field: 'industry',
  },
  segment: {
    allowNull: true,
    type: Sequelize.STRING,
    field: 'segment',
  },
  persona: {
    allowNull: true,
    type: Sequelize.STRING,
    field: 'persona',
  },
  customerMessage: {
    allowNull: true,
    type: Sequelize.STRING,
    field: 'customer_message',
  },
  businessGoal: {
    allowNull: true,
    type: Sequelize.STRING,
    field: 'business_goal',
  },
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
}

export default Program;


