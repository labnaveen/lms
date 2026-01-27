"use strict";
import { DataTypes } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
    // Check if the column exists before altering
    const table = await queryInterface.describeTable("notification");
    if (table.notification_type) {
        await queryInterface.changeColumn("notification", "notification_type", {
            type: DataTypes.BIGINT,
            allowNull: true,
        });
    }
}

export async function down(queryInterface, Sequelize) {
    // Check if the column exists before reverting
    const table = await queryInterface.describeTable("notification");
    if (table.notification_type) {
        await queryInterface.changeColumn("notification", "notification_type", {
            type: DataTypes.BIGINT,
            allowNull: false,
        });
    }
}
