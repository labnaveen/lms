// models/city.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";

const SchoolSubjectStreamLink = sequelize.define(
    "SchoolSubjectStreamLink",
    {
        id: {
            allowNull: false,
            autoIncrement: true,
            type: DataTypes.BIGINT,
            primaryKey: true,
        },

        school_subject_stream_link_uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            unique: true,
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

        stream_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            references: {
                model: "stream",
                key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
        },
    },
    {
        tableName: "school_subject_stream_links",
        timestamps: true,
        paranoid: true,
        underscored: true,
        createdAt: "created_at", // optional if your column name is not default 'deletedAt'
        updatedAt: "updated_at", // optional if your column name is not default 'deletedAt'
        deletedAt: "deleted_at", // optional if your column name is not default 'deletedAt'


    }
);
export default SchoolSubjectStreamLink;