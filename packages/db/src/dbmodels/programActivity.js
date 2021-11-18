import { Model, DataTypes } from "sequelize";
import { sequelize } from "../connector";

class ProgramActivity extends Model {}

ProgramActivity.init(
  {
    ProgramActivityId: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING,
      field: "activity_id",
    },
    activityTitle: {
      allowNull: false,
      type: DataTypes.STRING,
      field: "activity_title",
    },
    formatId: {
      allowNull: false,
      type: DataTypes.STRING,
      field: "format_id",
    },
    date: {
      allowNull: false,
      type: DataTypes.JSON,
      field: "date",
    },
  },
  {
    tableName: "program_activity",
    sequelize: sequelize,
    timestamps: false,
  }
);

export default ProgramActivity;
