'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user', {
      userId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
        field: 'user_id',
      },
      username: {
        allowNull: false,
        type: Sequelize.STRING,
        field: 'username',
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING,
        field: 'password',
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('user');
  }
};
