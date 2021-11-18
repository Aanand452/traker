'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'activity',
      'customer_marketing',
      {
        type: Sequelize.BOOLEAN,
        allowNull: true
      }
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn(
      'activity',
      'customer_marketing'
    );
  }
};
