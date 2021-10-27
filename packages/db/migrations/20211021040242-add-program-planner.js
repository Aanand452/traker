"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("program_planner", {
      ProgramPlannerId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
        field: "program_log_id",
      },
      programId: {
        allowNull: true,
        type: Sequelize.STRING,
        field: "program_id",
      },
      programOwner: {
        allowNull: true,
        type: Sequelize.STRING,
        field: "program_owner",
      },
      budgets: {
        allowNull: true,
        type: Sequelize.STRING,
        field: "budgets",
      },
      amp: {
        allowNull: true,
        type: Sequelize.JSON,
        field: "amp",
      },
      programIndustry: {
        allowNull: true,
        type: Sequelize.JSON,
        field: "program_industry",
      },
      persona: {
        allowNull: true,
        type: Sequelize.JSON,
        field: "persona",
      },
      region: {
        allowNull: true,
        type: Sequelize.JSON,
        field: "target_region",
      },
      segment: {
        allowNull: true,
        type: Sequelize.JSON,
        field: "segment",
      },
      otherKPIs: {
        allowNull: true,
        type: Sequelize.STRING,
        field: "opther_kpis",
      },
      abstract: {
        allowNull: true,
        type: Sequelize.STRING,
        field: "abstract",
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([await queryInterface.dropTable("user_filter")]);
  },
};
