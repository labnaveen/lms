import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js"; // adjust the path to your sequelize instance
import AssessmentQuestion from "./AssessmentQuestionModal.js";

const AssessmentQuestionType = sequelize.define(
    "AssessmentQuestionType",
    {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.BIGINT,
        },

        assessment_question_type_uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            unique: true,
        },

        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
        },
        description: {
            type: DataTypes.TEXT,
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
        tableName: "assessment_question_type",
        paranoid: true,
        underscored: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        deletedAt: "deleted_at",
    }
);

AssessmentQuestionType.hasMany(AssessmentQuestion, { foreignKey: "assessment_question_type_id" });
AssessmentQuestion.belongsTo(AssessmentQuestionType, { foreignKey: "assessment_question_type_id" });

export default AssessmentQuestionType;
