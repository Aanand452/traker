'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('program', 'label', {
      allowNull: false,
      type: Sequelize.STRING,
      field: 'label',
    });
    await queryInterface.addColumn('region', 'label', {
      allowNull: false,
      type: Sequelize.STRING,
      field: 'label',
    });
    await queryInterface.addColumn('tactic', 'label', {
      allowNull: false,
      type: Sequelize.STRING,
      field: 'label',
    });
    await queryInterface.addColumn('format', 'label', {
      allowNull: false,
      type: Sequelize.STRING,
      field: 'label',
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('program', 'label');
    await queryInterface.removeColumn('region', 'label');
    await queryInterface.removeColumn('tactic', 'label');
    await queryInterface.removeColumn('format', 'label');
  }
};
