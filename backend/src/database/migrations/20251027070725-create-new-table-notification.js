import { DataTypes } from "sequelize";

("use strict");

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface) {
    const tableList = await queryInterface.showAllTables();
    if (tableList.includes("notification")) {
        console.log("Table 'notification' already exists. Skipping creation.");
        return;
    }

    await queryInterface.createTable("notification", {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.BIGINT,
        },
        notifications_uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            unique: true,
        },
        class_section_uuid: {
            type: DataTypes.UUID,
            allowNull: true,
            references: {
                model: "class_section",
                key: "class_section_uuid",
            },
            onUpdate: "CASCADE",
            onDelete: "SET NULL",
        },
        notification_type: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        notification_title: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        notification_message: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        school_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            references: {
                model: "schools",
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
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null,
        },
    });
}

export async function down(queryInterface) {
    const tableList = await queryInterface.showAllTables();
    if (tableList.includes("notification")) {
        await queryInterface.dropTable("notification");
    }
}
