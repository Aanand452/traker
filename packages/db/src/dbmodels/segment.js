import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../db';

class Segment extends Model {}

Segment.init({
  segmentId: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.STRING,
    field: 'segment_id',
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'name',
  },
}, {
  tableName: 'segment',
  sequelize: sequelize,
  timestamps: false
});

export default Segment;
