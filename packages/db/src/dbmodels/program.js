import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../db';

class Program extends Model {}

Program.init({
  programId: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.STRING,
    field: 'program_id',
  },
  label: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'label',
  },
  owner: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'owner',
  }
}, {
  tableName: 'program',
  sequelize: sequelize,
  timestamps: false
});

Program.associate = models => {
  Program.hasMany(models.Format, {
    foreignKey: 'program_id'
  });
}

export default Program;


