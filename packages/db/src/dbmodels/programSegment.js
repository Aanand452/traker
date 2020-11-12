import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../connector';

class ProgramSegment extends Model {}

ProgramSegment.init({
  programSegmentId: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.STRING,
    field: 'program_segment_id',
  },
  programId: {
    type: DataTypes.STRING,
    field: 'program_id',
    allowNull: false,
  },
  segmentId: {
    type: DataTypes.STRING,
    field: 'segment_id',
    allowNull: false,
  }
}, {
  tableName: 'program_segment',
  sequelize: sequelize,
  timestamps: false
});

export default ProgramSegment;
