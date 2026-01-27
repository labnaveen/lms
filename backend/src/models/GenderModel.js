// models/city.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";

const Gender = sequelize.define(
    "Gender",
    {
        id: {
            allowNull: false,
            autoIncrement: true,
            type: DataTypes.BIGINT,
            primaryKey: true,
        },

        gender_uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            unique: true,
        },

        gender_name: {
            type: DataTypes.STRING(20),
            allowNull: false,
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
        tableName: "gender",
        timestamps: false, // since created_at and updated_at are defined manually
    }
);

// Optional: define associations
// Gender.belongsTo(State, { foreignKey: "state_id", as: "state" });

export default Gender;
