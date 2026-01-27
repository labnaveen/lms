import sanitizeHtml from "sanitize-html";
import ResponseHelper from "../helpers/ResponseHelper.js";
import SchoolSubject from "../models/SchoolSubjectModel.js";
import AccademicYear from "../models/AccademicYearModel.js";
import moment from "moment";
import ClassSection from "../models/ClassSectionModel.js";
import Class from "../models/ClassModel.js";
import Assessment from "../models/AssessmentModal.js";
import StudentAssessmentResult from "../models/StudentAssessmentResultModal.js";
import Users from "../models/UserModal.js";
import Grade from "../models/GradeModel.js";
import CommonHelper from "../helpers/CommonHelper.js";
import Subject from "../models/SubjectModel.js";
import Schools from "../models/SchoolsModal.js";
import AssessmentType from "../models/AssessmentTypeModal.js";
import { PROGRESS_STATUS, USER_ROLE } from "../constants/Constants.js";
import Students from "../models/StudentsModel.js";
// import { Op } from "sequelize";
import { Op, fn, col, literal, Sequelize } from "sequelize";
import TeacherContentReport from "../models/TeacherContentReportModel.js";
import Syllabus from "../models/SyllabusModal.js";
import SyllabusChapter from "../models/SyllabusChapterModal.js";
import SyllabusResourceType from "../models/SyllabusResourceTypeModel.js";
import Teacher from "../models/TeacherModel.js";
import TeacherClassMap from "../models/TeacherClassMapModal.js";
import UserCourseEnrollment from "../models/UserCourseEnrollment.js";
import Course from "../models/CourseModel.js";
import ProgressStatus from "../models/ProgressStatus.js";
import AssessmentClassSectionLink from "../models/AssessmentClassSectionLinkModel.js";

export const subjectWiseReport = async (req, res) => {
    try {
        let { class_uuid = null, class_section_uuid = null, school_subject_uuid, accademic_year_uuid = null } = req.query;

        //// if logged in as a student
        const isStudent = req.credentials.roleId === USER_ROLE.STUDENT;
        let sectionData, classData, subjectData, studentsIds;

        class_uuid = sanitizeHtml(class_uuid);
        school_subject_uuid = sanitizeHtml(school_subject_uuid);

        if (class_section_uuid) {
            class_section_uuid = sanitizeHtml(class_section_uuid);
        }
        if (accademic_year_uuid) {
            accademic_year_uuid = sanitizeHtml(accademic_year_uuid);
        }

        if (!isStudent && (!class_uuid || !school_subject_uuid)) {
            return ResponseHelper.BadRequest(res, "Missing Class/Subject details", "Subject wise student report API");
        }

        // Academic year filter
        let accademicYearFilter = { is_current: true, deleted_at: null };
        if (accademic_year_uuid) {
            accademicYearFilter.accademic_year_uuid = accademic_year_uuid;
            delete accademicYearFilter.is_current;
        }

        const accademicYearData = await AccademicYear.findOne({ where: accademicYearFilter });
        if (!accademicYearData) {
            return ResponseHelper.BadRequest(res, "Academic year details not found", "Subject wise student report API");
        }

        if (!isStudent && class_uuid) {
            classData = await Class.findOne({ where: { class_uuid, deleted_at: null } });

            if (!classData) {
                return ResponseHelper.BadRequest(res, "Class details not found", "Subject wise student report API");
            }
        }

        if (!isStudent && class_section_uuid) {
            sectionData = await ClassSection.findOne({ where: { class_section_uuid, deleted_at: null } });

            if (!sectionData) {
                return ResponseHelper.BadRequest(res, "Section details not found", "Subject wise student report API");
            }
        }

        subjectData = await SchoolSubject.findOne({ where: { school_subject_uuid, deleted_at: null } });
        if (!subjectData) {
            return ResponseHelper.BadRequest(res, "Subject details not found", "Subject wise student report API");
        }

        let assessmentFilter = {
            school_subject_id: subjectData.id,
            deleted_at: null,
        };

        // if(!isStudent){
        //   assessmentFilter = {...assessmentFilter, class_id: classData.id,class_section_id: sectionData && class_section_uuid ? sectionData.id: null,}
        // }

        // If not a student, add class filters

        if (!isStudent) {
            assessmentFilter = {
                ...assessmentFilter,
                class_id: classData.id
            };
        }

        // if(sectionData && class_section_uuid){
        //   assessmentFilter ={...assessmentFilter,class_section_id:sectionData.id}
        // }

        // Fetch assessments
        const assessments = await Assessment.findAll({
            where: assessmentFilter,
            attributes: ["id", "assessment_title", "total_marks"],
            raw: true,
            include: [{
                model: AssessmentClassSectionLink,
                attributes: [],
                required: true,
                include: [{
                    model: ClassSection,
                    attributes: [],
                    required: true,
                    where: {
                        class_section_uuid
                    }
                }]
            }]
        });

        if (!assessments.length) {
            return ResponseHelper.OK(res, false, "No assessments found", null, null, "Subject wise student report API");
        }

        const assessmentIds = assessments.map((a) => a.id);

        if (!isStudent) {
            let classSectionInclude = {
                model: ClassSection,
                attributes: [],
                include: [], // will include Class conditionally
            };

            // If class_uuid is provided, always include Class
            if (class_uuid) {
                classSectionInclude.include.push({
                    model: Class, // join Class table
                    attributes: [],
                    where: { class_uuid }, // filter by Class.class_uuid
                });
            }

            // If class_section_uuid is provided, filter ClassSection
            if (class_section_uuid) {
                classSectionInclude.where = { class_section_uuid };
            }

            // Only query if class_uuid exists
            if (class_uuid) {
                studentsIds = await Students.findAll({
                    include: [classSectionInclude],
                    attributes: ["user_id"],
                });
            }
        }

        let assessmentResultFilterOptions = {
            assessment_id: assessmentIds,
        };

        //// if student then get only his assessments results
        if (!isStudent) {
            assessmentResultFilterOptions.student_id = studentsIds.map((student) => student.user_id);
        } else if (isStudent) {
            assessmentResultFilterOptions.student_id = req?.credentials.id;
        }

        // Fetch student results
        const results = await StudentAssessmentResult.findAll({
            where: assessmentResultFilterOptions,
            attributes: ["student_id", "assessment_id", "total_score"],
            include: [
                { model: Users, attributes: ["name"] },
                { model: Grade, attributes: ["grade_name"] },
                {
                    model: Assessment,
                    attributes: ["assessment_title", "total_marks"],
                    include: [
                        {
                            model: AssessmentType,
                            attributes: ["assessment_type_name"],
                        },

                        {
                            model: AccademicYear,
                            attributes: ["accademic_year"],
                        },
                    ],
                },
            ],
            order: [["student_id", "ASC"]],
            raw: true,
            nest: true,
        });

        if (!results.length) {
            return ResponseHelper.OK(res, false, "No student results found", [], null, "Subject wise student report API");
        }

        // Transform data for frontend table
        // const reportData = results.map(r => ({
        //   student_name: r.User.name,
        //   assessment_title: r.Assessment.assessment_title,
        //   marks_obtained: r.total_score || 0,
        //   total_marks: r.Assessment.total_marks,
        //   grade: r.Grade?.grade_name || 'N/A',
        // }));

        return ResponseHelper.OK(res, true, "Reports data fetched successfully", results, null, "Subject wise student report API");
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error while generating report data", error: error.message });
    }
};

export const studentWiseAcademicProgressReport = async (req, res) => {
    try {
        let { class_section_uuid = null, user_uuid = null, accademic_year_uuid = null } = req.query;
        const isStudent = req.credentials.roleId === USER_ROLE.STUDENT;
        const school_uuid = req.credentials.schoolUuid || req.headers["school-uuid"];
        class_section_uuid = sanitizeHtml(class_section_uuid);
        user_uuid = sanitizeHtml(user_uuid);
        if (accademic_year_uuid) {
            accademic_year_uuid = sanitizeHtml(accademic_year_uuid);
        }

        if (!isStudent && !class_section_uuid) {
            return ResponseHelper.BadRequest(res, "Missing class and section details", "Student wise academic progress report API");
        }

        if (!isStudent && !user_uuid) {
            return ResponseHelper.BadRequest(res, "Missing student details", "Student wise academic progress report API");
        }

        ////FINDING STUDENT DETAILS

        const userFilterOptions = {
            where: {
                user_uuid,
                deleted_at: null,
            },
            include: [
                {
                    model: Schools,
                    where: {
                        school_uuid,
                        deleted_at: null,
                    },
                    attributes: [],
                    required: true
                },

                {
                    model: Students,
                    attributes: [],
                    include: [
                        {
                            model: ClassSection,
                            attributes: [],
                            where: {
                                class_section_uuid,
                            },
                        },
                    ],
                    required: true,
                },
            ],
            attributes: ["id"],
        };

        const userDetails = await Users.findOne(
            ////APPLYING FILTR IF THE USER IS STUDENT
            isStudent
                ? {
                    where: {
                        id: req.credentials.id,
                    },
                }
                : userFilterOptions
        );

        if (!userDetails) {
            return ResponseHelper.BadRequest(res, "Student details not found for the selected class & section", "Student wise academic progress report API");
        }

        // Academic year filter
        let accademicYearFilter = { is_current: true, deleted_at: null };
        if (accademic_year_uuid) {
            accademicYearFilter.accademic_year_uuid = accademic_year_uuid;
            delete accademicYearFilter.is_current;
        }

        const accademicYearData = await AccademicYear.findOne({ where: accademicYearFilter });
        if (!accademicYearData) {
            return ResponseHelper.BadRequest(res, "Academic year details not found", "Subject wise student report API");
        }

        // Fetch class, section, subject
        const results = await StudentAssessmentResult.findAll({
            where: { student_id: userDetails.id },
            attributes: ["total_questions_attempted", "total_score"],
            include: [
                {
                    model: Assessment,
                    attributes: ["assessment_title", "total_marks"],
                    include: [
                        {
                            model: SchoolSubject,
                            attributes: ["id"],
                            include: [
                                {
                                    model: Subject,
                                    attributes: ["subject_name"],
                                },
                            ],
                        },
                        {
                            model: AssessmentType,
                            attributes: ["assessment_type_name"],
                        },
                        {
                            model: AccademicYear,
                            attributes: ["accademic_year"],
                        },
                    ], // optional subject info
                },
                { model: Grade, attributes: ["grade_name"] },

                {
                    model: Users,
                    attributes: ["name"],
                },
            ],
            order: [["Assessment", "id", "ASC"]],
            raw: true,
            nest: true,
        });

        // Transform data for frontend table
        // const reportData = results.map(r => ({
        //   assessment_title: r.Assessment.assessment_title,
        //   subject_name: r.Assessment.Subject?.name || "N/A",
        //   marks_obtained: r.total_score || 0,
        //   total_marks: r.Assessment.total_marks,
        //   grade: r.Grade?.grade_name || "N/A",
        // }));
        return ResponseHelper.OK(res, true, "Data fetched successfully", results, null, "Student wise academic progress report API");
    } catch (error) {
        return ResponseHelper.ISError(res, "Error while generating report", "Student wise academic progress report API");
    }
};


export const teacherWiseContentUploadedReport = async (req, res) => {
    try {
        let { class_uuid, user_uuid, academic_year_uuid } = req.query
        let reportData, academicYearDetails;
        const school_uuid = req?.credentials?.schoolUuid || req.headers["school-uuid"]

        class_uuid = class_uuid ? sanitizeHtml(class_uuid) : null
        user_uuid = user_uuid ? sanitizeHtml(user_uuid) : null
        academic_year_uuid = academic_year_uuid ? sanitizeHtml(academic_year_uuid) : null

        const classWhereClause = class_uuid ? { class_uuid, deleted_at: null } : {}
        const userWhereClause = user_uuid ? { user_uuid, deleted_at: null } : {}

        const academicYearFilterCondition = academic_year_uuid ? { accademic_year_uuid: academic_year_uuid } : {
            is_current: true,
            deleted_at: null
        }

        // academicYearDetails = await AccademicYear.findOne({
        //     where: academicYearFilterCondition,
        // })
        // if (!academicYearDetails) {
        //     return ResponseHelper.BadRequest(res, "Invalid academic year selected !", "Fetch content report api !")
        // }


        ////CASE 1: TEACHER BASED DETAILS 

        if (!class_uuid && user_uuid) {


            let options = {
                where: userWhereClause,
                attributes: ["name", "email"],
                include: [
                    {
                        model: Teacher,
                        attributes: ["teacher_code"],
                        required: true
                    },

                    {
                        model: TeacherContentReport,
                        required: true,
                        include: [
                            { model: Class, attributes: ["class_name"], required: true },
                            { model: Syllabus, attributes: ["syllabus_title"], required: true },
                            { model: SyllabusChapter, attributes: ["syllabus_chapter_title"], required: true },
                            { model: SyllabusResourceType, attributes: ["syllabus_resource_type_name"], required: true },
                            { model: AccademicYear, attributes: [], where: academicYearFilterCondition, required: true },
                        ],
                        attributes: ["count"]

                    }
                ]

            }

            reportData = await Users.findAll(options)
        }

        ////CASE 2: TEACHER AND CLASS BASED DETAILS 
        if (class_uuid && user_uuid) {


            let options = {
                where: userWhereClause,
                attributes: ["name", "email"],
                include: [
                    {
                        model: Teacher,
                        attributes: ["teacher_code"],
                        required: true
                    },

                    {
                        model: TeacherContentReport,
                        required: true,
                        include: [
                            { model: Class, attributes: ["class_name"], where: classWhereClause, required: true },
                            { model: Syllabus, attributes: ["syllabus_title"], required: true },
                            { model: SyllabusChapter, attributes: ["syllabus_chapter_title"], required: true },
                            { model: SyllabusResourceType, attributes: ["syllabus_resource_type_name"], required: true },
                            { model: AccademicYear, attributes: [], where: academicYearFilterCondition, required: true },
                        ],
                        attributes: ["user_id", "syllabus_chapter_id", "syllabus_resource_type_id", "count"]

                    }
                ]

            }

            reportData = await Users.findAll(options)
        }

        //// CASE 3: CLASS BASED DETAILS
        if (class_uuid && !user_uuid) {

            ////GETTING ALL SECTIONS OF THE CLASS
            const classSectionList = await ClassSection.findAll({
                include: [
                    {
                        model: Class,
                        required: true,
                        where: { class_uuid },
                        include: [
                            {
                                model: Schools,
                                required: true,
                                attributes: [],
                                where: {
                                    school_uuid
                                }
                            }
                        ]
                    },


                ],
                attributes: ["id"]
            })

            ////GETTING ALL TEACHERS IDS MAPPED WITH CLASS SECTION    
            const teachersClassMapList = await TeacherClassMap.findAll({
                where: {
                    class_section_id: classSectionList.map(item => item.id)
                },
                attributes: ["teacher_id"],
                group: ["teacher_id"], // ✅ ensures unique teacher_id
            })

            ////GETTING ALL USER IDS BASED ON TEACHER ID
            const teachersUserIds = await Teacher.findAll({

                where: {
                    id: teachersClassMapList.map(item => item.teacher_id)
                },
                attributes: ["user_id"]
            })

            let options = {
                where: {
                    id: teachersUserIds.map(item => item.user_id)
                },
                attributes: ["name", "email"],
                include: [
                    {
                        model: Teacher,
                        attributes: ["teacher_code"],
                        required: true
                    },

                    {
                        model: TeacherContentReport,
                        // required:true,
                        include: [
                            { model: Class, attributes: ["class_name"], where: { class_uuid }, required: true },
                            { model: Syllabus, attributes: ["syllabus_title"], required: true },
                            { model: SyllabusChapter, attributes: ["syllabus_chapter_title"], required: true },
                            { model: SyllabusResourceType, attributes: ["syllabus_resource_type_name"], required: true },
                            { model: AccademicYear, attributes: [], where: academicYearFilterCondition, required: true },
                        ],
                        attributes: ["user_id", "syllabus_chapter_id", "syllabus_resource_type_id", "count"]

                    }
                ]

            }

            reportData = await Users.findAll(options)
        }


        return ResponseHelper.OK(res, true, "Teacher-wise content uploaded report fetched successfully!", reportData, null, "Teacher-wise Content Uploaded Report API");
    } catch (error) {
        return ResponseHelper.ISError(res, error.message || "Failed to fetch teacher-wise content uploaded report", "Teacher-wise Content Uploaded Report API");
    }
};

export const courseReport = async (req, res) => {
    try {
        let {
            report_type,
            course_uuid,
            teacher_uuid,
            user_uuid,
            from_date,
            to_date,
            status_uuid,
            // group_by,
        } = req.query;

        const isTeacher = req.credentials.roleId === USER_ROLE.TEACHER

        const school_uuid = req.credentials.schoolUuid || req.headers["school-uuid"]
        if (!report_type) {
            return ResponseHelper.BadRequest(res, "Report type is required.", "Reports API");
        }
        let instructorInclude, progressStatusInclude;
        const userEnrollmentWhereClause = { deleted_at: null };
        const courseWhereClause = {}
        const userWhereClause = {}


        if (isTeacher) {
            courseWhereClause.instructor_id = req.credentials.id
        }

        //// DYNAMIC COURSE INCLUDE 
        const courseAttributes = report_type === "course_enrollment_summary" ? ["title", "start_date", "end_date"] : ["title"]
        const courseInclude = {
            model: Course,
            attributes: courseAttributes,
            where: courseWhereClause,
            required: true,
            ...(teacher_uuid && {
                include: [
                    {
                        model: Users,
                        attributes: [],
                        required: true,
                        where: { user_uuid: teacher_uuid },
                    },
                ],
            }),
        };


        // ✅ Apply date filter conditionally based on report_type
        if (from_date && to_date) {

            const startDate = moment.utc(from_date).startOf("day").toDate();
            const endDate = moment.utc(to_date).endOf("day").toDate();

            // Decide which date field to filter based on report_type
            switch (report_type) {
                case "users_enrollment":
                case "users_progress_report":
                case "course_performance":
                case "course_enrollment_summary":
                    // Filter by enrollment (created_at)
                    userEnrollmentWhereClause.created_at = { [Op.between]: [startDate, endDate] };
                    break;

                case "completion":
                case "completion_rate":
                    // Filter by completion date
                    userEnrollmentWhereClause.completed_at = { [Op.between]: [startDate, endDate] };
                    break;

                case "avg_progress":
                    // Progress can be ongoing — include both (optional)
                    userEnrollmentWhereClause[Op.or] = [
                        { created_at: { [Op.between]: [startDate, endDate] } },
                        { completed_at: { [Op.between]: [startDate, endDate] } },
                    ];
                    break;

                default:
                    // If no filter type matched, don’t apply date filter
                    break;
            }
        }


        // ✅ Course filter
        if (course_uuid) {
            courseWhereClause.course_uuid = course_uuid;
        }

        // ✅ User filter
        if (user_uuid) {
            userWhereClause.user_uuid = user_uuid;
        }

        // ✅ Add ProgressStatus include and filter if status_uuid is provided


        if (status_uuid) {
            // userEnrollmentWhereClause.status_uuid = status_uuid; // filter on status
            progressStatusInclude = {
                model: ProgressStatus,
                attributes: [],
                required: true,
                where: { status_uuid },
            };
        }

        let data;

        switch (report_type) {
            // 📘 1. Enrollment Report: users enrolled in courses
            case "users_enrollment":



                data = await UserCourseEnrollment.findAll({
                    where: userEnrollmentWhereClause,
                    include: [
                        courseInclude,
                        {
                            model: Users, attributes: ["name"], where: userWhereClause, required: true,
                            include: [{
                                model: Schools,
                                required: true,
                                where: { school_uuid },
                                attributes: []
                            }]
                        },
                        ...(progressStatusInclude ? [progressStatusInclude] : []), // ✅ dynamically added
                        //  {
                        //     model: ProgressStatus,
                        //     attributes: ["name"],
                        //     required: true,
                        //     ...(status_uuid ? { where: { status_uuid } } : {}), // ✅ conditional filter
                        // }
                    ],
                    order: [["created_at", "DESC"]],
                    attributes: []
                });
                break;


            // 📘 2. Users Progress Report: users enrolled in courses
            case "users_progress_report":
                data = await UserCourseEnrollment.findAll({
                    where: userEnrollmentWhereClause,
                    include: [
                        courseInclude,
                        {
                            model: Users, attributes: ["name"], where: userWhereClause, required: true,
                            include: [{
                                model: Schools,
                                required: true,
                                where: { school_uuid },
                                attributes: []
                            }]
                        },
                        {
                            model: ProgressStatus,
                            attributes: ["name"],
                            required: true,
                            ...(status_uuid ? { where: { status_uuid } } : {}), // ✅ conditional filter
                        }
                    ],
                    order: [["created_at", "DESC"]],
                    attributes: ["progress_percentage", "started_at", "completed_at"]
                });
                break;

            // 📗 3. Completion Report: completed enrollments
            case "completion":
                data = await UserCourseEnrollment.findAll({
                    where: { ...userEnrollmentWhereClause, progress_status_id: PROGRESS_STATUS.COMPLETED },
                    include: [
                        courseInclude,
                        {
                            model: Users, attributes: ["name"], where: userWhereClause, required: true,
                            include: [{
                                model: Schools,
                                required: true,
                                where: { school_uuid },
                                attributes: []
                            }]
                        },
                    ],
                    order: [["updated_at", "DESC"]],
                    attributes: ["progress_percentage", "started_at", "completed_at"]
                });
                break;

            // 4. Course Completion Rate
            case "completion_rate":
                data = await UserCourseEnrollment.findAll({
                    attributes: [
                        // "course_id",
                        [fn("COUNT", col("UserCourseEnrollment.id")), "total_enrolled"],
                        [
                            fn(
                                "SUM",
                                literal(`CASE WHEN UserCourseEnrollment.progress_status_id = 3 THEN 1 ELSE 0 END`)
                            ),
                            "completed_count",
                        ],
                        [
                            literal(
                                "(SUM(CASE WHEN UserCourseEnrollment.progress_status_id = 3 THEN 1 ELSE 0 END) / COUNT(UserCourseEnrollment.id)) * 100"
                            ),
                            "completion_rate",
                        ],
                    ],
                    where: userEnrollmentWhereClause,
                    group: ["UserCourseEnrollment.course_id", "Course.id"],
                    include: [
                        courseInclude,

                        {
                            model: Users, attributes: [], where: userWhereClause, required: true,
                            include: [{
                                model: Schools,
                                required: true,
                                where: { school_uuid },
                                attributes: []
                            }]
                        },
                    ],
                });
                break;


            // 📙 5. Progress Report: average progress by course or user
            case "avg_progress":
                data = await UserCourseEnrollment.findAll({
                    where: userEnrollmentWhereClause,
                    attributes: [
                        // "course_id",
                        [Sequelize.fn("AVG", Sequelize.col("progress_percentage")), "avg_progress"],
                    ],
                    include: [
                        courseInclude,

                        {
                            model: Users, attributes: [], where: userWhereClause, required: true,
                            include: [{
                                model: Schools,
                                required: true,
                                where: { school_uuid },
                                attributes: []
                            }]
                        },],
                    group: ["course_id", "Course.id"],
                });
                break;

            // 📒 6. Performance Report: total enrolled vs completed per course which also shows the popularity of the course
            case "course_performance":
                data = await UserCourseEnrollment.findAll({
                    where: userEnrollmentWhereClause,
                    attributes: [
                        [Sequelize.fn("COUNT", Sequelize.col("user_id")), "total_enrolled"],
                        [
                            Sequelize.fn(
                                "SUM",
                                Sequelize.literal("CASE WHEN progress_status_id = 3 THEN 1 ELSE 0 END")
                            ),
                            "completed",
                        ],
                    ],
                    // include: [{ model: Course, attributes: ["title"] }],
                    include: [courseInclude,

                        {
                            model: Users, attributes: [], where: userWhereClause, required: true,
                            include: [{
                                model: Schools,
                                required: true,
                                where: { school_uuid },
                                attributes: []
                            }]
                        },],
                    group: ["course_id", "Course.id"],
                });
                break;

            //// 📒 7. Course Enrollment Summary
            case "course_enrollment_summary":
                data = await UserCourseEnrollment.findAll({
                    attributes: [
                        // "course_id",
                        [fn("COUNT", col("user_id")), "total_enrolled_users"],

                        [
                            fn("SUM", literal(`CASE WHEN progress_status_id = 1 THEN 1 ELSE 0 END`)),
                            "not_started",
                        ],

                        [
                            fn("SUM", literal(`CASE WHEN progress_status_id = 2 THEN 1 ELSE 0 END`)),
                            "in_progress",
                        ],

                        [
                            fn("SUM", literal(`CASE WHEN progress_status_id = 3 THEN 1 ELSE 0 END`)),
                            "completed",
                        ],


                        [fn("AVG", col("progress_percentage")), "average_progress"],
                    ],
                    where: userEnrollmentWhereClause,
                    group: ["course_id"],
                    include: [
                        courseInclude,
                        // {
                        //     model: Users, attributes: [], where: userWhereClause, required: true,
                        //     include: [{
                        //         model: Schools,
                        //         required: true,
                        //         where: { school_uuid },
                        //         attributes: []
                        //     }]
                        // },

                    ],
                    order: [[fn("COUNT", col("user_id")), "DESC"]],
                });
                break;

            default:
                return ResponseHelper.BadRequest(res, "Invalid report type. Must be one of: enrollment, completion, progress, performance.", "Course Reports API !");
        }

        // Optional grouping filter (e.g., by course or user) - later we can think about this as it is returning grouped count for each object 
        // if (group_by === "course") {
        //     data = Object.values(
        //         data.reduce((acc, curr) => {
        //             const key = curr.course_id || curr?.Course?.id;
        //             if (!acc[key]) acc[key] = { ...curr.toJSON(), records: [] };
        //             acc[key].records.push(curr);
        //             return acc;
        //         }, {})
        //     );
        // }

        return ResponseHelper.OK(res, true, "Report fetched successfully", data, null, "Course Reports API !");

    } catch (error) {
        return ResponseHelper.ISError(res, error.message, "Course Reports API !");
    }
};


////PLEASE DO NOT REMOVE THIS FUNCTION AS THIS IS FOR FUTURE REFERENCE WITH PAGINATION
// export const courseReport_V2_With_pagination = async (req, res) => {
//   try {
//     let {
//       type,
//       start_date,
//       end_date,
//       course_id,
//       user_id,
//       status_id,
//       page = 1,
//       limit = 20,
//     } = req.query;

//     const offset = (page - 1) * limit;

//     // ✅ Date filters
//     let whereClause = { deleted_at: null };
//     if (start_date && end_date) {
//       whereClause.created_at = {
//         [Op.between]: [
//           moment(start_date).startOf("day").toDate(),
//           moment(end_date).endOf("day").toDate(),
//         ],
//       };
//     }

//     // ✅ Other filters
//     if (course_id) whereClause.course_id = course_id;
//     if (user_id) whereClause.user_id = user_id;
//     if (status_id) whereClause.status_id = status_id;

//     let data;
//     let total = 0;

//     switch (type) {
//       // 📊 1. Course Enrollment Summary (Main Report)
//       case "course_enrollment_summary":
//         const { count, rows } = await UserCourseEnrollment.findAndCountAll({
//           attributes: [
//             "course_id",
//             [fn("COUNT", col("user_id")), "total_enrolled_users"],
//             [
//               fn("SUM", literal(`CASE WHEN status_id = 3 THEN 1 ELSE 0 END`)),
//               "completed_users",
//             ],
//             [
//               fn("SUM", literal(`CASE WHEN status_id != 3 THEN 1 ELSE 0 END`)),
//               "in_progress_users",
//             ],
//             [fn("AVG", col("progress_percentage")), "average_progress"],
//           ],
//           where: whereClause,
//           include: [
//             {
//               model: Course,
//               attributes: ["title", "start_date", "end_date"],
//             },
//           ],
//           group: ["course_id"],
//           order: [[fn("COUNT", col("user_id")), "DESC"]],
//           offset: parseInt(offset),
//           limit: limit === "all" ? undefined : parseInt(limit),
//           subQuery: false,
//         });

//         total = Array.isArray(count) ? count.length : count;
//         data = rows;
//         break;

//       // 📈 2. Enrollment Trend
//       case "enrollment_trend":
//         data = await UserCourseEnrollment.findAll({
//           attributes: [
//             [fn("DATE", col("created_at")), "date"],
//             [fn("COUNT", col("id")), "enrollments"],
//           ],
//           where: whereClause,
//           group: [fn("DATE", col("created_at"))],
//           order: [[fn("DATE", col("created_at")), "ASC"]],
//         });
//         break;

//       // 🧾 3. Completion Rate
//       case "completion_rate":
//         data = await UserCourseEnrollment.findAll({
//           attributes: [
//             "course_id",
//             [fn("COUNT", col("id")), "total_enrolled"],
//             [
//               fn("SUM", literal(`CASE WHEN status_id = 3 THEN 1 ELSE 0 END`)),
//               "completed_count",
//             ],
//           ],
//           where: whereClause,
//           include: [{ model: Course, attributes: ["title"] }],
//           group: ["course_id"],
//         });
//         break;

//       // Default fallback
//       default:
//         return ResponseHelper.BadRequest(
//           res,
//           "Invalid report type",
//           "Course Reports API"
//         );
//     }

//     return ResponseHelper.OK(
//       res,
//       true,
//       "Report fetched successfully!",
//       {
//         data,
//         meta: {
//           total,
//           page: parseInt(page),
//           limit: limit === "all" ? "all" : parseInt(limit),
//         },
//       },
//       null,
//       "Course Reports API"
//     );
//   } catch (error) {
//     return ResponseHelper.ISError(
//       res,
//       error.message || "Failed to fetch course reports",
//       "Course Reports API"
//     );
//   }
// };