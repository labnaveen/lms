import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";

const CourseLesson = sequelize.define(
  "CourseLesson",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    lesson_uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
    },
    module_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: "course_modules",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    title: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    lesson_type: {
      type: DataTypes.ENUM("video", "document", "quiz", "assignment", "other"),
      allowNull: false,
      defaultValue: "video",
    },
    content_url: {
      type: DataTypes.STRING(1000),
      allowNull: true,
      comment: "URL of video, document, or quiz",
    },
    order_index: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    duration_in_minutes: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    is_preview: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
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
    tableName: "course_lessons",
    timestamps: false,
    underscored: true,
  }
);

export default CourseLesson;
