"use strict";

import { DataTypes } from "sequelize";

export const up = async (queryInterface) => {
    const tableName = "notification";
    const columnName = "notification_target_type_id";

    // Check if column already exists
    const tableDesc = await queryInterface.describeTable(tableName);
    if (!tableDesc[columnName]) {
        await queryInterface.addColumn(tableName, columnName, {
            type: DataTypes.BIGINT,
            allowNull: true,
            references: {
                model: "notification_target_type",
                key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "SET NULL",
            after: "class_section_id", // Add after class_section_id
        });
    } else {
        console.log(`${columnName} already exists in ${tableName}`);
    }
};

export const down = async (queryInterface) => {
    const tableName = "notification";
    const columnName = "notification_target_type_id";

    // Check if column exists before removing
    const tableDesc = await queryInterface.describeTable(tableName);
    if (tableDesc[columnName]) {
        await queryInterface.removeColumn(tableName, columnName);
    } else {
        console.log(`${columnName} does not exist in ${tableName}`);
    }
};
