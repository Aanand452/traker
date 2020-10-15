'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('activity', 'region_id', {
      allowNull: true,
      type: Sequelize.TEXT,
    });
    await queryInterface.changeColumn('activity', 'user_id', {
      allowNull: true,
      type: Sequelize.STRING,
    });
    await queryInterface.changeColumn('activity', 'program_id', {
      allowNull: true,
      type: Sequelize.TEXT,
    });
    await queryInterface.changeColumn('activity', 'format_id', {
      allowNull: true,
      type: Sequelize.STRING,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('activity', 'region_id', {
      allowNull: false,
      type: Sequelize.TEXT,
    });
    await queryInterface.changeColumn('activity', 'user_id', {
      allowNull: false,
      type: Sequelize.STRING,
    });
    await queryInterface.changeColumn('activity', 'program_id', {
      allowNull: false,
      type: Sequelize.TEXT,
    });
    await queryInterface.changeColumn('activity', 'format_id', {
      allowNull: false,
      type: Sequelize.STRING,
    });
  }
};
