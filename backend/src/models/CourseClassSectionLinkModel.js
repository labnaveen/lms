import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js"; // adjust the path to your sequelize instance
import Students from "./StudentsModel.js";

const CourseClassSectionLink = sequelize.define(
  "CourseClassSectionLink",
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    course_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: "courses",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    class_section_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: "class_section",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
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
  },
  {
    tableName: "course_class_section_link",
    paranoid: true,
    underscored: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
  }
);

CourseClassSectionLink.hasMany(Students, { foreignKey: "class_section_id" });
Students.belongsTo(CourseClassSectionLink, { foreignKey: "class_section_id" });

export default CourseClassSectionLink;
