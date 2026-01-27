import { DataTypes } from "sequelize";

export const up = async (queryInterface) => {
  await queryInterface.createTable("countries", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    code: {
      allowNull: false,
      unique: true,
      type: DataTypes.CHAR(2),
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING(100),
    },
    phone: {
      allowNull: false,
      type: DataTypes.INTEGER, // Sequelize ignores length, so no (5)
    },
    symbol: {
      allowNull: true,
      type: DataTypes.STRING(10),
      charset: "utf8mb4",
      collate: "utf8mb4_unicode_ci",
    },
    currency: {
      allowNull: true,
      type: DataTypes.STRING(3),
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
  await queryInterface.dropTable("countries");
};
