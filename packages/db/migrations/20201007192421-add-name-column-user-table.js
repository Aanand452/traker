'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'user',
      'name',
      {
        type: Sequelize.STRING,
        allowNull: true
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn(
      'user',
      'name'
    );
  }
};
