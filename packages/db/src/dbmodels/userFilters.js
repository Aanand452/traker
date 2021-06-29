import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../connector';

class UserFilter extends Model {}

UserFilter.init({
  userFilterId: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.STRING,
    field: 'user_filter_id',
  },
  userId: {
    allowNull: true,
    type: DataTypes.STRING,
    field: 'user_id',
  },
  formats: {
    allowNull: true,
    type: DataTypes.JSON,
    field: 'formats_selected',
  },
  regions: {
    allowNull: true,
    type: DataTypes.JSON,
    field: 'regions_selected',
  },
  programs: {
    allowNull: true,
    type: DataTypes.JSON,
    field: 'programs_selected',
  }
}, {
  tableName: 'user_filter',
  sequelize: sequelize, 
  timestamps: false
});

UserFilter.associate = models => {
  UserFilter.belongsTo(models.User, {foreignKey: 'user_id'});
}

export default UserFilter;