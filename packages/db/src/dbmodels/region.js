import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../connector';

class Region extends Model {}

Region.init({
  regionId: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.STRING,
    field: 'region_id',
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'name',
  }
}, {
  tableName: 'region',
  sequelize: sequelize, 
  timestamps: false
});

export default Region;
