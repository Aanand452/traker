'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('program_logs', {
      programLogId: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.STRING,
      field: 'program_log_id',
    },
    programId: {
      allowNull: false,
      type: Sequelize.STRING,
      field: 'program_id',
    },
    userId: {
      allowNull: false,
      type: Sequelize.STRING,
      field: 'user_id',
    },
    method: {
      allowNull: false,
      type: Sequelize.STRING,
      field: 'method',
    },
    change: {
      allowNull: false,
      type: Sequelize.TEXT,
      field: 'change',
    },
    changeDate: {
      allowNull: false,
      type: Sequelize.DATE,
      field: 'change_date',
    }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('program_logs');
  }
};
