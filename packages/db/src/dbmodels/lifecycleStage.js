import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../connector';

class LifecycleStage extends Model {}

LifecycleStage.init({
  lifecycleStageId: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.STRING,
    field: 'lifecycle_stage_id',
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'name',
  },
}, {
  tableName: 'lifecycleStage',
  sequelize: sequelize,
  timestamps: false
});

LifecycleStage.associate = models => {
  LifecycleStage.hasMany(models.Program, {
    foreignKey: 'lifecycle_stage'
  });
}

export default LifecycleStage;
