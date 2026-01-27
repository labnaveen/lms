// models/city.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";

const Chapter = sequelize.define(
  "Chapter",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      type: DataTypes.BIGINT,
      primaryKey: true,
    },

    chapter_uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
    },

    chapter_name: {
      type: DataTypes.STRING(20),
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

    deleted_at: {
      allowNull: true,
      type: DataTypes.DATE,
      defaultValue: null,
    },
  },
  {
    tableName: "chapter",
    paranoid: true,
    underscored: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
  }
);

// Optional: define associations
// Chapter.belongsTo(State, { foreignKey: "state_id", as: "state" });

export default Chapter;
