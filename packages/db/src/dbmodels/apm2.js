import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../connector';

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

APM2.associate = models => {
  APM2.hasMany(models.Program, {
    foreignKey: 'apm2_id'
  });
}

export default APM2;
