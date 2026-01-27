import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js"; // adjust the path to your sequelize instance

const StudentAssessmentResult = sequelize.define(
  "StudentAssessmentResult",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT,
    },

    student_assessment_result_uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
    },

    assessment_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: { model: "assessment", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },

    student_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: { model: "users", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },

    started_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    submitted_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    total_questions: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },


    total_questions_attempted: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },

    total_score: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },


    grade_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: { model: "grade", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },

    performance_percentage: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },

    completion_percentage: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },

    accuracy_percentage: {
      type: DataTypes.FLOAT,
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

    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },

  },

  {
    tableName: "student_assessment_result",
    paranoid: true,
    underscored: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
  }
);

// Assessment.hasMany(StudentAssessmentSession, { foreignKey: "assessment_id" });
// StudentAssessmentSession.belongsTo(Assessment, { foreignKey: "assessment_id" });

export default StudentAssessmentResult;
