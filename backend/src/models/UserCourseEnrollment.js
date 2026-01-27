import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";
import ProgressStatus from "./ProgressStatus.js";
import Course from "./CourseModel.js";
import Users from "./UserModal.js";

const UserCourseEnrollment = sequelize.define(
  "UserCourseEnrollment",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      type: DataTypes.BIGINT,
      primaryKey: true,
    },
    user_course_enrollment_uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
    },
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
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
    progress_status_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: "progress_status",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
    progress_percentage: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },

    started_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    completed_at: {
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
      allowNull: true,
      type: DataTypes.DATE,
      defaultValue: null,
    },
  },
  {
    tableName: "user_course_enrollments",
    timestamps: false,
    underscored: true,
  }
);

UserCourseEnrollment.belongsTo(Course, { foreignKey: "course_id" });
// UserCourseEnrollment.belongsTo(Users, { foreignKey: "user_id" });
UserCourseEnrollment.belongsTo(ProgressStatus, { foreignKey: "progress_status_id" });

export default UserCourseEnrollment;
