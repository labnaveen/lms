import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";

const CourseVideoLink = sequelize.define(
  "CourseVideoLink",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    video_uuid: {
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
    video_url: {
      type: DataTypes.STRING(1000),
      allowNull: false,
      comment: "Direct video URL or YouTube link",
    },
  },
  {
    tableName: "course_video_links",
    timestamps: true,
    underscored: true,
  }
);

export default CourseVideoLink;
