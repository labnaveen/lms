import { DataTypes } from "sequelize";

export const up = async (queryInterface) => {
  await queryInterface.createTable("teacher_qualifications", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    teachers_id: {
      allowNull: false,
      type: DataTypes.BIGINT,
      references: {
        model: "teachers",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    qualification_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "qualifications",
        key: "id",
      },
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
  });
};

export const down = async (queryInterface) => {
  await queryInterface.dropTable("teacher_qualifications");
};
