import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js"; // adjust the path to your sequelize instance
import SyllabusChapter from "./SyllabusChapterModal.js";

const SyllabusChapterResource = sequelize.define(
    "SyllabusChapterResource",
    {
        id: {
            allowNull: false,
            autoIncrement: true,
            type: DataTypes.BIGINT,
            primaryKey: true,
        },

        syllabus_chapter_resource_uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            unique: true,
        },

        syllabus_chapter_resource_link: {
            type: DataTypes.TEXT,
            allowNull: false,
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
        tableName: "syllabus_chapter_resource",
        paranoid: true,
        underscored: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        deletedAt: "deleted_at",
    }
);

// SyllabusChapterResource belongs to SyllabusChapter
SyllabusChapterResource.belongsTo(SyllabusChapter, {
    foreignKey: "syllabus_chapter_id",
    targetKey: "id",
});

// SyllabusChapter has many SyllabusChapterResource
SyllabusChapter.hasMany(SyllabusChapterResource, {
    foreignKey: "syllabus_chapter_id",
    sourceKey: "id",
});

export default SyllabusChapterResource;
