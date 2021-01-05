'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'activity_logs',
      'method',
      {
        type: Sequelize.STRING,
        allowNull: true
      }
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn(
      'activity_logs',
      'method'
    );
  }
};
