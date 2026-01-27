import ResponseHelper from "../helpers/ResponseHelper.js";
import sanitizeHtml from "sanitize-html";
import Post from "../models/PostsModel.js";
import Qualification from "../models/QualificationModel.js";
import TeacherQualification from "../models/TeacherQualification.js";
import Teacher from "../models/TeacherModel.js";
import Users from "../models/UserModal.js";
import Schools from "../models/SchoolsModal.js";
import { USER_ROLE } from "../constants/Constants.js";
import bcrypt from "bcrypt";
import sequelize from "../config/db.config.js";
import { buildSearchQuery } from "../utils/searchHelper.js";
import Category from "../models/CasteCategoryModal.js";
import UserPermission from "../models/userPermissionModel.js";
import TeacherClassMap from "../models/TeacherClassMapModal.js";
import TeacherSubjectMap from "../models/TeacherSubjectMapModal.js";
import AccademicYear from "../models/AccademicYearModel.js";
import ClassSection from "../models/ClassSectionModel.js";
import SchoolSubject from "../models/SchoolSubjectModel.js";
import CommonHelper from "../helpers/CommonHelper.js";
import Class from "../models/ClassModel.js";
import Subject from "../models/SubjectModel.js";
import { Op } from "sequelize";
import Stream from "../models/StreamModel.js";

export const teachersCategoriesDropdown = async (req, res) => {
  try {
    const teacherCategories = await Category.findAll({
      attributes: { exclude: ["created_at", "updated_at"] },
    });

    return ResponseHelper.OK(
      res,
      true,
      "Teachers categories fetched successfully!",
      teacherCategories,
      null,
      "Get teachers categories API"
    );
  } catch (error) {
    return ResponseHelper.ISError(
      res,
      error.message || "Failed to retrieve teacher categories",
      "Get teachers categories API"
    );
  }
};

export const teachersPostDropdown = async (req, res) => {
  try {
    const teacherPosts = await Post.findAll({
      attributes: { exclude: ["created_at", "updated_at"] },
    });

    return ResponseHelper.OK(
      res,
      true,
      "Teachers post fetched successfully!",
      teacherPosts,
      null,
      "Get teachers post API"
    );
  } catch (error) {
    return ResponseHelper.ISError(
      res,
      error.message || "Failed to retrieve teacher post",
      "Get teachers post API"
    );
  }
};

export const qualificationDropdown = async (req, res) => {
  try {
    const teacherPosts = await Qualification.findAll({
      attributes: { exclude: ["created_at", "updated_at"] },
    });

    return ResponseHelper.OK(
      res,
      true,
      "Teachers Qualification fetched successfully!",
      teacherPosts,
      null,
      "Get teachers qualification API"
    );
  } catch (error) {
    return ResponseHelper.ISError(
      res,
      error.message || "Failed to retrieve teacher qualification",
      "Get teachers qualification API"
    );
  }
};

export const createTeacher = async (req, res) => {
  const t = await sequelize.transaction(); // start transaction
  try {
    let {
      postId,
      categoryId,
      teacherCode,
      experienceYears,
      joiningDate,
      bio,
      phone,
      name,
      email,
      permissions,
      assignments, // <-- new field
    } = req.body;
    const profileImagePath = req.file ? req.file.path : null;
    const educations = JSON.parse(req.body.educations);

    const schoolUuid = req.credentials.schoolUuid || req.headers["school-uuid"];

    // Check if school exists
    const schoolInfo = await Schools.findOne({
      where: { school_uuid: schoolUuid, deleted_at: null },
      include: [
        {
          model: Users,
          attributes: ["id", "name", "email"],
        },
      ],
      transaction: t,
    });

    if (!schoolInfo) {
      await t.rollback();
      return ResponseHelper.OK(
        res,
        true,
        "School not found",
        null,
        null,
        "Add teacher API"
      );
    }
    // Check if user already exists
    const existingUser = await Users.findOne({
      where: {
        email,
        deleted_at: null,
        school_id: schoolInfo?.id,
      },
      transaction: t,
    });

    if (existingUser) {
      await t.rollback();
      return ResponseHelper.Conflict(
        res,
        "User email already exists.",
        null,
        "Add teacher API"
      );
    }
    // Check if teacher code already exists in the same school
    if (teacherCode) {
      const existingTeacher = await Teacher.findOne({
        where: { teacher_code: teacherCode, deleted_at: null },
        include: [
          {
            model: Users,
            where: {
              school_id: schoolInfo.id,
              deleted_at: null,
            },
            attributes: [],
          },
        ],
        transaction: t,
      });

      if (existingTeacher) {
        await t.rollback();
        return ResponseHelper.Conflict(
          res,
          "Teacher code already exists.",
          null,
          "Add teacher API"
        );
      }
    }
    // Check if phone number already exists in the same school
    if (phone) {
      const existingTeacherPhone = await Users.findOne({
        where: {
          phone,
          role_id: USER_ROLE.TEACHER,
          school_id: schoolInfo.id,
          deleted_at: null,
        },
        transaction: t,
      });

      if (existingTeacherPhone) {
        await t.rollback();
        return ResponseHelper.Conflict(
          res,
          "Teacher phone number already exists in this school.",
          null,
          "Add teacher API"
        );
      }
    }

    // Hash password
    const password = await CommonHelper.generateStrongPassword(12);
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const userData = await Users.create(
      {
        school_id: schoolInfo.id,
        role_id: USER_ROLE.TEACHER,
        name: name,
        email,
        phone: phone || null,
        password_hash: hashedPassword,
        profile_photo_url: profileImagePath || null,
        is_verified: true,
      },
      { transaction: t }
    );

    // Sanitize teacher data and include user_id & school_id
    const sanitizedData = {
      user_id: userData.id,
      school_id: schoolInfo.id,
      post_id: parseInt(postId) || null, //sanitizeHtml(postId?.toString() || ""),
      caste_category_id: parseInt(categoryId) || null, //sanitizeHtml(categoryId?.toString() || ""),
      teacher_code: teacherCode ? sanitizeHtml(teacherCode || "") : null,
      experience_years: experienceYears ? parseInt(experienceYears) : null,
      joining_date: sanitizeHtml(joiningDate || ""),
      bio: sanitizeHtml(bio || ""),
      profile_image: sanitizeHtml(profileImagePath || ""),
    };
    const teacher = await Teacher.create(sanitizedData, { transaction: t });
    if (Array.isArray(educations) && educations.length > 0) {
      const educationData = educations.map((qualificationId) => ({
        teachers_id: teacher.id,
        qualification_id: qualificationId,
      }));

      await TeacherQualification.bulkCreate(educationData, { transaction: t });
    }

    if (typeof permissions === "string") {
      permissions = JSON.parse(permissions);
    }

    if (Array.isArray(permissions) && permissions.length > 0) {
      for (const permissionId of permissions) {
        await UserPermission.create(
          {
            user_id: userData.id,
            permission_id: permissionId,
            is_allowed: true,
          },
          { transaction: t }
        );
      }
    }

    const currentAcademicYear = await AccademicYear.findOne({
      where: { is_current: 1, deleted_at: null },
      transaction: t,
    });
    const academicYearId = currentAcademicYear ? currentAcademicYear.id : null;
    if (typeof assignments === "string") assignments = JSON.parse(assignments);
    if (Array.isArray(assignments) && assignments.length > 0) {
      for (const assignment of assignments) {
        const { class_section_uuid, school_subject_uuid } = assignment;
        // Get class section id
        const classSectionId = await CommonHelper.getIdFromUuid(
          ClassSection,
          class_section_uuid,
          res,
          "Add teacher API",
          "class_section_uuid"
        );
        if (!classSectionId) {
          await t.rollback();
          return ResponseHelper.NotFound(
            res,
            false,
            "ClassSection not found !",
            "Add teacher API"
          );
        }
        // Create TeacherClassMap with academicYearId
        const teacherClassMap = await TeacherClassMap.create(
          {
            accademic_year_id: academicYearId,
            teacher_id: teacher.id,
            class_section_id: classSectionId,
          },
          { transaction: t }
        );
        // Map subjects
        let subjectIds = [];
        if (Array.isArray(school_subject_uuid)) {
          for (const subjectUuid of school_subject_uuid) {
            const subjectId = await CommonHelper.getIdFromUuid(
              SchoolSubject,
              subjectUuid,
              res,
              "Add teacher API",
              "school_subject_uuid"
            );
            if (!subjectId) {
              await t.rollback();
              return ResponseHelper.NotFound(
                res,
                false,
                "SchoolSubject not found !",
                "Add teacher API"
              );
            }
            subjectIds.push(subjectId);
          }
        }
        if (teacherClassMap && subjectIds.length > 0) {
          const subjectMapData = subjectIds.map((subject_id) => ({
            teacher_class_map_id: teacherClassMap.id,
            school_subject_id: subject_id,
          }));
          await TeacherSubjectMap.bulkCreate(subjectMapData, {
            transaction: t,
          });
        }
      }
    }
    await CommonHelper.sendCredentialsMail(email, password, name);
    await CommonHelper.logActivity(
      {
        title: "New Teacher Created",
        description: `${name} was added.`,
        created_by: req.credentials.id,
      },
      { transaction: t }
    );
    await t.commit();

    return ResponseHelper.OK(
      res,
      true,
      "Teacher created successfully",
      { email, password },
      "Add teacher API"
    );
  } catch (error) {
    await t.rollback();
    return ResponseHelper.ISError(
      res,
      "Failed to create teacher",
      error.message,
      "Add teacher API"
    );
  }
};

export const updateTeacher = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { teacherUuid } = req.params;
    let {
      postId,
      categoryId,
      teacherCode,
      experienceYears,
      joiningDate,
      bio,
      phone,
      name,
      email,
      permissions,
      assignments,
    } = req.body;

    const profileImagePath = req.file ? req.file.path : null;
    const educations = JSON.parse(req.body.educations);
    const schoolUuid = req.credentials.schoolUuid || req.headers["school-uuid"];
    // Find teacher
    const teacher = await Teacher.findOne({
      where: { teacher_uuid: teacherUuid, deleted_at: null },
      transaction: t,
    });
    if (!teacher) {
      await t.rollback();
      return ResponseHelper.OK(
        res,
        false,
        "Teacher not found",
        null,
        null,
        "Update teacher API"
      );
    }
    // Find user
    const user = await Users.findOne({
      where: { id: teacher.user_id, deleted_at: null },
      transaction: t,
    });
    if (!user) {
      await t.rollback();
      return ResponseHelper.OK(
        res,
        false,
        "User not found",
        null,
        null,
        "Update teacher API"
      );
    }
    const schoolInfo = await Schools.findOne({
      where: { school_uuid: schoolUuid, deleted_at: null },
      include: [
        {
          model: Users,
          attributes: ["id", "name", "email"],
        },
      ],
      transaction: t,
    });

    if (email && email !== user.email) {
      const existingUser = await Users.findOne({
        where: {
          email,
          school_id: schoolInfo.id,
          deleted_at: null,
          id: { [Op.ne]: user.id },
        },
        transaction: t,
      });

      if (existingUser) {
        await t.rollback();
        return ResponseHelper.Conflict(
          res,
          "User email already exists.",
          null,
          "Update teacher API"
        );
      }
    }

    if (teacherCode) {
      // Check if teacher code already exists in the same school
      const existingTeacher = await Teacher.findOne({
        where: {
          teacher_code: teacherCode,
          teacher_uuid: { [Op.ne]: teacherUuid },
          deleted_at: null,
        },
        include: [
          {
            model: Users,
            where: {
              school_id: schoolInfo.id,
              deleted_at: null,
            },
            attributes: [],
          },
        ],
        transaction: t,
      });

      if (existingTeacher) {
        await t.rollback();
        return ResponseHelper.Conflict(
          res,
          "Teacher code already exists.",
          null,
          "Update teacher API"
        );
      }
    }

    // Check if phone number already exists in the same school
    if (phone && phone !== user.phone) {
      const existingTeacherPhone = await Users.findOne({
        where: {
          phone,
          role_id: USER_ROLE.TEACHER,
          school_id: schoolInfo.id,
          deleted_at: null,
          id: { [Op.ne]: user.id }, // 🔥 exclude current user
        },
        transaction: t,
      });

      if (existingTeacherPhone) {
        await t.rollback();
        return ResponseHelper.Conflict(
          res,
          "Teacher phone number already exists in this school.",
          null,
          "Update teacher API"
        );
      }
    }

    // Update user
    let userUpdateData = {
      name,
      email,
      phone,
    };
    if (profileImagePath) userUpdateData.profile_photo_url = profileImagePath;
    await user.update(userUpdateData, { transaction: t });

    // Update teacher
    await teacher.update(
      {
        post_id: postId ?? teacher.post_id,
        caste_category_id: categoryId
          ? categoryId
          : teacher?.caste_category_id
          ? teacher?.caste_category_id
          : null,
        teacher_code: teacherCode ? teacherCode : null,
        experience_years: experienceYears ? parseInt(experienceYears) : null,
        joining_date: joiningDate ?? teacher.joining_date,
        bio: bio ? teacher.bio : null,
        profile_image: profileImagePath || teacher.profile_image,
      },
      { transaction: t }
    );

    // Update qualifications
    // Remove old qualifications
    await TeacherQualification.destroy({
      where: { teachers_id: teacher.id },
      transaction: t,
    });

    // Create new qualification records
    if (Array.isArray(educations) && educations.length > 0) {
      const educationData = educations.map((qualificationId) => ({
        teachers_id: teacher.id,
        qualification_id: qualificationId,
      }));

      await TeacherQualification.bulkCreate(educationData, { transaction: t });
    }

    // Update permissions
    if (typeof permissions === "string") permissions = JSON.parse(permissions);
    if (Array.isArray(permissions)) {
      await UserPermission.destroy({
        where: { user_id: user.id },
        transaction: t,
      });
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

    // Update class/subject mapping
    await TeacherClassMap.destroy({
      where: { teacher_id: teacher.id },
      transaction: t,
    });
    // Get current academic year id
    const currentAcademicYear = await AccademicYear.findOne({
      where: { is_current: 1, deleted_at: null },
      transaction: t,
    });
    const academicYearId = currentAcademicYear ? currentAcademicYear.id : null;
    if (typeof assignments === "string") assignments = JSON.parse(assignments);
    if (Array.isArray(assignments) && assignments.length > 0) {
      for (const assignment of assignments) {
        const { class_section_uuid, school_subject_uuid } = assignment;
        // Get class section id
        const classSectionId = await CommonHelper.getIdFromUuid(
          ClassSection,
          class_section_uuid,
          res,
          "Update teacher API",
          "class_section_uuid"
        );
        if (!classSectionId) {
          await t.rollback();
          return ResponseHelper.NotFound(
            res,
            false,
            "ClassSection not found !",
            "Update teacher API"
          );
        }
        // Create TeacherClassMap with academicYearId
        const teacherClassMap = await TeacherClassMap.create(
          {
            accademic_year_id: academicYearId,
            teacher_id: teacher.id,
            class_section_id: classSectionId,
          },
          { transaction: t }
        );
        // Map subjects
        let subjectIds = [];
        if (Array.isArray(school_subject_uuid)) {
          for (const subjectUuid of school_subject_uuid) {
            const subjectId = await CommonHelper.getIdFromUuid(
              SchoolSubject,
              subjectUuid,
              res,
              "Update teacher API",
              "school_subject_uuid"
            );
            if (!subjectId) {
              await t.rollback();
              return ResponseHelper.NotFound(
                res,
                false,
                "SchoolSubject not found !",
                "Update teacher API"
              );
            }
            subjectIds.push(subjectId);
          }
        }
        if (teacherClassMap && subjectIds.length > 0) {
          const subjectMapData = subjectIds.map((subject_id) => ({
            teacher_class_map_id: teacherClassMap.id,
            school_subject_id: subject_id,
          }));
          await TeacherSubjectMap.bulkCreate(subjectMapData, {
            transaction: t,
          });
        }
      }
    }
    await t.commit();
    return ResponseHelper.OK(
      res,
      true,
      "Teacher updated successfully",
      teacher,
      "Update teacher API"
    );
  } catch (error) {
    await t.rollback();

    return ResponseHelper.ISError(
      res,
      "Failed to update teacher",
      error.message,
      "Update teacher API"
    );
  }
};

export const allTeachersList = async (req, res) => {
  try {
    const { search, page = 1, limit = 10 } = req.query;
    const school_uuid =
      req?.credentials?.schoolUuid || req.headers["school-uuid"];

    const pageInt = parseInt(page, 10);
    const limitInt = parseInt(limit, 10);
    const offset = (pageInt - 1) * limitInt;

    const whereClause = buildSearchQuery(search, ["name", "email"]);
    const order = [["id", "DESC"]];

    const { rows, count } = await Teacher.findAndCountAll({
      limit: limitInt,
      distinct: true,
      col: "id",
      offset,
      where: {
        deleted_at: null,
      },
      order,
      include: [
        {
          model: Users,
          // as: "user",
          where: whereClause,
          attributes: [
            "id",
            "user_uuid",
            "school_id",
            "name",
            "email",
            "phone",
          ],
          include: [
            {
              model: Schools,
              where: {
                school_uuid,
              },
              attributes: [],
            },
          ],
        },
        {
          model: Post,
          // as: "post",
          attributes: ["id", "name", "description"],
        },
        {
          model: Category,
          // as: "category",
          attributes: ["id", "name", "description"],
        },
        {
          model: TeacherQualification,
          // as: "qualifications",
          attributes: ["teachers_id"],
          include: [
            {
              model: Qualification,
              attributes: ["id", "name"],
            },
          ],
          // attributes: ["id", "teacher_id"],
        },
        {
          model: TeacherClassMap,
          required: false,
          attributes: ["id"],
          include: [
            {
              model: ClassSection,
              attributes: ["class_section_name", "stream_id"],
              include: [
                {
                  model: Class,
                  attributes: ["class_name"],
                },
                {
                  model: Stream,
                  attributes: ["stream_name"],
                },
              ],
            },
            {
              model: TeacherSubjectMap,
              attributes: ["school_subject_id"],
              include: [
                {
                  model: SchoolSubject,
                  attributes: ["subject_id"],
                  include: [
                    {
                      model: Subject,
                      attributes: ["subject_name"],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    });

    // pagination metadata
    const totalPages = Math.ceil(count / limitInt);
    const meta = {
      totalCount: count,
      pageCount: totalPages,
      currentPage: pageInt,
      perPage: limitInt,
      hasNextPage: pageInt < totalPages,
      hasPrevPage: pageInt > 1,
    };

    return await ResponseHelper.OK(
      res,
      true,
      "Teachers list fetched successfully!",
      rows,
      meta,
      "Fetch teachers list API."
    );
  } catch (error) {
    return await ResponseHelper.ISError(
      res,
      error.message,
      "Fetch teachers list API."
    );
  }
};

export const singleTeacherDetails = async (req, res) => {
  try {
    const { teacherUuid } = req.params;

    const teacherDetails = await Teacher.findOne({
      where: { teacher_uuid: teacherUuid },
      include: [
        {
          model: Users,
          // as: "user",
          attributes: [
            "id",
            "user_uuid",
            "school_id",
            "name",
            "email",
            "phone",
            "profile_photo_url",
          ],
          include: [
            {
              model: Schools,
              // as: "school",
              attributes: [
                "name",
                "email",
                "code",
                "address",
                "pin_code",
                "website",
                "phone",
                "logo_url",
              ],
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
          model: Post,
          // as: "post",
          attributes: ["id", "name", "description"],
        },
        {
          model: Category,
          // as: "category",
          attributes: ["id", "name", "description"],
        },
        {
          model: TeacherQualification,
          // as: "qualifications",
          attributes: ["teachers_id"],
          include: [
            {
              model: Qualification,
              // as: "teachersFirst",
              attributes: ["id", "name"],
            },
            {
              model: Qualification,
              // as: "teachersSecond",
              attributes: ["id", "name"],
            },
          ],
        },
        {
          model: TeacherClassMap,
          // as: "classMappings",
          attributes: ["teacher_id"],
          include: [
            {
              model: ClassSection,
              // as: "classSection",
              attributes: ["class_section_uuid", "class_section_name"],
              include: [
                {
                  model: Class,
                  // as: "class",
                  attributes: ["class_uuid", "class_name"],
                },
              ],
            },
            {
              model: TeacherSubjectMap,
              // as: "subjectMappings",
              attributes: ["id", "school_subject_id"],
              include: [
                {
                  model: SchoolSubject,
                  // as: "schoolSubject",
                  attributes: ["school_subject_uuid"],
                  include: [
                    {
                      model: Subject,
                      // as: "teacherSubjectMap",
                      attributes: ["id", "subject_name", "subject_code"],
                    },
                  ],
                },
              ],
            },
            //   ],
            // },
          ],
        },
      ],
    });

    if (!teacherDetails) {
      return ResponseHelper.OK(
        res,
        false,
        "Teacher not found",
        null,
        null,
        "Fetch single teacher details API"
      );
    }

    return ResponseHelper.OK(
      res,
      true,
      "Teacher details fetched successfully!",
      teacherDetails,
      null,
      "Fetch single teacher details API"
    );
  } catch (error) {
    return ResponseHelper.ISError(
      res,
      error.message || "Failed to retrieve teacher details",
      "Fetch single teacher details API"
    );
  }
};

export const deleteTeacher = async (req, res) => {
  const t = await sequelize.transaction(); // 👈 start transaction
  try {
    const { teacher_uuid } = req?.params ?? {};
    if (!teacher_uuid)
      return ResponseHelper.BadRequest(
        res,
        "Teacher UUID is required",
        null,
        "Delete teacher API."
      );

    // 1️⃣ Find the teacher (not deleted)
    const teacher = await Teacher.findOne({
      where: { teacher_uuid, deleted_at: null },
      transaction: t,
    });

    if (!teacher) {
      await t.rollback();
      return ResponseHelper.OK(
        res,
        false,
        "Teacher not found",
        null,
        null,
        "Delete teacher API."
      );
    }

    // 2️⃣ Soft delete teacher
    await Teacher.update(
      { deleted_at: new Date() },
      { where: { teacher_uuid }, transaction: t }
    );

    // 3️⃣ Soft delete linked user (if exists)
    if (teacher.user_id) {
      await Users.update(
        { deleted_at: new Date() },
        { where: { id: teacher.user_id }, transaction: t }
      );
    }

    // 4️⃣ Commit transaction
    await t.commit();

    return ResponseHelper.OK(
      res,
      true,
      "Teacher deleted successfully",
      null,
      null,
      "Delete teacher API."
    );
  } catch (error) {
    // ❌ Rollback on error
    await t.rollback();
    return ResponseHelper.ISError(
      res,
      error?.message ?? "Unknown error",
      "Delete teacher API."
    );
  }
};
