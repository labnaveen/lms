// 20251029172000-create-courses-table.js
import { DataTypes } from "sequelize";

export const up = async (queryInterface) => {
  await queryInterface.createTable("courses", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT,
    },
    course_uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
    },
    sub_category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "sub_categories", key: "id" },
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
    thumbnail: {
      type: DataTypes.STRING(1000),
      allowNull: true,
      comment: "Course thumbnail image URL",
    },
    instructor_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: { model: "users", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
    is_public: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      comment: "If true, visible to all students in the school",
    },
    class_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: { model: "class", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
    section_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: { model: "class_section", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    difficulty_level_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: "difficulty_levels",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
    course_type_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: { model: "course_types", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
      comment:
        "References the type of course (e.g., self-paced, instructor-led)",
    },
    course_structure_type_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: { model: "course_structure_types", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
      comment: "References course structure (e.g., modular, chapter-based)",
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
    deleted_at: {
      allowNull: true,
      type: DataTypes.DATE,
      defaultValue: null,
    },
  });
};

export const down = async (queryInterface) => {
  await queryInterface.dropTable("courses");
};
