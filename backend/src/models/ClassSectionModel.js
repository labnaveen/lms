// models/city.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";
import Students from "./StudentsModel.js";
import Assessment from "./AssessmentModal.js";
import AssessmentClassSectionLink from "./AssessmentClassSectionLinkModel.js";
import CourseClassSectionLink from "./CourseClassSectionLinkModel.js";

const ClassSection = sequelize.define(
    "ClassSection",
    {
        id: {
            allowNull: false,
            autoIncrement: true,
            type: DataTypes.BIGINT,
            primaryKey: true,
        },

        class_section_uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            unique: true,
        },

        class_section_name: {
            type: DataTypes.STRING(150),
            allowNull: false,
        },

        class_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            references: {
                model: "class",
                key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
        },

        stream_id: {
            type: DataTypes.BIGINT,
            allowNull: null,
            references: {
                model: "stream",
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
        deleted_at: {
            allowNull: true,
            type: DataTypes.DATE,
            defaultValue: null,
        },
    },
    {
        tableName: "class_section",
        timestamps: false, // since created_at and updated_at are defined manually
    }
);
// One ClassSection has many Students
ClassSection.hasMany(Students, { foreignKey: "class_section_id" });
Students.belongsTo(ClassSection, { foreignKey: "class_section_id" });

// One ClassSection has many Assessments
ClassSection.hasMany(Assessment, { foreignKey: "class_section_id" });
Assessment.belongsTo(ClassSection, { foreignKey: "class_section_id" });

ClassSection.hasMany(AssessmentClassSectionLink, { foreignKey: "class_section_id" });
AssessmentClassSectionLink.belongsTo(ClassSection, { foreignKey: "class_section_id" });

ClassSection.hasMany(CourseClassSectionLink, { foreignKey: "class_section_id" });
CourseClassSectionLink.belongsTo(ClassSection, { foreignKey: "class_section_id" });

export default ClassSection;
