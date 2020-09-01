import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../connector';

class Format extends Model {}

Format.init({
  formatId: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.STRING,
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
  timestamps: false
});

Format.associate = models => {
  Format.belongsTo(models.Tactic);
}

export default Format;
