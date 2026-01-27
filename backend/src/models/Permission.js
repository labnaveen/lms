import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js"; // adjust path to your sequelize instance

const Permission = sequelize.define(
  "Permission",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
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
  },
  {
    tableName: "permissions",
    paranoid: false, // set true if you want soft deletes with deleted_at
    underscored: true,
    timestamps: false, // since you're manually handling created_at & updated_at
  }
);

export default Permission;
