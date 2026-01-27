import { DataTypes } from "sequelize";

export const up = async (queryInterface) => {
  await queryInterface.createTable("skills", {
    id: {
      allowNull: false,
      autoIncrement: true,
      type: DataTypes.BIGINT,
      primaryKey: true,
    },
    skill_uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
    },
    title: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    thumbnail_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    pdf_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    estimated_time: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    category: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: "categories",
        key: "id",
      },
    },
    difficulty_level_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: "difficulty_levels",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
    created_by: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: "users",
        key: "id",
      },
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
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
  await queryInterface.dropTable("skills");
};
