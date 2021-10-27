import { Model, DataTypes } from "sequelize";
import { sequelize } from "../connector";

class ProgramPlanner extends Model {}

ProgramPlanner.init(
  {
    ProgramPlannerId: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING,
      field: "planner_id",
    },
    programName: {
      allowNull: false,
      type: DataTypes.STRING,
      field: "program_name",
    },
    programOwner: {
      allowNull: false,
      type: DataTypes.STRING,
      field: "program_owner",
    },
    budgets: {
      allowNull: false,
      type: DataTypes.JSON,
      field: "budgets",
    },
    apm: {
      allowNull: false,
      type: DataTypes.JSON,
      field: "apm",
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
      type: DataTypes.TEXT,
      field: "opther_kpis",
    },
    abstract: {
      allowNull: false,
      type: DataTypes.TEXT,
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
