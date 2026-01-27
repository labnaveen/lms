import { DataTypes } from "sequelize";

export const up = async (queryInterface) => {
  await queryInterface.createTable("states", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    code: {
      allowNull: false,
      type: DataTypes.CHAR(2),
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING(100),
    },
    country_id: {
      allowNull: false,
      type: DataTypes.INTEGER, // removed (5) since length is ignored
      references: {
        model: "countries", // references countries table
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
  });
};

export const down = async (queryInterface) => {
  await queryInterface.dropTable("states");
};
