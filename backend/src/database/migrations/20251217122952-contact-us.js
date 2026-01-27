"use strict";
import { DataTypes } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface) {
  await queryInterface.createTable("contact_us", {
    id: {
      allowNull: false,
      autoIncrement: true,
      type: DataTypes.BIGINT,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    contact_no: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    query: {
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
}

export async function down(queryInterface) {
  await queryInterface.dropTable("contact_us");
}
