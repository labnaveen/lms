// models/city.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";
import ClassSection from "./ClassSectionModel.js";
import Student from "./StudentsModel.js"; // Add this import
import Assessment from "./AssessmentModal.js";

const Class = sequelize.define(
    "Class",
    {
        id: {
            allowNull: false,
            autoIncrement: true,
            type: DataTypes.BIGINT,
            primaryKey: true,
        },

        class_uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            unique: true,
        },

        class_name: {
            type: DataTypes.STRING(150),
            allowNull: false,
        },

        school_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            references: {
                model: "schools",
                key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
        },

        // created_at: {
        //     type: DataTypes.DATE,
        //     allowNull: false,
        //     defaultValue: DataTypes.NOW,
        // },

        // updated_at: {
        //     type: DataTypes.DATE,
        //     allowNull: false,
        //     defaultValue: DataTypes.NOW,
        // },
        // deleted_at: {
        //     allowNull: true,
        //     type: DataTypes.DATE,
        //     defaultValue: null,
        // },
    },
    {
        tableName: "class",
        timestamps: true, // since created_at and updated_at are defined manually
        paranoid: true,
        underscore:true,
        createdAt:"created_at",
        updatedAt:"updated_at",
        deletedAt:"deleted_at",
    }
);

// One Class → Many ClassSections
Class.hasMany(ClassSection, { foreignKey: "class_id" });
ClassSection.belongsTo(Class, { foreignKey: "class_id" });

Class.hasMany(Assessment, { foreignKey: "class_id" });
Assessment.belongsTo(Class, { foreignKey: "class_id" });

export default Class;
