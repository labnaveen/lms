import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js"; // adjust path as needed
import Permission from "./Permission.js";

const RolePermission = sequelize.define(
  "RolePermission",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    role_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: "roles",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    permission_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "permissions",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
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
    tableName: "role_permissions",
    paranoid: false,
    underscored: true,
    timestamps: false, // we are using created_at and updated_at manually
  }
);

RolePermission.belongsTo(Permission, { foreignKey: "permission_id" });

export default RolePermission;
