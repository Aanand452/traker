"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn("program_planner", "amp", "apm");
    await queryInterface.renameColumn(
      "program_planner",
      "program_log_id",
      "planner_id"
    );
    // await queryInterface.changeColumn("program_planner", "budgets", {
    //   allowNull: true,
    //   type: Sequelize.JSON,
    // });
    return await queryInterface.removeColumn("program_planner", "program_id");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn("program_planner", "amp", "apm");
    await queryInterface.renameColumn(
      "program_planner",
      "planner_id",
      "program_log_id"
    );
    return await queryInterface.changeColumn("program_planner", "budgets", {
      allowNull: true,
      type: Sequelize.STRING,
    });
  },
};
