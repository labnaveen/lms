// 20251104144000-create-course-structure-types-table.js
import { DataTypes } from "sequelize";

export const up = async (queryInterface) => {
  await queryInterface.createTable("course_structure_types", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT,
    },
    course_structure_type_uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
    },
    title: {
      type: DataTypes.STRING(250),
      allowNull: false,
      comment: "Type of course structure, e.g., Modular or Chapter-based",
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
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
  });
};

export const down = async (queryInterface) => {
  await queryInterface.dropTable("course_structure_types");
};
