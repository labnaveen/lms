// models/city.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";
import SyllabusChapterResource from "./SyllabusChapterResourseModal.js";

const SyllabusResourceType = sequelize.define(
    "SyllabusResourceType",
    {
        id: {
            allowNull: false,
            autoIncrement: true,
            type: DataTypes.BIGINT,
            primaryKey: true,
        },

        syllabus_resource_type_uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            unique: true,
        },

        syllabus_resource_type_name: {
            type: DataTypes.STRING(20),
            allowNull: false,
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
        tableName: "syllabus_resource_type",
        paranoid: true,
        underscored: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        deletedAt: "deleted_at",
    }
);

// Optional: define associations
// SyllabusResourceType.belongsTo(State, { foreignKey: "state_id", as: "state" });

// After importing models
SyllabusChapterResource.belongsTo(SyllabusResourceType, {
    foreignKey: "syllabus_resource_type_id",
    targetKey: "id",
});
SyllabusResourceType.hasMany(SyllabusChapterResource, {
    foreignKey: "syllabus_resource_type_id",
    sourceKey: "id",
});

export default SyllabusResourceType;
