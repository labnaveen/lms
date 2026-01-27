// models/city.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";
import Assessment from "./AssessmentModal.js";

const AccademicYear = sequelize.define(
    "AccademicYear",
    {
        id: {
            allowNull: false,
            autoIncrement: true,
            type: DataTypes.BIGINT,
            primaryKey: true,
        },

        accademic_year_uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            unique: true,
        },

        accademic_year: {
            type: DataTypes.STRING(15),
            allowNull: false,
        },

        is_current: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
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
        tableName: "accademic_year",
        timestamps: false, // since created_at and updated_at are defined manually
    }
);

// Optional: define associations
// AccademicYear.belongsTo(State, { foreignKey: "state_id", as: "state" });

export default AccademicYear;
