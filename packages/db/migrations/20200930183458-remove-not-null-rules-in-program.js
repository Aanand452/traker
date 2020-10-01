'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('program', 'name', {
      allowNull: true,
      type: Sequelize.TEXT,
    });

    await queryInterface.changeColumn('program', 'owner', {
      allowNull: true,
      type: Sequelize.STRING,
    });

    await queryInterface.changeColumn('program', 'budget', {
      allowNull: true,
      type: Sequelize.INTEGER,
    });

    //need to be changed to MP target (money)
    await queryInterface.changeColumn('program', 'metrics', {
      allowNull: true,
      type: Sequelize.INTEGER,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('program', 'name', {
      type: Sequelize.TEXT,
    });

    await queryInterface.changeColumn('program', 'owner', {
      type: Sequelize.STRING,
    });

    await queryInterface.changeColumn('program', 'budget', {
      type: Sequelize.INTEGER,
    });

    //need to be changed to MP target (money)
    await queryInterface.changeColumn('program', 'metrics', {
      type: Sequelize.INTEGER,
    });
  }
};
