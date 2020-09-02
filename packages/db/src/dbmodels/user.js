import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../connector';

class User extends Model {}

User.init({
  userId: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.STRING,
    field: 'user_id',
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'username',
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'password',
  }
}, {
  tableName: 'user',
  sequelize: sequelize, 
  timestamps: false
});

User.associate = models => {
  User.belongsToMany(models.Program, { 
    through: 'program_user',
    foreignKey: 'user_id'
  });
  //User.belongsTo(models.Program, {foreignKey: 'program_id'});
}

export default User;
