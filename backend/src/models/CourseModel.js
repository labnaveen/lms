import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";

const Course = sequelize.define(
  "Course",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
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
    },
    is_public: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    class_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: { model: "class", key: "id" },
    },
    // section_id: {
    //   type: DataTypes.BIGINT,
    //   allowNull: true,
    //   references: { model: "class_section", key: "id" },
    // },
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
      references: { model: "difficulty_levels", key: "id" },
    },
    course_type_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: { model: "course_types", key: "id" },
    },
    course_structure_type_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: { model: "course_structure_types", key: "id" },
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
    tableName: "courses",
    timestamps: false,
    underscored: true,
    paranoid: true,
  }
);

export default Course;
