'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('activity', 'start_date', {
      allowNull: true,
      type: Sequelize.DATE,
    });
    await queryInterface.changeColumn('activity', 'end_date', {
      allowNull: true,
      type: Sequelize.DATE,
    });

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('activity', 'start_date', {
      allowNull: false,
      type: Sequelize.DATE,
    });
    await queryInterface.changeColumn('activity', 'end_date', {
      allowNull: false,
      type: Sequelize.DATE,
    });
  }
};
