'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user_filter', {
      userFilterId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
        field: 'user_filter_id',
      },
      userId: {
        allowNull: true,
        type: Sequelize.STRING,
        field: 'user_id',
      },
      formats: {
        allowNull: true,
        type: Sequelize.JSON,
        field: 'formats_selected',
      },
      regions: {
        allowNull: true,
        type: Sequelize.JSON,
        field: 'regions_selected',
      },
      programs: {
        allowNull: true,
        type: Sequelize.JSON,
        field: 'programs_selected',
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      await queryInterface.dropTable('user_filter')]);
  }
};
