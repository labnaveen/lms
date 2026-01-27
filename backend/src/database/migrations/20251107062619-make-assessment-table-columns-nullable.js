"use strict";
import { DataTypes } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
    const table = await queryInterface.describeTable("assessment");

    const columnsToUpdate = [
        "school_subject_id",
        "class_id",
        "start_date_time",
        "end_date_time",
    ];

    for (const column of columnsToUpdate) {
        if (table[column]) {
            await queryInterface.changeColumn("assessment", column, {
                type:
                    column === "start_date_time" || column === "end_date_time"
                        ? DataTypes.DATE
                        : DataTypes.BIGINT,
                allowNull: true,
            });
        }
    }
}

export async function down(queryInterface, Sequelize) {
    const table = await queryInterface.describeTable("assessment");

    const columnsToRevert = [
        "school_subject_id",
        "class_id",
        "start_date_time",
        "end_date_time",
    ];

    for (const column of columnsToRevert) {
        if (table[column]) {
            await queryInterface.changeColumn("assessment", column, {
                type:
                    column === "start_date_time" || column === "end_date_time"
                        ? DataTypes.DATE
                        : DataTypes.BIGINT,
                allowNull: false,
            });
        }
    }
}
