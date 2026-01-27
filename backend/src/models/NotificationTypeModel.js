import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";
export const NotificationType = sequelize.define(
    "NotificationType",
    {
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
    },

    {
        tableName: "notification_type",
        paranoid: true,
        underscored: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        deletedAt: "deleted_at",
    }
);

export default NotificationType;
