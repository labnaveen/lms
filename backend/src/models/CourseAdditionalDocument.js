// CourseAdditionalDocumentModel.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";

const CourseAdditionalDocument = sequelize.define(
  "CourseAdditionalDocument",
  {
    id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    document_uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
    },
    course_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: "courses",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    file_url: { 
        type: DataTypes.STRING(1000), 
        allowNull: false 
    },  
    file_type: { 
        type: DataTypes.STRING(100), 
        allowNull: true 
    },
  },
  {
    tableName: "course_additional_documents",
    timestamps: true,
    underscored: true,
  }
);

export default CourseAdditionalDocument;
