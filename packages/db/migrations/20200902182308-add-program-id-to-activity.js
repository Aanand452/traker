'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'activity',
      'program_id',
      {
        type: Sequelize.STRING,
        allowNull: false
      }
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn(
      'activity',
      'program_id'
    );
  }
};
