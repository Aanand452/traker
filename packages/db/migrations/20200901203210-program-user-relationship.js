'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'program_user',
      'program_id',
      {
        type: Sequelize.STRING,
        references: {
          model: 'program', 
          key: 'program_id', 
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    );

    await queryInterface.addColumn(
      'program_user',
      'user_id',
      {
        type: Sequelize.STRING,
        references: {
          model: 'user', 
          key: 'user_id', 
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    )

    await queryInterface.removeColumn(
      'user',
      'program_id'
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn(
      'program_user',
      'program_id'
    );

    await queryInterface.removeColumn(
      'program_user',
      'user_id'
    );
  }
};
