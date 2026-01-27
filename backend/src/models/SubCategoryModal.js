import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";

const SubCategory = sequelize.define(
  "SubCategory",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    sub_category_uuid: {
      allowNull: false,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
    },
    category_id: {
      allowNull: false,
      type: DataTypes.BIGINT,
      references: {
        model: "categories",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING(150),
    },
    description: {
      allowNull: true,
      type: DataTypes.TEXT,
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
    tableName: "sub_categories",
    timestamps: false,
    underscored: true,
  }
);

export default SubCategory;
