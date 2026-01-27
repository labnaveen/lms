import { DataTypes } from "sequelize";

export const up = async (queryInterface) => {
  await queryInterface.createTable("user_skills", {
    id: {
      allowNull: false,
      autoIncrement: true,
      type: DataTypes.BIGINT,
      primaryKey: true,
    },
    user_skill_uuid: {
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
    skill_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: "skills",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    status_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: "progress_status",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
    progress_percent: {
      type: DataTypes.INTEGER,
      defaultValue: 33,
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
  });
};

export const down = async (queryInterface) => {
  await queryInterface.dropTable("user_skills");
};
