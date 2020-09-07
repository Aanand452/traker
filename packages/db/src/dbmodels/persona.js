import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../db';

class Persona extends Model {}

Persona.init({
  personaId: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.STRING,
    field: 'persona_id',
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'name',
  },
}, {
  tableName: 'persona',
  sequelize: sequelize,
  timestamps: false
});

export default Persona;
