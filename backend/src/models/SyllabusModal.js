import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js"; // adjust the path to your sequelize instance
import SchoolSubject from "./SchoolSubjectModel.js";
import AccademicYear from "./AccademicYearModel.js";
import SyllabusChapter from "./SyllabusChapterModal.js";
import Users from "./UserModal.js";

const Syllabus = sequelize.define(
    "Syllabus",
    {
        id: {
            allowNull: false,
            autoIncrement: true,
            type: DataTypes.BIGINT,
            primaryKey: true,
        },

        syllabus_uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            unique: true,
        },

        syllabus_title: {
            type: DataTypes.STRING(150),
            allowNull: false,
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

        school_subject_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            references: {
                model: "school_subject",
                key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
        },

        syllabus_description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },

        syllabus_link: {
            type: DataTypes.TEXT,
            allowNull: true,
        },

        created_by: {
            type: DataTypes.BIGINT,
            allowNull: false,
            references: {
                model: "users",
                key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
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
        tableName: "syllabus",
        paranoid: true,
        underscored: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        deletedAt: "deleted_at",
    }
);

// AcademicYear -> Syllabus
AccademicYear.hasMany(Syllabus, { foreignKey: "accademic_year_id" });
Syllabus.belongsTo(AccademicYear, { foreignKey: "accademic_year_id" });

// SchoolSubject -> Syllabus
SchoolSubject.hasMany(Syllabus, { foreignKey: "school_subject_id" });
Syllabus.belongsTo(SchoolSubject, { foreignKey: "school_subject_id" });

// Teacher -> Syllabus
// Teacher.hasMany(Syllabus, { foreignKey: "created_by", as: "uploadedSyllabi" });
// Syllabus.belongsTo(Teacher, { foreignKey: "created_by", as: "creator" });

// // Syllabus -> Chapter
Syllabus.hasMany(SyllabusChapter, { foreignKey: "syllabus_id" });
SyllabusChapter.belongsTo(Syllabus, { foreignKey: "syllabus_id" });

Users.hasMany(Syllabus, { foreignKey: "created_by" });
Syllabus.belongsTo(Users, { foreignKey: "created_by" });

export default Syllabus;
