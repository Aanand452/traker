import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../db';

class APM2 extends Model {}

APM2.init({
  apm2Id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.STRING,
    field: 'apm2_id',
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'name',
  },
}, {
  tableName: 'apm2',
  sequelize: sequelize,
  timestamps: false
});

export default APM2;
