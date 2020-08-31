import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../db';

class Format extends Model {}

Format.init({
  formatId: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.STRING,
    field: 'format_id',
  },
  label: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'label',
  },
  tacticId: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'tactic_id',
  }
}, {
  tableName: 'format',
  sequelize: sequelize,
  timestamps: false
});

Format.associate = models => {
  Format.belongsTo(models.Tactic);
}

export default Format;
