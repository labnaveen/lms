// models/city.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";

const CourseStructureType = sequelize.define(
    "CourseStructureType",
    {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },

        course_structure_type_uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            unique: true,
        },

        course_structure_type_name: {
            type: DataTypes.STRING(250),
            allowNull: false,
            unique: true,
        },

        description: {
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

    },
    {
        tableName: "course_structure_type",
        timestamps: false, // since created_at and updated_at are defined manually
        underscored: true,
    }
);
export default CourseStructureType;
