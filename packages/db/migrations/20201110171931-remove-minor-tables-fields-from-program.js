'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn(
      'program',
      'lifecycle_stage'
    );

    await queryInterface.removeColumn(
      'program',
      'apm1'
    );

    await queryInterface.removeColumn(
      'program',
      'apm2'
    );

    await queryInterface.removeColumn(
      'program',
      'industry'
    );

    await queryInterface.removeColumn(
      'program',
      'segment'
    );

    await queryInterface.removeColumn(
      'program',
      'persona'
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'program',
      'lifecycle_stage',
      {
        type: Sequelize.STRING,
        allowNull: true
      }
    );

    await queryInterface.addColumn(
      'program',
      'apm1',
      {
        type: Sequelize.STRING,
        allowNull: true
      }
    );

    await queryInterface.addColumn(
      'program',
      'apm2',
      {
        type: Sequelize.STRING,
        allowNull: true
      }
    );

    await queryInterface.addColumn(
      'program',
      'industry',
      {
        type: Sequelize.STRING,
        allowNull: true
      }
    );

    await queryInterface.addColumn(
      'program',
      'segment',
      {
        type: Sequelize.STRING,
        allowNull: true
      }
    );

    await queryInterface.addColumn(
      'program',
      'persona',
      {
        type: Sequelize.STRING,
        allowNull: true
      }
    );
  }
};
