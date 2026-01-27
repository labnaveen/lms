import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";

const ContactUs = sequelize.define(
  "ContactUs",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
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
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },

    deleted_at: {
      allowNull: true,
      type: DataTypes.DATE,
      defaultValue: null,
    },
  },
  {
    tableName: "contact_us",
    timestamps: false,
  }
);

export default ContactUs;
