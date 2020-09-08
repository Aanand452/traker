'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.renameColumn('program', 'target_region', 'region_id');
    queryInterface.renameColumn('program', 'lifecycle_stage', 'lifecycle_stage_id');
    queryInterface.renameColumn('program', 'apm1', 'apm1_id');
    queryInterface.renameColumn('program', 'apm2', 'apm2_id');
    queryInterface.renameColumn('program', 'industry', 'industry_id');
    queryInterface.renameColumn('program', 'segment', 'segment_id');
    queryInterface.renameColumn('program', 'persona', 'persona_id');

    queryInterface.changeColumn('program', 'budget', {type: Sequelize.DECIMAL});
    queryInterface.changeColumn('program', 'customer_message', {type: Sequelize.TEXT});
    queryInterface.changeColumn('program', 'business_goal', {type: Sequelize.TEXT});
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.renameColumn('program', 'region_id', 'target_region');
    queryInterface.renameColumn('program', 'lifecycle_stage_id', 'lifecycle_stage');
    queryInterface.renameColumn('program', 'apm1_id', 'apm1');
    queryInterface.renameColumn('program', 'apm2_id', 'apm2');
    queryInterface.renameColumn('program', 'industry_id', 'industry');
    queryInterface.renameColumn('program', 'segment_id', 'segment');
    queryInterface.renameColumn('program', 'persona_id', 'persona');

    queryInterface.changeColumn('program', 'budget', {type: Sequelize.INTEGER});
    queryInterface.changeColumn('program', 'customer_message', {type: Sequelize.STRING});
    queryInterface.changeColumn('program', 'business_goal', {type: Sequelize.STRING});
  }
};
