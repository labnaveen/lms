import ResponseHelper from "../helpers/ResponseHelper.js";
import Subject from "../models/SubjectModel.js";
import Class from "../models/ClassModel.js";
import Schools from "../models/SchoolsModal.js";
import ClassSection from "../models/ClassSectionModel.js";
import SchoolSubject from "../models/SchoolSubjectModel.js";
import TeacherClassMap from "../models/TeacherClassMapModal.js";
import Teacher from "../models/TeacherModel.js";
import { USER_ROLE } from "../constants/Constants.js";
import Students from "../models/StudentsModel.js";
import TeacherSubjectMap from "../models/TeacherSubjectMapModal.js";
import Users from "../models/UserModal.js";
import Assessment from "../models/AssessmentModal.js";
import StudentAssessmentResult from "../models/StudentAssessmentResultModal.js";
import { Op, where } from "sequelize";
import moment from "moment";
import AssessmentClassSectionLink from "../models/AssessmentClassSectionLinkModel.js";
import Course from "../models/CourseModel.js";
import UserCourseEnrollment from "../models/UserCourseEnrollment.js";
import CourseClassSectionLink from "../models/CourseClassSectionLinkModel.js";

export const getDashboardDataList = async (req, res) => {
  try {
    const userId = req.credentials.id;
    const isStudent = req.credentials.roleId === USER_ROLE.STUDENT;
    const isTeacher = req.credentials.roleId === USER_ROLE.TEACHER;
    const isAdmin = req.credentials.roleId === USER_ROLE.ADMIN;
    const isSuperAdmin = req.credentials.roleId === USER_ROLE.TEACHER;
    const school_uuid =
      req.credentials.schoolUuid || req.headers["school-uuid"]; // From headers or token
    const todayStart = moment().tz("Asia/Kolkata").startOf("day").toDate();

    let adminDetails, superAdminDetails;
    let dashboardData = {};

    /////TEACHERS SECTION
    if (isTeacher) {
      let teacherDetails;
      ////TEACHER DETAILS
      teacherDetails = await Teacher.findOne({
        include: [
          {
            model: Users,
            where: {
              id: userId,
            },
            attributes: ["id", "name"],
          },
        ],
        attributes: ["id"],
      });

      ////GETTING CLASSES COUNT
      const assignedClasess = await TeacherClassMap.findAll({
        where: {
          teacher_id: teacherDetails?.id,
          deleted_at: null,
        },
      });

      ////ADDING TOTAL ASSINED CALSSESS AND SECTIONS COUNT
      dashboardData.assigned_classes_section_count = assignedClasess?.length;

      const assignedClasessIds = assignedClasess.map((m) => m.id);

      ////GETTIGN TOTAL ASSIGNED SUBJECTS
      const assignedSubjectsCount = await TeacherSubjectMap.count({
        where: {
          teacher_class_map_id: assignedClasessIds,
          deleted_at: null,
        },
      });
      ////ADDING TOTAL ASSINED SUBJECTS
      dashboardData.assigned_subjects_count = assignedSubjectsCount;

      //// CREATED ASSESSMENTS BY THE TEACHER
      const assessments = await Assessment.findAll({
        where: {
          created_by: teacherDetails?.User?.id,
          deleted_at: null,
          [Op.or]: [
            { end_date_time: null },
            { end_date_time: { [Op.gte]: todayStart } },
          ],
        },
        attributes: [
          "id",
          "assessment_title",
          "start_date_time",
          "created_at",
          "class_id",
          "assessment_uuid",
        ],
        include: [
          {
            model: SchoolSubject,
            attributes: ["id"],
            include: [
              {
                model: Subject,
                attributes: ["subject_name", "subject_code"],
              },
            ],
          },
          {
            model: AssessmentClassSectionLink,
            attributes: ["class_section_id"],
            required: true,
          },
        ],
        order: [["created_at", "DESC"]], // latest first
        limit: 3, // only top 3
      });

      // Map each assessment to include attempted count

      const assessmentsWithCount = await Promise.all(
        assessments.map(async (assessment) => {
          // Total attempted students
          const totalAttempted = await StudentAssessmentResult.count({
            where: { assessment_id: assessment?.id },
          });

          // Total students for that assessment
          let totalStudents;
          // Getting total sectionIDs count of current assessment
          const assessmentLinkedSectionIds =
            assessment?.AssessmentClassSectionLinks.map(
              (item) => item?.class_section_id
            );
          // Getting total count of students based on assessment class_section_id
          totalStudents = await Students.count({
            where: { class_section_id: assessmentLinkedSectionIds },
          });
          // if (assessment?.class_section_id) {
          //   console.log("AA gyaaa")
          //   // Assessment for a specific section
          //   totalStudents = await Students.count({
          //     where: { class_section_id: assessment?.class_section_id },
          //   });
          // } else {
          //   // Assessment for the whole class
          //   totalStudents = await Students.count({
          //     where: { class_section_id: assessmentLinkedSectionIds },

          //     // include: [
          //     //   {
          //     //     model: ClassSection,
          //     //     attributes: ["id"],
          //     //     include: [
          //     //       {
          //     //         model: Class,
          //     //         where: { id: assessment?.class_id },
          //     //       },
          //     //     ],
          //     //   },
          //     // ],
          //   });
          // }

          const { id, class_section_id, class_id, SchoolSubject, ...rest } =
            assessment.toJSON();

          // Flatten subject info if available
          const subject_name = SchoolSubject?.Subject?.subject_name || null;
          const subject_code = SchoolSubject?.Subject?.subject_code || null;

          return {
            ...rest,
            subject_name,
            subject_code,
            total_attempted_students: totalAttempted,
            total_students: totalStudents,
            average_attempt_rate:
              totalStudents > 0 ? (totalAttempted / totalStudents) * 100 : 0,
          };
        })
      );

      ////CALCULATING OVER ALL AVERAGE ATTEMPT RATE  BASED ON ALL ASSESMENTS AVERAGE ATTEMPT RATE
      const avgAttemptRate =
        assessmentsWithCount.reduce(
          (sum, item) => sum + item.average_attempt_rate,
          0
        ) / assessmentsWithCount.length;

      dashboardData.overallAssessmentsAverageAttemptRate = avgAttemptRate;

      ////REMOVING AssessmentClassSectionLinks BEFORE SENDING RESPONSE
      dashboardData.top_assessments = assessmentsWithCount.map((a) => {
        const { AssessmentClassSectionLinks, ...rest } = a;
        return rest;
      }); //assessmentsWithCount;

      dashboardData.top_assessments_count = assessments.length;

      ////GETTING ASSIGNED CLASSESS SECTIONS AND SUBJECTS LIST
      const teachersAssigneClassessWithSubjectMap =
        await TeacherClassMap.findAll({
          where: {
            teacher_id: teacherDetails?.id,
          },
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
              attributes: ["school_subject_id"],
              include: [
                {
                  model: SchoolSubject,
                  // as: "schoolSubject",
                  attributes: ["school_subject_uuid"],
                  include: [
                    {
                      model: Subject,
                      // as: "teacherSubjectMap",
                      attributes: ["subject_name", "subject_code"],
                    },
                  ],
                },
              ],
            },
            //   ],
            // },
          ],
          attributes: ["teacher_id"],
        });

      dashboardData.TeacherClassMaps = teachersAssigneClassessWithSubjectMap;

      ////GETTING LATEST SUBMITTED ASSESSEMENTS BY STUDENTS FOR THE LOGGEDIN TEACHER

      const recentlySubmittedAssessments =
        await StudentAssessmentResult.findAll({
          attributes: ["updated_at"],
          include: [
            {
              model: Assessment,
              attributes: ["assessment_title", "assessment_uuid"],
              where: {
                created_by: teacherDetails?.User?.id,
                deleted_at: null,
              },
            },
            {
              model: Users,
              attributes: ["name"],
            },
          ],
          order: [["updated_at", "DESC"]], // latest first
          limit: 3, // only top 3
        });

      dashboardData.recently_submitted_assessments =
        recentlySubmittedAssessments;
    }

    ////STUDNETS
    if (isStudent) {
      const studentDetails = await Students.findOne({
        include: [
          {
            model: Users,
            where: { id: userId },
            attributes: ["id", "name", "school_id"],
          },
          {
            model: ClassSection,
            attributes: ["id", "class_id"],
          },
        ],
        attributes: ["id", "class_section_id", "user_id"],
      });

      const classId = studentDetails?.ClassSection?.class_id;
      const sectionId = studentDetails?.class_section_id;
      const studentSchoolId = studentDetails?.User?.school_id;

      // TIME condition
      let assessmentWhereClause = {
        deleted_at: null,
        class_id: classId,
        [Op.or]: [
          { end_date_time: null },
          { end_date_time: { [Op.gte]: todayStart } },
        ],
      };

      // Class/Section Conditions for link table
      let linkWhereClause = {};

      if (sectionId) {
        linkWhereClause.class_section_id = sectionId;
      }

      // -----------------------------------------------
      // TOTAL COUNT (must include link table !!!)
      // -----------------------------------------------
      const totalAssessmentsCount = await Assessment.count({
        where: assessmentWhereClause,
        include: [
          {
            model: AssessmentClassSectionLink,
            required: true,
            where: linkWhereClause,
            attributes: [],
          },
        ],
      });

      // Completed assessments
      const completedAssessmentsCount = await StudentAssessmentResult.count({
        where: { student_id: studentDetails?.user_id },
        include: [
          {
            model: Assessment,
            where: assessmentWhereClause,
          },
        ],
      });

      // -----------------------------------------------
      // ASSESSMENT LIST (same filter)
      // -----------------------------------------------
      const assessmentsList = await Assessment.findAll({
        where: assessmentWhereClause,
        include: [
          { model: Users, attributes: ["name"] },
          {
            model: Class,
            attributes: ["class_name"],
          },
          {
            model: AssessmentClassSectionLink,
            required: true,
            where: linkWhereClause,
            attributes: ["id"],
            include: [
              {
                model: ClassSection,
                attributes: ["class_section_name"],
              },
            ],
          },
        ],
        order: [["id", "DESC"]],
        attributes: [
          "id",
          "assessment_title",
          "assessment_uuid",
          "start_date_time",
          "end_date_time",
          "duration_in_minutes",
        ],
        limit: 3,
      });

      const totalEnrolledCoursesCount = await Course.count({
        where: {
          deleted_at: null,
        },
        include: [
          {
            model: UserCourseEnrollment,
            where: {
              user_id: userId,
            },
            attributes: [],
            required: true,
          },
        ],
      });

      const totalAssignedCoursesCount = await Course.count({
        where: {
          deleted_at: null,
          [Op.or]: [
            { is_public: true, deleted_at: null }, // show all public courses
            {
              class_id: classId,
              "$CourseClassSectionLinks.class_section_id$": sectionId,
            }, // show class-section courses
          ],
        },
        include: [
          {
            model: CourseClassSectionLink,
            required: false,
            attributes: [],
          },
          {
            model: Users,
            attributes: [],
            required: true,
            where: {
              school_id: studentSchoolId,
            },
          },
        ],
      });

      // BUILD RESPONSE
      dashboardData.total_assessments_count = totalAssessmentsCount;
      dashboardData.completed_assessments_count = completedAssessmentsCount;
      dashboardData.average_assessment_attempt_rate =
        completedAssessmentsCount > 0
          ? (completedAssessmentsCount / totalAssessmentsCount) * 100
          : 0;
      dashboardData.recently_assigned_assessments_list = assessmentsList;
      dashboardData.total_enrolled_courses_count = totalEnrolledCoursesCount;
      dashboardData.total_assigned_courses_count = totalAssignedCoursesCount;
    }

    ////SCHOOL ADMIN
    if (isAdmin) {
      ////TOTAL STUDENTS
      const totalStudnetsCount = await Users.count({
        where: {
          deleted_at: null,
          role_id: USER_ROLE.STUDENT,
        },
        include: [
          {
            model: Schools,
            where: {
              school_uuid,
            },
            attributes: [],
          },
        ],
      });

      dashboardData.total_student_count = totalStudnetsCount;

      ////TOTAL TEACHERS
      const totalTeachersCount = await Users.count({
        where: {
          deleted_at: null,
          role_id: USER_ROLE.TEACHER,
        },
        include: [
          {
            model: Schools,
            where: {
              school_uuid,
            },
            attributes: [],
          },
        ],
      });
      dashboardData.total_teacher_count = totalTeachersCount;

      ////TOTAL COURSES COUNT
      const totalCoursesCount = await Course.count({
        where: {
          deleted_at: null,
        },
        include: [
          {
            model: Users,
            attributes: ["school_id"],
            required: true,
            include: [
              {
                model: Schools,
                where: {
                  school_uuid,
                },
              },
            ],
          },
        ],
      });

      dashboardData.total_courses_count = totalCoursesCount;

      ////TOTAL ASSESSMENTS COUNT
      const totalAssessmentsCount = await Assessment.count({
        where: {
          deleted_at: null,
        },
        include: [
          {
            model: Class,
            required: true,
            include: [
              {
                model: Schools,
                where: {
                  school_uuid,
                },
                attributes: [],
                required: true,
              },
            ],
          },
        ],
      });

      dashboardData.total_assessments_count = totalAssessmentsCount;

      //// TOP 10 RECENTLY ADDEDD ASSESSMENTS

      const assessmentsList = await Assessment.findAll({
        where: {
          deleted_at: null,
        },
        include: [
          {
            model: Users,
            attributes: ["name"],
            required: true,
          },
          {
            model: Class,
            attributes: ["class_name"],
            required: true,
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
            model: AssessmentClassSectionLink,
            attributes: ["class_section_id"],
            required: true,
            include: [
              {
                model: ClassSection,
                attributes: ["class_section_name"],
              },
            ],
          },

          // {
          //   model: ClassSection,
          //   attributes: ["class_section_name"],
          // },
        ],
        order: [["id", "DESC"]],
        attributes: ["assessment_title", "assessment_uuid"],
        limit: 3, // only top 3
        // raw: true,
        // nest: true,
      });

      const recently_added_assessments_list = assessmentsList.map((a) => {
        // Convert Sequelize instance → plain object (prevents circular JSON error)
        const plain = a.get({ plain: true });

        // Extract section names
        const section_names =
          plain.AssessmentClassSectionLinks?.map(
            (s) => s.ClassSection?.class_section_name
          ).join(", ") || "";

        // Remove original nested array
        delete plain.AssessmentClassSectionLinks;

        // Add new property
        plain.section_names = section_names;

        return plain;
      });

      dashboardData.recently_added_assessments_list =
        recently_added_assessments_list;
    }

    /////SUPER ADMIN

    return ResponseHelper.OK(
      res,
      true,
      "Dashboard details fetched successfully",
      dashboardData,
      null,
      "Fetch dashboard details api !"
    );
  } catch (error) {
    console.error("🔥 DASHBOARD ERROR:", error); // <-- ADD THIS

    return res.status(500).json({
      success: false,
      status: 500,
      message: "Something went wrong!",
      error: error.message, // <-- AND THIS
      stack: error.stack, // <-- AND THIS
      purpose: "Fetch dashboard details api !",
    });
  }
};
