// models/state.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";

const State = sequelize.define(
  "State",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    code: {
      type: DataTypes.CHAR(2),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    country_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "countries",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
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
    tableName: "states",
    timestamps: false, // because you are manually defining created_at and updated_at
  }
);

// // Optional: define associations
// State.belongsTo(Country, { foreignKey: "country_id", as: "country" });

export default State;
