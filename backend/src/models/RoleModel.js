import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js"; // adjust path as needed
import Permission from "./Permission.js";
import Users from "./UserModal.js";

const Roles = sequelize.define(
  "Roles",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    role_uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
    },

    name: {
      type: DataTypes.STRING(36),
      allowNull: false,
    },

    description: {
      type: DataTypes.STRING(50),
      allowNull: true,
      unique: true,
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
    deleted_at: {
      allowNull: true,
      type: DataTypes.DATE,
    },
  },
  {
    tableName: "roles",
    paranoid: false,
    underscored: true,
    timestamps: false, // we are using created_at and updated_at manually
  }
);
export default Roles;
