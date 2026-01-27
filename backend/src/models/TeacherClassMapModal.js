import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js"; // adjust the path to your sequelize instance
import ClassSection from "./ClassSectionModel.js";
import TeacherSubjectMap from "./TeacherSubjectMapModal.js";

const TeacherClassMap = sequelize.define(
    "TeacherClassMap",
    {
        id: {
            allowNull: false,
            autoIncrement: true,
            type: DataTypes.BIGINT,
            primaryKey: true,
        },

        accademic_year_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            references: {
                model: "accademic_year",
                key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
        },

        teacher_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            references: {
                model: "teachers",
                key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
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
        tableName: "teacher_class_map",
        paranoid: true,
        underscored: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        deletedAt: "deleted_at",
    }
);
TeacherClassMap.belongsTo(ClassSection, {
    foreignKey: "class_section_id",
});

ClassSection.hasMany(TeacherClassMap, {
    foreignKey: "class_section_id",
});

// ✅ If each TeacherClassMap can have multiple subject mappings
TeacherClassMap.hasMany(TeacherSubjectMap, {
    foreignKey: "teacher_class_map_id",
});

TeacherSubjectMap.belongsTo(TeacherClassMap, {
    foreignKey: "teacher_class_map_id",
});

export default TeacherClassMap;
