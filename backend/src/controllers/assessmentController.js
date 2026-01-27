import moment from "moment";
import sanitizeHtml from "sanitize-html";
import { Sequelize, where } from "sequelize";
import CommonHelper from "../helpers/CommonHelper.js";
import ResponseHelper from "../helpers/ResponseHelper.js";
import Schools from "../models/SchoolsModal.js";
import db from "../config/db.config.js";
import { Op } from "sequelize";
import { buildSearchQuery } from "../utils/searchHelper.js";
import SchoolSubject from "../models/SchoolSubjectModel.js";
import AccademicYear from "../models/AccademicYearModel.js";
import ClassSection from "../models/ClassSectionModel.js";
import Class from "../models/ClassModel.js";
import AssessmentType from "../models/AssessmentTypeModal.js";
import Assessment from "../models/AssessmentModal.js";
import AssessmentQuestion from "../models/AssessmentQuestionModal.js";
import AssessmentQuestionOption from "../models/AssessmentQuestionOptionModal.js";
import AssessmentQuestionType from "../models/AssessmentQuestionTypeModal.js";
import StudentAssessmentResult from "../models/StudentAssessmentResultModal.js";
import Users from "../models/UserModal.js";
import AssessmentStudentAnswer from "../models/AssessmentStudentAnswerModal.js";
import { USER_ROLE } from "../constants/Constants.js";
import Subject from "../models/SubjectModel.js";
import Students from "../models/StudentsModel.js";
// import TeacherSubjectMap from "../models/TeacherSubjectMapModal.js";
// import TeacherClassMap from "../models/TeacherClassMapModal.js";
// import Teacher from "../models/TeacherModel.js";
import Grade from "../models/GradeModel.js";
import Gender from "../models/GenderModel.js";
import Course from "../models/CourseModel.js";
import AssessmentClassSectionLink from "../models/AssessmentClassSectionLinkModel.js";

// export const getAssessmentList = async (req, res) => {
//     try {
//         const { search = "", page = 1, limit = 10 } = req.query;

//         const pageInt = parseInt(page, 10);
//         const limitInt = parseInt(limit, 10);
//         const offset = (pageInt - 1) * limitInt;

//         const { roleId, id } = req?.credentials || {};
//         const school_uuid = req?.credentials?.schoolUuid || req.headers["school-uuid"];

//         const school_id = await CommonHelper.getIdFromUuid(Schools, school_uuid, res, "Get Assessment List API", "school_uuid");
//         if (!school_id) return ResponseHelper.NotFound(res, false, "School not found !", "Get Assessment List API");

//         // Search condition
//         const searchClause = search
//             ? {
//                   [Op.or]: [{ assessment_title: { [Op.like]: `%${search}%` } }, { assessment_description: { [Op.like]: `%${search}%` } }],
//               }
//             : {};

//         const todayStart = moment().tz("Asia/Kolkata").startOf("day").toDate();

//         /**
//          * ------------------------------------------------------------------
//          * BASE WHERE CLAUSE (applies to all roles)
//          * ------------------------------------------------------------------
//          */
//         let whereClause = {
//             deleted_at: null,
//             course_id: null,
//             school_subject_id:{
//                 [Op.in]: Sequelize.literal(`
//                     (SELECT id FROM school_subject WHERE school_id = ${school_id})
//                 `)
//             }, //{ [Op.ne]: null },
//             ...searchClause,
//             [Op.or]: [{ end_date_time: null }, { end_date_time: { [Op.gte]: todayStart } }],
//         };

//         /**
//          * ------------------------------------------------------------------
//          * SCHOOL RESTRICTION FOR ADMIN / SCHOOL-ADMIN / SUPERADMIN
//          * Assessment does NOT contain school_id, so restrict via SchoolSubject
//          * ------------------------------------------------------------------
//          */
//         if (roleId === USER_ROLE.ADMIN || roleId === USER_ROLE.SUPERADMIN) {
//             delete whereClause[Op.or];
//         }

//         /**
//          * ------------------------------------------------------------------
//          * STUDENT FILTERS
//          * ------------------------------------------------------------------
//          */
//         let studentSectionId = null;
//         if (roleId === USER_ROLE.STUDENT) {
//             const student = await Students.findOne({
//                 where: { user_id: id, deleted_at: null },
//                 attributes: ["id", "class_section_id"],
//             });

//             if (!student) {
//                 return ResponseHelper.OK(res, true, "Student record not found!", [], null, "Get Assessment List API");
//             }
//             console.log(">>student.class_section_id>>>" , student.class_section_id);

//             studentSectionId = student.class_section_id
//         }

//         /**
//          * ------------------------------------------------------------------
//          * TEACHER FILTERS
//          * ------------------------------------------------------------------
//          */
//         if (roleId === USER_ROLE.TEACHER) {
//             // const teacher = await Teacher.findOne({
//             //     where: { user_id: id, deleted_at: null },
//             // });

//             // if (!teacher) {
//             //     return ResponseHelper.OK(res, true, "Teacher record not found!", [], null, "Get Assessment List API");
//             // }

//             // const mappings = await TeacherSubjectMap.findAll({
//             //     where: { deleted_at: null },
//             //     attributes: ["school_subject_id"],
//             //     include: [
//             //         {
//             //             model: TeacherClassMap,
//             //             where: { teacher_id: teacher.id, deleted_at: null },
//             //             include: [{ model: ClassSection }],
//             //         },
//             //     ],
//             // });

//             // if (!mappings.length) {
//             //     return ResponseHelper.OK(res, true, "No assigned classes or subjects!", [], null, "Get Assessment List API");
//             // }

//             // const allowedClassSectionIds = mappings.map((m) => m.TeacherClassMap.class_section_id);
//             // const allowedClassIds = mappings.map((m) => m.TeacherClassMap.ClassSection.class_id);
//             // const allowedSubjectIds = mappings.map((m) => m.school_subject_id);

//             // whereClause.class_id = { [Op.in]: allowedClassIds };
//             // whereClause.class_section_id = { [Op.or]: [...allowedClassSectionIds, null] };
//             // whereClause.school_subject_id = { [Op.in]: allowedSubjectIds };

//             // teachers only see their own assessments
//             whereClause.created_by = id;
//         }

//         /**
//          * ------------------------------------------------------------------
//          * COUNT + PAGINATION
//          * ------------------------------------------------------------------
//          */
//         const totalCount = await Assessment.count({ where: whereClause });

//         const assessments = await Assessment.findAll({
//             where: whereClause,
//             order: [["id", "DESC"]],
//             limit: limitInt,
//             offset,
//             attributes: {
//                 exclude: ["id", "created_at", "created_by", "deleted_at", "updated_at", "assessment_type_id", "school_subject_id", "class_id", "class_section_id"],
//             },
//             include: [
//                 {
//                     model: AssessmentType,
//                     attributes: ["assessment_type_uuid", "assessment_type_name"],
//                 },
//                 {
//                     model: SchoolSubject,
//                     attributes: ["school_subject_uuid"],
//                     include: [
//                         { model: Subject, attributes: ["subject_name", "subject_code"] },
//                         // {
//                         //     model: Schools,
//                         //     where: { id: school_id },
//                         //     required: true,
//                         //     attributes: [],
//                         // },
//                     ],

//                 },
//                 {
//                     model: Class,
//                     attributes: ["class_uuid", "class_name"],
//                 },
//                 {
//                     model: ClassSection,
//                     attributes: ["class_section_uuid", "class_section_name"],
//                 },
//                 {
//                     model: Users,
//                     attributes: ["user_uuid", "name", "email"],
//                 },
//                  {
//                     model: AssessmentClassSectionLink,
//                     attributes: ["id"],
//                     required: true,
//                     where: studentSectionId ? { class_section_id: studentSectionId } : undefined,
//                     include: [
//                         {
//                             model: ClassSection,
//                             attributes: ["class_section_name"],
//                         },
//                     ]

//                 },
//             ],
//         });

//         const meta = {
//             totalCount,
//             pageCount: Math.ceil(totalCount / limitInt),
//             currentPage: pageInt,
//             perPage: limitInt,
//             hasNextPage: pageInt < Math.ceil(totalCount / limitInt),
//             hasPrevPage: pageInt > 1,
//         };

//         return ResponseHelper.OK(res, true, "Assessment list fetched successfully!", assessments, meta, "Get Assessment List API");
//     } catch (error) {
//         return ResponseHelper.ISError(res, error.message, "Get Assessment List API");
//     }
// };

export const getAssessmentList = async (req, res) => {
  try {
    const { search = "", page = 1, limit = 10 } = req.query;

    const pageInt = parseInt(page, 10);
    const limitInt = parseInt(limit, 10);
    const offset = (pageInt - 1) * limitInt;

    const { roleId, id } = req.credentials || {};
    const school_uuid =
      req.credentials?.schoolUuid || req.headers["school-uuid"];

    /**
     * -------------------------------------------------------
     * SCHOOL VALIDATION
     * -------------------------------------------------------
     */
    const school_id = await CommonHelper.getIdFromUuid(
      Schools,
      school_uuid,
      res,
      "Get Assessment List API",
      "school_uuid"
    );

    if (!school_id) {
      return ResponseHelper.NotFound(
        res,
        false,
        "School not found !",
        "Get Assessment List API"
      );
    }
    /**
     * -------------------------------------------------------
     * BASE WHERE CLAUSE (COMMON)
     * -------------------------------------------------------
     */
    const todayStart = moment().tz("Asia/Kolkata").startOf("day").toDate();

    let whereClause = {
      deleted_at: null,
      course_id: null,

      school_subject_id: {
        [Op.in]: Sequelize.literal(`
      (SELECT id FROM school_subject WHERE school_id = ${school_id})
    `),
      },

      [Op.and]: [
        // 🔍 SEARCH
        search
          ? {
              [Op.or]: [
                { assessment_title: { [Op.like]: `%${search}%` } },
                // { assessment_description: { [Op.like]: `%${search}%` } },
              ],
            }
          : {},

        // ⏰ ACTIVE / NOT EXPIRED
        {
          [Op.or]: [
            { end_date_time: null },
            { end_date_time: { [Op.gte]: todayStart } },
          ],
        },
      ],
    };

    /**
     * -------------------------------------------------------
     * ROLE: ADMIN / SUPERADMIN
     * admins see everything (including expired)
     * -------------------------------------------------------
     */
    if (roleId === USER_ROLE.ADMIN || roleId === USER_ROLE.SUPERADMIN) {
      delete whereClause[Op.or]; // remove expiry filter
    }

    /**
     * -------------------------------------------------------
     * ROLE: STUDENT → Filter by AssessmentClassSectionLink
     * -------------------------------------------------------
     */
    let studentSectionId = null;

    if (roleId === USER_ROLE.STUDENT) {
      const student = await Students.findOne({
        where: { user_id: id, deleted_at: null },
        attributes: ["class_section_id"],
      });

      if (!student) {
        return ResponseHelper.OK(
          res,
          true,
          "Student record not found!",
          [],
          null,
          "Get Assessment List API"
        );
      }

      studentSectionId = student.class_section_id;
    }

    /**
     * -------------------------------------------------------
     * ROLE: TEACHER → Only assessments created by the teacher
     * -------------------------------------------------------
     */
    if (roleId === USER_ROLE.TEACHER) {
      whereClause.created_by = id;
    }

    /**
     * -------------------------------------------------------
     * COUNT
     * -------------------------------------------------------
     */
    const totalCount = await Assessment.count({ where: whereClause });

    /**
     * -------------------------------------------------------
     * FETCH LIST WITH RELATIONS
     * -------------------------------------------------------
     */
    const assessments = await Assessment.findAll({
      where: whereClause,
      order: [["id", "DESC"]],
      limit: limitInt,
      offset,

      attributes: {
        exclude: [
          "id",
          "created_at",
          "created_by",
          "deleted_at",
          "updated_at",
          "assessment_type_id",
          "school_subject_id",
          "class_id",
          "class_section_id",
        ],
      },

      include: [
        {
          model: AssessmentType,
          attributes: ["assessment_type_uuid", "assessment_type_name"],
        },
        {
          model: SchoolSubject,
          attributes: ["school_subject_uuid"],
          include: [
            {
              model: Subject,
              attributes: ["subject_name", "subject_code"],
            },
          ],
        },
        {
          model: Class,
          attributes: ["class_uuid", "class_name"],
        },
        {
          model: ClassSection,
          attributes: ["class_section_uuid", "class_section_name"],
        },
        {
          model: Users,
          attributes: ["user_uuid", "name", "email"],
        },
        {
          model: AssessmentClassSectionLink,
          required: roleId === USER_ROLE.STUDENT, // force inner join for students only
          where: studentSectionId
            ? { class_section_id: studentSectionId }
            : undefined,
          attributes: ["id"],
          include: [
            {
              model: ClassSection,
              attributes: ["class_section_name"],
            },
          ],
        },
      ],
    });

    /**
     * -------------------------------------------------------
     * PAGINATION META
     * -------------------------------------------------------
     */
    const meta = {
      totalCount,
      pageCount: Math.ceil(totalCount / limitInt),
      currentPage: pageInt,
      perPage: limitInt,
      hasNextPage: pageInt < Math.ceil(totalCount / limitInt),
      hasPrevPage: pageInt > 1,
    };

    return ResponseHelper.OK(
      res,
      true,
      "Assessment list fetched successfully!",
      assessments,
      meta,
      "Get Assessment List API"
    );
  } catch (error) {
    return ResponseHelper.ISError(
      res,
      error.message,
      "Get Assessment List API"
    );
  }
};

export const addAssessment = async (req, res) => {
  const t = await db.transaction();
  try {
    let {
      assessment_title,
      assessment_description,
      school_subject_uuid,
      class_uuid,
      class_section_uuid, // can be string or array
      accademic_year_uuid,
      assessment_type_uuid,
      total_marks,
      passing_marks,
      duration_in_minutes,
      questions,
      start_date_time,
      end_date_time,
      course_uuid,
      user_uuid,
    } = req.body;

    if (
      !assessment_title ||
      // !school_subject_uuid ||
      // !class_uuid ||
      !assessment_type_uuid ||
      !total_marks ||
      !passing_marks ||
      // !start_date_time ||
      // !end_date_time ||
      !duration_in_minutes ||
      questions.length == 0
    ) {
      return ResponseHelper.BadRequest(
        res,
        "Required details are missing",
        "Add Assessment API"
      );
    }
    let user_id;
    const school_uuid = req?.credentials?.schoolUuid;
    const school_id = await CommonHelper.getIdFromUuid(
      Schools,
      school_uuid,
      res,
      "Get Syllabus List API",
      "school_uuid"
    );
    if (!school_id)
      return ResponseHelper.NotFound(
        res,
        false,
        "School not found !",
        "Get Syllabus List API"
      );

    if (user_uuid) {
      user_id = await CommonHelper.getIdFromUuid(
        Users,
        user_uuid,
        res,
        "Get Syllabus List API",
        "user_uuid"
      );
    }

    let classSectionDetails, classDetails, schoolSubjectDetails, courseDetails;

    // Sanitize input
    assessment_title = assessment_title ? sanitizeHtml(assessment_title) : null;
    school_subject_uuid = school_subject_uuid
      ? sanitizeHtml(school_subject_uuid)
      : null;
    class_uuid = class_uuid ? sanitizeHtml(class_uuid) : null;
    course_uuid = course_uuid ? sanitizeHtml(course_uuid) : null;
    accademic_year_uuid = accademic_year_uuid
      ? sanitizeHtml(accademic_year_uuid)
      : null;
    assessment_type_uuid = assessment_type_uuid
      ? sanitizeHtml(assessment_type_uuid)
      : null;
    start_date_time = start_date_time ? sanitizeHtml(start_date_time) : null;
    end_date_time = end_date_time ? sanitizeHtml(end_date_time) : null;
    total_marks = parseInt(total_marks);
    passing_marks = parseInt(passing_marks);
    duration_in_minutes = parseInt(duration_in_minutes);
    assessment_description = assessment_description
      ? sanitizeHtml(assessment_description)
      : null;

    // Accept single or multiple section UUIDs
    let sectionUuids = [];
    if (Array.isArray(class_section_uuid)) {
      sectionUuids = class_section_uuid.map(sanitizeHtml);
    } else if (class_section_uuid) {
      sectionUuids = [sanitizeHtml(class_section_uuid)];
    }

    let sectionIds = [];

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
      classSectionDetails = sections[0]; // for compatibility
    }

    ////IF SECTION IS SELECTED
    // if (class_section_uuid) {
    //     classSectionDetails = await ClassSection.findOne({ where: { class_section_uuid, deleted_at: null } });
    //     if (!classSectionDetails) {
    //         return ResponseHelper.OK(res, false, "Section details not found !", null, null, "Add Assessment API");
    //     }
    //     sectionIds = sections.map((s) => s.id);
    //     // For compatibility, pick the first as classSectionDetails if needed below
    //     classSectionDetails = sections[0];
    // }

    // IF CLASS IS SELECTED
    if (class_uuid && !classSectionDetails) {
      classDetails = await Class.findOne({
        where: {
          class_uuid,
          deleted_at: null,
        },
      });
    }

    ////GETTING SCHOOL SUBJECT DETAILS
    if (school_subject_uuid) {
      const schoolSubjectOptions = {
        attributes: ["id"],
        where: {
          school_id,
          school_subject_uuid,
          deleted_at: null,
        },
        include: [
          {
            model: Class,
            where: {
              id: classSectionDetails
                ? classSectionDetails?.class_id
                : classDetails?.id,
              deleted_at: null,
            },
            attributes: [],
          },
        ],
      };

      schoolSubjectDetails = await SchoolSubject.findOne(schoolSubjectOptions);
      if (!schoolSubjectDetails) {
        return ResponseHelper.OK(
          res,
          false,
          "Subject details not found !",
          null,
          null,
          "Add Assessment API"
        );
      }
    }

    ////GETTING COURSE DETAILS

    if (course_uuid) {
      courseDetails = await Course.findOne({
        where: {
          course_uuid,
          deleted_at: null,
        },
      });

      if (!courseDetails) {
        return ResponseHelper.OK(
          res,
          false,
          "Course details not found !",
          null,
          null,
          "Add Assessment API"
        );
      }
    }

    ////DEFAULT FILTER FOR IS CURRENT
    let academicYearFilterOption = {
      is_current: true,
      deleted_at: null,
    };

    if (accademic_year_uuid) {
      delete academicYearFilterOption.is_current;
      academicYearFilterOption.accademic_year_uuid = accademic_year_uuid;
    }
    ////FETCHING ACADEMIC YEAR DETAILS
    const academicYearDetails = await AccademicYear.findOne({
      where: academicYearFilterOption,
      attributes: ["id"],
    });

    if (!academicYearDetails) {
      return ResponseHelper.OK(
        res,
        false,
        "Academic year details not found",
        null,
        null,
        "Add Assessment API"
      );
    }

    ////FETCHING ASSESSMENT TYPE DETAILS
    const assessmentTypeDetails = await AssessmentType.findOne({
      where: {
        assessment_type_uuid: assessment_type_uuid,
        deleted_at: null,
      },
      attributes: ["id"],
    });

    if (!assessmentTypeDetails) {
      return ResponseHelper.OK(
        res,
        false,
        "Assessment type details not found",
        null,
        null,
        "Add Assessment API"
      );
    }

    ////FILTER OPTION FOR SCHOOL SUBJECT

    // const alreadyExistingSyllabus = await Syllabus.findOne({
    //     where: {
    //         syllabus_title, school_subject_id: schoolSubject.id,
    //         accademic_year_id: academicYear.id, deleted_at: null
    //     }, transaction: t
    // })

    if (total_marks === 0) {
      return ResponseHelper.BadRequest(
        res,
        "Total marks cannot be 0",
        "Add Assessment API"
      );
    }

    if (passing_marks === 0) {
      return ResponseHelper.BadRequest(
        res,
        "Passing marks cannot be 0",
        "Add Assessment API"
      );
    }

    if (passing_marks === total_marks || passing_marks > total_marks) {
      return ResponseHelper.BadRequest(
        res,
        "Passing marks should be less than total marks",
        "Add Assessment API"
      );
    }

    // 1️⃣ Create assessment
    const assessmentToCreate = {
      assessment_title: assessment_title,
      assessment_description: assessment_description,
      school_subject_id: schoolSubjectDetails?.id || null,
      course_id: courseDetails?.id || null,
      class_id: classSectionDetails
        ? classSectionDetails?.class_id
        : classDetails?.id,
      //class_section_id: sectionIds.length === 1 ? sectionIds[0] : null, // only set if single section
      accademic_year_id: academicYearDetails?.id,
      assessment_type_id: assessmentTypeDetails?.id,
      total_marks: total_marks,
      passing_marks: passing_marks,
      start_date_time: start_date_time,
      end_date_time: end_date_time,
      duration_in_minutes: duration_in_minutes,
      created_by: user_uuid ? user_id : req.credentials.id,
      added_by: req.credentials.id,
    };

    const assessment = await Assessment.create(assessmentToCreate, {
      transaction: t,
    });

    // Map assessment to multiple class sections
    if (assessment && sectionIds.length > 0) {
      const links = sectionIds.map((sectionId) => ({
        assessment_id: assessment?.id,
        class_section_id: sectionId,
      }));
      await AssessmentClassSectionLink.bulkCreate(links, { transaction: t });
    }

    if (assessment) {
      // 2️⃣ Create questions
      if (questions.length > 0) {
        // ✅ Loop through questions
        for (const q of questions) {
          const {
            question_text,
            assessment_question_type_uuid,
            max_marks,
            options,
            correct_answer_text,
          } = q;

          // Resolve question type ID
          const questionType = await AssessmentQuestionType.findOne({
            where: {
              assessment_question_type_uuid: assessment_question_type_uuid,
            },
          });
          if (!questionType)
            throw new Error("Invalid assessment_question_type_uuid");

          // Create question
          const question = await AssessmentQuestion.create(
            {
              assessment_id: assessment.id,
              assessment_question_type_id: questionType.id,
              question_text,
              max_marks: max_marks,
              correct_answer_text: correct_answer_text || null,
            },
            { transaction: t }
          );

          // Create options only for MCQ, MAQ, TRUE_FALSE
          if (
            ["MCQ", "MAQ", "TRUE_FALSE"].includes(
              questionType.name.toUpperCase()
            ) &&
            options?.length
          ) {
            const optionData = options.map((opt) => ({
              assessment_question_id: question.id,
              option_text: opt.option_text,
              is_correct: opt.is_correct,
            }));
            await AssessmentQuestionOption.bulkCreate(optionData, {
              transaction: t,
            });
          }
        }
      }
    }

    await t.commit();
    return ResponseHelper.Created(
      res,
      true,
      "Successfully created",
      null,
      null,
      "Add Assessment API"
    );
  } catch (error) {
    await t.rollback();
    return ResponseHelper.BadRequest(
      res,
      "Failed to add assessment",
      error?.message ?? "Unknown error",
      "Add Assessment API"
    );
  }
};

export const fetchAssessmentDetails = async (req, res) => {
  try {
    const { assessment_uuid } = req.params;
    if (!assessment_uuid) {
      return ResponseHelper.BadRequest(
        res,
        "Assessment UUID is required",
        "Fetch Assessment Details API"
      );
    }
    const isStudent = req.credentials.roleId === USER_ROLE.STUDENT;
    let assessmentQuestionOptionsAttributes = [
      "assessment_question_option_uuid",
      "option_text",
    ];

    let assessmentQuestionAttributes = [
      "assessment_question_uuid",
      "question_text",
      "max_marks",
    ];

    if (!isStudent) {
      assessmentQuestionOptionsAttributes.push("is_correct");
      assessmentQuestionAttributes.push("correct_answer_text");
    }

    const include = [
      {
        model: AssessmentQuestion,
        include: [
          {
            model: AssessmentQuestionOption,
            required: false,
            attributes: assessmentQuestionOptionsAttributes,
          },
          {
            model: AssessmentQuestionType,
            required: false,
            attributes: { exclude: ["created_at", "updated_at", "deleted_at"] },
          },
        ],
        attributes: assessmentQuestionAttributes,
      },
      {
        model: AssessmentType,
        required: false,
        attributes: { exclude: ["created_at", "updated_at", "deleted_at"] },
      },
      {
        model: SchoolSubject,
        required: false,
        attributes: {
          exclude: [
            "created_at",
            "updated_at",
            "deleted_at",
            "subject_name",
            "subject_code",
          ],
        },
        include: [
          {
            model: Subject,
            attributes: { exclude: ["created_at", "updated_at", "deleted_at"] },
          },
        ],
      },
      {
        model: Class,
        required: false,
        attributes: { exclude: ["created_at", "updated_at", "deleted_at"] },
      },
      {
        model: AssessmentClassSectionLink,
        attributes: ["id"],
        required: false,
        include: [
          {
            model: ClassSection,
            attributes: ["class_section_name"],
          },
        ],
      },
    ];

    // Conditionally include StudentAssessmentResult if the user is a student
    if (isStudent) {
      include.push({
        model: StudentAssessmentResult,
        required: false,
        where: { student_id: req.credentials.id }, // or student_uuid if that’s what you use
        attributes: [
          "started_at",
          "submitted_at",
          "total_questions",
          "total_questions_attempted",
          "total_score",
          "performance_percentage",
          "completion_percentage",
          "accuracy_percentage",
        ],
        include: [{ model: Grade, attributes: ["grade_name"] }],
      });
    }
    const assessment = await Assessment.findOne({
      where: { assessment_uuid, deleted_at: null },
      include,
    });
    if (!assessment) {
      return ResponseHelper.OK(
        res,
        false,
        "Assessment not found",
        null,
        null,
        "Fetch Assessment Details API"
      );
    }

    // Now, run a separate COUNT query to get total students
    const totalStudents = await StudentAssessmentResult.count({
      where: { assessment_id: assessment.id, deleted_at: null },
      distinct: true,
      col: "student_id",
    });

    // Now, run a separate COUNT query to get total students
    const totalQuestions = await AssessmentQuestion.count({
      where: { assessment_id: assessment.id, deleted_at: null },
      distinct: true,
      col: "id",
    });

    // Remove all id fields from the response, only expose UUIDs
    const cleanAssessment = JSON.parse(JSON.stringify(assessment));
    cleanAssessment.total_students_attempted = totalStudents;
    cleanAssessment.total_questions = totalQuestions;

    function removeIdFields(obj) {
      if (Array.isArray(obj)) {
        obj.forEach(removeIdFields);
      } else if (obj && typeof obj === "object") {
        Object.keys(obj).forEach((key) => {
          if (
            key === "id" ||
            key === "assessment_id" ||
            key === "assessment_question_id" ||
            key === "assessment_question_type_id" ||
            key === "assessment_type_id" ||
            key === "school_subject_id" ||
            key === "class_id" ||
            key === "class_section_id"
          ) {
            delete obj[key];
          } else {
            removeIdFields(obj[key]);
          }
        });
      }
    }
    removeIdFields(cleanAssessment);
    return ResponseHelper.OK(
      res,
      true,
      "Assessment details fetched successfully!",
      cleanAssessment,
      null,
      "Fetch Assessment Details API"
    );
  } catch (error) {
    return ResponseHelper.ISError(
      res,
      error.message || "Failed to fetch assessment details",
      "Fetch Assessment Details API"
    );
  }
};

export const updateAssessment = async (req, res) => {
  const t = await db.transaction();
  try {
    const { assessment_uuid } = req.params;
    let {
      assessment_title,
      assessment_description,
      school_subject_uuid,
      class_uuid,
      class_section_uuid,
      accademic_year_uuid,
      assessment_type_uuid,
      total_marks,
      passing_marks,
      duration_in_minutes,
      start_date_time,
      end_date_time,
      questions,
    } = req.body;
    const assessment = await Assessment.findOne({
      where: { assessment_uuid, deleted_at: null },
      transaction: t,
    });
    if (!assessment) {
      await t.rollback();
      return ResponseHelper.OK(
        res,
        false,
        "Assessment not found",
        null,
        null,
        "Update Assessment API"
      );
    }
    if (school_subject_uuid) {
      school_subject_uuid = sanitizeHtml(school_subject_uuid);
      const school_uuid = req?.credentials?.schoolUuid;
      const school_id = await CommonHelper.getIdFromUuid(
        Schools,
        school_uuid,
        res,
        "Update Assessment API",
        "school_uuid"
      );
      let classSectionDetails, classDetails;
      if (class_section_uuid) {
        classSectionDetails = await ClassSection.findOne({
          where: { class_section_uuid, deleted_at: null },
        });
      }
      if (!class_section_uuid && class_uuid) {
        classDetails = await Class.findOne({
          where: { class_uuid, deleted_at: null },
        });
      }
      const schoolSubjectOptions = {
        attributes: ["id"],
        where: {
          school_id,
          school_subject_uuid,
          deleted_at: null,
        },
        include: [
          {
            model: Class,
            where: {
              id: classSectionDetails
                ? classSectionDetails.class_id
                : classDetails?.id,
              deleted_at: null,
            },
            attributes: [],
          },
        ],
      };
      const schoolSubjectDetails = await SchoolSubject.findOne(
        schoolSubjectOptions
      );
      if (schoolSubjectDetails) {
        assessment.school_subject_id = schoolSubjectDetails.id;
      }
    }
    if (class_section_uuid) {
      class_section_uuid = sanitizeHtml(class_section_uuid);
      const classSectionDetails = await ClassSection.findOne({
        where: { class_section_uuid, deleted_at: null },
      });
      if (classSectionDetails) {
        assessment.class_section_id = classSectionDetails.id;
        assessment.class_id = classSectionDetails.class_id;
      }
    } else if (class_uuid) {
      class_uuid = sanitizeHtml(class_uuid);
      const classDetails = await Class.findOne({
        where: { class_uuid, deleted_at: null },
      });
      if (classDetails) {
        assessment.class_id = classDetails.id;
        assessment.class_section_id = null;
      }
    }
    if (accademic_year_uuid) {
      accademic_year_uuid = sanitizeHtml(accademic_year_uuid);
      const academicYearDetails = await AccademicYear.findOne({
        where: { accademic_year_uuid, is_current: true, deleted_at: null },
        attributes: ["id"],
      });
      // if (academicYearDetails) {
      //     assessment.accademic_year_id = academicYearDetails.id;
      // }
    }
    if (assessment_type_uuid) {
      assessment_type_uuid = sanitizeHtml(assessment_type_uuid);
      const assessmentTypeDetails = await AssessmentType.findOne({
        where: { assessment_type_uuid, deleted_at: null },
        attributes: ["id"],
      });
      if (assessmentTypeDetails) {
        assessment.assessment_type_id = assessmentTypeDetails.id;
      }
    }
    if (assessment_title)
      assessment.assessment_title = sanitizeHtml(assessment_title);
    if (assessment_description)
      assessment.assessment_description = sanitizeHtml(assessment_description);
    if (total_marks) assessment.total_marks = parseInt(total_marks);
    if (passing_marks) assessment.passing_marks = parseInt(passing_marks);
    if (duration_in_minutes)
      assessment.duration_in_minutes = parseInt(duration_in_minutes);
    if (start_date_time)
      assessment.start_date_time = sanitizeHtml(start_date_time);
    if (end_date_time) assessment.end_date_time = sanitizeHtml(end_date_time);
    assessment.updated_by = req.credentials.id;
    await assessment.save({ transaction: t });

    // Update questions if provided
    if (questions && Array.isArray(questions)) {
      // Fetch existing questions for this assessment
      const existingQuestions = await AssessmentQuestion.findAll({
        where: { assessment_id: assessment.id },
        include: [{ model: AssessmentQuestionOption }],
        transaction: t,
      });
      const existingQuestionMap = new Map();
      existingQuestions.forEach((q) => {
        existingQuestionMap.set(q.assessment_question_uuid, q);
      });

      // Track UUIDs to keep
      const incomingUUIDs = questions
        .map((q) => q.assessment_question_uuid)
        .filter(Boolean);

      // Delete questions not present in payload
      for (const q of existingQuestions) {
        if (!incomingUUIDs.includes(q.assessment_question_uuid)) {
          await AssessmentQuestionOption.destroy({
            where: { assessment_question_id: q.id },
            transaction: t,
          });
          await q.destroy({ transaction: t });
        }
      }

      // Upsert questions
      for (const q of questions) {
        let questionType = await AssessmentQuestionType.findOne({
          where: {
            assessment_question_type_uuid: q.assessment_question_type_uuid,
          },
        });
        if (!questionType)
          throw new Error("Invalid assessment_question_type_uuid");
        let question;
        if (
          q.assessment_question_uuid &&
          existingQuestionMap.has(q.assessment_question_uuid)
        ) {
          // Update existing question
          question = existingQuestionMap.get(q.assessment_question_uuid);
          question.question_text = q.question_text;
          question.assessment_question_type_id = questionType.id;
          question.max_marks = q.max_marks;
          question.correct_answer_text = q.correct_answer_text || null;
          await question.save({ transaction: t });
          // Update options
          if (
            ["MCQ", "MAQ", "TRUE_FALSE"].includes(
              questionType.name.toUpperCase()
            )
          ) {
            // Remove old options
            await AssessmentQuestionOption.destroy({
              where: { assessment_question_id: question.id },
              transaction: t,
            });
            // Add new options
            if (q.options && q.options.length) {
              const optionData = q.options.map((opt) => ({
                assessment_question_id: question.id,
                option_text: opt.option_text,
                is_correct: opt.is_correct,
              }));
              await AssessmentQuestionOption.bulkCreate(optionData, {
                transaction: t,
              });
            }
          }
        } else {
          // Create new question
          question = await AssessmentQuestion.create(
            {
              assessment_id: assessment.id,
              assessment_question_type_id: questionType.id,
              question_text: q.question_text,
              max_marks: q.max_marks,
              correct_answer_text: q.correct_answer_text || null,
            },
            { transaction: t }
          );
          // Add options if needed
          if (
            ["MCQ", "MAQ", "TRUE_FALSE"].includes(
              questionType.name.toUpperCase()
            ) &&
            q.options &&
            q.options.length
          ) {
            const optionData = q.options.map((opt) => ({
              assessment_question_id: question.id,
              option_text: opt.option_text,
              is_correct: opt.is_correct,
            }));
            await AssessmentQuestionOption.bulkCreate(optionData, {
              transaction: t,
            });
          }
        }
      }
    }
    await t.commit();
    return ResponseHelper.OK(
      res,
      true,
      "Assessment updated successfully!",
      null,
      null,
      "Update Assessment API"
    );
  } catch (error) {
    await t.rollback();
    return ResponseHelper.BadRequest(
      res,
      error?.message ?? "Unknown error",
      "Update Assessment API"
    );
  }
};

export const deleteAssessment = async (req, res) => {
  const t = await db.transaction();
  try {
    const { assessment_uuid } = req.params;
    const assessment = await Assessment.findOne({
      where: { assessment_uuid, deleted_at: null },
      transaction: t,
    });
    if (!assessment) {
      await t.rollback();
      return ResponseHelper.OK(
        res,
        false,
        "Assessment not found",
        null,
        null,
        "Delete Assessment API"
      );
    }
    await assessment.update(
      { deleted_at: new Date(), updated_by: req.credentials.id },
      { transaction: t }
    );
    await t.commit();
    return ResponseHelper.OK(
      res,
      true,
      "Assessment deleted successfully!",
      null,
      null,
      "Delete Assessment API"
    );
  } catch (error) {
    await t.rollback();
    return ResponseHelper.BadRequest(
      res,
      error?.message ?? "Unknown error",
      "Delete Assessment API"
    );
  }
};

export const evaluateAssessmentForAllStudents = async (req, res) => {
  const t = await db.transaction();
  try {
    let { assessment_uuid } = req.params;

    assessment_uuid = sanitizeHtml(assessment_uuid);

    // ✅ Validate assessment
    const assessment = await Assessment.findOne({
      where: { assessment_uuid, deleted_at: null },
    });
    if (!assessment) {
      await t.rollback();
      return ResponseHelper.OK(
        res,
        false,
        "Assessment not found",
        null,
        null,
        "Evaluate All Students API"
      );
    }

    // ✅ Get all students who have taken this assessment
    const studentResults = await StudentAssessmentResult.findAll({
      where: { assessment_id: assessment.id, deleted_at: null },
      attributes: ["id", "student_id"],
    });

    if (!studentResults.length) {
      await t.rollback();
      return ResponseHelper.OK(
        res,
        false,
        "No students found for this assessment",
        null,
        null,
        "Evaluate All Students API"
      );
    }

    // ✅ Loop through each student result and evaluate
    for (const result of studentResults) {
      const { id: resultId, student_id } = result;

      // Get student's total questions attempted and marks
      const [count, totalMarks] = await Promise.all([
        AssessmentStudentAnswer.count({
          where: { student_assessment_result_id: resultId },
        }),
        AssessmentStudentAnswer.sum("marks_obtained", {
          where: { student_assessment_result_id: resultId, is_correct: true },
        }),
      ]);

      const grade_id = await CommonHelper.calculateGrade(
        totalMarks || 0,
        assessment.total_marks
      );

      await StudentAssessmentResult.update(
        {
          total_questions_attempted: count || 0,
          total_score: totalMarks || 0,
          grade_id: grade_id,
        },
        { where: { id: resultId }, transaction: t }
      );
    }

    await t.commit();
    return ResponseHelper.OK(
      res,
      true,
      "All students evaluated successfully",
      null,
      null,
      "Evaluate All Students API"
    );
  } catch (error) {
    await t.rollback();
    return ResponseHelper.ISError(
      res,
      error.message,
      "Evaluate All Students API"
    );
  }
};

export const studentStartsAssessment = async (req, res) => {
  try {
    let { assessment_uuid } = req.params;
    assessment_uuid = sanitizeHtml(assessment_uuid);
    const school_uuid = req.credentials.schoolUuid;

    const school_id = await CommonHelper.getIdFromUuid(
      Schools,
      school_uuid,
      res,
      "Add Stream API",
      "school_uuid"
    );
    if (!school_id) {
      return ResponseHelper.NotFound(
        res,
        false,
        "School not found !",
        "Add Stream API"
      );
    }

    if (!assessment_uuid) {
      return ResponseHelper.BadRequest(
        res,
        "Assessment not selected ",
        "Start Assessment API"
      );
    }

    const assessmentOption = {
      where: {
        assessment_uuid,
        deleted_at: null,
      },
      include: [
        {
          model: SchoolSubject,
          attributes: ["id"],
          include: [
            {
              model: Schools,
              attributes: [],
              where: {
                id: school_id,
                deleted_at: null,
              },
            },
          ],
        },
      ],
    };
    const assessment = await Assessment.findOne(assessmentOption);

    if (!assessment) {
      return ResponseHelper.BadRequest(
        res,
        "Assessment not found ",
        "Start Assessment API"
      );
    }

    const studentAssessmentResult = await StudentAssessmentResult.findOne({
      where: {
        assessment_id: assessment.id,
        student_id: req.credentials.id,
        deleted_at: null,
      },
    });

    const count = await AssessmentQuestion.count({
      where: { assessment_id: assessment.id, deleted_at: null },
    });

    const data = {
      assessment_id: assessment.id,
      student_id: req.credentials.id,
      started_at: studentAssessmentResult?.started_at
        ? studentAssessmentResult?.started_at
        : moment().tz("Asia/Kolkata").toDate(), //moment().tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss"),
      // total_questions_attempted: studentAssessmentResult ? studentAssessmentResult.total_questions_attempted + 1 : 1,
      total_score: studentAssessmentResult
        ? studentAssessmentResult.total_score
        : 0,
      total_questions: count || 0,
    };

    if (!studentAssessmentResult) {
      await StudentAssessmentResult.create(data);
    } else {
      studentAssessmentResult.update(data);
    }
    return ResponseHelper.Created(
      res,
      true,
      "Assessment started successfully!",
      null,
      null,
      "Start Assessment API"
    );
  } catch (error) {
    return ResponseHelper.ISError(
      res,
      error.message || "Failed to add stream",
      "Start Assessment API"
    );
  }
};

export const studentAssessmentAnswerSubmit = async (req, res) => {
  const t = await db.transaction();
  try {
    const {
      assessment_uuid,
      assessment_question_uuid,
      selected_option_ids,
      answer_text,
    } = req.body;

    // Validate assessment
    const assessment = await Assessment.findOne({
      where: { assessment_uuid, deleted_at: null },
    });
    if (!assessment) {
      await t.rollback();
      return ResponseHelper.OK(
        res,
        false,
        "Assessment not found",
        null,
        null,
        "Student Assessment Answer Submit API"
      );
    }

    // Validate student
    const student = await Users.findOne({ where: { id: req.credentials.id } });
    if (!student) {
      await t.rollback();
      return ResponseHelper.OK(
        res,
        false,
        "Student not found",
        null,
        null,
        "Student Assessment Answer Submit API"
      );
    }

    // Fetch the question
    const question = await AssessmentQuestion.findOne({
      where: { assessment_question_uuid, assessment_id: assessment.id },
      include: [AssessmentQuestionOption, AssessmentQuestionType],
    });

    if (!question) {
      await t.rollback();
      return ResponseHelper.OK(
        res,
        false,
        "Question not found in this assessment",
        null,
        null,
        "Student Assessment Answer Submit API"
      );
    }

    // Get or create student assessment result
    let studentResult = await StudentAssessmentResult.findOne({
      where: {
        assessment_id: assessment.id,
        student_id: student.id,
        deleted_at: null,
      },
    });

    if (!studentResult) {
      studentResult = await StudentAssessmentResult.create(
        {
          assessment_id: assessment.id,
          student_id: student.id,
          total_score: 0,
          total_questions_attempted: 0,
        },
        { transaction: t }
      );
    }

    // Auto-evaluation
    let isCorrect = false;
    let marks = 0;
    let updated_total_score = 0;
    const type = question.AssessmentQuestionType.name.toUpperCase();
    const correctOptions = question.AssessmentQuestionOptions.filter(
      (o) => o.is_correct
    ).map((o) => o.assessment_question_option_uuid);

    if (["MCQ", "TRUE_FALSE"].includes(type)) {
      if (
        selected_option_ids?.length === 1 &&
        correctOptions.includes(selected_option_ids[0])
      ) {
        isCorrect = true;
        marks = question.max_marks;
      }
    } else if (type === "MAQ") {
      const selected = new Set(selected_option_ids);
      const correct = new Set(correctOptions);
      if (
        selected.size === correct.size &&
        [...selected].every((id) => correct.has(id))
      ) {
        isCorrect = true;
        marks = question.max_marks;
      }
    } else if (["FILL_BLANK"].includes(type)) {
      if (
        question.correct_answer_text?.trim().toLowerCase() ===
        answer_text?.trim().toLowerCase()
      ) {
        isCorrect = true;
        marks = question.max_marks;
      }
    } else if (["DESCRIPTIVE"].includes(type)) {
      isCorrect = true;
      marks = question.max_marks;
    }

    // Check if the student already submitted answer for this question
    const existingAnswer = await AssessmentStudentAnswer.findOne({
      where: {
        student_assessment_result_id: studentResult.id,
        question_id: question.id,
      },
    });

    if (existingAnswer) {
      // Update existing answer
      await existingAnswer.update(
        {
          selected_option_ids,
          answer_text,
          is_correct: isCorrect,
          marks_obtained: isCorrect ? marks : 0,
        },
        { transaction: t }
      );
    } else {
      await AssessmentStudentAnswer.create(
        {
          student_assessment_result_id: studentResult.id,
          question_id: question.id,
          selected_option_ids,
          answer_text,
          is_correct: isCorrect,
          marks_obtained: marks,
        },
        { transaction: t }
      );
    }

    await t.commit();

    return ResponseHelper.Created(
      res,
      true,
      "Answer successfully submitted",
      null,
      null,
      "Student Assessment Answer Submit API"
    );
  } catch (error) {
    await t.rollback();
    return ResponseHelper.ISError(
      res,
      error.message,
      "Student Assessment Answer Submit API"
    );
  }
};

export const fetchStudentsAttemptedList = async (req, res) => {
  try {
    let { assessment_uuid } = req.params;

    assessment_uuid = sanitizeHtml(assessment_uuid);

    if (!assessment_uuid) {
      return ResponseHelper.BadRequest(
        res,
        "Assessment UUID is required",
        "List Students Attempted API"
      );
    }

    // Fetch assessment ID
    const assessment = await Assessment.findOne({
      where: { assessment_uuid, deleted_at: null },
      attributes: ["id", "total_marks"],
    });

    if (!assessment) {
      return ResponseHelper.NotFound(
        res,
        "Assessment not found",
        "List Students Attempted API"
      );
    }

    // Now, run a separate COUNT query to get total students
    const totalQuestions = await AssessmentQuestion.count({
      where: { assessment_id: assessment.id, deleted_at: null },
      distinct: true,
      col: "id",
    });

    // Remove all id fields from the response, only expose UUIDs
    const cleanAssessment = JSON.parse(JSON.stringify(assessment));

    // Fetch all students who attempted this assessment
    const students = await StudentAssessmentResult.findAll({
      where: { assessment_id: assessment.id, deleted_at: null },
      include: [
        {
          model: Users,
          attributes: ["user_uuid", "name"], // adjust fields as needed
          include: [
            {
              model: Students,
              attributes: ["roll_number"],

              include: [
                {
                  model: ClassSection,
                  attributes: ["class_section_name"],
                  include: [
                    {
                      model: Class,
                      attributes: ["class_name"],
                    },
                  ],
                },
                {
                  model: Gender,
                  attributes: ["gender_name"],
                },
              ],
            },
          ],
        },
        {
          model: Grade,
          attributes: ["grade_name"],
        },
      ],
      attributes: ["total_questions_attempted", "total_score"],
    });

    // Attach totalQuestions to each student object
    const studentsWithTotalAsessmentQuestions = students.map((student) => ({
      ...student.toJSON(),
      total_questions: totalQuestions,
      total_assessment_marks: cleanAssessment.total_marks,
    }));

    return ResponseHelper.OK(
      res,
      true,
      "Students who attempted this assessment fetched successfully!",
      studentsWithTotalAsessmentQuestions,
      null,
      "List Students Attempted API"
    );
  } catch (error) {
    return ResponseHelper.ISError(
      res,
      error.message || "Failed to fetch students",
      "List Students Attempted API"
    );
  }
};

export const evaluateAssessmentByStudent = async (req, res) => {
  try {
    const { assessment_uuid, user_uuid = null } = req.body;
    let student;
    const isStudent = req.credentials.roleId === USER_ROLE.STUDENT;
    // Validate assessment
    const assessment = await Assessment.findOne({
      where: { assessment_uuid, deleted_at: null },
    });
    if (!assessment) {
      return ResponseHelper.OK(
        res,
        false,
        "Assessment not found",
        null,
        null,
        "Evaluate Assessment By Student API"
      );
    }

    let whereCondition = {};

    // WHEN LOGGED IN AS STUDENT
    if (isStudent) {
      whereCondition = { id: req.credentials.id };
    }

    // WHEN LOGGED IN AS NON-STUDENT (ADMIN / TEACHER)
    else if (!isStudent && user_uuid) {
      whereCondition = { user_uuid };
    }

    // VALIDATE: Must have at least one condition
    if (!Object.keys(whereCondition).length) {
      return ResponseHelper.OK(
        res,
        false,
        "Missing student identifier (either credentials or user_uuid required)",
        null,
        null,
        "Evaluate Assessment By Student API"
      );
    }

    // Now use the same whereCondition for finding the student
    student = await Users.findOne({ where: whereCondition });

    if (!student) {
      return ResponseHelper.OK(
        res,
        false,
        "Student not found",
        null,
        null,
        "Evaluate Assessment By Student API"
      );
    }

    const studentAssessmentResult = await StudentAssessmentResult.findOne({
      where: {
        assessment_id: assessment.id,
        student_id: student.id,
        deleted_at: null,
      },
    });

    if (!studentAssessmentResult) {
      return ResponseHelper.BadRequest(
        res,
        "Student has not taken this assessment",
        "Evaluate Assessment By Student API"
      );
    }

    const [count, totalMarks] = await Promise.all([
      AssessmentStudentAnswer.count({
        where: { student_assessment_result_id: studentAssessmentResult?.id },
      }),
      AssessmentStudentAnswer.sum("marks_obtained", {
        where: {
          student_assessment_result_id: studentAssessmentResult.id,
          is_correct: true,
        },
      }),
    ]);

    const grade_id = await CommonHelper.calculateGrade(
      totalMarks,
      assessment.total_marks
    );

    await studentAssessmentResult.update({
      total_questions_attempted: count,
      total_score: totalMarks,
      grade_id: grade_id,
    });

    const updatedStudentAssessmentResult =
      await StudentAssessmentResult.findOne({
        where: {
          id: studentAssessmentResult.id,
          deleted_at: null,
        },
      });

    const correctAnswerCount = await AssessmentStudentAnswer.count({
      where: {
        student_assessment_result_id: studentAssessmentResult.id,
        is_correct: true,
      },
    });

    const completionPercentage =
      updatedStudentAssessmentResult?.total_questions > 0
        ? (
            (updatedStudentAssessmentResult?.total_questions_attempted /
              updatedStudentAssessmentResult?.total_questions) *
            100
          ).toFixed(2)
        : 0;
    const accuracyPercentage =
      updatedStudentAssessmentResult?.total_questions_attempted > 0
        ? (
            (correctAnswerCount /
              updatedStudentAssessmentResult?.total_questions_attempted) *
            100
          ).toFixed(2)
        : 0;
    const performancePercentage =
      assessment.total_marks > 0
        ? (
            (updatedStudentAssessmentResult?.total_score /
              assessment.total_marks) *
            100
          ).toFixed(2)
        : 0;
    await updatedStudentAssessmentResult.update({
      completion_percentage: completionPercentage,
      accuracy_percentage: accuracyPercentage,
      performance_percentage: performancePercentage,
      submitted_at: moment().tz("Asia/Kolkata").toDate(),
    });
    return ResponseHelper.OK(
      res,
      true,
      "Assessement evaluated successfully",
      null,
      null,
      "Evaluate Assessment By Student API"
    );
  } catch (error) {
    await t.rollback();
    return ResponseHelper.ISError(
      res,
      error.message,
      "Evaluate Assessment By Student API"
    );
  }
};
