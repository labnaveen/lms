import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";
import Users from "./UserModal.js";

const ActivityLogs = sequelize.define(
  "ActivityLogs",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    created_by: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: "users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },

    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "activity_logs",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,
  }
);

Users.hasMany(ActivityLogs, { foreignKey: "created_by" });
ActivityLogs.belongsTo(Users, { foreignKey: "created_by" });

export default ActivityLogs;
