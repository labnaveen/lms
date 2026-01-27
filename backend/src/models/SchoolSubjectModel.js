// models/city.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.config.js";

import Subject from "./SubjectModel.js";
import Schools from "./SchoolsModal.js";
import Class from "./ClassModel.js";
import Stream from "./StreamModel.js";
import Assessment from "./AssessmentModal.js";
import TeacherSubjectMap from "./TeacherSubjectMapModal.js";
import SchoolSubjectStreamLink from "./SchoolSubjectStreamModel.js";

const SchoolSubject = sequelize.define(
    "SchoolSubject",
    {
        id: {
            allowNull: false,
            autoIncrement: true,
            type: DataTypes.BIGINT,
            primaryKey: true,
        },

        school_subject_uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            unique: true,
        },

        subject_name: {
            type: DataTypes.STRING(150),
            allowNull: true,
        },

        subject_code: {
            type: DataTypes.STRING(20),
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

        subject_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            references: {
                model: "subject",
                key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
        },

        class_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            references: {
                model: "class",
                key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
        },

        stream_id: {
            type: DataTypes.BIGINT,
            allowNull: null,
            references: {
                model: "stream",
                key: "id",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
        },

        // is_common: {
        //   type: DataTypes.BOOLEAN,
        //   allowNull: false,
        //   defaultValue: false,
        //   comment: 'This Is To Check Common Subjects For All Classes e.g Sport, Music etc'
        // },

        max_marks: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },

        passing_marks: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
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
        freezeTableName: true,
        tableName: "school_subject",
        timestamps: false, // since created_at and updated_at are defined manually
    }
);

// Each SchoolSubject belongs to a School
SchoolSubject.belongsTo(Schools, {
    foreignKey: "school_id",
    // as: "school",
});

// Optional: if you want reverse associations
Schools.hasMany(SchoolSubject, {
    foreignKey: "school_id",
    // as: "schoolSubjects",
});

// Each SchoolSubject belongs to a Subject
SchoolSubject.belongsTo(Subject, {
    foreignKey: "subject_id",
    // as: "subject",
});

// Optional: if you want reverse associations
Subject.hasMany(SchoolSubject, {
    foreignKey: "subject_id",
    // as: "schoolSubjects",
});

// // Each SchoolSubject optionally belongs to a Class
SchoolSubject.belongsTo(Class, {
    foreignKey: "class_id",
    // as: "class",
});

// Each SchoolSubject belongs to a Class
Class.hasMany(SchoolSubject, {
    foreignKey: "class_id",
    // as: "schoolSubjects",
});

// // Each SchoolSubject optionally belongs to a Stream
SchoolSubject.belongsTo(Stream, {
    foreignKey: "stream_id",
    // as: "stream",
});

Stream.hasMany(SchoolSubject, {
    foreignKey: "stream_id",
    // as: "schoolSubjects",
});

SchoolSubject.hasMany(Assessment, { foreignKey: "school_subject_id" });
Assessment.belongsTo(SchoolSubject, { foreignKey: "school_subject_id" });
SchoolSubject.hasMany(TeacherSubjectMap, { foreignKey: "school_subject_id" });
TeacherSubjectMap.belongsTo(SchoolSubject, { foreignKey: "school_subject_id" });

SchoolSubject.hasMany(SchoolSubjectStreamLink, { foreignKey: "school_subject_id" })
SchoolSubjectStreamLink.belongsTo(SchoolSubject, { foreignKey: "school_subject_id" })


export default SchoolSubject;
