import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js"; // adjust the path to your sequelize instance
import Assessment from "./AssessmentModal.js";

const AssessmentType = sequelize.define(
    "AssessmentType",
    {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.BIGINT,
        },

        assessment_type_uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            unique: true,
        },

        assessment_type_name: {
            type: DataTypes.STRING(250),
            allowNull: false,
            unique: true,
        },

        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },

        is_course_assessment: {
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
        tableName: "assessment_type",
        paranoid: true,
        underscored: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        deletedAt: "deleted_at",
    }
);

AssessmentType.hasMany(Assessment, { foreignKey: "assessment_type_id" });
Assessment.belongsTo(AssessmentType, { foreignKey: "assessment_type_id" });

export default AssessmentType;
