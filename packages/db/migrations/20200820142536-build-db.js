'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    //program table
    await queryInterface.createTable('program', {
      programId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
        field: 'program_id',
      },
      name: {
        allowNull: true,
        type: Sequelize.STRING,
        field: 'name',
      },
      owner: {
        allowNull: true,
        type: Sequelize.STRING,
        field: 'owner',
      }
    });

    //region table
    await queryInterface.createTable('region', {
      regionId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
        field: 'region_id',
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
        field: 'name',
      },
    });

    //tactic table
    await queryInterface.createTable('tactic', {
      tacticId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
        field: 'tactic_id',
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
        field: 'name',
      },
    });

    //format table
    await queryInterface.createTable('format', {
      formatId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
        field: 'format_id',
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
        field: 'name',
      }
    });

    //activity table
    await queryInterface.createTable('activity', {
      activityId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
        field: 'activity_id',
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING,
        field: 'title',
      },
      campaignId: {
        allowNull: false,
        type: Sequelize.STRING,
        field: 'campaign_id',
      },
      tacticId: {
        allowNull: false,
        type: Sequelize.STRING,
        field: 'tactic_id',
      },
      formatId: {
        allowNull: false,
        type: Sequelize.STRING,
        field: 'format_id',
      },
      abstract: {
        allowNull: false,
        type: Sequelize.TEXT,
        field: 'abstract',
      },
      regionId: {
        allowNull: false,
        type: Sequelize.TEXT,
        field: 'region_id',
      },
      startDate: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'start_date',
      },
      endDate: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'end_date',
      },
      asset: {
        allowNull: false,
        type: Sequelize.TEXT,
        field: 'asset',
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('program');
    await queryInterface.dropTable('region');
    await queryInterface.dropTable('tactic');
    await queryInterface.dropTable('format');
    await queryInterface.dropTable('activity');
  }
};
