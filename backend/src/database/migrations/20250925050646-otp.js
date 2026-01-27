import { DataTypes } from "sequelize";

export const up = async (queryInterface) => {
  await queryInterface.createTable("otp", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: true, // or false if OTP is only for logged-in users
      references: {
        model: "users",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    otp: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    expires_at: {
      type: DataTypes.DATE,
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
  });
};

export const down = async (queryInterface) => {
  await queryInterface.dropTable("otp");
};
