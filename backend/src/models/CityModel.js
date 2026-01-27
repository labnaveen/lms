// models/city.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";

const City = sequelize.define(
  "City",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    state_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "states",
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
    tableName: "cities",
    timestamps: false, // since created_at and updated_at are defined manually
  }
);

// Optional: define associations
// City.belongsTo(State, { foreignKey: "state_id", as: "state" });

export default City;
