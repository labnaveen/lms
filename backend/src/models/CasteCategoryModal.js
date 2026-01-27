// models/category.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";

const CasteCategory = sequelize.define(
  "CasteCategory",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
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
    tableName: "caste_categories",
    timestamps: false, // manually defining created_at and updated_at
  }
);

export default CasteCategory;
