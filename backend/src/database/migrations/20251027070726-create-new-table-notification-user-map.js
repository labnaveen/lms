"use strict";

import { DataTypes } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
    const tableList = await queryInterface.showAllTables();
    if (tableList.includes("notification_user_map")) {
        console.log("Table 'notification_user_map' already exists. Skipping creation.");

        return;
    }
    await queryInterface.createTable("notification_user_map", {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.BIGINT,
        },

        notification_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            references: {
                model: "notification",
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

        is_read: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
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
    if (tableList.includes("notification_user_map")) {
        await queryInterface.dropTable("notification_user_map");
    }
}
