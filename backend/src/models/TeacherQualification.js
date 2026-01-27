// models/teacherQualification.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";
import Qualification from "./QualificationModel.js";

const TeacherQualification = sequelize.define(
  "TeacherQualification",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    teachers_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: "teachers",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    qualification_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "qualifications",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
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
    tableName: "teacher_qualifications",
    timestamps: false, // manually managing created_at and updated_at
  }
);

TeacherQualification.belongsTo(Qualification, { foreignKey: "qualification_id" });
Qualification.hasMany(TeacherQualification, { foreignKey: "qualification_id" });

export default TeacherQualification;
