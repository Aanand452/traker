import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../connector';

class Tactic extends Model {}

Tactic.init({
  tacticId: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.STRING,
    field: 'tactic_id',
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'name',
  }
}, {
  tableName: 'tactic',
  sequelize: sequelize, 
  timestamps: false
});

export default Tactic;
