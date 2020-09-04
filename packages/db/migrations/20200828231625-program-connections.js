'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'program',
      'target_region',
      {
        type: Sequelize.STRING,
        references: {
          model: 'region', 
          key: 'region_id', 
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    );

    await queryInterface.addColumn(
      'program',
      'lifecycle_stage',
      {
        type: Sequelize.STRING,
        references: {
          model: 'lifecycleStage', 
          key: 'lifecycle_stage_id', 
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    );

    await queryInterface.addColumn(
      'program',
      'apm1',
      {
        type: Sequelize.STRING,
        references: {
          model: 'apm1', 
          key: 'apm1_id', 
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    );

    await queryInterface.addColumn(
      'program',
      'apm2',
      {
        type: Sequelize.STRING,
        references: {
          model: 'apm2', 
          key: 'apm2_id', 
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    );

    await queryInterface.addColumn(
      'program',
      'industry',
      {
        type: Sequelize.STRING,
        references: {
          model: 'industry', 
          key: 'industry_id', 
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    );

    await queryInterface.addColumn(
      'program',
      'segment',
      {
        type: Sequelize.STRING,
        references: {
          model: 'segment', 
          key: 'segment_id', 
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    );

    await queryInterface.addColumn(
      'program',
      'persona',
      {
        type: Sequelize.STRING,
        references: {
          model: 'persona', 
          key: 'persona_id', 
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn(
      'program',
      'target_region'
    )
    await queryInterface.removeColumn(
      'program',
      'lifecycle_stage'
    )
    await queryInterface.removeColumn(
      'program',
      'apm1'
    )
    await queryInterface.removeColumn(
      'program',
      'apm2'
    )
    await queryInterface.removeColumn(
      'program',
      'industry'
    )
    await queryInterface.removeColumn(
      'program',
      'segment'
    )
    await queryInterface.removeColumn(
      'program',
      'persona'
    )
  }
};
