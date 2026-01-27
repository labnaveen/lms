import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js"; // adjust the path to your sequelize instance
import AssessmentQuestionOption from "./AssessmentQuestionOptionModal.js";

const AssessmentQuestion = sequelize.define(
    "AssessmentQuestion",
    {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.BIGINT,
        },

        assessment_question_uuid: {
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

        assessment_question_type_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            references: { model: "assessment_question_type", key: "id" },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
        },

        question_text: {
            type: DataTypes.TEXT,
            allowNull: false,
        },

        max_marks: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
        },

        correct_answer_text: {
            type: DataTypes.TEXT,
            allowNull: true,
            comment: "Used for subjective/fill questions",
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
        tableName: "assessment_question",
        paranoid: true,
        underscored: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        deletedAt: "deleted_at",
    }
);

// 🔗 Associations
// Associations are now set up in models/index.js to avoid circular dependency issues.

export default AssessmentQuestion;
