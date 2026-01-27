import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";

const CourseStructureType = sequelize.define(
  "CourseStructureType",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    course_structure_type_uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
    },
    title: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    deleted_at: {
      allowNull: true,
      type: DataTypes.DATE,
      defaultValue: null,
    },
  },
  {
    tableName: "course_structure_types",
    timestamps: false,
    underscored: true,
    paranoid: true,
  }
);

export default CourseStructureType;
