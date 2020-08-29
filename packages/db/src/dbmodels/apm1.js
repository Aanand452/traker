import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../db';

class APM1 extends Model {}

APM1.init({
  apm1Id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.STRING,
    field: 'apm1_id',
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'name',
  },
}, {
  tableName: 'apm1',
  sequelize: sequelize,
  timestamps: false
});

export default APM1;
