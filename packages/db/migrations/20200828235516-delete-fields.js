'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('program', 'name');
    await queryInterface.removeColumn('region', 'name');
    await queryInterface.removeColumn('tactic', 'name');
    await queryInterface.removeColumn('format', 'name');
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('program', 'name', {
      allowNull: false,
      type: Sequelize.STRING,
      field: 'name',
    });
    await queryInterface.addColumn('format', 'name', {
      allowNull: false,
      type: Sequelize.STRING,
      field: 'name',
    });
    await queryInterface.addColumn('region', 'name', {
      allowNull: false,
      type: Sequelize.STRING,
      field: 'name',
    });
    await queryInterface.addColumn('tactic', 'name', {
      allowNull: false,
      type: Sequelize.STRING,
      field: 'name',
    });
  }
};
