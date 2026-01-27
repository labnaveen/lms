import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";
import DifficultyLevel from "./DifficultyLevelModel.js";
import Users from "./UserModal.js";

const Skill = sequelize.define(
  "Skill",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      type: DataTypes.BIGINT,
      primaryKey: true,
    },
    skill_uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
    },
    title: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    thumbnail_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    pdf_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    estimated_time: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    category: {
      type: DataTypes.STRING(100),
      allowNull: true,
      references: {
        model: "categories",
        key: "id",
      },
    },
    difficulty_level_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: "difficulty_levels",
        key: "id",
      },
    },
    created_by: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: "users",
        key: "id",
      },
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },
  },
  {
    tableName: "skills",
    timestamps: false,
    underscored: true,
  }
);

// Relation
Skill.belongsTo(DifficultyLevel, { foreignKey: "difficulty_level_id" });
Skill.belongsTo(Users, { foreignKey: "created_by" });

export default Skill;
