import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../connector';

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

APM1.associate = models => {
  APM1.hasMany(models.Program, {
    foreignKey: 'apm1'
  });
}

export default APM1;
