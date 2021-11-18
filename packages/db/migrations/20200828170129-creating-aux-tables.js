'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('lifecycleStage', {
      lifecycleStageId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
        field: 'lifecycle_stage_id'
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
        field: 'name'
      }
    });

    await queryInterface.createTable('apm1', {
      apm1Id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
        field: 'apm1_id'
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
        field: 'name'
      }
    });

    await queryInterface.createTable('apm2', {
      apm2Id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
        field: 'apm2_id'
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
        field: 'name'
      }
    });

    await queryInterface.createTable('industry', {
      industryId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
        field: 'industry_id'
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
        field: 'name'
      }
    });

    await queryInterface.createTable('segment', {
      segmentId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
        field: 'segment_id'
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
        field: 'name'
      }
    });

    await queryInterface.createTable('persona', {
      personaId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
        field: 'persona_id'
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
        field: 'name'
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('lifecycleStage');
    await queryInterface.dropTable('apm1');
    await queryInterface.dropTable('apm2');
    await queryInterface.dropTable('industry');
    await queryInterface.dropTable('segment');
    await queryInterface.dropTable('persona');
  }
};
