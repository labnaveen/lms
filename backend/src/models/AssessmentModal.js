import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js"; // adjust the path to your sequelize instance
import AssessmentQuestion from "./AssessmentQuestionModal.js";
import AssessmentQuestionOption from "./AssessmentQuestionOptionModal.js";
import StudentAssessmentResult from "./StudentAssessmentResultModal.js";
import AccademicYear from "./AccademicYearModel.js";
import AssessmentClassSectionLink from "./AssessmentClassSectionLinkModel.js";

const Assessment = sequelize.define(
    "Assessment",
    {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.BIGINT,
        },
        assessment_uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            unique: true,
        },
        assessment_type_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            references: { model: "assessment_type", key: "id" },
            onUpdate: "CASCADE",
            onDelete: "RESTRICT",
        },
        school_subject_id: {
            type: DataTypes.BIGINT,
            allowNull: true,
            references: { model: "school_subject", key: "id" },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
        },
        class_id: {
            type: DataTypes.BIGINT,
            allowNull: true,
            references: { model: "class", key: "id" },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
        },
        class_section_id: {
            type: DataTypes.BIGINT,
            allowNull: true,
            references: { model: "class_section", key: "id" },
            onUpdate: "CASCADE",
            onDelete: "SET NULL",
        },

        course_id: {
            type: DataTypes.BIGINT,
            allowNull: true,
            references: { model: "courses", key: "id" },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
        },


        accademic_year_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            references: { model: "accademic_year", key: "id" },
            onUpdate: "CASCADE",
            onDelete: "SET NULL",
        },

        assessment_title: {
            type: DataTypes.STRING(512),
            allowNull: false,
        },

        assessment_description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },

        start_date_time: {
            type: DataTypes.DATE,
            allowNull: true,
        },

        end_date_time: {
            type: DataTypes.DATE,
            allowNull: true,
        },

        duration_in_minutes: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },

        total_marks: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },

        passing_marks: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        created_by: {
            type: DataTypes.BIGINT,
            allowNull: false,
            references: { model: "users", key: "id" },
            onUpdate: "CASCADE",
            onDelete: "SET NULL",
        },
        added_by: {
            type: DataTypes.BIGINT,
            allowNull: true,
            references: { model: "users", key: "id" },
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
        tableName: "assessment",
        paranoid: true,
        underscored: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        deletedAt: "deleted_at",
    }
);

// 🔗 Associations
// Associations are now set up in models/index.js to avoid circular dependency issues.

Assessment.hasMany(AssessmentQuestion, { foreignKey: "assessment_id" });
AssessmentQuestion.belongsTo(Assessment, { foreignKey: "assessment_id" });
AssessmentQuestion.hasMany(AssessmentQuestionOption, { foreignKey: "assessment_question_id" });
AssessmentQuestionOption.belongsTo(AssessmentQuestion, { foreignKey: "assessment_question_id" });

// In Assessment model
Assessment.hasMany(StudentAssessmentResult, { foreignKey: 'assessment_id' });

// In StudentAssessmentResult model
StudentAssessmentResult.belongsTo(Assessment, { foreignKey: 'assessment_id' });

Assessment.belongsTo(AccademicYear, { foreignKey: 'accademic_year_id' })
AccademicYear.hasMany(Assessment, { foreignKey: 'accademic_year_id' })

Assessment.hasMany(AssessmentClassSectionLink, { foreignKey: "assessment_id" });
AssessmentClassSectionLink.belongsTo(Assessment, { foreignKey: "assessment_id" });




export default Assessment;
