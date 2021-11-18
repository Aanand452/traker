'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'program',
      'other_kpis',
      {
        type: Sequelize.TEXT,
        allowNull: true
      }
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn(
      'program',
      'other_kpis'
    );
  }
};