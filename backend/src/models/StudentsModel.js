import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";
import ClassSection from "./ClassSectionModel.js";
import Gender from "./GenderModel.js";
import Class from "./ClassModel.js";

const Students = sequelize.define(
    "Students",
    {
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        student_uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            unique: true,
        },
        user_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            references: {
                model: "users",
                key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
        },
        roll_number: {
            type: DataTypes.STRING(50),
            allowNull: true,
            unique: false,
        },
        enrollment_date: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        class_section_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            references: {
                model: "class_section",
                key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
        },
        date_of_birth: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        gender_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            references: {
                model: "gender",
                key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
        },
        guardian_name: {
            type: DataTypes.STRING(150),
            allowNull: false,
        },
        guardian_phone: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        address: {
            type: DataTypes.TEXT,
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
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null,
        },
    },
    {
        tableName: "students",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        paranoid: true,
        deletedAt: "deleted_at",
    }
);

// Student belongs to Gender
Students.belongsTo(Gender, { foreignKey: "gender_id" });
Gender.hasMany(Students, { foreignKey: "gender_id" });

export default Students;
