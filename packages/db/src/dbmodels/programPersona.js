import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../connector';

class ProgramPersona extends Model {}

ProgramPersona.init({
  programPersonaId: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.STRING,
    field: 'program_persona_id',
  },
  programId: {
    type: DataTypes.STRING,
    field: 'program_id',
    allowNull: false,
  },
  personaId: {
    type: DataTypes.STRING,
    field: 'persona_id',
    allowNull: false,
  }
}, {
  tableName: 'program_persona',
  sequelize: sequelize,
  timestamps: false
});

export default ProgramPersona;
