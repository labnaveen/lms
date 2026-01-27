import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js"; // adjust path to your sequelize instance

const Country = sequelize.define(
  "Country",
  {
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
      type: DataTypes.INTEGER,
    },
    symbol: {
      allowNull: true,
      type: DataTypes.STRING(10),
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
  },
  {
    tableName: "countries",
    paranoid: false,
    underscored: true,
    timestamps: false, // using created_at & updated_at manually
  }
);

export default Country;
