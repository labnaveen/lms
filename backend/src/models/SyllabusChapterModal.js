import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js"; // adjust the path to your sequelize instance

const SyllabusChapter = sequelize.define(
    "SyllabusChapter",
    {
        id: {
            allowNull: false,
            autoIncrement: true,
            type: DataTypes.BIGINT,
            primaryKey: true,
        },

        syllabus_chapter_uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            unique: true,
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

        chapter_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            references: {
                model: "chapter",
                key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
        },

        syllabus_chapter_title: {
            type: DataTypes.STRING(250),
            allowNull: false,
        },

        syllabus_chapter_description: {
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
        tableName: "syllabus_chapter",
        paranoid: true,
        underscored: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        deletedAt: "deleted_at",
    }
);


export default SyllabusChapter;
