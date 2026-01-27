import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js"; // adjust path to your sequelize instance

const UserLogin = sequelize.define(
  "UserLogin",
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
      onDelete: "CASCADE",
    },
    token: {
      allowNull: false,
      type: DataTypes.STRING(500),
    },
    fcm: {
      allowNull: true,
      type: DataTypes.STRING
    },
    device_id: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    device_name: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    ip_address: {
      allowNull: true,
      type: DataTypes.STRING(45)
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
  },
  {
    tableName: "user_login",
    paranoid: true,
    underscored: true,
  }
);

export default UserLogin;
