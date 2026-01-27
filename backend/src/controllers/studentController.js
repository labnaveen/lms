import Gender from "../models/GenderModel.js";
import Student from "../models/StudentsModel.js";
import ClassSection from "../models/ClassSectionModel.js";
import Users from "../models/UserModal.js";
import ResponseHelper from "../helpers/ResponseHelper.js";
import sanitizeHtml from "sanitize-html";
import CommonHelper from "../helpers/CommonHelper.js";
import bcrypt from "bcrypt";
import Schools from "../models/SchoolsModal.js";
import Class from "../models/ClassModel.js";
import { Op } from "sequelize";
import sequelize from "../config/db.config.js";
import { USER_ROLE } from "../constants/Constants.js";
import TeacherClassMap from "../models/TeacherClassMapModal.js";
import UserPermission from "../models/userPermissionModel.js";
import Stream from "../models/StreamModel.js";
import Teacher from "../models/TeacherModel.js";

const studentIncludes = [
    {
        model: Users,
        attributes: ["id", "user_uuid", "name", "email", "phone", "profile_photo_url", "is_active", "is_verified", "last_login_at", "role_id", "school_id"],
        include: [
            {
                model: Schools,
                // as: "school",
                attributes: ["id", "school_uuid", "name", "address", "phone", "email"],
            },
            {
                model: UserPermission,
                attributes: ["permission_id"],
                where: { is_allowed: true },
                required: false,
            },
        ],
    },
    {
        model: ClassSection,
        attributes: ["id", "class_section_uuid", "class_section_name", "class_id"],
        include: [
            {
                model: Class,
                attributes: ["id", "class_uuid", "class_name"],
            },

            {
                model: Stream,
                attributes: ["stream_name"],
            },
        ],
    },
    { model: Gender, attributes: ["id", "gender_name", "gender_uuid"] },
];

export const listStudents = async (req, res) => {
    try {
        let { search, page = 1, limit = 10, class_uuid, section_uuid } = req.query;
        search = search?.trim() || "";
        const pageInt = parseInt(page, 10);
        const limitInt = parseInt(limit, 10);
        const offset = (pageInt - 1) * limitInt;
        const schoolUuid = req.credentials.schoolUuid || req.headers["school-uuid"];
        const userRole = req.credentials.roleId;
        const userId = req.credentials.id;

        let whereClause = {};
        // Get schoolId for filtering Class
        let schoolId = null;
        if (schoolUuid) {
            const schoolObj = await Schools.findOne({ where: { school_uuid: schoolUuid } });
            schoolId = schoolObj ? schoolObj.id : null;
        }
        let include = [
            {
                model: Users,
                attributes: ["user_uuid", "name", "email", "phone" , "profile_photo_url"],
                include: [
                    {
                        model: Schools,
                        attributes: [],
                        required: true,
                        where: schoolUuid ? { school_uuid: schoolUuid } : undefined,
                    },
                ],
            },
            {
                model: ClassSection,
                attributes: ["class_section_name"],
                required: false,
                include: [
                    {
                        model: Class,
                        attributes: ["class_name"],
                        required: true,
                        where: schoolId ? { school_id: schoolId } : undefined,
                    },
                    {
                        model : Stream ,
                        attributes: ["stream_name"],
                    }
                ],
            },
            {
                model: Gender,
                attributes: ["gender_name"],
                required: false,
            },
        ];

        let schoolInfo;

        // SCHOOL and SUPERADMIN: filter by schoolUuid if present
        if (userRole === USER_ROLE.SUPERADMIN || userRole === USER_ROLE.ADMIN) {
            if (schoolUuid) {
                schoolInfo = await Schools.findOne({ where: { school_uuid: schoolUuid } });
            }
            if (schoolUuid) {
                include[0].include[0].where = { school_uuid: schoolUuid };
            } else {
                include[0].include[0].where = undefined;
            }
            let schoolSectionIds = [];
            // Get all class ids for this school
            let classIds = [];
            if (schoolId) {
                const classes = await Class.findAll({ where: { school_id: schoolId } });
                classIds = classes.map((cls) => cls.id);
            }
            // --- CLASS/SECTION FILTERS ---
            if (class_uuid && section_uuid) {
                // Both class and section provided: intersection
                const classObj = await Class.findOne({ where: { class_uuid, school_id: schoolId } });
                const sectionObj = await ClassSection.findOne({ where: { class_section_uuid: section_uuid, class_id: classObj ? classObj.id : null } });
                if (classObj && sectionObj && sectionObj.class_id === classObj.id) {
                    schoolSectionIds = [sectionObj.id];
                } else {
                    schoolSectionIds = [];
                }
                // Add class filter
                whereClause["$ClassSection.class_id$"] = classObj ? classObj.id : null;
                // Add section filter
                whereClause["class_section_id"] = sectionObj ? sectionObj.id : null;
            } else if (class_uuid) {
                // Only class_uuid provided: all active sections of that class
                const classObj = await Class.findOne({ where: { class_uuid, school_id: schoolId } });
                if (classObj) {
                    const classSections = await ClassSection.findAll({
                        where: {
                            class_id: classObj.id,
                            deleted_at: null,
                        },
                    });
                    const sectionIds = classSections.map((cs) => cs.id);
                    if (sectionIds.length === 0) {
                        return ResponseHelper.OK(res, true, "No students found!", [], null, "Fetch students list API.");
                    }
                    schoolSectionIds = sectionIds;
                    // Add class filter
                    whereClause["$ClassSection.class_id$"] = classObj.id;
                } else {
                    return ResponseHelper.OK(res, true, "No students found!", [], null, "Fetch students list API.");
                }
            } else if (section_uuid) {
                // Only section provided: just that section, but ensure section belongs to a class of this school
                const sectionObj = await ClassSection.findOne({
                    where: { class_section_uuid: section_uuid, class_id: { [Op.in]: classIds } },
                });
                if (sectionObj) {
                    schoolSectionIds = [sectionObj.id];
                    // Add section filter
                    whereClause["class_section_id"] = sectionObj.id;
                }
            } else {
                // No class/section filter: restrict to all sections of this school
                if (classIds.length > 0) {
                    const allSections = await ClassSection.findAll({ where: { class_id: { [Op.in]: classIds }, deleted_at: null } });
                    schoolSectionIds = allSections.map((s) => s.id);
                }
            }
            // If any filter is provided but no valid section found, return empty
            if ((class_uuid || section_uuid) && schoolSectionIds.length === 0) {
                return ResponseHelper.OK(res, true, "No students found!", [], null, "Fetch students list API.");
            }
            // Always restrict by section ids for this school
            if (schoolSectionIds.length > 0) {
                whereClause.class_section_id = { [Op.in]: schoolSectionIds };
            } else {
                // If no sections for this school, return empty
                return ResponseHelper.OK(res, true, "No students found!", [], null, "Fetch students list API.");
            }
        } else if (userRole === USER_ROLE.TEACHER) {
            // 1. Get teacher's school_uuid from DB
            const teacherUser = await Users.findOne({ where: { id: userId } });
            if (!teacherUser) {
                return ResponseHelper.BadRequest(res, "Teacher does not exist", "Fetch students list API.");
            }
            // console.log("teacher user school id", teacherUser.school_id);
            // 2. Get school_uuid for teacher
            const teacherSchool = await Schools.findOne({ where: { id: teacherUser.school_id } });
            // console.log("Teacher School UUID", teacherSchool.school_uuid);
            // console.log("Requested School UUID", schoolUuid);
            if (!teacherSchool || teacherSchool.school_uuid !== schoolUuid) {
                return ResponseHelper.BadRequest(res, "Teacher does not exist in this school", "Fetch students list API.");
            }
            // 3. Get all class_section_ids mapped to this teacher
            const teacherDetails = await Teacher.findOne({ where: { user_id: userId } })
            const teacherClassMaps = await TeacherClassMap.findAll({ where: { teacher_id: teacherDetails?.id } });
            let teacherClassSectionIds = teacherClassMaps.map((map) => map.class_section_id);
            // 4. Filter teacherClassSectionIds to only those belonging to the requested school
            let schoolClassIds = [];
            if (schoolId) {
                const schoolClasses = await Class.findAll({ where: { school_id: schoolId } });
                schoolClassIds = schoolClasses.map((cls) => cls.id);
            }
            // Get only sections in this school
            const schoolSections = await ClassSection.findAll({ where: { class_id: { [Op.in]: schoolClassIds }, id: { [Op.in]: teacherClassSectionIds } } });
            let filteredSectionIds = schoolSections.map((cs) => cs.id);
            // If teacher is not mapped to any section in this school, return error
            if (filteredSectionIds.length === 0) {
                return ResponseHelper.BadRequest(res, "Teacher is not mapped to any section in this school", "Fetch students list API.");
            }
            // 5. Filter by class_uuid if provided
            if (class_uuid) {
                const classObj = await Class.findOne({ where: { class_uuid, school_id: schoolId } });
                if (classObj) {
                    const classSections = await ClassSection.findAll({ where: { class_id: classObj.id, id: filteredSectionIds } });
                    filteredSectionIds = classSections.map((cs) => cs.id);
                } else {
                    filteredSectionIds = [];
                }
            }
            // 6. Filter by section_uuid if provided
            if (section_uuid) {
                const sectionObj = await ClassSection.findOne({ where: { class_section_uuid: section_uuid, id: { [Op.in]: filteredSectionIds } } });
                if (sectionObj) {
                    if (class_uuid) {
                        const classObj = await Class.findOne({ where: { class_uuid, school_id: schoolId } });
                        if (classObj && sectionObj.class_id === classObj.id) {
                            filteredSectionIds = [sectionObj.id];
                        } else {
                            filteredSectionIds = [];
                        }
                    } else {
                        filteredSectionIds = [sectionObj.id];
                    }
                } else {
                    filteredSectionIds = [];
                }
            }
            if (filteredSectionIds.length === 0) {
                return ResponseHelper.OK(res, true, "No students found!", [], null, "Fetch students list API.");
            }
            whereClause.class_section_id = { [Op.in]: filteredSectionIds };
        }
        if (search) {
            whereClause[Op.or] = [
                { roll_number: { [Op.like]: `%${search}%` } },
                { "$User.name$": { [Op.like]: `%${search}%` } },
                { "$User.email$": { [Op.like]: `%${search}%` } },
            ];
        }
        const order = [["id", "DESC"]];
        const { rows, count } = await Student.findAndCountAll({
            where: whereClause,
            include,
            limit: limitInt,
            offset,
            order,
            distinct: true,
        });
        const meta = {
            totalCount: count || 0,
            pageCount: Math.ceil((count || 0) / limitInt),
            currentPage: pageInt,
            perPage: limitInt,
            hasNextPage: pageInt < Math.ceil((count || 0) / limitInt),
            hasPrevPage: pageInt > 1,
        };
        return ResponseHelper.OK(res, true, rows.length ? "Students list fetched successfully!" : "No students found!", rows, rows.length ? meta : null, "Fetch students list API.");
    } catch (error) {
        return ResponseHelper.ISError(res, error?.message || "Unknown error", "Fetch students list API.");
    }
};

export const addStudent = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        let { name, email, phone, address, parent_name, parent_phone, class: classUuid, section: sectionUuid, gender: genderUuid, date_of_birth, roll_number, enrollment_date, permissions } = req.body;
        const profileImagePath = req.file ? req.file.path : null;

        const schoolUuid = req.credentials.schoolUuid || req.headers["school-uuid"];

        // ✅ 1. Check for school UUID
        if (!schoolUuid) {
            await t.rollback();
            return ResponseHelper.BadRequest(res, "School UUID missing in credentials", "Add Student API");
        }

        // ✅ 2. Find school info
        const schoolInfo = await Schools.findOne({
            where: { school_uuid: schoolUuid, deleted_at: null },
            transaction: t,
        });
        if (!schoolInfo) {
            await t.rollback();
            return ResponseHelper.OK(res, true, "School not found", null, null, "Add Student API");
        }

        // // ✅ 3. Password validation
        // if (password !== confirmPassword) {
        //   await t.rollback();
        //   return ResponseHelper.BadRequest(res, "Passwords do not match");
        // }

        // ✅ 4. Check for existing user
        const existingUser = await Users.findOne({
            where: { 
                email, 
                deleted_at: null ,
                school_id: schoolInfo?.id
        },
            transaction: t,
        });
        if (existingUser) {
            await t.rollback();
            return ResponseHelper.Conflict(res, "User already exists", null, "Add Student API");
        }

        // ✅ 5. Resolve foreign keys
        const [sectionData, genderData] = await Promise.all([
            ClassSection.findOne({
                where: { class_section_uuid: sectionUuid },
                transaction: t,
            }),
            Gender.findOne({
                where: { gender_uuid: genderUuid },
                transaction: t,
            }),
        ]);

        if (!sectionData) {
            await t.rollback();
            return ResponseHelper.OK(res, false, "Section not found", null, null, "Add Student API");
        }
        if (!genderData) {
            await t.rollback();
            return ResponseHelper.NotFound(res, false, "Gender not found", null, null, "Add Student API");
        }

        // ✅ 6. Check duplicate roll number
        const existingRollNumber = await Student.findOne({
            where: {
                roll_number,
                class_section_id: sectionData.id,
            },
            transaction: t,
        });
        if (existingRollNumber) {
            await t.rollback();
            return ResponseHelper.Conflict(res, "Roll number already exists in this section", "Add Student API");
        }

        // ✅ 7. Hash password
        const password = await CommonHelper.generateStrongPassword(12);
        const hashedPassword = await bcrypt.hash(password, 10);
        const clean = (v) => sanitizeHtml(v || "").trim();
        const formatDate = (d) => (d ? new Date(d).toISOString().split("T")[0] : null);

        // ✅ 8. Create user
        const user = await Users.create(
            {
                school_id: schoolInfo.id,
                role_id: USER_ROLE.STUDENT,
                name: clean(name),
                email: clean(email),
                phone: clean(phone),
                password_hash: hashedPassword,
                profile_photo_url: profileImagePath || null,
                is_verified: true,
                is_active: true,
            },
            { transaction: t }
        );

        // ✅ 9. Create student`
        const studentPayload = {
            user_id: user.id,
            school_uuid: schoolUuid,
            class_section_id: sectionData.id,
            gender_id: genderData.id,
            roll_number: clean(roll_number),
            date_of_birth: formatDate(date_of_birth),
            enrollment_date: formatDate(enrollment_date),
            address: clean(address),
            guardian_name: clean(parent_name), // 👈 mapped correctly
            guardian_phone: clean(parent_phone), // 👈 mapped correctly
        };
        if (typeof permissions === "string") {
            permissions = JSON.parse(permissions);
        }

        if (Array.isArray(permissions) && permissions.length > 0) {
            for (const permissionId of permissions) {
                await UserPermission.create(
                    {
                        user_id: user.id,
                        permission_id: permissionId,
                        is_allowed: true,
                    },
                    { transaction: t }
                );
            }
        }

        await Student.create(studentPayload, { transaction: t });
        await CommonHelper.sendCredentialsMail(email, password, name);
        await CommonHelper.logActivity(
        {
            title: "New Student Created",
            description: `${name} was added.`,
            created_by: req.credentials.id,
        },
        { transaction: t }
        );
        await t.commit();
        return ResponseHelper.OK(res, true, "Student added successfully", {
            email,
            password,
        });
    } catch (error) {
        await t.rollback();
        return ResponseHelper.ISError(res, "Failed to add student", error.message);
    }
};

export const updateStudent = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        let { name, email, phone, address, parent_name, parent_phone, class: classUuid, section: sectionUuid, gender: genderUuid, date_of_birth, roll_number, enrollment_date, permissions } = req.body;

        const filesData = req.files || [];
         const profileImagePath = req.file ? req.file.path : null;
        const schoolUuid = req.headers["schooluuid"] || req.headers["school-uuid"] || req.headers["School-Uuid"];

        const { student_uuid } = req.params; // ✅ assuming student UUID is passed in params

        // ✅ 1. Validate school UUID
        if (!schoolUuid) {
            await t.rollback();
            return ResponseHelper.BadRequest(res, "School UUID missing in credentials");
        }

        // ✅ 2. Find school
        const schoolInfo = await Schools.findOne({
            where: { school_uuid: schoolUuid, deleted_at: null },
            transaction: t,
        });
        if (!schoolInfo) {
            await t.rollback();
            return ResponseHelper.OK(res, false, "School not found", null, null, "Update Student API");
        }

        // ✅ 3. Find existing student & user
        const existingStudent = await Student.findOne({
            where: { student_uuid: student_uuid },
            include: [{ model: Users, as: "User", where: { deleted_at: null } }],
            transaction: t,
        });

        if (!existingStudent) {
            await t.rollback();
            ResponseHelper.OK(res, false, "School not found", null, null, "Update Student API");
        }

        // ✅ 5. Resolve foreign keys
        const [sectionData, genderData] = await Promise.all([
            ClassSection.findOne({
                where: { class_section_uuid: sectionUuid },
                transaction: t,
            }),
            Gender.findOne({
                where: { gender_uuid: genderUuid },
                transaction: t,
            }),
        ]);

        if (!sectionData) {
            await t.rollback();
            ResponseHelper.OK(res, false, "Section not found", null, null, "Update Student API");
        }
        if (!genderData) {
            await t.rollback();
            ResponseHelper.OK(res, false, "Gender not found", null, null, "Update Student API");
        }

        // ✅ 6. Check duplicate roll number (only if changed)
        if (roll_number && roll_number !== existingStudent.roll_number) {
            const duplicateRoll = await Student.findOne({
                where: {
                    roll_number,
                    class_section_id: sectionData.id,
                },
                transaction: t,
            });
            if (duplicateRoll) {
                await t.rollback();
                return ResponseHelper.Conflict(res, "Roll number already exists in this section", "Update Student API");
            }
        }

        // ✅ 7. Prepare updates
        const clean = (v) => sanitizeHtml(v || "").trim();
        const formatDate = (d) => (d ? new Date(d).toISOString().split("T")[0] : null);

        // ✅ 8. Update user
        const userUpdatePayload = {
            name: clean(name),
            email: clean(email),
            phone: clean(phone),
        };

        if (profileImagePath) userUpdatePayload.profile_photo_url = profileImagePath;

        await Users.update(userUpdatePayload, {
            where: { id: existingStudent.user_id },
            transaction: t,
        });

        // ✅ 9. Update student
        const studentUpdatePayload = {
            class_section_id: sectionData.id,
            gender_id: genderData.id,
            roll_number: clean(roll_number),
            date_of_birth: formatDate(date_of_birth),
            enrollment_date: formatDate(enrollment_date),
            address: clean(address),
            guardian_name: clean(parent_name),
            guardian_phone: clean(parent_phone),
        };

        await Student.update(studentUpdatePayload, {
            where: { student_uuid: student_uuid },
            transaction: t,
        });
        if (typeof permissions === "string") {
            permissions = JSON.parse(permissions);
        }

        if (Array.isArray(permissions) && permissions.length > 0) {
            await UserPermission.destroy({
                where: { user_id: existingStudent.user_id },
                transaction: t
            });
            for (const permissionId of permissions) {
                await UserPermission.create(
                    {
                        user_id: existingStudent.user_id,
                        permission_id: permissionId,
                        is_allowed: true,
                    },
                    { transaction: t }
                );
            }
        }

        await t.commit();
        ResponseHelper.OK(res, false, "Student updated successfully", null, null, "Update Student API");
    } catch (error) {
        await t.rollback();

        return ResponseHelper.ISError(res, "Failed to update student", "Update Student API");
    }
};

export const getStudentDetails = async (req, res) => {
    try {
        const { student_uuid } = req?.params ?? {};
        if (!student_uuid) return ResponseHelper.BadRequest(res, "Student UUID is required", null, "Fetch student details API.");

        const student_id = await CommonHelper.getIdFromUuid(Student, student_uuid, res, "Update student API", "student_uuid");
        if (!student_id) return ResponseHelper.OK(res, false, "Student not found", null, null, "Fetch student details API.");

        const student = await Student.findOne({
            where: { id: student_id },
            include: studentIncludes,
        });
        return student
            ? ResponseHelper.OK(res, true, "Student details fetched successfully!", student, null, "Fetch student details API.")
            : ResponseHelper.OK(res, false, "Student not found", null, null, "Fetch student details API.");
    } catch (error) {
        return ResponseHelper.ISError(res, error?.message ?? "Unknown error", "Fetch student details API.");
    }
};

export const deleteStudent = async (req, res) => {
    const t = await sequelize.transaction(); // 👈 Start transaction
    try {
        const { student_uuid } = req?.params ?? {};
        if (!student_uuid)
            return ResponseHelper.BadRequest(
                res,
                "Student UUID is required",
                null,
                "Delete student API."
            );

        // 1️⃣ Find student by UUID
        const student = await Student.findOne({
            where: { student_uuid, deleted_at: null },
            transaction: t,
        });

        if (!student) {
            await t.rollback();
            return ResponseHelper.OK(
                res,
                false,
                "Student not found",
                null,
                null,
                "Delete student API."
            );
        }

        // 2️⃣ Soft delete student
        await Student.update(
            { deleted_at: new Date() },
            { where: { student_uuid }, transaction: t }
        );

        // 3️⃣ Soft delete linked user if exists
        if (student.user_id) {
            await Users.update(
                { deleted_at: new Date() },
                { where: { id: student.user_id }, transaction: t }
            );
        }

        // 4️⃣ Commit transaction
        await t.commit();

        return ResponseHelper.OK(
            res,
            true,
            "Student deleted successfully",
            null,
            null,
            "Delete student API."
        );
    } catch (error) {
        // ❌ Rollback on error
        await t.rollback();
        return ResponseHelper.ISError(
            res,
            error?.message ?? "Unknown error",
            "Delete student API."
        );
    }
};

