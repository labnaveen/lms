// 20251029181000-create-course-lessons-table.js
import { DataTypes } from "sequelize";

export const up = async (queryInterface) => {
  await queryInterface.createTable("course_lessons", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT,
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
      references: { model: "course_modules", key: "id" },
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
      comment: "URL of video/document/etc.",
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
      comment: "If true, lesson visible without enrollment",
    },
    created_at: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  });
};

export const down = async (queryInterface) => {
  await queryInterface.dropTable("course_lessons");
};
