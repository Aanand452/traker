'use strict';


//TODO: must be deleted
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'format',
      'tactic_id',
      {
        type: Sequelize.STRING,
        references: {
          model: 'tactic', 
          key: 'tactic_id', 
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn(
      'format',
      'tactic_id'
    )
  }
};
