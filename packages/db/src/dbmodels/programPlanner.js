import { Model, DataTypes } from "sequelize";
import { sequelize } from "../connector";

class ProgramPlanner extends Model {}

ProgramPlanner.init(
  {
    ProgramPlannerId: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING,
      field: "program_log_id",
    },
    programId: {
      allowNull: false,
      type: DataTypes.STRING,
      field: "program_id",
    },
    programOwner: {
      allowNull: false,
      type: DataTypes.STRING,
      field: "program_owner",
    },
    budgets: {
      allowNull: false,
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      field: "budgets",
    },
    amp: {
      allowNull: false,
      type: DataTypes.JSON,
      field: "amp",
    },
    programIndustry: {
      allowNull: false,
      type: DataTypes.JSON,
      field: "program_industry",
    },
    persona: {
      allowNull: false,
      type: DataTypes.JSON,
      field: "persona",
    },
    region: {
      allowNull: false,
      type: DataTypes.JSON,
      field: "target_region",
    },
    segment: {
      allowNull: false,
      type: DataTypes.JSON,
      field: "segment",
    },
    otherKPIs: {
      allowNull: false,
      type: DataTypes.STRING,
      field: "opther_kpis",
    },
    abstract: {
      allowNull: false,
      type: DataTypes.STRING,
      field: "abstract",
    },
  },
  {
    tableName: "program_planner",
    sequelize: sequelize,
    timestamps: false,
  }
);

export default ProgramPlanner;
