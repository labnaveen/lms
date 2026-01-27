// 20251104190500-create-course-video-links-table.js
import { DataTypes } from "sequelize";

export const up = async (queryInterface) => {
  await queryInterface.createTable("course_video_links", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT,
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
      references: { model: "courses", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    video_url: {
      type: DataTypes.STRING(1000),
      allowNull: false,
      comment: "Direct video URL or YouTube link",
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
  await queryInterface.dropTable("course_video_links");
};
