'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('activity_logs', {
      activityLogId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
        field: 'activity_log_id',
      },
      activityId: {
        allowNull: false,
        type: Sequelize.STRING,
        field: 'activity_id',
      },
      userId: {
        allowNull: false,
        type: Sequelize.STRING,
        field: 'user_id',
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
    await queryInterface.dropTable('activity_logs');
  }
};
