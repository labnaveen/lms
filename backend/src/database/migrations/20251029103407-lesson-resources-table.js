// 20251029182000-create-lesson-resources-table.js
import { DataTypes } from "sequelize";

export const up = async (queryInterface) => {
  await queryInterface.createTable("lesson_resources", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT,
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
      references: { model: "course_lessons", key: "id" },
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
  await queryInterface.dropTable("lesson_resources");
};
