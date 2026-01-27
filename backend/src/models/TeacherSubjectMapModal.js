import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js"; // adjust the path to your sequelize instance

const TeacherSubjectMap = sequelize.define(
    "TeacherSubjectMap",
    {
        id: {
            allowNull: false,
            autoIncrement: true,
            type: DataTypes.BIGINT,
            primaryKey: true,
        },

        teacher_class_map_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            references: {
                model: "teacher_class_map",
                key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
        },

        school_subject_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            references: {
                model: "school_subject",
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
        tableName: "teacher_subject_map",
        paranoid: true,
        underscored: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        deletedAt: "deleted_at",
    }
);


export default TeacherSubjectMap;
