"use strict";
import { DataTypes } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface) {
    const tableDesc = await queryInterface.describeTable("notification");

    // Remove old column if exists
    if (tableDesc["class_section_uuid"]) {
        await queryInterface.removeColumn("notification", "class_section_uuid");
    }

    // Add class_id column before created_by
    if (tableDesc["class_id"]) {
        console.error("Column 'class_id' already exists in 'notification' table.");
    } else {
        await queryInterface.addColumn("notification", "class_id", {
            type: DataTypes.BIGINT,
            allowNull: true,
            references: {
                model: "class",
                key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "SET NULL",
            after: "school_id", // Move before created_by
        });
    }

    // Add class_section_id column after class_id (still before created_by)
    if (tableDesc["class_section_id"]) {
        console.error("Column 'class_section_id' already exists in 'notification' table.");
    } else {
        await queryInterface.addColumn("notification", "class_section_id", {
            type: DataTypes.BIGINT,
            allowNull: true,
            references: {
                model: "class_section",
                key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "SET NULL",
            after: "class_id", // Move before created_by
        });
    }
}

export async function down(queryInterface) {
    const tableDesc = await queryInterface.describeTable("notification");

    if (tableDesc["class_section_id"]) {
        await queryInterface.removeColumn("notification", "class_section_id");
    }
    if (tableDesc["class_id"]) {
        await queryInterface.removeColumn("notification", "class_id");
    }
    if (!tableDesc["class_section_uuid"]) {
        await queryInterface.addColumn("notification", "class_section_uuid", {
            type: DataTypes.UUID,
            allowNull: true,
        });
    }
}
