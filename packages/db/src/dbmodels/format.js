import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../db';

class Format extends Model {}

Format.init({
  formatId: {
    allowNull: false,
    primaryKey: true,
    type: Sequelize.STRING,
    field: 'format_id',
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'name',
  },
}, {
  tableName: 'format',
  sequelize: sequelize, 
});

Format.associate = models => {
  Format.belongsTo(models.Tactic);
}

export default Format;
