'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'activity',
      'user_id',
      {
        type: Sequelize.STRING,
        allowNull: false
      }
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn(
      'activity',
      'user_id'
    );
  }
};
