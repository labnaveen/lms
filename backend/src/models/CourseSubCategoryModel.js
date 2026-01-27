import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";

const CourseSubCategory = sequelize.define(
  "CourseSubCategory",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    sub_category_uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
    },
    category_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: "course_categories",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    name: {
      type: DataTypes.STRING(150),
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
  },
  {
    // tableName: "course_sub_categories",
    tableName: "sub_categories",
    timestamps: false,
    underscored: true

  }
);

export default CourseSubCategory;
