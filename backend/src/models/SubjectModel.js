// models/city.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";

const Subject = sequelize.define(
  "Subject",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      type: DataTypes.BIGINT,
      primaryKey: true,
    },

    subject_uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
    },

    subject_name: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },

    subject_code: {
      type: DataTypes.STRING(20),
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

    deleted_at: {
      allowNull: true,
      type: DataTypes.DATE,
      defaultValue: null,
    },
  },
  {
    tableName: "subject",
    timestamps: false, // since created_at and updated_at are defined manually
  }
);

// Optional: define associations
// Subject.belongsTo(State, { foreignKey: "state_id", as: "state" });

export default Subject;
