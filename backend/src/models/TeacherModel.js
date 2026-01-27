// models/teacher.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";
import Post from "./PostsModel.js";
import Category from "./CasteCategoryModal.js";
import Users from "./UserModal.js";
import TeacherQualification from "./TeacherQualification.js";
import TeacherClassMap from "./TeacherClassMapModal.js";
import TeacherSubjectMap from "./TeacherSubjectMapModal.js";

const Teacher = sequelize.define(
  "Teacher",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    teacher_uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
    },
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "posts",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    caste_category_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "caste_categories",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    teacher_code: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    experience_years: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    joining_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    profile_image: {
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
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },
  },
  {
    tableName: "teachers",
    timestamps: false, // manually managing created_at and updated_at
    paranoid: false, // deleted_at is managed manually, not by Sequelize's soft delete
  }
);

Teacher.belongsTo(Post, { foreignKey: "post_id" });
Teacher.belongsTo(Category, { foreignKey: "caste_category_id" });
Users.hasMany(Teacher, { foreignKey: "user_id" });
Teacher.belongsTo(Users, { foreignKey: "user_id" });
Teacher.hasMany(TeacherQualification, { foreignKey: "teachers_id" });
Teacher.hasMany(TeacherClassMap, { foreignKey: "teacher_id" });
TeacherClassMap.belongsTo(Teacher, { foreignKey: "teacher_id" });
Teacher.hasMany(TeacherSubjectMap, { foreignKey: "teacher_id" });

export default Teacher;
