import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js"; // your Sequelize instance
import Users from "./UserModal.js";
import Permission from "./Permission.js";

const UserPermission = sequelize.define(
  "UserPermission",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
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
    is_allowed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true, // true = allowed, false = denied
    },
  },
  {
    tableName: "user_permissions",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

// // Associations
Users.hasMany(UserPermission, { foreignKey: "user_id" });
UserPermission.belongsTo(Users, { foreignKey: "user_id" });
UserPermission.belongsTo(Permission, { foreignKey: "permission_id", });

export default UserPermission;
