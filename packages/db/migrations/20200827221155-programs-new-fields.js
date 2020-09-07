'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'program',
      'budget',
      Sequelize.INTEGER
    );

    await queryInterface.addColumn(
      'program',
      'metrics',
      Sequelize.TEXT
    );

    await queryInterface.addColumn(
      'program',
      'parent_campaign_id',
      Sequelize.STRING
    );
    
    await queryInterface.addColumn(
      'program',
      'customer_message',
      Sequelize.STRING
    );
    
    await queryInterface.addColumn(
      'program',
      'business_goal',
      Sequelize.STRING
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn(
      'program',
      'budget'
    );

    await queryInterface.removeColumn(
      'program',
      'metrics'
    );

    await queryInterface.removeColumn(
      'program',
      'parent_campaign_id'
    );
    
    await queryInterface.removeColumn(
      'program',
      'customer_message'
    );
    
    await queryInterface.removeColumn(
      'program',
      'business_goal'
    );
  }
};
