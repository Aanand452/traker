'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('program', {
      programId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
        field: 'program_id',
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
        field: 'name',
      },
      owner: {
        name: {
          allowNull: false,
          type: Sequelize.STRING,
          field: 'owner',
        },
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('audiences');
  }
};
