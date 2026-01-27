import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js"; // adjust the path to your sequelize instance
import StudentAssessmentResult from "./StudentAssessmentResultModal.js";

const Grade = sequelize.define(
  "Grade",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT,
    },

    grade_uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
    },

    grade_name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    min_percentage: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },

    max_percentage: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },

    grade_point: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },


    school_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: { model: "schools", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
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
      type: DataTypes.DATE,
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
      type: DataTypes.DATE,
      allowNull: true,
    },

  },

  {
    tableName: "grade",
    paranoid: true,
    underscored: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
  }
);
// In Grade model
Grade.hasMany(StudentAssessmentResult, { foreignKey: 'grade_id' });

// In StudentAssessmentResult model
StudentAssessmentResult.belongsTo(Grade, { foreignKey: 'grade_id' });


export default Grade;
