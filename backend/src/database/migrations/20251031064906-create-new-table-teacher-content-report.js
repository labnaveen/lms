"use strict";
import { DataTypes } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface) {
    await queryInterface.createTable("teacher_content_report", {
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
    });
}

export async function down(queryInterface) {
    await queryInterface.dropTable("teacher_content_report");
}
