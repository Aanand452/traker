import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../db';

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
  User.belongsTo(models.Program);
}

export default User;
