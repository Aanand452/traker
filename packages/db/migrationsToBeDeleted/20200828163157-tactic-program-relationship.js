'use strict';

/*
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'tactic',
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
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn(
      'tactic',
      'program_id'
    )
  }
};
*/
