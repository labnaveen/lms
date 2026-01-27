import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js"; // adjust the path to your sequelize instance
import City from "./CityModel.js";
import State from "./StatesModel.js";
import Country from "./CountryModel.js";
import Class from "./ClassModel.js";
import Stream from "./StreamModel.js";

const Schools = sequelize.define(
    "Schools",
    {
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        school_uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            unique: true,
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        code: {
            type: DataTypes.STRING(50),
            allowNull: true,
            unique: true,
        },
        email: {
            type: DataTypes.STRING(150),
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        phone: {
            type: DataTypes.STRING(20),
            allowNull: true,
        },
        address: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        country_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
            references: {
                model: "countries",
                key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
        },
        state_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "states",
                key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
        },
        city_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: "cities",
                key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
        },
        city_name: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        pin_code: {
            type: DataTypes.STRING(20),
            allowNull: true,
        },
        website: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        logo_url: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
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
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null,
        },
    },

    {
        tableName: "schools",
        paranoid: true,
        underscored: true,
    }
);

Schools.belongsTo(City, { foreignKey: "city_id", as: "city" });
Schools.belongsTo(Country, { foreignKey: "country_id", as: "country" });
Schools.belongsTo(State, { foreignKey: "state_id", as: "state" });

// One School → Many Classes
Schools.hasMany(Class, { foreignKey: "school_id" });
// Each Class belongs to a School
Class.belongsTo(Schools, { foreignKey: "school_id" });

// One School → Many Streams
Schools.hasMany(Stream, { foreignKey: "school_id" });

// Each Stream belongs to a School
Stream.belongsTo(Schools, { foreignKey: "school_id" });

export default Schools;
