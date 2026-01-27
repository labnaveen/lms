// models/city.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";
import ClassSection from "./ClassSectionModel.js";
import SchoolSubjectStreamLink from "./SchoolSubjectStreamModel.js";

const Stream = sequelize.define(
    "Stream",
    {
        id: {
            allowNull: false,
            autoIncrement: true,
            type: DataTypes.BIGINT,
            primaryKey: true,
        },

        stream_uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            unique: true,
        },

        stream_name: {
            type: DataTypes.STRING(150),
            allowNull: false,
        },

        stream_description: {
            type: DataTypes.STRING(512),
            allowNull: true,
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
        tableName: "stream",
        timestamps: true, // since created_at and updated_at are defined manually
        paranoid: true,
        freezeTableName: true,
        createdAt: "created_at", // optional if your column name is not default 'deletedAt'
        updatedAt: "updated_at", // optional if your column name is not default 'deletedAt'
        deletedAt: "deleted_at", // optional if your column name is not default 'deletedAt'
    }
);

// Optional: define associations
// Stream.belongsTo(State, { foreignKey: "state_id", as: "state" });

Stream.hasMany(ClassSection, { foreignKey: 'stream_id' })
ClassSection.belongsTo(Stream, { foreignKey: 'stream_id' })

Stream.hasMany(SchoolSubjectStreamLink, { foreignKey: "stream_id" })
SchoolSubjectStreamLink.belongsTo(Stream, { foreignKey: "stream_id" })

export default Stream;
