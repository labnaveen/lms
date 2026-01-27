import { DataTypes } from "sequelize";

export const up = async (queryInterface) => {
  await queryInterface.createTable("teachers", {
    id: {
      allowNull: false,
      autoIncrement: true,
      type: DataTypes.BIGINT,
      primaryKey: true,
    },
    teacher_uuid: {
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
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "posts",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    caste_category_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "caste_categories",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    teacher_code: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    experience_years: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    joining_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    profile_image: {
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
  await queryInterface.dropTable("teachers");
};
