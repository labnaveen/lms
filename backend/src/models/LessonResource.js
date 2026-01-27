import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";

const LessonResource = sequelize.define(
  "LessonResource",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    resource_uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
    },
    lesson_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: "course_lessons",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    title: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    file_url: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
    file_type: {
      type: DataTypes.STRING(100),
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
  },
  {
    tableName: "lesson_resources",
    timestamps: false,
  }
);

export default LessonResource;
