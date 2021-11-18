import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../connector';

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

Segment.associate = models => {
/*
  Segment.hasMany(models.Program, {
    foreignKey: 'segment'
  });
*/
};

export default Segment;
