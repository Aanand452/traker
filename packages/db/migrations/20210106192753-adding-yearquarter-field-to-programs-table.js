'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'program',
      'year_quarter',
      {
        type: Sequelize.INTEGER,
        allowNull: true
      }
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn(
      'program',
      'year_quarter'
    );
  }
};
