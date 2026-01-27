import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js"; // adjust the path to your sequelize instance

const StudentClassSectionHistory = sequelize.define(
    "StudentClassSectionHistory",
    {
        id: {
            allowNull: false,
            autoIncrement: true,
            type: DataTypes.BIGINT,
            primaryKey: true,
        },

        student_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            references: {
                model: "students",
                key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
        },

        prev_accademic_year_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            references: {
                model: "accademic_year",
                key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
        },

        prev_section_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            references: {
                model: "class_section",
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

        deleted_at: {
            allowNull: true,
            type: DataTypes.DATE,
            defaultValue: null,
        },


    },

    {
        tableName: "student_class_section_history",
        paranoid: true,
        underscored: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        deletedAt: "deleted_at",
    }
);


export default StudentClassSectionHistory;
