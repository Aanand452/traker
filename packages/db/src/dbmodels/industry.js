import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../connector';

class Industry extends Model {}

Industry.init({
  industryId: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.STRING,
    field: 'industry_id',
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'name',
  },
}, {
  tableName: 'industry',
  sequelize: sequelize,
  timestamps: false
});

Industry.associate = models => {
  /*
  Industry.hasMany(models.Program, {
    foreignKey: 'industry'
  });
  */
};

export default Industry;
