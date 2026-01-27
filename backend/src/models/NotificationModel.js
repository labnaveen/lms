import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";

const Notification = sequelize.define(
    "Notification",
    {
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

        class_section_id: {
            type: DataTypes.BIGINT,
            allowNull: true,
            references: {
                model: "class_section",
                key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "SET NULL",
        },

        class_id: {
            type: DataTypes.BIGINT,
            allowNull: true,
            references: {
                model: "class",
                key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "SET NULL",
        },
        notification_target_type_id: {
            type: DataTypes.BIGINT,
            allowNull: true,
            references: {
                model: "notification_target_type",
                key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "SET NULL",
        },

        notification_type: {
            type: DataTypes.BIGINT,
            allowNull: true,
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
            allowNull: true,
            type: DataTypes.DATE,
            defaultValue: null,
        },
    },

    {
        tableName: "notification",
        paranoid: true,
        underscored: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        deletedAt: "deleted_at",
    }
);

export default Notification;
