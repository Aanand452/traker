'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('program_user', {
      programId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
        field: 'program_user_id',
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('program_users');
  }
};
