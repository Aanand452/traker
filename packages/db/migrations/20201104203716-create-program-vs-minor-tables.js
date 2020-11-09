'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('program_apm1', {
      programApm1Id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
        field: 'program_apm1_id',
      },
      programId: {
        allowNull: false,
        type: Sequelize.STRING,
        field: 'program_id',
      },
      apm1Id: {
        allowNull: false,
        type: Sequelize.STRING,
        field: 'apm1_id',
      }
    });

    await queryInterface.createTable('program_apm2', {
      programApm2Id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
        field: 'program_apm2_id',
      },
      programId: {
        allowNull: false,
        type: Sequelize.STRING,
        field: 'program_id',
      },
      apm2Id: {
        allowNull: false,
        type: Sequelize.STRING,
        field: 'apm2_id',
      }
    });

    await queryInterface.createTable('program_lifecycle', {
      programLifecycleId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
        field: 'program_lifecycle_id',
      },
      programId: {
        allowNull: false,
        type: Sequelize.STRING,
        field: 'program_id',
      },
      lifecycleId: {
        allowNull: false,
        type: Sequelize.STRING,
        field: 'lifecycle_id',
      }
    });

    await queryInterface.createTable('program_industry', {
      programIndustryId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
        field: 'program_industry_id',
      },
      programId: {
        allowNull: false,
        type: Sequelize.STRING,
        field: 'program_id',
      },
      industryId: {
        allowNull: false,
        type: Sequelize.STRING,
        field: 'industry_id',
      }
    });

    await queryInterface.createTable('program_segment', {
      programSegmentId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
        field: 'program_segment_id',
      },
      programId: {
        allowNull: false,
        type: Sequelize.STRING,
        field: 'program_id',
      },
      segmentId: {
        allowNull: false,
        type: Sequelize.STRING,
        field: 'segment_id',
      }
    });

    await queryInterface.createTable('program_persona', {
      programPersonaId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
        field: 'program_persona_id',
      },
      programId: {
        allowNull: false,
        type: Sequelize.STRING,
        field: 'program_id',
      },
      personaId: {
        allowNull: false,
        type: Sequelize.STRING,
        field: 'persona_id',
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('program_apm1');
    await queryInterface.dropTable('program_apm2');
    await queryInterface.dropTable('program_lifecycle');
    await queryInterface.dropTable('program_industry');
    await queryInterface.dropTable('program_segment');
    await queryInterface.dropTable('program_persona');
  }
};
