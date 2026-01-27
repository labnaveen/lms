import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";
import Skill from "./SkillModel.js";

const Category = sequelize.define(
  "Category",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      type: DataTypes.BIGINT,
      primaryKey: true,
    },
    category_uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
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
    tableName: "categories",
    timestamps: false,
    underscored: true,
  }
);

// One category has many skills
Category.hasMany(Skill, { foreignKey: "category" });
Skill.belongsTo(Category, { foreignKey: "category" });

export default Category;
