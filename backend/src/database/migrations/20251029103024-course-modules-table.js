// 20251029180000-create-course-modules-table.js
import { DataTypes } from "sequelize";

export const up = async (queryInterface) => {
    await queryInterface.createTable("course_modules", {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.BIGINT,
        },
        module_uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            unique: true,
        },
        course_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            references: { model: "courses", key: "id" },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
        },
        title: {
            type: DataTypes.STRING(250),
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        order_index: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
            comment: "Defines display order of modules inside a course",
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
    });
};

export const down = async (queryInterface) => {
    await queryInterface.dropTable("course_modules");
};
