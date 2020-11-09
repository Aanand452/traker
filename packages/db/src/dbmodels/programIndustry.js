import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../connector';

class ProgramIndustry extends Model {}

ProgramIndustry.init({
  programIndustryId: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.STRING,
    field: 'program_industry_id',
  },
  programId: {
    type: DataTypes.STRING,
    field: 'program_id',
    allowNull: false,
  },
  industryId: {
    type: DataTypes.STRING,
    field: 'industry_id',
    allowNull: false,
  }
}, {
  tableName: 'program_industry',
  sequelize: sequelize,
  timestamps: false
});

export default ProgramIndustry;
