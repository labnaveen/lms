import moment from "moment";
import sanitizeHtml from "sanitize-html";
import {
  Course,
  CourseModule,
  CourseLesson,
  LessonResource,
} from "../models/associations/CourseAssociations.js";
import ResponseHelper from "../helpers/ResponseHelper.js";
import sequelize from "../config/db.config.js";
import Users from "../models/UserModal.js";
import { PROGRESS_STATUS, USER_ROLE } from "../constants/Constants.js";
import Schools from "../models/SchoolsModal.js";
import { buildSearchQuery } from "../utils/searchHelper.js";
import SubCategory from "../models/SubCategoryModal.js";
import Category from "../models/CategoryModel.js";
import Teacher from "../models/TeacherModel.js";
import DifficultyLevel from "../models/DifficultyLevelModel.js";
import CourseVideoLink from "../models/CourseVideoLinks.js";
import CourseAdditionalDocument from "../models/CourseAdditionalDocument.js";
import Class from "../models/ClassModel.js";
import ClassSection from "../models/ClassSectionModel.js";
import Students from "../models/StudentsModel.js";
import { Op, Sequelize, where } from "sequelize";
import UserCourseEnrollment from "../models/UserCourseEnrollment.js";
import Assessment from "../models/AssessmentModal.js";
import CourseClassSectionLink from "../models/CourseClassSectionLinkModel.js";

export const getCoursesList = async (req, res) => {
  try {
    let { search, page = 1, limit = 10 } = req.query;

    search = search ? sanitizeHtml(search) : null;

    const school_uuid =
      req?.credentials?.schoolUuid || req.headers["school-uuid"];

    if (!school_uuid) {
      return ResponseHelper.BadRequest(
        res,
        "Missing school details !",
        "Get Courses List API"
      );
    }

    const pageInt = parseInt(page, 10);
    const limitInt = parseInt(limit, 10);
    const offset = (pageInt - 1) * limitInt;
    const searchFields = ["title", "description"];
    const searchClause = buildSearchQuery(search?.trim(), searchFields);

    //Get start & end of today using moment
    const startOfToday = moment().startOf("day").toDate();
    const endOfToday = moment().endOf("day").toDate();

    //Build where clause to filter only active courses
    let whereClause = {
      [Op.or]: [
        { end_date: null },
        { end_date: { [Op.between]: [startOfToday, endOfToday] } },
        { end_date: { [Op.gt]: endOfToday } },
      ],
    };

    if (searchClause) {
      whereClause = {
        ...whereClause,
        ...(searchClause || {}),
      };
    }

    // const isSuperAdmin = req.credentials.roleId === USER_ROLE.SUPERADMIN;
    const isTeacher = req.credentials.roleId === USER_ROLE.TEACHER;
    const isStudent = req.credentials.roleId === USER_ROLE.STUDENT;

    if (isTeacher) {
      whereClause = { ...whereClause, instructor_id: req.credentials.id };
    }

    ////FILTER ALL COURSE WHICH ARE PUBLIC AND SPECIFIC FOR HIS CLASS AND SECTION
    if (isStudent) {
      const studentOption = {
        where: {
          user_id: req.credentials.id,
          deleted_at: null,
        },
        include: [
          {
            model: ClassSection,
            attributes: ["id"],
            required: true,
            include: [
              {
                model: Class,
                required: true,
                attributes: ["id"],
                include: [
                  {
                    model: Schools,
                    attributes: ["school_uuid"],
                    where: { school_uuid }, // ✅ ensure belongs to same school
                    required: true,
                  },
                ],
              },
            ],
          },
        ],

        attributes: ["id", "user_id"],
      };
      const studentDetail = await Students.findOne(studentOption);
      // whereClause = {
      //   deleted_at: null,
      //   [Op.or]: [
      //     { is_public: true },
      //     { class_id: studentDetail?.ClassSection?.Class?.id },
      //     { section_id: studentDetail?.ClassSection?.id },
      //   ],
      // };
      let studentClassSectionId = studentDetail?.ClassSection?.id;

      whereClause = {
        deleted_at: null,
        [Op.or]: [
          { is_public: true },
          Sequelize.literal(`
        Course.id IN (
          SELECT course_id 
          FROM course_class_section_link
          WHERE class_section_id = ${studentClassSectionId}
        )
    `),
        ],
      };
    }

    const courseOptions = {
      where: whereClause, // ✅ Added
      order: [["id", "DESC"]],
      limit: limitInt, // ✅ Added
      offset, // ✅ Added
      include: [
        {
          model: Users,
          attributes: ["user_uuid", "name"],
          required: true,
          include: [
            {
              model: Teacher,
              attributes: ["teacher_code"],
            },
            {
              model: Schools,
              attributes: ["school_uuid", "name", "code"],
              required: true,
              where: { school_uuid },
            },
          ],
        },
        {
          model: SubCategory,
          attributes: ["name"],
          include: [
            {
              model: Category,
              attributes: ["name"],
            },
          ],
        },
        {
          model: DifficultyLevel,
          attributes: ["name"],
          required: false,
        },
      ],
      attributes: [
        "course_uuid",
        "title",
        "description",
        "thumbnail",
        "created_at",
        "is_public",
      ],
    };

    // ✅ Use findAndCountAll for pagination support
    const { rows, count } = await Course.findAndCountAll(courseOptions);

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

    return ResponseHelper.OK(
      res,
      true,
      "Courses list fetched successfully!",
      rows,
      meta,
      "Get Courses List API"
    );
  } catch (error) {
    return ResponseHelper.ISError(
      res,
      error.message || "Failed to fetch course details",
      "Get Courses List API"
    );
  }
};

export const createCourse = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    // ✅ Extract data from request body
    let {
      title,
      description,
      sub_category_id,
      difficulty_level,
      class_id,
      // section_id,
      isPublic,
      start_date,
      end_date,
      course_type_id,
      course_structure_type_id,
      created_by,
      modules: rawModules,
    } = req.body;
    const sectionUuids = req.body.section_id || [];
    let findClass,
      findSection,
      findCreatedByUser,
      sectionIds = [];
    // ✅ Parse JSON strings safely (if frontend sent as string)
    isPublic = isPublic === "true" || isPublic === true;
    const modules =
      typeof rawModules === "string" ? JSON.parse(rawModules) : rawModules;

    let { videoLinks } = req.body;
    if (typeof videoLinks === "string") {
      try {
        videoLinks = JSON.parse(videoLinks);
      } catch {
        videoLinks = [];
      }
    }

    if (sectionUuids.length > 0) {
      const sections = await ClassSection.findAll({
        where: { class_section_uuid: sectionUuids, deleted_at: null },
      });
      if (!sections.length) {
        return ResponseHelper.OK(
          res,
          false,
          "Section details not found!",
          null,
          null,
          "Add Assessment API"
        );
      }
      sectionIds = sections.map((s) => s.id);
    }

    // ✅ Identify the instructor (from JWT or session credentials)
    const instructor_id = req.credentials?.id || null;

    // ✅ Collect uploaded files
    const files = Array.isArray(req.files) ? req.files : [];

    // ✅ Detect the thumbnail file (uploaded separately with fieldname = "thumbnail")
    const thumbnailFile = files.find((f) => f.fieldname === "thumbnail");

    // ============================================================
    // 1️⃣ VALIDATIONS
    // ============================================================

    // Check if non-public course has class/section info
    if (!isPublic && !class_id) {
      return ResponseHelper.BadRequest(
        res,
        "class and section are required for private courses",
        "Create course api!"
      );
    }
    if (!isPublic) {
      findClass = await Class.findOne({ where: { class_uuid: class_id } });
      if (!findClass) {
        return ResponseHelper.BadRequest(
          res,
          "Invalid class provided",
          "Create course api!"
        );
      }
    }

    // if (section_id) {
    //   findSection = await ClassSection.findOne({
    //     where: { class_section_uuid: section_id, class_id: findClass.id },
    //   });
    //   if (!findSection) {
    //     return ResponseHelper.BadRequest(
    //       res,
    //       "Invalid section provided",
    //       "Create course api!"
    //     );
    //   }
    // }
    if (created_by) {
      findCreatedByUser = await Users.findOne({
        where: { user_uuid: created_by },
      });
      if (!findCreatedByUser) {
        return ResponseHelper.BadRequest(
          res,
          "Invalid user provided for created_by",
          "Create course api!"
        );
      }
    }

    // Check for duplicate course in same scope
    const whereCondition = {
      title,
      deleted_at: null,
      ...(isPublic
        ? { is_public: true }
        : {
            class_id: findClass?.id,
            // ...(findSection?.id && { section_id: findSection?.id }),
          }),
    };

    const existing = await Course.findOne({ where: whereCondition });
    if (existing) {
      return ResponseHelper.Conflict(
        res,
        "Course with same title already exists.",
        null,
        "Create course api!"
      );
    }

    // Validate SubCategory and DifficultyLevel
    const findSubCategory = await SubCategory.findOne({
      where: { sub_category_uuid: sub_category_id },
    });
    if (!findSubCategory)
      return ResponseHelper.BadRequest(
        res,
        "Invalid sub-category ID",
        "Create course api!"
      );

    const findDifficultyLevel = await DifficultyLevel.findOne({
      where: { difficulty_level_uuid: difficulty_level },
    });
    if (!findDifficultyLevel)
      return ResponseHelper.BadRequest(
        res,
        "Invalid difficulty level ID",
        "Create course api!"
      );

    // ============================================================
    // 2️⃣ CREATE COURSE
    // ============================================================
    const newCourse = await Course.create(
      {
        title,
        description,
        sub_category_id: findSubCategory?.id,
        thumbnail: thumbnailFile
          ? `public/courses/${thumbnailFile.filename}`
          : null,
        instructor_id: created_by ? findCreatedByUser?.id : instructor_id,
        is_public: isPublic,
        class_id: findClass?.id || null,
        // section_id: findSection?.id || null,
        difficulty_level_id: findDifficultyLevel?.id || null,
        start_date: start_date || null,
        end_date: end_date || null,
        course_type_id: course_type_id || null,
        course_structure_type_id: course_structure_type_id || null,
      },
      { transaction: t }
    );
    // Map assessment to multiple class sections
    if (newCourse && sectionIds.length > 0) {
      const links = sectionIds.map((sectionId) => ({
        course_id: newCourse?.id,
        class_section_id: sectionId,
      }));
      await CourseClassSectionLink.bulkCreate(links, { transaction: t });
    }

    // Track all used files (so we can later separate additional docs)
    const usedFiles = new Set();

    // Mark the thumbnail file as used
    if (thumbnailFile) usedFiles.add(thumbnailFile.filename);

    // ============================================================
    // 3️⃣ CREATE MODULES, LESSONS, AND LESSON RESOURCES
    // ============================================================
    for (const module of modules || []) {
      const newModule = await CourseModule.create(
        {
          course_id: newCourse.id,
          title: module.title,
          description: module.description,
          order_index: module.order_index || 1,
        },
        { transaction: t }
      );

      if (module.lessons && module.lessons.length) {
        for (const lesson of module.lessons) {
          const newLesson = await CourseLesson.create(
            {
              module_id: newModule.id,
              title: lesson.title,
              description: lesson.description,
              lesson_type: lesson.lesson_type || "video",
              duration_in_minutes: lesson.duration_in_minutes || null,
              order_index: lesson.order_index || 1,
            },
            { transaction: t }
          );

          // ✅ Add lesson resources
          if (lesson.resources && lesson.resources.length) {
            for (const resource of lesson.resources) {
              // CASE 1: URL RESOURCE (NO FILE)
              if (resource.type === "url") {
                await LessonResource.create(
                  {
                    lesson_id: newLesson.id,
                    title: resource.title || "URL Resource",
                    file_url: resource.url, // storing URL here
                    file_type: "url",
                  },
                  { transaction: t }
                );
                continue; // skip file logic
              }

              // CASE 2: FILE RESOURCE
              const uploadedResourceFile = files.find(
                (f) =>
                  f.originalname === resource.title ||
                  f.fieldname === `resource_${resource.id}`
              );

              // If no file => skip (frontend ensures file exists)
              if (!uploadedResourceFile) continue;

              const fileUrl = `public/courses/${uploadedResourceFile.filename.trim()}`;

              await LessonResource.create(
                {
                  lesson_id: newLesson.id,
                  title:
                    resource.title ||
                    uploadedResourceFile.originalname ||
                    "Resource",

                  file_url: fileUrl,
                  file_type:
                    resource.type ||
                    uploadedResourceFile.mimetype ||
                    uploadedResourceFile.originalname.split(".").pop(),
                },
                { transaction: t }
              );

              usedFiles.add(uploadedResourceFile.filename);
            }
          }
        }
      }
    }

    // ============================================================
    // 4️⃣ HANDLE ADDITIONAL DOCUMENTS FROM FRONTEND
    // ============================================================
    // for (const doc of documents || []) {
    //   const uploadedResourceFile = files.find(
    //     (f) =>
    //       f.originalname === doc.title ||
    //       f.fieldname === `document_${doc.title}`
    //   );

    //   if (!uploadedResourceFile) continue;

    //   await CourseAdditionalDocument.create(
    //     {
    //       course_id: newCourse.id,
    //       file_url: `public/courses/${uploadedResourceFile.filename}`,
    //       file_type:
    //         doc.type ||
    //         uploadedResourceFile.mimetype ||
    //         uploadedResourceFile.originalname.split(".").pop(),
    //     },
    //     { transaction: t }
    //   );

    //   // Mark file as used
    //   usedFiles.add(uploadedResourceFile.filename);
    // }

    // ============================================================
    // 5️⃣ AUTO-ADD REMAINING UNUSED FILES AS ADDITIONAL DOCUMENTS
    // ============================================================
    for (const file of files) {
      // Skip already used files (thumbnail, lesson resource, or docs)
      if (usedFiles.has(file.filename)) continue;

      await CourseAdditionalDocument.create(
        {
          course_id: newCourse.id,
          file_url: `public/courses/${file.filename}`,
          file_type: file.mimetype || file.originalname.split(".").pop(),
        },
        { transaction: t }
      );
    }

    // ============================================================
    // 6️⃣ ADD COURSE-LEVEL VIDEO LINKS
    // ============================================================
    for (const video of videoLinks || []) {
      await CourseVideoLink.create(
        {
          course_id: newCourse.id,
          video_url: video,
          file_type: "video_link",
        },
        { transaction: t }
      );
    }

    // ============================================================
    // 7️⃣ COMMIT TRANSACTION
    // ============================================================
    await t.commit();

    return ResponseHelper.Created(
      res,
      "Course created successfully",
      newCourse
    );
  } catch (error) {
    await t.rollback();
    console.error("❌ Error creating course:", error);
    return ResponseHelper.ISError(res, "Failed to create course", error);
  }
};

export const getCourseDetails = async (req, res) => {
  try {
    const { course_uuid } = req.params;
    const { roleId, id } = req.credentials;
    const whereClause = { course_uuid };

    if (roleId === USER_ROLE.TEACHER) {
      whereClause.instructor_id = id;
    }
    // Step 1️⃣: Find Course
    const course = await Course.findOne({
      where: whereClause,
      include: [
        {
          model: Class,
          attributes: ["class_uuid", "class_name"],
          required: false,
        },
        {
          model: CourseClassSectionLink,
          attributes: ["id"],
          required: false,
          include: [
            {
              model: ClassSection,
              attributes: ["class_section_uuid", "class_section_name"],
            },
          ],
        },
        {
          model: DifficultyLevel,
          attributes: ["difficulty_level_uuid", "name"],
          required: false,
        },
        {
          model: Users,
          attributes: ["user_uuid", "name", "email"],
          required: true,
        },
        {
          model: SubCategory,
          attributes: ["sub_category_uuid", "name"],
          include: [
            {
              model: Category,
              attributes: ["category_uuid", "name"],
            },
          ],
        },
        {
          model: CourseModule,
          required: false,
          include: [
            {
              model: CourseLesson,
              required: false,
              include: [
                {
                  model: LessonResource,
                  required: false,
                },
              ],
            },
          ],
        },
        { model: CourseVideoLink, required: false },
        {
          model: CourseAdditionalDocument,
          required: false,
        },
        {
          model: UserCourseEnrollment,
          where: { user_id: req.credentials.id },
          attributes: [
            "user_course_enrollment_uuid",
            "progress_status_id",
            "progress_percentage",
            "started_at",
            "completed_at",
          ],
          required: false,
        },
        {
          model: Assessment,
          // attributes: ["teacher_code"],
          required: false,
        },
      ],
      order: [
        [{ model: CourseModule }, "order_index", "ASC"],
        [CourseModule, CourseLesson, "order_index", "ASC"],
      ],
    });

    if (!course) {
      return ResponseHelper.NotFound(
        res,
        false,
        "Course not found!",
        null,
        null,
        "Get Course Details API"
      );
    }

    return ResponseHelper.OK(
      res,
      true,
      "Course details fetched successfully!",
      course,
      null,
      "Get Course Details API"
    );
  } catch (error) {
    console.error("GetCourseDetails Error:", error);
    return ResponseHelper.ISError(
      res,
      error.message || "Failed to fetch course details",
      "Get Course Details API"
    );
  }
};

export const updateCourse = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { course_uuid } = req.params;
    const existingCourse = await Course.findOne({
      where: { course_uuid, deleted_at: null },
    });

    if (!existingCourse) {
      return ResponseHelper.NotFound(res, "Course not found");
    }

    // Extract data
    let {
      title,
      description,
      sub_category_id,
      difficulty_level,
      class_id,
      // section_id,
      isPublic,
      start_date,
      end_date,
      course_type_id,
      course_structure_type_id,
      modules: rawModules,
      videoLinks,
      created_by,
    } = req.body;
    const sectionUuids = req.body.section_id || [];

    // Parse JSON if sent as string
    isPublic = isPublic === "true" || isPublic === true;
    const modules =
      typeof rawModules === "string" ? JSON.parse(rawModules) : rawModules;

    if (typeof videoLinks === "string") {
      try {
        videoLinks = JSON.parse(videoLinks);
      } catch {
        videoLinks = [];
      }
    }

    // Handle files
    const files = Array.isArray(req.files) ? req.files : [];
    const thumbnailFile = files.find((f) => f.fieldname === "thumbnail");

    // ============================================================
    // VALIDATIONS
    // ============================================================
    let findClass = null;
    let findSection = null;
    let findCreatedByUser = null;
    let sectionIds = [];

    if (!isPublic && !class_id) {
      return ResponseHelper.BadRequest(
        res,
        "class and section are required for private courses"
      );
    }

    if (class_id) {
      findClass = await Class.findOne({ where: { class_uuid: class_id } });
      if (!findClass) {
        return ResponseHelper.BadRequest(
          res,
          "Invalid class provided",
          "Create course api!"
        );
      }
    }
    // if (section_id) {
    //   findSection = await ClassSection.findOne({
    //     where: { class_section_uuid: section_id, class_id: findClass.id },
    //   });
    //   if (!findSection)
    //     return ResponseHelper.BadRequest(res, "Invalid section provided");
    // }
    if (created_by) {
      findCreatedByUser = await Users.findOne({
        where: { user_uuid: created_by },
      });
      if (!findCreatedByUser) {
        return ResponseHelper.BadRequest(
          res,
          "Invalid user provided for created_by",
          "Create course api!"
        );
      }
    }

    const findSubCategory = await SubCategory.findOne({
      where: { sub_category_uuid: sub_category_id },
    });
    if (!findSubCategory)
      return ResponseHelper.BadRequest(res, "Invalid sub-category ID");

    const findDifficultyLevel = await DifficultyLevel.findOne({
      where: { difficulty_level_uuid: difficulty_level },
    });
    if (!findDifficultyLevel)
      return ResponseHelper.BadRequest(res, "Invalid difficulty level ID");

    // ============================================================
    // UPDATE COURSE
    // ============================================================
    await existingCourse.update(
      {
        title,
        description,
        sub_category_id: findSubCategory.id,
        thumbnail: thumbnailFile
          ? `public/courses/${thumbnailFile.filename}`
          : null, // keep old if none uploaded
        is_public: isPublic,
        class_id: findClass ? findClass.id : existingCourse.class_id,
        // section_id: findSection ? findSection.id : existingCourse.section_id,
        difficulty_level_id: findDifficultyLevel.id,
        start_date: start_date || existingCourse.start_date,
        end_date: end_date || existingCourse.end_date,
        course_type_id: course_type_id || existingCourse.course_type_id,
        course_structure_type_id:
          course_structure_type_id || existingCourse.course_structure_type_id,
        instructor_id: created_by
          ? findCreatedByUser?.id
          : existingCourse.instructor_id,
      },
      { transaction: t }
    );

    if (sectionUuids.length > 0) {
      const sections = await ClassSection.findAll({
        where: { class_section_uuid: sectionUuids, deleted_at: null },
      });
      if (!sections.length) {
        return ResponseHelper.OK(
          res,
          false,
          "Section details not found!",
          null,
          null,
          "Add Assessment API"
        );
      }
      sectionIds = sections.map((s) => s.id);
    }
    if (existingCourse && sectionIds.length > 0) {
      const links = sectionIds.map((sectionId) => ({
        course_id: existingCourse?.id,
        class_section_id: sectionId,
      }));
      const dlt = await CourseClassSectionLink.destroy({
        where: { course_id: existingCourse.id },
        transaction: t,
      });
      await CourseClassSectionLink.bulkCreate(links, { transaction: t });
    }

    // ============================================================
    // CLEAR EXISTING MODULES, LESSONS, RESOURCES, LINKS, DOCS
    // ============================================================
    await CourseVideoLink.destroy({
      where: { course_id: existingCourse.id },
      transaction: t,
    });
    await CourseAdditionalDocument.destroy({
      where: { course_id: existingCourse.id },
      transaction: t,
    });

    const existingModules = await CourseModule.findAll({
      where: { course_id: existingCourse.id },
    });
    for (const mod of existingModules) {
      const lessons = await CourseLesson.findAll({
        where: { module_id: mod.id },
      });
      for (const lesson of lessons) {
        await LessonResource.destroy({
          where: { lesson_id: lesson.id },
          transaction: t,
        });
      }
      await CourseLesson.destroy({
        where: { module_id: mod.id },
        transaction: t,
      });
    }
    await CourseModule.destroy({
      where: { course_id: existingCourse.id },
      transaction: t,
    });

    const usedFiles = new Set();
    if (thumbnailFile) usedFiles.add(thumbnailFile.filename);

    // ============================================================
    // RECREATE MODULES, LESSONS, RESOURCES
    // ============================================================
    for (const module of modules || []) {
      const newModule = await CourseModule.create(
        {
          course_id: existingCourse.id,
          title: module.title,
          description: module.description,
          order_index: module.order_index || 1,
        },
        { transaction: t }
      );

      for (const lesson of module.lessons || []) {
        const newLesson = await CourseLesson.create(
          {
            module_id: newModule.id,
            title: lesson.title,
            description: lesson.description,
            lesson_type: lesson.lesson_type || "video",
            duration_in_minutes: lesson.duration_in_minutes || null,
            order_index: lesson.order_index || 1,
          },
          { transaction: t }
        );

        for (const resource of lesson.resources || []) {
          if (resource.type === "url") {
            await LessonResource.create(
              {
                lesson_id: newLesson.id,
                title: resource.title || "URL Resource",
                file_url: resource.url, // storing URL here
                file_type: "url",
              },
              { transaction: t }
            );
            continue; // skip file logic
          }
          const uploadedResourceFile = files.find(
            (f) =>
              f.originalname === resource.title ||
              f.fieldname === `resource_${resource.title}`
          );

          if (!uploadedResourceFile && !resource.existingFileUrl) continue;

          const fileUrl = uploadedResourceFile
            ? `public/courses/${uploadedResourceFile.filename.trim()}`
            : resource.existingFileUrl.replace(process.env.APP_URL || "", ""); // keep existing URL if not re-uploaded

          await LessonResource.create(
            {
              lesson_id: newLesson.id,
              title:
                resource.title ||
                uploadedResourceFile?.originalname ||
                "Resource",
              file_url: fileUrl,
              file_type:
                resource.type ||
                uploadedResourceFile?.mimetype ||
                uploadedResourceFile?.originalname.split(".").pop(),
            },
            { transaction: t }
          );

          if (uploadedResourceFile)
            usedFiles.add(uploadedResourceFile.filename);
        }
      }
    }

    // ============================================================
    // ADDITIONAL DOCUMENTS (auto-detect unused)
    // ============================================================
    for (const file of files) {
      if (usedFiles.has(file.filename)) continue;
      await CourseAdditionalDocument.create(
        {
          course_id: existingCourse.id,
          file_url: `public/courses/${file.filename}`,
          file_type: file.mimetype || file.originalname.split(".").pop(),
        },
        { transaction: t }
      );
    }

    // ============================================================
    // VIDEO LINKS
    // ============================================================
    for (const video of videoLinks || []) {
      await CourseVideoLink.create(
        {
          course_id: existingCourse.id,
          video_url: video,
          file_type: "video_link",
        },
        { transaction: t }
      );
    }

    await t.commit();

    return ResponseHelper.OK(
      res,
      "Course updated successfully",
      existingCourse
    );
  } catch (error) {
    await t.rollback();
    console.error("❌ Error updating course:", error);
    return ResponseHelper.ISError(res, "Failed to update course", error);
  }
};

export const courseEnrollment = async (req, res) => {
  try {
    const { id, roleId } = req.credentials;
    let { course_uuid } = req.params;
    course_uuid = sanitizeHtml(course_uuid);
    // const school_uuid = req.credentials.schoolUuid || req.headers["school-uuid"]

    if (roleId !== USER_ROLE.STUDENT) {
      return ResponseHelper.Forbidden(
        res,
        "You are not allowed",
        "User course enrollment api !"
      );
    }

    const studentsOption = {
      where: {
        user_id: id,
      },
      include: [
        {
          model: ClassSection,
          attributes: ["class_id"],
          required: true,
        },
      ],
      attributes: ["class_section_id"],
    };

    const studentDetails = await Students.findOne(studentsOption);

    if (!studentDetails) {
      return ResponseHelper.NotFound(
        res,
        false,
        "Missing user details!",
        "User course enrollment api !"
      );
    }

    const courseOptions = {
      where: {
        course_uuid,
        deleted_at: null,
      },

      attributes: [
        "id",
        "is_public",
        "class_id",
        // "section_id",
        "start_date",
        "end_date",
      ],
    };

    const courseDetails = await Course.findOne(courseOptions);

    if (!courseDetails) {
      return ResponseHelper.NotFound(
        res,
        false,
        "Course details not found !",
        "User course enrollment api !"
      );
    }

    ////IF THE COURSE IS EXPIRED

    if (
      moment().startOf("day") > moment(courseDetails?.end_date).startOf("day")
    ) {
      return ResponseHelper.BadRequest(
        res,
        "This course has been expired !",
        "User course enrollment api !"
      );
    }

    if (!courseDetails?.is_public) {
      ////CASE WHERE STUDENT IS ENROLLING IN PRIVATE COURSE FOR DIFFERENT CLASS
      if (
        courseDetails?.class_id &&
        // !courseDetails?.section_id &&
        courseDetails?.class_id !== studentDetails?.ClassSection?.class_id
      ) {
        return ResponseHelper.BadRequest(
          res,
          "This course does not belong to your class!",
          "User course enrollment api !"
        );
      }

      ////CASE WHERE STUDENT IS ENROLLING IN PRIVATE COURSE FOR DIFFERENT CLASS OR SECTION
      if (
        courseDetails?.class_id &&
        // courseDetails?.section_id &&
        // courseDetails?.section_id !== studentDetails?.class_section_id ||
        courseDetails?.class_id !== studentDetails?.ClassSection?.class_id
      ) {
        return ResponseHelper.BadRequest(
          res,
          "This course does not belong to your class or section!",
          "User course enrollment api !"
        );
      }
    }

    const alreadyEnrolled = await UserCourseEnrollment.findOne({
      where: {
        user_id: id,
        course_id: courseDetails?.id,
      },
    });

    if (alreadyEnrolled) {
      return ResponseHelper.Conflict(
        res,
        "Already Enrolled",
        null,
        "User course enrollment api !"
      );
    }

    const dataToInsert = {
      user_id: id,
      course_id: courseDetails?.id,
      progress_status_id: PROGRESS_STATUS.NOT_STARTED,
      started_at: moment().tz("Asia/Kolkata").toDate(),
    };
    await UserCourseEnrollment.create(dataToInsert);
    return ResponseHelper.Created(
      res,
      true,
      "Successfully enrolled !",
      null,
      null,
      "User course enrollment api !"
    );
  } catch (e) {
    return ResponseHelper.ISError(
      res,
      e.message,
      "User course enrollment api !"
    );
  }
};

export const markUserCourseEnrollmentComplete = async (req, res) => {
  try {
    const { id, roleId } = req.credentials;
    let { course_uuid } = req.params;
    let { is_complete = false } = req.body;
    is_complete = String(is_complete).toLowerCase() === "true";
    course_uuid = sanitizeHtml(course_uuid);

    if (roleId !== USER_ROLE.STUDENT) {
      return ResponseHelper.Forbidden(
        res,
        "You are not allowed",
        "Mark user course enrollment complete api !"
      );
    }

    const courseOptions = {
      where: {
        course_uuid,
        deleted_at: null,
      },

      attributes: ["id"],
    };

    const courseDetails = await Course.findOne(courseOptions);

    if (!courseDetails) {
      return ResponseHelper.NotFound(
        res,
        false,
        "Course details not found !",
        "User course enrollment api !"
      );
    }

    const alreadyEnrolledCourseDetail = await UserCourseEnrollment.findOne({
      where: {
        user_id: id,
        course_id: courseDetails?.id,
      },
    });

    if (!alreadyEnrolledCourseDetail) {
      return ResponseHelper.NotFound(
        res,
        false,
        "Course enrollment details not found !",
        "Mark user course enrollment complete api !"
      );
    }

    const totalProgressPercentage =
      parseInt(alreadyEnrolledCourseDetail?.progress_percentage) + 50;

    if (totalProgressPercentage >= 100) {
      is_complete = true;
    }

    await UserCourseEnrollment.update(
      {
        progress_status_id: is_complete
          ? PROGRESS_STATUS.COMPLETED
          : PROGRESS_STATUS.IN_PROCESS,
        progress_percentage: is_complete
          ? 100
          : totalProgressPercentage > 100
          ? 100
          : totalProgressPercentage,
        completed_at: is_complete ? moment().tz("Asia/Kolkata").toDate() : null,
        updated_at: moment().tz("Asia/Kolkata").toDate(),
      },
      {
        where: {
          user_id: id,
          course_id: courseDetails.id,
          deleted_at: null,
        },
      }
    );

    return ResponseHelper.Created(
      res,
      true,
      "Successfully completed !",
      null,
      null,
      "Mark user course enrollment complete api !"
    );
  } catch (e) {
    return ResponseHelper.ISError(
      res,
      e.message,
      "User course enrollment api !"
    );
  }
};

export const destroyCourse = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { course_uuid } = req.params;

    // ✅ Validate input
    if (!course_uuid) {
      await t.rollback();
      return ResponseHelper.BadRequest(
        res,
        false,
        "Course UUID is required to delete",
        null,
        null,
        "Delete Course API"
      );
    }

    // ✅ Check if course exists and not already deleted
    const existingCourse = await Course.findOne({
      where: { course_uuid, deleted_at: null },
      transaction: t,
    });

    if (!existingCourse) {
      await t.rollback();
      return ResponseHelper.NotFound(
        res,
        false,
        "Course not found or already deleted",
        null,
        null,
        "Delete Course API"
      );
    }

    // ============================================================
    // CLEAR EXISTING MODULES, LESSONS, RESOURCES, LINKS, DOCS
    // ============================================================
    await CourseVideoLink.destroy({
      where: { course_id: existingCourse.id },
      transaction: t,
    });

    await CourseAdditionalDocument.destroy({
      where: { course_id: existingCourse.id },
      transaction: t,
    });

    const existingModules = await CourseModule.findAll({
      where: { course_id: existingCourse.id },
      transaction: t,
    });

    for (const mod of existingModules) {
      const lessons = await CourseLesson.findAll({
        where: { module_id: mod.id },
        transaction: t,
      });

      for (const lesson of lessons) {
        await LessonResource.destroy({
          where: { lesson_id: lesson.id },
          transaction: t,
        });
      }

      await CourseLesson.destroy({
        where: { module_id: mod.id },
        transaction: t,
      });
    }

    await CourseModule.destroy({
      where: { course_id: existingCourse.id },
      transaction: t,
    });

    // ============================================================
    // SOFT DELETE COURSE
    // ============================================================
    await existingCourse.destroy({ transaction: t });

    await t.commit();

    return ResponseHelper.OK(
      res,
      true,
      "Course deleted successfully!",
      null,
      null,
      "Delete Course API"
    );
  } catch (error) {
    console.error("DestroyCourse Error:", error);
    await t.rollback(); // ❗Rollback on failure
    return ResponseHelper.ISError(
      res,
      error.message || "Failed to delete course",
      "Delete Course API"
    );
  }
};
