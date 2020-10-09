'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('activity', 'title', {
      allowNull: true,
      type: Sequelize.TEXT,
    });

    await queryInterface.changeColumn('activity', 'campaign_id', {
      allowNull: true,
      type: Sequelize.TEXT,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('activity', 'title', {
      allowNull: true,
      type: Sequelize.STRING,
    });

    await queryInterface.changeColumn('activity', 'campaign_id', {
      allowNull: true,
      type: Sequelize.STRING,
    });
  }
};
