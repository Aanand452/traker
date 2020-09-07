import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../db';

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

export default LifecycleStage;
