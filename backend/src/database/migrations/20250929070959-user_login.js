import { DataTypes } from "sequelize";

export const up = async (queryInterface) => {
  await queryInterface.createTable("user_login", {
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
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  });
};

export const down = async (queryInterface) => {
  await queryInterface.dropTable("user_login");
};
