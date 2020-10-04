'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn(
      'activity',
      'tactic_id'
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'activity',
      'tactic_id',
      {
        type: Sequelize.STRING,
        allowNull: true
      }
    );
  }
};