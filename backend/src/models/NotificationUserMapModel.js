import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";
const NotificationUserMap = sequelize.define(
    "NotificationUserMap",
    {
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
    },

    {
        tableName: "notification_user_map",
        paranoid: true,
        underscored: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        deletedAt: "deleted_at",
    }
);

export default NotificationUserMap;
