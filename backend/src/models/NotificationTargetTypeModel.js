import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";

const NotificationTargetType = sequelize.define(
    "notification_target_type",
    {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        notification_target_type_uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            unique: true,
        },
        target_type: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
        },
        target_description: {
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
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null,
        },
    },
    {
        tableName: "notification_target_type",
        paranoid: true,
        underscored: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        deletedAt: "deleted_at",
    }
);

export default NotificationTargetType;
