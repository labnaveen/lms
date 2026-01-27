import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js"; // adjust the path to your sequelize instance
import AssessmentQuestion from "./AssessmentQuestionModal.js";

const AssessmentQuestionOption = sequelize.define(
    "AssessmentQuestionOption",
    {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.BIGINT,
        },

        assessment_question_option_uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            unique: true,
        },

        assessment_question_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            references: { model: "assessment_question", key: "id" },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
        },

        option_text: {
            type: DataTypes.TEXT,
            allowNull: false,
        },

        is_correct: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
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
        tableName: "assessment_question_option",
        paranoid: true,
        underscored: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        deletedAt: "deleted_at",
    }
);

// 🔗 Associations
// Associations are now set up in models/index.js to avoid circular dependency issues.

export default AssessmentQuestionOption;
