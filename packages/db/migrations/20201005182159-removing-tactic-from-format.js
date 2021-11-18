'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn(
      'format',
      'tactic_id'
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'format',
      'tactic_id',
      {
        type: Sequelize.STRING,
        allowNull: true
      }
    );
  }
};