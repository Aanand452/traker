'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('user', 'username', {
      type: Sequelize.STRING,
      unique: true
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('user', 'username', {
      type: Sequelize.STRING,
      unique: false
    });
  }
};
