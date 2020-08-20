import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../db';

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

Tactic.associate = models => {
  Tactic.hasMany(models.Format, {
    foreignKey: 'tactic_id'
  });
}

export default Tactic;
