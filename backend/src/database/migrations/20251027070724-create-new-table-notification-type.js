"use strict";

import { DataTypes } from "sequelize";
/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface) {
    const tableList = await queryInterface.showAllTables();
    if (tableList.includes("notification_type")) {
        return;
    }

    await queryInterface.createTable("notification_type", {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.BIGINT,
        },
        notification_type_uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            unique: true,
        },

        notification_type: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
        },

        notification_description: {
            type: DataTypes.TEXT,
            allowNull: true,
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
    });
}

export async function down(queryInterface) {
    const tableList = await queryInterface.showAllTables();
    if (tableList.includes("notification_type")) {
        await queryInterface.dropTable("notification_type");
    }
}
