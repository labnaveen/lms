import Users from "../models/UserModal.js";
import Teacher from "../models/TeacherModel.js";
import Students from "../models/StudentsModel.js";
import TeacherClassMap from "../models/TeacherClassMapModal.js";
import ClassSection from "../models/ClassSectionModel.js";
import { Op } from "sequelize";
import { USER_ROLE } from "../constants/Constants.js";

// Get all users (teachers + students) by school
export async function getAllUsersBySchool(school_id) {
    const users = await Users.findAll({
        where: {
            school_id,
            deleted_at: null,
            role_id: { [Op.in]: [USER_ROLE.TEACHER, USER_ROLE.STUDENT] }, // 3: Teacher, 4: Student
        },
        attributes: ["id"],
    });
    return users.map((u) => u.id);
}

// Get all teachers by school
export async function getAllTeachersBySchool(school_id) {
    const teachers = await Users.findAll({
        where: {
            school_id,
            deleted_at: null,
            role_id: USER_ROLE.TEACHER, // 3: Teacher
        },
        attributes: ["id"],
    });
    return teachers.map((t) => t.id);
}

// Get all students by school
export async function getAllStudentsBySchool(school_id) {
    const students = await Users.findAll({
        where: {
            school_id,
            deleted_at: null,
            role_id: USER_ROLE.STUDENT, // 4: Student
        },
        attributes: ["id"],
    });
    return students.map((s) => s.id);
}

// Get all teachers by class
export async function getTeachersByClass(class_id) {
    // Find all class_section_ids for this class
    const classSections = await ClassSection.findAll({
        where: { class_id, deleted_at: null },
        attributes: ["id"],
    });
    const classSectionIds = classSections.map((cs) => cs.id);

    // Find all teacher_class_map entries for these sections
    const teacherMaps = await TeacherClassMap.findAll({
        where: { class_section_id: { [Op.in]: classSectionIds }, deleted_at: null },
        attributes: ["teacher_id"],
    });
    const teacherIds = teacherMaps.map((tm) => tm.teacher_id);

    // Get user IDs for these teachers
    const teachers = await Teacher.findAll({
        where: { id: { [Op.in]: teacherIds }, deleted_at: null },
        attributes: ["user_id"],
    });
    return teachers.map((t) => t.user_id);
}

// Get all teachers by class and section
export async function getTeachersByClassSection(class_id, class_section_id) {
    // Find all teacher_class_map entries for this class_section
    const teacherMaps = await TeacherClassMap.findAll({
        where: { class_section_id, deleted_at: null },
        attributes: ["teacher_id"],
    });
    const teacherIds = teacherMaps.map((tm) => tm.teacher_id);

    // Get user IDs for these teachers
    const teachers = await Teacher.findAll({
        where: { id: { [Op.in]: teacherIds }, deleted_at: null },
        attributes: ["user_id"],
    });
    return teachers.map((t) => t.user_id);
}

// Get all students by class
export async function getStudentsByClass(class_id) {
    // Find all class_section_ids for this class
    const classSections = await ClassSection.findAll({
        where: { class_id, deleted_at: null },
        attributes: ["id"],
    });
    const classSectionIds = classSections.map((cs) => cs.id);

    // Find all students in these sections
    const students = await Students.findAll({
        where: { class_section_id: { [Op.in]: classSectionIds }, deleted_at: null },
        attributes: ["user_id"],
    });
    return students.map((s) => s.user_id);
}

// Get all students by class and section
export async function getStudentsByClassSection(class_id, class_section_id) {
    // Find all students in this class_section
    const students = await Students.findAll({
        where: { class_section_id, deleted_at: null },
        attributes: ["user_id"],
    });
    return students.map((s) => s.user_id);
}

// Get all students by teacher (all classes/sections assigned to teacher)
export async function getAllStudentsByTeacher(user_id) {
    // Find teacher by user_id
    const teacher = await Teacher.findOne({ where: { user_id, deleted_at: null }, attributes: ["id"] });
    if (!teacher) return [];
    // Find all class_section_ids assigned to this teacher
    const teacherClassMaps = await TeacherClassMap.findAll({
        where: { teacher_id: teacher.id, deleted_at: null },
        attributes: ["class_section_id"],
    });
    const classSectionIds = teacherClassMaps.map((map) => map.class_section_id);
    // Find all students in these sections
    const students = await Students.findAll({
        where: { class_section_id: { [Op.in]: classSectionIds }, deleted_at: null },
        attributes: ["user_id"],
    });
    return students.map((s) => s.user_id);
}

// Get all students by teacher and class
export async function getStudentsByTeacherAndClass(user_id, class_id) {
    // Find teacher by user_id
    const teacher = await Teacher.findOne({ where: { user_id, deleted_at: null }, attributes: ["id"] });
    if (!teacher) return [];
    // Find all class_section_ids for this class
    const classSections = await ClassSection.findAll({
        where: { class_id, deleted_at: null },
        attributes: ["id"],
    });
    const classSectionIds = classSections.map((cs) => cs.id);
    // Find all class_section_ids assigned to this teacher for this class
    const teacherClassMaps = await TeacherClassMap.findAll({
        where: { teacher_id: teacher.id, class_section_id: { [Op.in]: classSectionIds }, deleted_at: null },
        attributes: ["class_section_id"],
    });
    const allowedSectionIds = teacherClassMaps.map((map) => map.class_section_id);
    // Find all students in these sections
    const students = await Students.findAll({
        where: { class_section_id: { [Op.in]: allowedSectionIds }, deleted_at: null },
        attributes: ["user_id"],
    });
    return students.map((s) => s.user_id);
}

// Get all students by teacher, class, and section
export async function getStudentsByTeacherClassSection(user_id, class_section_id) {
    // Find teacher by user_id
    const teacher = await Teacher.findOne({ where: { user_id, deleted_at: null }, attributes: ["id"] });
    if (!teacher) return [];
    // Check if teacher is assigned to this class_section
    const teacherClassMap = await TeacherClassMap.findOne({
        where: { teacher_id: teacher.id, class_section_id, deleted_at: null },
    });
    if (!teacherClassMap) return [];
    // Find all students in this section
    const students = await Students.findAll({
        where: { class_section_id, deleted_at: null },
        attributes: ["user_id"],
    });
    return students.map((s) => s.user_id);
}

export async function getIndividualTeacher(teacher_id) {
    const teacher_user_id = await Teacher.findOne({
        where: { id: teacher_id, deleted_at: null },
        attributes: ["user_id"],
    });
    return teacher_user_id ? teacher_user_id?.user_id : null;
}
