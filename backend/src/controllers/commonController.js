import moment from "moment";
import sanitizeHtml from "sanitize-html";
import { col, Op, Sequelize, where } from "sequelize";
import ResponseHelper from "../helpers/ResponseHelper.js";
import Country from "../models/CountryModel.js";
import State from "../models/StatesModel.js";
import City from "../models/CityModel.js";
import AccademicYear from "../models/AccademicYearModel.js";
import Gender from "../models/GenderModel.js";
import Subject from "../models/SubjectModel.js";
import Class from "../models/ClassModel.js";
import Schools from "../models/SchoolsModal.js";
import ClassSection from "../models/ClassSectionModel.js";
import CommonHelper from "../helpers/CommonHelper.js";
import Stream from "../models/StreamModel.js";
import Chapter from "../models/ChapterModel.js";
import SyllabusResourceType from "../models/SyllabusResourceTypeModel.js";
import AssessmentQuestionType from "../models/AssessmentQuestionTypeModal.js";
import AssessmentType from "../models/AssessmentTypeModal.js";
import SchoolSubject from "../models/SchoolSubjectModel.js";
import TeacherClassMap from "../models/TeacherClassMapModal.js";
import Teacher from "../models/TeacherModel.js";
import { USER_ROLE } from "../constants/Constants.js";
import Students from "../models/StudentsModel.js";
import TeacherSubjectMap from "../models/TeacherSubjectMapModal.js";
import Users from "../models/UserModal.js";
import CourseType from "../models/CourseTypeModel.js";
import CourseStructureType from "../models/CourseStructureTypeModel.js";
import Category from "../models/CategoryModel.js";
import SubCategory from "../models/SubCategoryModal.js";
import Course from "../models/CourseModel.js";
import ProgressStatus from "../models/ProgressStatus.js";
import NotificationTargetType from "../models/NotificationTargetTypeModel.js";
import SchoolSubjectStreamLink from "../models/SchoolSubjectStreamModel.js";

export const getCountries = async (req, res) => {
    try {
        const countries = await Country.findAll({
            attributes: { exclude: ["created_at", "updated_at"] },
        });

        return ResponseHelper.OK(res, true, "Countries fetched successfully!", countries, null, "Get Countries API");
    } catch (error) {
        return ResponseHelper.ISError(res, error.message || "Failed to retrieve countries", "Get Countries API");
    }
};

export const getStates = async (req, res) => {
    try {
        const { countryId } = req.params;

        if (!countryId) {
            return ResponseHelper.BadRequest(res, "Country ID is required", "Get States API");
        }

        const states = await State.findAll({
            where: { country_id: countryId },
            attributes: { exclude: ["created_at", "updated_at"] },
        });

        return ResponseHelper.OK(res, true, "States fetched successfully!", states, null, "Get States API");
    } catch (error) {
        return ResponseHelper.ISError(res, error.message || "Failed to retrieve states", "Get States API");
    }
};

export const getCities = async (req, res) => {
    try {
        const { stateId } = req.params;

        if (!stateId) {
            return ResponseHelper.BadRequest(res, "State ID is required", "Get Cities API");
        }

        const cities = await City.findAll({
            where: { state_id: stateId },
            attributes: { exclude: ["created_at", "updated_at"] },
        });

        return ResponseHelper.OK(res, true, "Cities fetched successfully!", cities, null, "Get Cities API");
    } catch (error) {
        return ResponseHelper.ISError(res, error.message || "Failed to retrieve cities", "Get Cities API");
    }
};

export const getGenders = async (req, res) => {
    try {
        const genders = await Gender.findAll({
            attributes: { exclude: ["created_at", "updated_at", "deleted_at"] },
        });

        return ResponseHelper.OK(res, true, "Genders fetched successfully!", genders, null, "Get Genders API");
    } catch (error) {
        return ResponseHelper.ISError(res, error.message || "Failed to retrieve genders", "Get Genders API");
    }
};

export const getCurrentAcademicYear = async (req, res) => {
    try {
        const { isCurrent } = req.params;
        const filterQuery = { deleted_at: null };
        // Convert string ("true"/"false") to boolean
        if (isCurrent === "true") {
            filterQuery.is_current = true;
        } else if (isCurrent === "false") {
            // filterQuery.is_current = false;
        } else {
            return ResponseHelper.BadRequest(res, "Invalid academic year filter value given", "Get Academic Year API");
        }

        const currentYear = await AccademicYear.findAll({
            where: filterQuery,
            attributes: { exclude: ["created_at", "updated_at", "deleted_at"] },
        });

        return ResponseHelper.OK(res, true, "Academic year fetched successfully!", currentYear, null, "Get Academic Year API");
    } catch (error) {
        return ResponseHelper.ISError(res, error.message || "Failed to retrieve current academic year", "Get Academic Year API");
    }
};

export const getSubjectsLists = async (req, res) => {
    try {
        const subjectsList = await Subject.findAll({
            // where: { is_current: true },
            attributes: { exclude: ["created_at", "updated_at", "deleted_at"] },
            order: [["subject_name", "ASC"]], // ⬅️ SORTING ADDED
        });

        return ResponseHelper.OK(res, true, "Subjects List successfully!", subjectsList, null, "Get Subject List API");
    } catch (error) {
        return ResponseHelper.ISError(res, error.message || "Failed to retrieve subject lists", "Get Subject List API");
    }
};

export const getClassesLists = async (req, res) => {
    try {
        // Accept schoolUuid from either credentials or headers
        const school_uuid = req.credentials.schoolUuid || req.headers["school-uuid"];
        const { roleId, id: userId } = req.credentials || {};

        let student;

        // Get numeric school ID from UUID
        const school_id = await CommonHelper.getIdFromUuid(Schools, school_uuid, res, "Get Streams List API", "school_uuid");
        if (!school_id) return ResponseHelper.NotFound(res, false, "School not found !", "Get Streams List API");

        if (roleId === USER_ROLE.STUDENT) {
            student = await Students.findOne({
                where: {
                    user_id: userId,
                },
            });
        }

        let classesList;
        if (roleId === USER_ROLE.TEACHER && userId) {
            // Get teacher id from user id
            const teacher = await Teacher.findOne({
                where: { user_id: userId, deleted_at: null },
            });
            if (!teacher) {
                return ResponseHelper.OK(res, true, "No classes found for this teacher!", [], null, "Get Class List API");
            }
            // Find all class_section_ids mapped to this teacher
            const teacherClassMaps = await TeacherClassMap.findAll({
                where: { teacher_id: teacher.id, deleted_at: null },
                attributes: ["class_section_id"],
            });
            const classSectionIds = teacherClassMaps.map((map) => map.class_section_id);
            if (classSectionIds.length === 0) {
                return ResponseHelper.OK(res, true, "No classes found for this teacher!", [], null, "Get Class List API");
            }
            // Get class_ids from class_section_ids
            const classSections = await ClassSection.findAll({
                where: { id: { [Op.in]: classSectionIds }, deleted_at: null },
                attributes: ["class_id"],
            });
            const classIds = [...new Set(classSections.map((cs) => cs.class_id))];
            if (classIds.length === 0) {
                return ResponseHelper.OK(res, true, "No classes found for this teacher!", [], null, "Get Class List API");
            }
            // Fetch classes for this teacher
            classesList = await Class.findAll({
                where: {
                    id: { [Op.in]: classIds },
                    school_id: school_id,
                    deleted_at: null,
                },
                attributes: ["class_uuid", "class_name"],
            });
        } else if (roleId === USER_ROLE.ADMIN || roleId === USER_ROLE.SUPERADMIN) {
            // For school or superadmin login, fetch all active classes for the school
            classesList = await Class.findAll({
                where: {
                    school_id: school_id,
                    deleted_at: null,
                },
                attributes: ["class_uuid", "class_name"],
            });
        } else if (roleId === USER_ROLE.STUDENT) {
            classesList = await Class.findAll({
                where: {
                    deleted_at: null,
                },

                include: [
                    {
                        model: ClassSection,
                        where: {
                            id: student?.class_section_id,
                        },
                        attributes: [],
                    },
                ],
                attributes: ["class_uuid", "class_name"],
            });
        }
        return ResponseHelper.OK(res, true, "Class List successfully!", classesList, null, "Get Class List API");
    } catch (error) {
        return ResponseHelper.ISError(res, error.message || "Failed to retrieve class lists", "Get Class List API");
    }
};

export const getClassSectionsList = async (req, res) => {
    try {
        const { class_uuid } = req.params;
        const { roleId, id } = req.credentials;
        const { school_subject_uuid = null, user_uuid = null } = req.query;

        const school_uuid = req.credentials.schoolUuid;
        const isTeacher = roleId === USER_ROLE.TEACHER;
        const isStudent = roleId === USER_ROLE.STUDENT;

        // Fetch class ID from UUID
        const classData = await Class.findOne({
            where: { class_uuid, deleted_at: null },
            attributes: ["id"],
        });

        if (!classData) {
            return ResponseHelper.NotFound(res, "Class not found", "Get Class Sections API");
        }
        let classSections, userDetails, schoolSubjectDetail, subjectStreamIds = [], streamSubjectIds = [];

        let streamFilterCondtion = { }

        ////GETTING SUBJECT'S STREAMS       
        if (school_subject_uuid) {
            schoolSubjectDetail = await SchoolSubject.findOne({
                where: {
                    school_subject_uuid,
                    deleted_at: null
                },
                attributes: { exclude: ["created_at", "updated_at", "deleted_at"] }
            })

            const schoolSubjectStreamLinksData = await SchoolSubjectStreamLink.findAll({
                where: {
                    school_subject_id: schoolSubjectDetail?.id
                },

                attributes: ["stream_id", "school_subject_id"]
            })
            ////GETTING STREAM IDS TO FILTER SECTIONS BY STREAM
            subjectStreamIds = schoolSubjectStreamLinksData.map((s) => s.stream_id);

            //// GETTING SUBJECTS IDS TO FILTER THE ASSIGNED SUBJECTS SECTION WISE TO TEACHER
            streamSubjectIds = schoolSubjectStreamLinksData.map((s) => s.school_subject_id);


            ////IF THE SELECTED SUBJECT IS NOT PART OF ANY STREAM THEN IT SHOULD STILL CHECKED FROM TEACHERS MAP SUBJECT BECAUSE IT IS ASSIGNED TO THE TEACHER
            if (streamSubjectIds.length === 0) {
                streamSubjectIds.push(schoolSubjectDetail?.id)
            }

            if (subjectStreamIds.length > 0) {
                streamFilterCondtion.id = subjectStreamIds
            }

        }

        // ---------- CASE 1: TEACHER ----------
        if (isTeacher || user_uuid) {
           
            /////ONLY IF USER_UUID IS GIVEN
            if (user_uuid) {
                userDetails = await Users.findOne({
                    where: {
                        user_uuid
                    }
                })
            }


            const teacherDetails = await Teacher.findOne({
                where: { user_id: user_uuid ? userDetails?.id : id, deleted_at: null },
                attributes: ["id"],
            });

            if (!teacherDetails) {
                return ResponseHelper.OK(res, true, "Teacher details not found!", [], null, "Get Class Sections API");
            }

            // Get teacher’s assigned sections for this class
            const teacherMappings = await TeacherClassMap.findAll({
                where: { teacher_id: teacherDetails.id, deleted_at: null },
                include: [
                    {
                        model: ClassSection,
                        required: true,
                        where: {
                            class_id: classData.id,
                            ...(subjectStreamIds.length > 0 && { stream_id: subjectStreamIds })

                        },
                        attributes: ["id", "class_section_name"],
                    },

                    ////TO FILTER OUT THE ASSIGNED SUBJECTS SECTION WISE
                    // <<< CONDITIONALLY ADD TEACHER-SUBJECT-MAP HERE >>>
                    ...(school_subject_uuid
                        ? [
                            {
                                model: TeacherSubjectMap,
                                attributes: [],
                                required: true,
                                where: {
                                    deleted_at: null,
                                    school_subject_id: streamSubjectIds,
                                }
                            }
                        ]
                        : [])
                ],
                attributes: ["class_section_id", "id"],
            });


            if (!teacherMappings.length) {
                return ResponseHelper.OK(res, true, "No assigned sections found for this class!", [], null, "Get Class Sections API");
            }

            // Extract section IDs
            const allowedClassSectionIds = teacherMappings.map((m) => m.class_section_id);


            classSections = await ClassSection.findAll({
                where: {
                    id: allowedClassSectionIds,
                    deleted_at: null,
                },
                include: [
                    {
                        model: Stream,
                        attributes: [],
                        required: false,


                    },
                ],
                attributes: ["class_section_uuid",
                    //  "class_section_name",
                    [
                        Sequelize.literal(`
                          CASE 
                            WHEN Stream.stream_name IS NOT NULL 
                            THEN CONCAT(class_section_name, ' - ', Stream.stream_name)
                            ELSE class_section_name
                          END
                        `),
                        "class_section_name"
                    ]
                ],
            });
        } else if (isStudent) {

            classSections = await ClassSection.findAll({
                where: {
                    deleted_at: null,
                },
                include: [
                    {
                        model: Students,
                        attributes: [],
                        required: true,
                        where: {
                            user_id: id,
                            deleted_at: null,
                        },
                    },

                    {
                        model: Stream,
                        attributes: [],
                        required: false,


                    },
                ],
                attributes: ["class_section_uuid",
                    //  "class_section_name",
                    [
                        Sequelize.literal(`
                          CASE 
                            WHEN Stream.stream_name IS NOT NULL 
                            THEN CONCAT(class_section_name, ' - ', Stream.stream_name)
                            ELSE class_section_name
                          END
                        `),
                        "class_section_name"
                    ]

                ],
            });
        }

        else {
            classSections = await ClassSection.findAll({
                include: [
                    {
                        model: Class,
                        where: { class_uuid, deleted_at: null }, // filter by UUID here
                        attributes: [], // expose UUID not ID
                        include: [
                            {
                                model: Schools,
                                where: { school_uuid, deleted_at: null }, // filter by UUID here
                                attributes: [], // expose UUID not ID
                            },
                        ],
                    },
                    {
                        model: Stream,
                        attributes: [],
                        where: streamFilterCondtion,
                        required:false
                    },
                ],
                where: { deleted_at: null }, // only active sections
                attributes: ["class_section_uuid",
                    //  "class_section_name",
                    [
                        Sequelize.literal(`
                          CASE 
                            WHEN Stream.stream_name IS NOT NULL 
                            THEN CONCAT(class_section_name, ' - ', Stream.stream_name)
                            ELSE class_section_name
                          END
                        `),
                        "class_section_name"
                    ]
                ], // expose UUID not ID
            });

            if (!classSections || classSections.length === 0) {
                return ResponseHelper.NotFound(res, false, "No class sections found for this class", "Get Class Sections API");
            }
        }
        return ResponseHelper.OK(res, true, "Class sections retrieved successfully!", classSections, null, "Get Class Sections API");
    } catch (error) {
        return ResponseHelper.ISError(res, error.message || "Failed to retrieve class sections", "Get Class Sections API");
    }
};

export const getStreamsListForDropdown = async (req, res) => {
    try {
        const school_uuid = req.credentials.schoolUuid; // From headers or token

        // Get numeric school ID from UUID
        const school_id = await CommonHelper.getIdFromUuid(Schools, school_uuid, res, "Get Streams List API", "school_uuid");
        if (!school_id) return ResponseHelper.NotFound(res, false, "School not found !", "Get Streams List API");

        // Fetch streams for this school
        const streams = await Stream.findAll({
            where: { school_id, deleted_at: null },
            attributes: {
                exclude: ["created_at", "updated_at", "deleted_at", "school_id"],
            },
            order: [["stream_name", "ASC"]], // ⬅️ SORTING ADDED
        });

        return ResponseHelper.OK(res, true, "Streams list fetched successfully!", streams, null, "Get Streams List API");
    } catch (error) {
        return ResponseHelper.ISError(res, error.message || "Failed to retrieve streams list", "Get Streams List API");
    }
};

export const getChaptersListForDropdown = async (req, res) => {
    try {
        // Fetch streams for this school
        const chapters = await Chapter.findAll({
            where: { deleted_at: null },
            attributes: ["chapter_uuid", "chapter_name"],
        });

        return ResponseHelper.OK(res, true, "Streams list fetched successfully!", chapters, null, "Get Streams List API");
    } catch (error) {
        return ResponseHelper.ISError(res, error.message || "Failed to retrieve chapters list", "Get Chapter List API");
    }
};

export const getSyllabusResourceTypeListForDropdown = async (req, res) => {
    try {
        // Fetch streams for this school
        const syllabusResourceTypeList = await SyllabusResourceType.findAll({
            where: { deleted_at: null },
            attributes: ["syllabus_resource_type_uuid", "syllabus_resource_type_name"],
        });

        return ResponseHelper.OK(res, true, "Syllabus resource type list fetched successfully!", syllabusResourceTypeList, null, "Get Syllabus Resource Type List API");
    } catch (error) {
        return ResponseHelper.ISError(res, error.message || "Failed to retrieve syllabus resource type list list", "Get Syllabus Resource Type List API");
    }
};

export const getAssessmentQuestionTypeListForDropdown = async (req, res) => {
    try {
        // Fetch streams for this school
        const assessmentQuestionTypeList = await AssessmentQuestionType.findAll({
            where: { deleted_at: null },
            attributes: ["assessment_question_type_uuid", "name", "description"],
        });

        return ResponseHelper.OK(res, true, "Syllabus resource type list fetched successfully!", assessmentQuestionTypeList, null, "Get Syllabus Resource Type List API");
    } catch (error) {
        return ResponseHelper.ISError(res, error.message || "Failed to retrieve syllabus resource type list list", "Get Syllabus Resource Type List API");
    }
};

export const getAssessmentTypeListForDropdown = async (req, res) => {
    try {
        let { is_course_assessment = false } = req.query;
        is_course_assessment = String(is_course_assessment).toLowerCase() === "true";
        const assessmentTypeList = await AssessmentType.findAll({
            where: { is_course_assessment, deleted_at: null },
            attributes: ["assessment_type_uuid", "assessment_type_name"],
        });
        return ResponseHelper.OK(res, true, "Assessment type list fetched successfully!", assessmentTypeList, null, "Get Assessment Type List API");
    } catch (error) {
        return ResponseHelper.ISError(res, error.message || "Failed to retrieve assessment type list", "Get Assessment Type List API");
    }
};

export const getSubjectsListByClassForDropdown = async (req, res) => {
    try {
        const { class_uuid } = req.params;
        let { class_section_uuid = null, user_uuid = null } = req.query;
        const school_uuid = req.credentials.schoolUuid;
        const { roleId, id: userId } = req.credentials || {};
        let schoolSubjectsList, studentDetails, classSectionDetails, schoolSubjectStreamLinkInclude = [];

        ////FILTERRING SUBJECTS BASED ON STREAM OF THE SECTION 
        if (class_section_uuid) {
            classSectionDetails = await ClassSection.findOne({
                where: {
                    class_section_uuid,
                    deleted_at: null
                },

                attributes: ["id", "stream_id"]
            })
            if (classSectionDetails?.stream_id) {

                schoolSubjectStreamLinkInclude =
                    [{
                        model: SchoolSubjectStreamLink,
                        required: true,
                        where: {
                            deleted_at: null,
                            stream_id: classSectionDetails.stream_id
                        },
                        attributes: [],
                    }]
            }


        }

        ////IF THE TEACHER IS SELETED OR LOGGED IN USER IS TEACHER THEN NO NEED TO FITLER WITH STREAM ONLY HIS ASSIGNED SUBJECTS WILL LIST
        if ((roleId === USER_ROLE.TEACHER && userId) || user_uuid) {
            // Get teacher id from user id
            let whereCondtion = { user_id: userId, deleted_at: null }

            //// WHEN A USER IS SELECTED
            if (user_uuid) {
                const userDetails = await Users.findOne({
                    where: {
                        user_uuid,
                        deleted_at: null
                    },
                    attributes: ["id"]
                })
                whereCondtion.user_id = userDetails?.id
            }

            const teacher = await Teacher.findOne({
                where: whereCondtion,
            });
            if (!teacher) {
                return ResponseHelper.OK(res, true, "No subjects found for this teacher!", [], null, "Get Subjects List By Class API");
            }

            const teacherMappings = await TeacherSubjectMap.findAll({
                include: [
                    {
                        model: TeacherClassMap,
                        where: { teacher_id: teacher.id, deleted_at: null },
                        attributes: ["id", "class_section_id"],
                        include: [
                            {
                                model: ClassSection,
                                attributes: ["id", "class_id"],
                                ...(class_section_uuid && {
                                    where: { class_section_uuid },
                                }),
                                include: [
                                    {
                                        model: Class,
                                        attributes: [],
                                        ...(class_uuid && {
                                            where: { class_uuid },
                                        }),
                                    },
                                ],
                            },
                        ],
                    },
                ],
                attributes: ["school_subject_id"],
            });

            if (!teacherMappings.length) {
                return ResponseHelper.OK(res, true, "No assigned classes/subjects found for this teacher!", [], null, "Get Assessment List API");
            }

            // console.log("teacherMappings------", teacherMappings);

            const allowedClassIds = teacherMappings.map((m) => m.TeacherClassMap?.ClassSection?.class_id);

            const allowedSubjectIds = teacherMappings.map((m) => m.school_subject_id);

            schoolSubjectsList = await SchoolSubject.findAll({
                where: {
                    deleted_at: null,
                    class_id: { [Op.in]: allowedClassIds },
                    id: { [Op.in]: allowedSubjectIds },
                },
                include: [
                    {
                        model: Subject,
                        where: { deleted_at: null },
                        attributes: ["subject_name"],
                        required: true,
                    },
                ],
                attributes: ["school_subject_uuid", [col("Subject.subject_name"), "subject_name"]],
            });

            // Filter SchoolSubject by mapped section ids
            // schoolSubjectsList = await SchoolSubject.findAll({
            //     where: {
            //         deleted_at: null,
            //         class_section_id: { [Op.in]: mappedSectionIds },
            //     },
            //     include: [
            //         {
            //             model: Class,
            //             where: { class_uuid, deleted_at: null },
            //             attributes: [],
            //         },
            //         {
            //             model: Schools,
            //             where: { school_uuid, deleted_at: null },
            //             attributes: [],
            //         },
            //         {
            //             model: Subject,
            //             where: { deleted_at: null },
            //             attributes: [],
            //             required: true,
            //         },
            //     ],
            //     attributes: ["school_subject_uuid", [col("Subject.subject_name"), "subject_name"]],
            // });
        } else if (roleId === USER_ROLE.STUDENT && userId) {
            
            studentDetails = await Students.findOne({
                where: {
                    user_id: userId,
                },
                include: [
                    {
                        model: ClassSection,
                        attributes: ["id", "class_id"],
                    },
                ],
                attributes: ["id"],
            });

            schoolSubjectsList = await SchoolSubject.findAll({
                where: {
                    deleted_at: null,
                    class_id: studentDetails?.ClassSection?.class_id,
                },
                include: [
                    {
                        model: Class,
                        where: { class_uuid, deleted_at: null },
                        attributes: [],
                    },
                    {
                        model: Schools,
                        where: { school_uuid, deleted_at: null },
                        attributes: [],
                    },
                    {
                        model: Subject,
                        where: { deleted_at: null },
                        attributes: [],
                        required: true,
                    },

                    // ONLY INCLUDE IF STREAM EXISTS TO FILTER THE SUBJECTS OF THAT STREAM ONLY FOR THAT SECTION
                    ...(classSectionDetails?.stream_id
                        ? schoolSubjectStreamLinkInclude
                        : []
                    )
                ],
                attributes: ["school_subject_uuid", [col("Subject.subject_name"), "subject_name"]],
            });
        } else {
            // Default: as it is
            schoolSubjectsList = await SchoolSubject.findAll({
                where: { deleted_at: null },
                include: [
                    {
                        model: Class,
                        where: { class_uuid, deleted_at: null },
                        attributes: [],
                    },
                    {
                        model: Schools,
                        where: { school_uuid, deleted_at: null },
                        attributes: [],
                    },
                    {
                        model: Subject,
                        where: { deleted_at: null },
                        attributes: [],
                        required: true,
                    },

                    // ONLY INCLUDE IF STREAM EXISTS TO FILTER THE SUBJECTS OF THAT STREAM ONLY FOR THAT SECTION
                    ...(classSectionDetails?.stream_id
                        ? schoolSubjectStreamLinkInclude
                        : []
                    )
                ],
                attributes: ["school_subject_uuid", [col("Subject.subject_name"), "subject_name"]],
            });
        }
        if (!schoolSubjectsList || schoolSubjectsList.length === 0) {
            return ResponseHelper.OK(res, true, "No subjects found for this class", [], null, "Get Subjects List By Class API");
        }
        return ResponseHelper.OK(res, true, "Subjects retrieved successfully!", schoolSubjectsList, null, "Get Subjects List By Class API");
    } catch (error) {
        return ResponseHelper.ISError(res, error.message || "Failed to retrieve class sections", "Get Subjects List By Class API");
    }
};

export const getStudentsByClassOrSection = async (req, res) => {
    try {
        let { class_uuid = null, class_section_uuid = null } = req.query;
        let classData;
        const isStudent = req.credentials.roleId === USER_ROLE.STUDENT;
        const school_uuid = req.credentials.schoolUuid || req.headers["school-uuid"]; // From headers or token

        let userWhereClause = { deleted_at: null };

        if (isStudent) {
            userWhereClause.id = req.credentials.id;
        }
        // Build WHERE clause dynamically
        let whereClause = {};

        if (!class_uuid && class_section_uuid) {
            return ResponseHelper.BadRequest(res, "Please select class first !", "Fetch students list by class or section api !");
        }

        // Sanitize input
        class_uuid = class_uuid ? sanitizeHtml(class_uuid.trim()) : null;
        class_section_uuid = class_section_uuid ? sanitizeHtml(class_section_uuid.trim()) : null;

        // ✅ Validate: class_uuid is mandatory
        // if (!class_uuid) {
        //   return ResponseHelper.BadRequest(
        //     res,
        //     "Please select a class",
        //     "Fetch students list by class or section api !"
        //   );
        // }

        // Get class ID
        if (class_uuid) {
            classData = await Class.findOne({
                where: { class_uuid, deleted_at: null },
                attributes: ["id"],
                include: [
                    {
                        model: Schools,
                        where: {
                            school_uuid,
                            deleted_at: null,
                        },
                        attributes: [],
                    },
                ],
            });

            if (!classData) {
                return ResponseHelper.OK(res, false, "Class details not found", null, null, "Fetch students list by class or section api !");
            }
        }

        if (class_uuid && class_section_uuid) {
            // ✅ If section is provided → use only that section
            const classSection = await ClassSection.findOne({
                where: { class_section_uuid, class_id: classData.id, deleted_at: null },
                attributes: ["id"],
            });

            if (!classSection) {
                return ResponseHelper.OK(res, false, "Either section details not found or does not belong to the specified class", null, null, "Fetch students list by class or section api !");
            }

            whereClause.class_section_id = classSection.id;
        } else if (class_uuid) {
            // Else → all sections under that class
            const sections = await ClassSection.findAll({
                where: { class_id: classData.id, deleted_at: null },
                attributes: ["id"],
            });

            if (sections.length === 0) {
                return ResponseHelper.OK(res, false, "No sections found for this class", null, null, "Fetch students list by class or section api !");
            }

            whereClause.class_section_id = sections.map((s) => s.id);
        }

        // ✅ Fetch students with related info

        const students = await Users.findAll({
            where: userWhereClause,
            include: [
                {
                    model: Students,
                    attributes: [],
                    where: { ...whereClause, deleted_at: null },
                },
                {
                    model: Schools,
                    required: true,
                    attributes: [],
                    where: { school_uuid },
                },
            ],
            order: [["name", "ASC"]],
            attributes: ["name", "user_uuid"],
        });

        if (students.length === 0) {
            return ResponseHelper.OK(res, false, "No students found for the specified criteria", null, null, "Fetch students list by class or section api !");
        }
        return ResponseHelper.OK(res, true, "Students fetched successfully", students, null, "Fetch students list by class or section api !");
    } catch (error) {
        return ResponseHelper.ISError(res, "Internal Sever Error", "Fetch students list by class or section api !");
    }
};

export const getCourseTypeListForDropdown = async (req, res) => {
    try {
        const courseTypeList = await CourseType.findAll({
            where: { deleted_at: null },
            order: [["course_type_name", "ASC"]],
            attributes: ["course_type_uuid", "course_type_name"],
        });
        return ResponseHelper.OK(res, true, "Course type list fetched successfully", courseTypeList, null, "Fetch course type list api !");
    } catch (error) {
        return ResponseHelper.ISError(res, "Internal Sever Error", "Fetch course type list api !");
    }
};

export const getCourseStructureTypeListForDropdown = async (req, res) => {
    try {
        const courseTypeList = await CourseStructureType.findAll({
            where: { deleted_at: null },
            order: [["course_structure_type_name", "ASC"]],
            attributes: ["course_structure_type_uuid", "course_structure_type_name"],
        });
        return ResponseHelper.OK(res, true, "Course type list fetched successfully", courseTypeList, null, "Fetch course structure type list api !");
    } catch (error) {
        return ResponseHelper.ISError(res, "Internal Sever Error", "Fetch course structure type list api !");
    }
};

export const getCourseCategoryListForDropdown = async (req, res) => {
    try {
        const categoryList = await Category.findAll({
            where: { deleted_at: null },
            order: [["name", "ASC"]],
            attributes: ["category_uuid", "name"],
        });
        return ResponseHelper.OK(res, true, "Category list fetched successfully", categoryList, null, "Fetch course category list api !");
    } catch (error) {
        return ResponseHelper.ISError(res, "Internal Sever Error", "Fetch course category list api !");
    }
};

export const getCourseSubCategoryListForDropdown = async (req, res) => {
    try {
        const { categoryUuid } = req.params;

        // Validate categoryUuid
        if (!categoryUuid) {
            return ResponseHelper.BadRequest(res, "Category ID is required", "Fetch course sub-category list api !");
        }

        const courseCategory = await Category.findOne({
            where: { category_uuid: categoryUuid, deleted_at: null },
            attributes: ["id"],
        });

        if (!courseCategory) {
            return ResponseHelper.NotFound(res, "Course category not found", "Fetch course sub-category list api !");
        }

        const courseSubCategoryList = await SubCategory.findAll({
            where: { category_id: courseCategory?.id },
            order: [["name", "ASC"]],
            attributes: ["sub_category_uuid", "name"],
        });

        return ResponseHelper.OK(res, true, "Course sub-category list fetched successfully", courseSubCategoryList, null, "Fetch course sub-category list api !");
    } catch (error) {
        return ResponseHelper.ISError(res, "Internal Server Error", "Fetch course sub-category list api !");
    }
};

export const getTeachersListForDropdown = async (req, res) => {
    try {
        let { class_uuid, class_section_uuid } = req.query;
        const school_uuid =
            req.credentials.schoolUuid || req.headers["school-uuid"];
        let whereClause = { role_id: USER_ROLE.TEACHER, deleted_at: null };

        if (class_uuid) {
            class_uuid = sanitizeHtml(class_uuid);
        }

        if (class_section_uuid) {
            class_section_uuid = sanitizeHtml(class_section_uuid);
        }

        //// CASE 1: FINDING ALL TEACHERS OF THE SELECTED  CLASS
        if (class_uuid && !class_section_uuid) {
            const classSectionOption = {
                include: [
                    {
                        model: Class,
                        attributes: [],
                        where: {
                            class_uuid,
                            deleted_at: null,
                        },
                        required: true,
                        include: [
                            {
                                model: Schools,
                                attributes: [],
                                where: {
                                    school_uuid,
                                    deleted_at: null,
                                },
                            },
                        ],
                    },
                ],
                attributes: ["id"],
            };
            ////FINDING ALL SECTION OF THE SELECTED CLASS
            const classSectionds = await ClassSection.findAll(classSectionOption);
            const classSectionIds = classSectionds.map((item) => item?.id);

            ////FINDING ALL TEACHER IDS BASED ON CLASS SECTION ID
            const teacherClassMap = await TeacherClassMap.findAll({
                where: {
                    class_section_id: classSectionIds,
                },
                attributes: ["teacher_id"],
                group: ["teacher_id"], // ✅ ensures unique teacher_id
            });
            const teacherClassMapIds = teacherClassMap.map(
                (item) => item?.teacher_id
            );

            //// TEACHERS OPTION BASED ON TEACHER IDS LIST
            const teachersOptions = {
                where: whereClause,
                order: [["name", "ASC"]],
                attributes: ["user_uuid", "name"],
                include: [
                    {
                        model: Teacher,
                        required: true,
                        where: {
                            id: teacherClassMapIds,
                        },
                        attributes: [],
                    },
                ],
            };

            const teacehrsLists = await Users.findAll(teachersOptions);
            return ResponseHelper.OK(
                res,
                true,
                "Teachers list fetched successfully",
                teacehrsLists,
                null,
                "Fetch Teachers list api !"
            );
        }

        //// CASE 2: FINDING ALL TEACHERS OF THE SELECTED  CLASS & SECTION
        if (class_uuid && class_section_uuid) {
            ////FINDING ALL TEACHER IDS BASED ON CLASS SECTION ID
            const teacherClassMap = await TeacherClassMap.findAll({
                include: [
                    {
                        model: ClassSection,
                        where: {
                            class_section_uuid,
                        },
                    },
                ],
                attributes: ["teacher_id"],
                group: ["teacher_id"], // ✅ ensures unique teacher_id
            });
            const teacherClassMapIds = teacherClassMap.map(
                (item) => item?.teacher_id
            );

            //// TEACHERS OPTION BASED ON TEACHER IDS LIST
            const teachersOptions = {
                where: whereClause,
                order: [["name", "ASC"]],
                attributes: ["user_uuid", "name"],
                include: [
                    {
                        model: Teacher,
                        required: true,
                        where: {
                            id: teacherClassMapIds,
                        },
                        attributes: [],
                    },
                ],
            };
            const teacehrsLists = await Users.findAll(teachersOptions);
            return ResponseHelper.OK(
                res,
                true,
                "Teachers list fetched successfully",
                teacehrsLists,
                null,
                "Fetch Teachers list api !"
            );
        }

        //// CASE 3: FINDING ALL TEACHERS BASED ON SCHOOL
        const teachersOptions = {
            where: whereClause,
            order: [["name", "ASC"]],
            attributes: ["user_uuid", "name"],
            include: [
                {
                    model: Schools,
                    attributes: [],
                    where: {
                        school_uuid,
                    },
                    required: true,
                },
            ],
        };

        const teacehrsList = await Users.findAll(teachersOptions);
        return ResponseHelper.OK(
            res,
            true,
            "Teachers list fetched successfully",
            teacehrsList,
            null,
            "Fetch Teachers list api !"
        );
    } catch (error) {
        return ResponseHelper.ISError(
            res,
            "Internal Sever Error",
            "Fetch Teachers list api !"
        );
    }
};

// export const getTeachersListForDropdown = async (req, res) => {
//   try {
//     let { class_uuid, class_section_uuid } = req.query;
//     const school_uuid =
//       req.credentials.schoolUuid || req.headers["school-uuid"];
//     let whereClause = { role_id: USER_ROLE.TEACHER, deleted_at: null };

//     if (class_uuid) {
//       class_uuid = sanitizeHtml(class_uuid);
//     }

//     if (class_section_uuid) {
//       class_section_uuid = sanitizeHtml(class_section_uuid);
//     }

//     //// CASE 1: FINDING ALL TEACHERS OF THE SELECTED  CLASS
//     if (class_uuid && !class_section_uuid) {
//       const classSectionOption = {
//         include: [
//           {
//             model: Class,
//             attributes: [],
//             where: {
//               class_uuid,
//               deleted_at: null,
//             },
//             required: true,
//             include: [
//               {
//                 model: Schools,
//                 attributes: [],
//                 where: {
//                   school_uuid,
//                   deleted_at: null,
//                 },
//               },
//             ],
//           },
//         ],
//         attributes: ["id"],
//       };
//       ////FINDING ALL SECTION OF THE SELECTED CLASS
//       const classSectionds = await ClassSection.findAll(classSectionOption);
//       const classSectionIds = classSectionds.map((item) => item?.id);

//       ////FINDING ALL TEACHER IDS BASED ON CLASS SECTION ID
//       const teacherClassMap = await TeacherClassMap.findAll({
//         where: {
//           class_section_id: classSectionIds,
//         },
//         attributes: ["teacher_id"],
//         group: ["teacher_id"], // ✅ ensures unique teacher_id
//       });
//       const teacherClassMapIds = teacherClassMap.map(
//         (item) => item?.teacher_id
//       );

//       //// TEACHERS OPTION BASED ON TEACHER IDS LIST
//       const teachersOptions = {
//         where: whereClause,
//         order: [["name", "ASC"]],
//         attributes: ["user_uuid", "name"],
//         include: [
//           {
//             model: Teacher,
//             required: true,
//             where: {
//               id: teacherClassMapIds,
//             },
//             attributes: [],
//           },
//         ],
//       };

//       const teacehrsLists = await Users.findAll(teachersOptions);
//       return ResponseHelper.OK(
//         res,
//         true,
//         "Teachers list fetched successfully",
//         teacehrsLists,
//         null,
//         "Fetch Teachers list api !"
//       );
//     }

//     //// CASE 2: FINDING ALL TEACHERS OF THE SELECTED  CLASS & SECTION
//     if (class_uuid && class_section_uuid) {
//       ////FINDING ALL TEACHER IDS BASED ON CLASS SECTION ID
//       const teacherClassMap = await TeacherClassMap.findAll({
//         include: [
//           {
//             model: ClassSection,
//             where: {
//               class_section_uuid,
//             },
//           },
//         ],
//         attributes: ["teacher_id"],
//         group: ["teacher_id"], // ✅ ensures unique teacher_id
//       });
//       const teacherClassMapIds = teacherClassMap.map(
//         (item) => item?.teacher_id
//       );

//       //// TEACHERS OPTION BASED ON TEACHER IDS LIST
//       const teachersOptions = {
//         where: whereClause,
//         order: [["name", "ASC"]],
//         attributes: ["user_uuid", "name"],
//         include: [
//           {
//             model: Teacher,
//             required: true,
//             where: {
//               id: teacherClassMapIds,
//             },
//             attributes: [],
//           },
//         ],
//       };
//       const teacehrsLists = await Users.findAll(teachersOptions);
//       return ResponseHelper.OK(
//         res,
//         true,
//         "Teachers list fetched successfully",
//         teacehrsLists,
//         null,
//         "Fetch Teachers list api !"
//       );
//     }

//     //// CASE 3: FINDING ALL TEACHERS BASED ON SCHOOL
//     const teachersOptions = {
//       where: whereClause,
//       order: [["name", "ASC"]],
//       attributes: ["user_uuid", "name"],
//       include: [
//         {
//           model: Schools,
//           attributes: [],
//           where: {
//             school_uuid,
//           },
//           required: true,
//         },
//       ],
//     };

//     const teacehrsList = await Users.findAll(teachersOptions);
//     return ResponseHelper.OK(
//       res,
//       true,
//       "Teachers list fetched successfully",
//       teacehrsList,
//       null,
//       "Fetch Teachers list api !"
//     );
//   } catch (error) {
//     return ResponseHelper.ISError(
//       res,
//       "Internal Sever Error",
//       "Fetch Teachers list api !"
//     );
//   }
// };

export const getCoursesListForDropdown = async (req, res) => {
    try {
        const school_uuid = req?.credentials?.schoolUuid || req.headers["school-uuid"];

        if (!school_uuid) {
            return ResponseHelper.BadRequest(res, "Missing school details!", "Get Courses List API");
        }

        //Get start & end of today using moment
        const startOfToday = moment().startOf("day").toDate();
        const endOfToday = moment().endOf("day").toDate();

        //Build where clause to filter only active courses
        let whereClause = {
            [Op.or]: [{ end_date: null }, { end_date: { [Op.between]: [startOfToday, endOfToday] } }, { end_date: { [Op.gt]: endOfToday } }],
        };

        const isTeacher = req.credentials.roleId === USER_ROLE.TEACHER;

        if (isTeacher) {
            whereClause = { ...whereClause, instructor_id: req.credentials.id };
        }

        const courseOptions = {
            where: whereClause,
            order: [["title", "ASC"]],
            include: [
                {
                    model: Class,
                    attributes: ["class_uuid"],
                },

                {
                    model: ClassSection,
                    attributes: ["class_section_uuid"],
                },

                {
                    model: Users,
                    attributes: [],
                    required: true,
                    include: [
                        {
                            model: Schools,
                            required: true,
                            where: { school_uuid },
                        },
                    ],
                },
            ],
            attributes: ["course_uuid", "title", "start_date", "end_date"],
        };

        const courseList = await Course.findAll(courseOptions);

        return ResponseHelper.OK(res, true, "Courses list fetched successfully!", courseList, null, "Get Courses List API");
    } catch (error) {
        return ResponseHelper.ISError(res, error.message || "Failed to fetch course details", "Get Courses List API");
    }
};

export const getProgressStatusListForDropdown = async (req, res) => {
    try {
        const options = {
            where: { deleted_at: null },
            attributes: ["status_uuid", "name"],
        };
        const progressStatusList = await ProgressStatus.findAll(options);

        return ResponseHelper.OK(res, true, "Progress status list fetched successfully!", progressStatusList, null, "Get Progress status List API");
    } catch (error) {
        return ResponseHelper.ISError(res, error.message || "Failed to fetch course details", "Get Progress status List API");
    }
};

export const getNotificationTargetTypeListForDropdown = async (req, res) => {
    try {
        const options = {
            where: { deleted_at: null },
            attributes: ["notification_target_type_uuid", "target_type"],
        };
        const progressStatusList = await NotificationTargetType.findAll(options);

        return ResponseHelper.OK(res, true, "Notification Target Type list fetched successfully!", progressStatusList, null, "Get Notification Target Type List API");
    } catch (error) {
        return ResponseHelper.ISError(res, error.message || "Failed to fetch Notification Target Type List", "Get Notification Target Type List API");
    }
};
