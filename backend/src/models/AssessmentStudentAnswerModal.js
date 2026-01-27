import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js"; // adjust the path to your sequelize instance

const AssessmentStudentAnswer = sequelize.define(
  "AssessmentStudentAnswer",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT,
    },

    student_assessment_result_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: { model: "student_assessment_result", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },

    question_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: { model: "assessment_question", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },

    selected_option_ids: {
      type: DataTypes.JSON,
      allowNull: true,
      comment: "Array of option IDs for MCQ/MAQ questions",
    },

    answer_text: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: "For descriptive/fill questions",
    },

    is_correct: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },

    marks_obtained: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: 0,
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
    tableName: "assessment_student_answer",
    paranoid: true,
    underscored: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
  }
);


// 🔗 Associations
// StudentAssessmentSession.hasMany(AssessmentStudentAnswer, { foreignKey: "session_id" });
// AssessmentStudentAnswer.belongsTo(StudentAssessmentSession, { foreignKey: "session_id" });

// AssessmentQuestion.hasMany(AssessmentStudentAnswer, { foreignKey: "question_id" });
// AssessmentStudentAnswer.belongsTo(AssessmentQuestion, { foreignKey: "question_id" });


export default AssessmentStudentAnswer;
