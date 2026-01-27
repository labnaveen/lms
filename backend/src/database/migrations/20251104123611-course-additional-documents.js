// 20251104190000-create-course-additional-documents-table.js
import { DataTypes } from "sequelize";

export const up = async (queryInterface) => {
  await queryInterface.createTable("course_additional_documents", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT,
    },
    document_uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
    },
    course_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: { model: "courses", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    file_url: {
      type: DataTypes.STRING(1000),
      allowNull: false,
      comment: "Path or URL of the uploaded document",
    },
    file_type: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: "Type of file (pdf, docx, etc.)",
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
  });
};

export const down = async (queryInterface) => {
  await queryInterface.dropTable("course_additional_documents");
};
