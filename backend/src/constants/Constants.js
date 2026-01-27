// export const USER_ROLE = {
//   SUPERADMIN: "a3f8c4b2-7d5e-4a1c-9f42-12b67e8a5f11",
//   ADMIN: "b7d9e1a4-3c6f-4e2a-8f91-45a2c7d4e822",
//   TEACHER: "c6e4d7a1-9b23-46f0-a82c-13d8c5f44e93",
//   STUDENT: "d4f7a9e2-6c12-4f9b-87d5-98f2a4b3c7f4",
//   PARENT: "e8a2f6c1-5b9d-40d3-91f7-21c6a8e3b4d9",
// };

export const USER_ROLE = {
    SUPERADMIN: 1,
    ADMIN: 2,
    TEACHER: 3,
    STUDENT: 4,
};

export const PERMISSIONS = {
    // ---- School Management ----
    CREATE_SCHOOL: "create_school",
    READ_SCHOOL: "read_school",
    UPDATE_SCHOOL: "update_school",
    DELETE_SCHOOL: "delete_school",

    // ---- Teacher Management ----
    CREATE_TEACHER: "create_teacher",
    READ_TEACHER: "read_teacher",
    UPDATE_TEACHER: "update_teacher",
    DELETE_TEACHER: "delete_teacher",

    // ---- Student Management ----
    CREATE_STUDENT: "create_student",
    READ_STUDENT: "read_student",
    UPDATE_STUDENT: "update_student",
    DELETE_STUDENT: "delete_student",

    // ---- Course Management ----
    CREATE_COURSE: "create_course",
    READ_COURSE: "read_course",
    UPDATE_COURSE: "update_course",
    DELETE_COURSE: "delete_course",

    // ---- Assignments & Tests ----
    CREATE_ASSIGNMENT: "create_assignment",
    READ_ASSIGNMENT: "read_assignment",
    UPDATE_ASSIGNMENT: "update_assignment",
    DELETE_ASSIGNMENT: "delete_assignment",
    GRADE_ASSIGNMENT: "grade_assignment",
    SUBMIT_ASSIGNMENT: "submit_assignment",

    // ---- Announcements ----
    CREATE_ANNOUNCEMENT: "create_announcement",
    READ_ANNOUNCEMENT: "read_announcement",
    UPDATE_ANNOUNCEMENT: "update_announcement",
    DELETE_ANNOUNCEMENT: "delete_announcement",

    // ---- Study Materials ----
    UPLOAD_MATERIAL: "upload_material",
    READ_MATERIAL: "read_material",
    UPDATE_MATERIAL: "update_material",
    DELETE_MATERIAL: "delete_material",

    // ---- Reports & Analytics ----
    VIEW_REPORTS: "view_reports",

    // ---- Online Classes ----
    GENERATE_VIDEO_CLASS_LINK: "generate_video_class_link",
    JOIN_VIDEO_CLASS: "join_video_class",

    // ---- User Management ----
    CREATE_USER: "create_user",
    READ_USER: "read_user",
    UPDATE_USER: "update_user",
    DELETE_USER: "delete_user",

    // ---- Roles & Permissions ----
    MANAGE_ROLES: "manage_roles",

    // ---- Stream Management ----
    CREATE_STREAM: "create_stream",
    READ_STREAM: "read_stream",
    UPDATE_STREAM: "update_stream",
    DELETE_STREAM: "delete_stream",

    // ---- Class & Section Management ----
    CREATE_CLASS: "create_class",
    READ_CLASS: "read_class",
    UPDATE_CLASS: "update_class",
    DELETE_CLASS: "delete_class",

    // ---- School Subject Management ----
    CREATE_SCHOOL_SUBJECT: "create_school_subject",
    READ_SCHOOL_SUBJECT: "read_school_subject",
    UPDATE_SCHOOL_SUBJECT: "update_school_subject",
    DELETE_SCHOOL_SUBJECT: "delete_school_subject",

    // ---- Syllabus Management ----
    CREATE_SYLLABUS: "create_syllabus",
    READ_SYLLABUS: "read_syllabus",
    UPDATE_SYLLABUS: "update_syllabus",
    DELETE_SYLLABUS: "delete_syllabus",

    // ---- ASSESSMENT MODULE ----
    CREATE_ASSESSMENT: "create_assessment",
    READ_ASSESSMENT: "read_assessment",
    UPDATE_ASSESSMENT: "update_assessment",
    DELETE_ASSESSMENT: "delete_assessment",

    // ---- Chapter Management ----
    CREATE_CHAPTER: "create_chapter",
    READ_CHAPTER: "read_chapter",
    UPDATE_CHAPTER: "update_chapter",
    DELETE_CHAPTER: "delete_chapter",

    // ---- Report Management ----

    SUBJECT_WISE_STUDENTS_REPORT: "subject_wise_students_report",
    STUDENT_WISE_ACADEMIC_PROGRESS_REPORT: "student_wise_academic_progress_report",
    USER_WISE_CONTENT_UPLOADED_REPORT: "user_wise_content_uploaded_report",
    CLASS_WISE_STUDENT_REPORT: "class_wise_student_report",
    TEACHER_CONTENT_REPORT: "teacher_content_report",

    // ---- Notification Management ----
    CREATE_NOTIFICATION: "create_notification",
    READ_NOTIFICATION: "read_notification",
    UPDATE_NOTIFICATION: "update_notification",
    DELETE_NOTIFICATION: "delete_notification",
};

// ---- Notification Target Types ----
export const NOTIFICATION_TARGET_TYPES = {
    WHOLE_SCHOOL: "whole_school",
    ALL_TEACHERS: "all_teachers",
    TEACHERS_BY_CLASS: "teachers_by_class",
    TEACHERS_BY_CLASS_SECTION: "teachers_by_class_section",
    ALL_STUDENTS: "all_students",
    STUDENTS_BY_CLASS: "students_by_class",
    STUDENTS_BY_CLASS_SECTION: "students_by_class_section",
    TEACHER: "teacher",
    STUDENT: "student",
};


export const PROGRESS_STATUS = {
    NOT_STARTED: 1,
    IN_PROCESS: 2,
    COMPLETED: 3
};
