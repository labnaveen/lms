import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js"; // adjust path to your sequelize instance
import Schools from "./SchoolsModal.js";
import Students from "./StudentsModel.js";
import StudentAssessmentResult from "./StudentAssessmentResultModal.js";
import Assessment from "./AssessmentModal.js";
import Roles from "./RoleModel.js";
import UserCourseEnrollment from "./UserCourseEnrollment.js";

const Users = sequelize.define(
    "Users",
    {
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        user_uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            unique: true,
            allowNull: false,
        },
        school_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: "schools",
                key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
        },
        role_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            references: {
                model: "roles",
                key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "RESTRICT",
        },
        name: {
            type: DataTypes.STRING(150),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(150),
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING(20),
            allowNull: true,
        },
        password_hash: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        profile_photo_url: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
        is_verified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        last_login_at: {
            type: DataTypes.DATE,
            allowNull: true,
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
        tableName: "users",
        paranoid: true,
        underscored: true,
    }
);

// User belongs to a school
// Users.belongsTo(Schools, { foreignKey: "school_id", as: "school" });
Users.belongsTo(Schools, { foreignKey: "school_id" });

// Optional: if you want the reverse association here as well
// Schools.hasMany(Users, { foreignKey: "school_id", as: "users" });
Schools.hasMany(Users, { foreignKey: "school_id" });

Users.hasOne(Students, { foreignKey: "user_id" });
Students.belongsTo(Users, { foreignKey: "user_id" });

Users.hasMany(StudentAssessmentResult, { foreignKey: "student_id" });
StudentAssessmentResult.belongsTo(Users, { foreignKey: "student_id" });

Users.hasMany(UserCourseEnrollment, { foreignKey: "user_id" });
UserCourseEnrollment.belongsTo(Users, { foreignKey: "user_id" });

Users.hasMany(Assessment, { foreignKey: 'created_by' })
Assessment.belongsTo(Users, { foreignKey: 'created_by' })

Roles.hasMany(Users, { foreignKey: "role_id" })
Users.belongsTo(Roles, { foreignKey: "role_id" })

export default Users;
