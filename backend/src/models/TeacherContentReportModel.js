import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";
import SyllabusChapter from "./SyllabusChapterModal.js";
import SyllabusResourceType from "./SyllabusResourceTypeModel.js";
import Class from "./ClassModel.js";
import Users from "./UserModal.js";
import Syllabus from "./SyllabusModal.js";
import ClassSection from "./ClassSectionModel.js";
import AccademicYear from "./AccademicYearModel.js";

const TeacherContentReport = sequelize.define(
    "TeacherContentReport",
    {
        id: {
            allowNull: false,
            autoIncrement: true,
            type: DataTypes.BIGINT,
            primaryKey: true,
        },

        accademic_year_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            references: {
                model: "accademic_year",
                key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
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
        class_id: {
            type: DataTypes.BIGINT,
            allowNull: true,
            references: { model: "class", key: "id" },
            onUpdate: "CASCADE",
            onDelete: "SET NULL",
        },

        class_section_id: {
            type: DataTypes.BIGINT,
            allowNull: true,
            references: {
                model: "class_section",
                key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
        },
        syllabus_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            references: {
                model: "syllabus",
                key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
        },

        syllabus_chapter_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            references: {
                model: "syllabus_chapter",
                key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
        },
        syllabus_resource_type_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            references: {
                model: "syllabus_resource_type",
                key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
        },
        count: {
            type: DataTypes.INTEGER,
            allowNull: false,
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
            allowNull: true,
            type: DataTypes.DATE,
            defaultValue: null,
        },
    },

    {
        tableName: "teacher_content_report",
        paranoid: true,
        underscored: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        deletedAt: "deleted_at",
        //  freezeTableName: true, // ✅ prevents Sequelize from pluralizing it
    }
);
Users.hasMany(TeacherContentReport, { foreignKey: "user_id" });
TeacherContentReport.belongsTo(Users, { foreignKey: "user_id" });
TeacherContentReport.belongsTo(Class, { foreignKey: "class_id" });
TeacherContentReport.belongsTo(Syllabus, { foreignKey: "syllabus_id" });
TeacherContentReport.belongsTo(SyllabusChapter, { foreignKey: "syllabus_chapter_id" });
TeacherContentReport.belongsTo(SyllabusResourceType, { foreignKey: "syllabus_resource_type_id" });
TeacherContentReport.belongsTo(ClassSection, { foreignKey: "class_section_id" });

AccademicYear.hasMany(TeacherContentReport, { foreignKey: "accademic_year_id" });
TeacherContentReport.belongsTo(AccademicYear, { foreignKey: "accademic_year_id" });


export default TeacherContentReport;
