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
      Sequelize.TEXT
    );
    
    await queryInterface.addColumn(
      'program',
      'business_goal',
      Sequelize.STRING
    );

    await queryInterface.addColumn(
      'program',
      'target_region',
      Sequelize.STRING,
    );

    await queryInterface.addColumn(
      'program',
      'lifecycle_stage',
      Sequelize.STRING
    );

    await queryInterface.addColumn(
      'program',
      'apm1',
      Sequelize.STRING
    );

    await queryInterface.addColumn(
      'program',
      'apm2',
      Sequelize.STRING
    );

    await queryInterface.addColumn(
      'program',
      'industry',
      Sequelize.STRING
    );

    await queryInterface.addColumn(
      'program',
      'segment',
      Sequelize.STRING
    );

    await queryInterface.addColumn(
      'program',
      'persona',
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
