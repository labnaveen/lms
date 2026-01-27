import sanitizeHtml from "sanitize-html";
import { Sequelize } from "sequelize";
import CommonHelper from "../helpers/CommonHelper.js";
import ResponseHelper from "../helpers/ResponseHelper.js";
import Schools from "../models/SchoolsModal.js";
import db from "../config/db.config.js";
import { Op } from "sequelize";
import { col } from "sequelize";
import { buildSearchQuery } from "../utils/searchHelper.js";
import Syllabus from "../models/SyllabusModal.js";
import SchoolSubject from "../models/SchoolSubjectModel.js";
import AccademicYear from "../models/AccademicYearModel.js";
import SyllabusChapter from "../models/SyllabusChapterModal.js";
import SyllabusChapterResource from "../models/SyllabusChapterResourseModal.js";
import SyllabusResourceType from "../models/SyllabusResourceTypeModel.js";
import Chapter from "../models/ChapterModel.js";
import Subject from "../models/SubjectModel.js";
import TeacherContentReport from "../models/TeacherContentReportModel.js";
import ClassSection from "../models/ClassSectionModel.js";
import Class from "../models/ClassModel.js";
import Stream from "../models/StreamModel.js";
import Users from "../models/UserModal.js";
import { USER_ROLE } from "../constants/Constants.js";
import Students from "../models/StudentsModel.js";

export const getSyllabusList = async (req, res) => {
    try {
        const school_uuid = req.credentials.schoolUuid;
        const { roleId, id } = req.credentials;
        const role_id = parseInt(roleId);

        const { search = "", page = 1, limit = 10 } = req.query;
        const pageInt = parseInt(page, 10);
        const limitInt = parseInt(limit, 10);
        const offset = (pageInt - 1) * limitInt;

        const school_id = await CommonHelper.getIdFromUuid(
            Schools,
            school_uuid,
            res,
            "Get Syllabus List API",
            "school_uuid"
        );
        if (!school_id) return ResponseHelper.NotFound(res, false, "School not found !", "Get Syllabus List API");

        const whereClause = {
            deleted_at: null,
            ...(buildSearchQuery(search.trim(), ["syllabus_title", "syllabus_description", "syllabus_link"]) || {}),
        };

        // 🔥 TEACHER → show only their created syllabus
        if (role_id === USER_ROLE.TEACHER) {
            whereClause.created_by = id;
        }

        // 🔥 STUDENT CLASS FILTER
        let studentClassWhere = {};
        if (role_id === USER_ROLE.STUDENT) {
            const student = await Students.findOne({
                where: { user_id: id, deleted_at: null },
                include: [
                    {
                        model: ClassSection,
                        attributes: ["class_id"],
                        required: true,
                        include: [
                            {
                                model: Class,
                                attributes: ["id"],
                                required: true,
                            },
                        ],
                    },
                ],
            });

            if (!student) {
                return ResponseHelper.OK(res, true, "Syllabus list fetched successfully!", [], {
                    totalCount: 0,
                    pageCount: 0,
                    currentPage: pageInt,
                    perPage: limitInt,
                    hasNextPage: false,
                    hasPrevPage: false,
                }, "Get Syllabus List API");
            }

            studentClassWhere = { id: student.ClassSection.class_id };
        }

        // COUNT
        const totalCount = await Syllabus.count({
            where: whereClause,
            include: [
                {
                    model: SchoolSubject,
                    attributes: [],
                    where: { school_id },
                    include: [
                        {
                            model: Class,
                            attributes: [],
                            where: studentClassWhere,
                            required: role_id === USER_ROLE.STUDENT,
                        },
                    ],
                },
            ],
            distinct: true,
        });

        // LIST
        const syllabus = await Syllabus.findAll({
            where: whereClause,
            attributes: [
                "syllabus_uuid",
                "syllabus_title",
                "syllabus_description",
                "syllabus_link",
                [
                    Sequelize.literal(`
                        (
                            SELECT COUNT(*)
                            FROM syllabus_chapter
                            WHERE syllabus_chapter.syllabus_id = Syllabus.id
                            AND syllabus_chapter.deleted_at IS NULL
                        )
                    `),
                    "total_chapters",
                ],
            ],
            include: [
                {
                    model: SchoolSubject,
                    attributes: ["school_subject_uuid"],
                    where: { school_id },
                    include: [
                        {
                            model: Class,
                            attributes: ["class_name"],
                            where: studentClassWhere,
                            required: role_id === USER_ROLE.STUDENT,
                        },
                    ],
                },
            ],
            order: [["id", "DESC"]],
            limit: limitInt,
            offset,
            subQuery: false,
        });

        const meta = {
            totalCount: totalCount || 0,
            pageCount: Math.ceil((totalCount || 0) / limitInt),
            currentPage: pageInt,
            perPage: limitInt,
            hasNextPage: pageInt < Math.ceil((totalCount || 0) / limitInt),
            hasPrevPage: pageInt > 1,
        };

        return ResponseHelper.OK(res, true, "Syllabus list fetched successfully!", syllabus, meta, "Get Syllabus List API");
    } catch (error) {
        return ResponseHelper.ISError(res, error.message || "Failed to retrieve syllabus list", "Get Syllabus List API");
    }
};

export const addSyllabus = async (req, res) => {
    const t = await db.transaction();
    try {
        let { syllabus_title, accademic_year_uuid, school_subject_uuid, syllabus_description, syllabus_link, chapters , user_uuid } = req.body;
        const school_uuid = req?.credentials?.schoolUuid;

        const school_id = await CommonHelper.getIdFromUuid(Schools, school_uuid, res, "Get Syllabus List API", "school_uuid");
        const user_id = await CommonHelper.getIdFromUuid(Users, user_uuid, res, "Add Syllabus API", "user_uuid");
        if (!school_id) return ResponseHelper.NotFound(res, false, "School not found !", "Add Syllabus API");
        if (!user_id) return ResponseHelper.NotFound(res, false, "User uuid not found !", "Add Syllabus API");

        syllabus_title = sanitizeHtml(syllabus_title);
        accademic_year_uuid = sanitizeHtml(accademic_year_uuid);
        school_subject_uuid = sanitizeHtml(school_subject_uuid);
        user_uuid = sanitizeHtml(user_uuid);

        if (syllabus_description) syllabus_description = sanitizeHtml(syllabus_description);

        if (syllabus_link) syllabus_link = sanitizeHtml(syllabus_link);

        const schoolSubjectOption = {
            where: { school_subject_uuid, school_id, deleted_at: null },
            transaction: t,
        };

        const [academicYear, schoolSubject] = await Promise.all([
            AccademicYear.findOne({ where: { accademic_year_uuid, is_current: true, deleted_at: null }, transaction: t }),
            SchoolSubject.findOne(schoolSubjectOption),
        ]);

        if (!academicYear) {
            await t.rollback();
            return ResponseHelper.OK(res, false, "Current academic year not found", null, null, "Add syllabus API.");
        }
        if (!schoolSubject) {
            await t.rollback();
            return ResponseHelper.OK(res, false, "Subject not found", null, null, "Add syllabus API.");
        }

        const alreadyExistingSyllabus = await Syllabus.findOne({
            where: {
                syllabus_title,
                school_subject_id: schoolSubject.id,
                accademic_year_id: academicYear.id,
                deleted_at: null,
            },
            transaction: t,
        });

        if (alreadyExistingSyllabus) {
            await t.rollback();
            return ResponseHelper.Conflict(res, "Syllabus already exists !", null, "Add syllabus API.");
        }

        const data = {
            syllabus_title,
            school_subject_id: schoolSubject?.id,
            accademic_year_id: academicYear?.id,
            syllabus_description,
            syllabus_link,
            created_by: user_uuid ? user_id : req.credentials.id,
        };

        const createdSyllabus = await Syllabus.create(data, { transaction: t });

        // Create Chapters if provided
        if (Array.isArray(chapters) && chapters.length > 0) {
            const chaptersPayload = [];

            for (const ch of chapters) {
                // Get chapter_id from chapter_uuid
                const chapter_id = await CommonHelper.getIdFromUuid(Chapter, ch.chapter_uuid, res, "Add syllabus API", "chapter_uuid");
                if (!chapter_id) {
                    await t.rollback();
                    return ResponseHelper.NotFound(res, false, "Chapter not found !", "Add Syllabus API");
                }

                chaptersPayload.push({
                    syllabus_id: createdSyllabus.id,
                    chapter_id: chapter_id,
                    syllabus_chapter_title: sanitizeHtml(ch.syllabus_chapter_title),
                    syllabus_chapter_description: ch.syllabus_chapter_description ? sanitizeHtml(ch.syllabus_chapter_description) : null,
                    created_by: user_uuid ? user_id : req.credentials.id,
                });
            }

            await SyllabusChapter.bulkCreate(chaptersPayload, { transaction: t });
        }
        await t.commit();
        return ResponseHelper.OK(res, true, "Syllabus successfully  added !", createdSyllabus, null, "Add syllabus API.");
    } catch (error) {
        await t.rollback();
        return ResponseHelper.BadRequest(res, "Failed to add syllabus", error?.message ?? "Unknown error", "Add syllabus API.");
    }
};

export const updateSyllabus = async (req, res) => {
    const t = await db.transaction();
    try {
        const { syllabus_uuid } = req.params;
        let { syllabus_title, accademic_year_uuid, school_subject_uuid, syllabus_description, syllabus_link, chapters , user_uuid} = req.body;
        const school_uuid = req?.credentials?.schoolUuid;

        const school_id = await CommonHelper.getIdFromUuid(Schools, school_uuid, res, "Update Syllabus API", "school_uuid");
        if (!school_id) {
            await t.rollback();
            return ResponseHelper.NotFound(res, false, "School not found !", "Update Syllabus API");
        }
        const user_id = await CommonHelper.getIdFromUuid(Users, user_uuid, res, "Add Syllabus API", "user_uuid");
        if (!user_id) {
            await t.rollback();
            return ResponseHelper.NotFound(res, false, "User not found !", "Update Syllabus API");
        }

        const syllabus = await Syllabus.findOne({
            where: { syllabus_uuid, deleted_at: null },
            transaction: t,
        });

        if (!syllabus) {
            await t.rollback();
            return ResponseHelper.OK(res, false, "Syllabus not found", null, null, "Update Syllabus API");
        }

        syllabus_title = sanitizeHtml(syllabus_title);
        accademic_year_uuid = sanitizeHtml(accademic_year_uuid);
        school_subject_uuid = sanitizeHtml(school_subject_uuid);
        if (syllabus_description) syllabus_description = sanitizeHtml(syllabus_description);
        if (syllabus_link) syllabus_link = sanitizeHtml(syllabus_link);

        const academicYear = await AccademicYear.findOne({ where: { accademic_year_uuid, is_current: true, deleted_at: null }, transaction: t });
        if (!academicYear) {
            await t.rollback();
            return ResponseHelper.OK(res, false, "Current academic year not found", null, null, "Update Syllabus API");
        }

        const schoolSubject = await SchoolSubject.findOne({
            where: { school_subject_uuid, deleted_at: null, school_id },
            transaction: t,
        });
        if (!schoolSubject) {
            await t.rollback();
            return ResponseHelper.OK(res, false, "Subject not found", null, null, "Update Syllabus API");
        }

        // Check for duplicate syllabus title in the same subject and academic year
        const duplicateSyllabus = await Syllabus.findOne({
            where: {
                syllabus_title,
                school_subject_id: schoolSubject.id,
                accademic_year_id: academicYear.id,
                deleted_at: null,
                syllabus_uuid: { [Op.ne]: syllabus_uuid },
            },
        });
        if (duplicateSyllabus) {
            await t.rollback();
            return ResponseHelper.Conflict(res, "Syllabus already exists!", null, "Update Syllabus API");
        }

        await syllabus.update(
            {
                syllabus_title,
                school_subject_id: schoolSubject.id,
                accademic_year_id: academicYear.id,
                syllabus_description,
                syllabus_link,
                created_by: user_uuid ? user_id : req.credentials.id,
            },
            { transaction: t }
        );

        // Optionally update/add syllabus chapters if provided
        if (Array.isArray(chapters) && chapters.length > 0) {
            // Track processed chapters to prevent duplicacy
            const processedChapterUuids = new Set();
            const processedChapterIds = new Set();
            const processedChapterTitles = new Set();
            for (const ch of chapters) {
                // Check for duplicacy in this request
                if (ch.syllabus_chapter_uuid && processedChapterUuids.has(ch.syllabus_chapter_uuid)) {
                    await t.rollback();
                    return ResponseHelper.BadRequest(res, `Duplicate syllabus_chapter_uuid found: ${ch.syllabus_chapter_uuid}`, "Update Syllabus API");
                }
                if (ch.chapter_uuid && processedChapterIds.has(ch.chapter_uuid)) {
                    await t.rollback();
                    return ResponseHelper.BadRequest(res, `Duplicate chapter_uuid found: ${ch.chapter_uuid}`, "Update Syllabus API");
                }
                if (ch.syllabus_chapter_title && processedChapterTitles.has(ch.syllabus_chapter_title.trim().toLowerCase())) {
                    await t.rollback();
                    return ResponseHelper.BadRequest(res, `Duplicate syllabus_chapter_title found: ${ch.syllabus_chapter_title}`, "Update Syllabus API");
                }
                if (ch.syllabus_chapter_uuid) processedChapterUuids.add(ch.syllabus_chapter_uuid);
                if (ch.chapter_uuid) processedChapterIds.add(ch.chapter_uuid);
                if (ch.syllabus_chapter_title) processedChapterTitles.add(ch.syllabus_chapter_title.trim().toLowerCase());
                let syllabusChapter;
                // Try to find by syllabus_chapter_uuid
                if (ch.syllabus_chapter_uuid) {
                    syllabusChapter = await SyllabusChapter.findOne({
                        where: { syllabus_chapter_uuid: ch.syllabus_chapter_uuid, syllabus_id: syllabus.id },
                        transaction: t,
                    });
                }
                // Try to find by chapter_id (from chapter_uuid)
                if (!syllabusChapter && ch.chapter_uuid) {
                    const chapter_id = await CommonHelper.getIdFromUuid(Chapter, ch.chapter_uuid, res, "Update Syllabus API", "chapter_uuid");
                    if (chapter_id) {
                        syllabusChapter = await SyllabusChapter.findOne({
                            where: { chapter_id, syllabus_id: syllabus.id, deleted_at: null },
                            transaction: t,
                        });
                    }
                }
                // Try to find by chapter_title
                if (!syllabusChapter && ch.syllabus_chapter_title) {
                    syllabusChapter = await SyllabusChapter.findOne({
                        where: { syllabus_chapter_title: ch.syllabus_chapter_title, syllabus_id: syllabus.id, deleted_at: null },
                        transaction: t,
                    });
                }
                // If found, update
                if (syllabusChapter) {
                    await syllabusChapter.update(
                        {
                            syllabus_chapter_title: sanitizeHtml(ch.syllabus_chapter_title),
                            syllabus_chapter_description: ch.syllabus_chapter_description ? sanitizeHtml(ch.syllabus_chapter_description) : null,
                            updated_by: req.credentials.id,
                        },
                        { transaction: t }
                    );
                } else if (ch.chapter_uuid) {
                    // If not found, add new syllabus chapter
                    const chapter_id = await CommonHelper.getIdFromUuid(Chapter, ch.chapter_uuid, res, "Update Syllabus API", "chapter_uuid");
                    if (!chapter_id) {
                        await t.rollback();
                        return ResponseHelper.BadRequest(res, `Chapter not found: ${ch.chapter_uuid}`, "Update Syllabus API");
                    }
                    await SyllabusChapter.create(
                        {
                            syllabus_id: syllabus.id,
                            chapter_id: chapter_id,
                            syllabus_chapter_title: sanitizeHtml(ch.syllabus_chapter_title),
                            syllabus_chapter_description: ch.syllabus_chapter_description ? sanitizeHtml(ch.syllabus_chapter_description) : null,
                            created_by: user_uuid ? user_id : req.credentials.id,
                        },
                        { transaction: t }
                    );
                }
            }
        }

        await t.commit();
        return ResponseHelper.OK(res, true, "Syllabus updated successfully!", null, null, "Update Syllabus API");
    } catch (error) {
        await t.rollback();
        return ResponseHelper.BadRequest(res, "Failed to update syllabus", error?.message ?? "Unknown error", "Update Syllabus API");
    }
};

export const removeSyllabus = async (req, res) => {
    const t = await db.transaction();
    try {
        const { syllabus_uuid } = req.params;
        const school_uuid = req?.credentials?.schoolUuid;

        const school_id = await CommonHelper.getIdFromUuid(Schools, school_uuid, res, "Remove Syllabus API", "school_uuid");
        if (!school_id) {
            await t.rollback();
            return ResponseHelper.NotFound(res, false, "School not found !", "Remove Syllabus API");
        }

        const syllabus = await Syllabus.findOne({
            where: { syllabus_uuid, deleted_at: null },
        });

        if (!syllabus) {
            await t.rollback();
            return ResponseHelper.OK(res, false, "Syllabus not found", null, null, "Remove Syllabus API");
        }

        await syllabus.update({ deleted_at: new Date(), updated_by: req.credentials.id }, { transaction: t });

        await t.commit();
        return ResponseHelper.OK(res, true, "Syllabus removed successfully!", null, null, "Remove Syllabus API");
    } catch (error) {
        await t.rollback();
        return ResponseHelper.BadRequest(res, "Failed to remove syllabus", error?.message ?? "Unknown error", "Remove Syllabus API");
    }
};
export const fetchSyllabusDetails = async (req, res) => {
    try {
        const { syllabus_uuid } = req.params;
        if (!syllabus_uuid) {
            return ResponseHelper.BadRequest(res, "Syllabus UUID is required", "Fetch Syllabus Details API");
        }

        const syllabus = await Syllabus.findOne({
            where: { syllabus_uuid, deleted_at: null },
            attributes: ["syllabus_uuid", "syllabus_title", "syllabus_description", "syllabus_link"],
            include: [
                {
                    model: SyllabusChapter,
                    where: { deleted_at: null },
                    attributes: ["syllabus_chapter_uuid", "syllabus_chapter_title", "syllabus_chapter_description"],
                    required: false,
                    include: [
                        {
                            model: SyllabusChapterResource,
                            attributes: ["syllabus_chapter_resource_uuid", "syllabus_chapter_resource_link", "syllabus_resource_type_id"],
                            required: false,
                            where: { deleted_at: null },
                            include: [
                                {
                                    model: SyllabusResourceType,
                                    attributes: ["syllabus_resource_type_name"],
                                    required: false,
                                },
                            ],
                        },
                    ],
                },
                {
                    model: SchoolSubject,
                    attributes: ["school_subject_uuid"],
                    required: false,
                    include: [
                        {
                            model: Subject,
                            attributes: ["subject_name"],
                            required: false,
                        },

                        {
                            model: Class,
                            attributes: ["class_uuid","class_name"],
                            required: false,
                        },

                        {
                            model: Stream,
                            attributes: ["stream_name"],
                            required: false,
                        },
                    ],
                },
                {
                    model: AccademicYear,
                    attributes: ["accademic_year_uuid", "accademic_year"],
                    required: false,
                },
                {
                    model: Users,
                    attributes: ["user_uuid", "name", "email"],
                    required: false,
                }
            ],
        });

        if (!syllabus) {
            return ResponseHelper.OK(res, false, "Syllabus not found", null, null, "Fetch Syllabus Details API");
        }

        return ResponseHelper.OK(res, true, "Syllabus details fetched successfully!", syllabus, null, "Fetch Syllabus Details API");
    } catch (error) {
        return ResponseHelper.ISError(res, error.message || "Failed to fetch syllabus details", "Fetch Syllabus Details API");
    }
};

export const addSyllabusChapterResource = async (req, res) => {
    const t = await db.transaction();
    try {
        const { syllabus_chapter_uuid, syllabus_resource_type_uuid, class_uuid, accademic_year_uuid, class_section_uuid } = req.body;

        // Get accademic_year_id: from frontend if provided, else use current
        let accademic_year_id = null;
        if (accademic_year_uuid) {
            accademic_year_id = await CommonHelper.getIdFromUuid(AccademicYear, accademic_year_uuid, res, "Add Syllabus Chapter Resource API", "accademic_year_uuid");
            if (!accademic_year_id) {
                await t.rollback();
                return ResponseHelper.BadRequest(res, "Invalid accademic_year_uuid", "Add Syllabus Chapter Resource API");
            }
        } else {
            // Get current academic year
            const currentYear = await AccademicYear.findOne({ where: { is_current: true, deleted_at: null } });
            if (!currentYear) {
                await t.rollback();
                return ResponseHelper.BadRequest(res, "Current academic year not found", "Add Syllabus Chapter Resource API");
            }
            accademic_year_id = currentYear.id;
        }

        ////ERROR PRONE AS USER MAY SELECT WRONG CLASS AND SECTION AS WELL
        let class_section_id = null;
        if (class_section_uuid) {
            class_section_id = await CommonHelper.getIdFromUuid(ClassSection, class_section_uuid, res, "Add Syllabus Chapter Resource API", "class_section_uuid");
        }
        let class_id = null;
        if (class_uuid) {
            class_id = await CommonHelper.getIdFromUuid(Class, class_uuid, res, "Add Syllabus Chapter Resource API", "class_uuid");
        }

        const syllabus_chapter_id = await CommonHelper.getIdFromUuid(SyllabusChapter, syllabus_chapter_uuid, res, "Add Syllabus Chapter Resource API", "syllabus_chapter_uuid");
        if (!syllabus_chapter_id) {
            await t.rollback();
            return;
        }

        const syllabus_resource_type_id = await CommonHelper.getIdFromUuid(SyllabusResourceType, syllabus_resource_type_uuid, res, "Add Syllabus Chapter Resource API", "syllabus_resource_type_uuid");
        if (!syllabus_resource_type_id) {
            await t.rollback();
            return ResponseHelper.BadRequest(res, "syllabus_resource_type_uuid is required", "Add Syllabus Chapter Resource API");
        }

        let resourceLink;
        if (req.files && req.files.length > 0) {
            resourceLink = req.files[0].path.replace(/\\/g, "/");
        }

        // Get syllabus_id from SyllabusChapter
        const syllabusChapter = await SyllabusChapter.findOne({ where: { id: syllabus_chapter_id } });
        if (!syllabusChapter) {
            await t.rollback();
            return ResponseHelper.BadRequest(res, "Syllabus chapter not found", "Add Syllabus Chapter Resource API");
        }

        ////GETTING CLASS AND SECTION DETAILS BASED ON SYLLABUS CHAPTER

        const chapterSyllabusDetailsOptins = {
            include: [
                {
                    model: SyllabusChapter,
                    attributes: [],
                    required: true,
                    where: {
                        syllabus_chapter_uuid,
                        deleted_at: null,
                    },
                },

                {
                    model: SchoolSubject,
                    required: true,
                    attributes: ["class_id"],
                },
            ],
        };

        const chapterSyllabusDetails = await Syllabus.findOne(chapterSyllabusDetailsOptins);

        await SyllabusChapterResource.create(
            {
                syllabus_chapter_resource_link: resourceLink,
                syllabus_chapter_id,
                syllabus_resource_type_id,
                approved_status: null,
                created_by: req.credentials.id,
            },
            { transaction: t }
        );

        // Update or create TeacherContentReport count
        const [report, created] = await TeacherContentReport.findOrCreate({
            where: {
                accademic_year_id,
                syllabus_id: syllabusChapter.syllabus_id,
                syllabus_chapter_id: syllabus_chapter_id,
                syllabus_resource_type_id: syllabus_resource_type_id,
                class_id: chapterSyllabusDetails?.SchoolSubject?.class_id || null,
                user_id: req.credentials.id,
                class_section_id: class_section_id,
            },
            defaults: {
                count: 1,
            },
            transaction: t,
        });

        if (!created) {
            // If already exists, increment count by 1
            await report.increment("count", { by: 1, transaction: t });
        }

        await t.commit();
        return ResponseHelper.Created(res, true, "Resource added successfully!", null, null, "Add Syllabus Chapter Resource API");
    } catch (error) {
        await t.rollback();
        return ResponseHelper.ISError(res, error.message || "Failed to add resource", "Add Syllabus Chapter Resource API");
    }
};

export const updateSyllabusChapterResource = async (req, res) => {
    const t = await db.transaction();
    try {
        const { resource_uuid } = req.params;
        const { syllabus_resource_type_uuid } = req.body;

        const resource = await SyllabusChapterResource.findOne({ where: { syllabus_chapter_resource_uuid: resource_uuid, deleted_at: null } });
        if (!resource) {
            await t.rollback();
            return ResponseHelper.OK(res, false, "Resource not found", null, null, "Update Syllabus Chapter Resource API");
        }

        let syllabus_resource_type_id = resource.syllabus_resource_type_id;
        if (syllabus_resource_type_uuid) {
            const foundTypeId = await CommonHelper.getIdFromUuid(SyllabusResourceType, syllabus_resource_type_uuid, res, "Update Syllabus Chapter Resource API", "syllabus_resource_type_uuid");
            if (!foundTypeId) {
                await t.rollback();
                return;
            }
            syllabus_resource_type_id = foundTypeId;
        }

        let resourceLink;
        if (req.files && req.files.length > 0) {
            resourceLink = req.files[0].path.replace(/\\/g, "/");
        }

        await resource.update(
            {
                syllabus_chapter_resource_link: resourceLink,
                syllabus_resource_type_id,
                approved_status: null,
                updated_by: req.credentials.id,
            },
            { transaction: t }
        );

        await t.commit();
        return ResponseHelper.OK(res, true, "Resource updated successfully!", null, null, "Update Syllabus Chapter Resource API");
    } catch (error) {
        await t.rollback();
        return ResponseHelper.ISError(res, error.message || "Failed to update resource", "Update Syllabus Chapter Resource API");
    }
};

export const deleteSyllabusChapterResource = async (req, res) => {
    const t = await db.transaction();
    try {
        const { resource_uuid } = req.params;

        const resource = await SyllabusChapterResource.findOne({ where: { syllabus_chapter_resource_uuid: resource_uuid, deleted_at: null } });
        if (!resource) {
            await t.rollback();
            return ResponseHelper.OK(res, false, "Resource not found", null, null, "Delete Syllabus Chapter Resource API");
        }

        // Get related info for decrement
        const syllabusChapter = await SyllabusChapter.findOne({ where: { id: resource.syllabus_chapter_id } });

        await resource.update({ deleted_at: new Date(), updated_by: req.credentials.id }, { transaction: t });

        // Decrement count in TeacherContentReport
        await TeacherContentReport.decrement(
            { count: 1 },
            {
                where: {
                    syllabus_id: syllabusChapter.syllabus_id,
                    syllabus_chapter_id: resource.syllabus_chapter_id,
                    syllabus_resource_type_id: resource.syllabus_resource_type_id,
                    user_id: req.credentials.id,
                },
                transaction: t,
            }
        );

        await t.commit();
        return ResponseHelper.OK(res, true, "Resource deleted successfully!", null, null, "Delete Syllabus Chapter Resource API");
    } catch (error) {
        await t.rollback();
        return ResponseHelper.ISError(res, error.message || "Failed to delete resource", "Delete Syllabus Chapter Resource API");
    }
};

export const fetchSyllabusChapterResourceDetails = async (req, res) => {
    try {
        const { resource_uuid } = req.params;
        if (!resource_uuid) {
            return ResponseHelper.BadRequest(res, "Resource uuid is required", "Fetch Syllabus Chapter Resource Details API");
        }

        const resource = await SyllabusChapterResource.findOne({
            where: { syllabus_chapter_resource_uuid: resource_uuid, deleted_at: null },
            attributes: ["syllabus_chapter_resource_uuid", "syllabus_chapter_resource_link", "syllabus_resource_type_id"],
            include: [
                {
                    model: SyllabusChapter,
                    attributes: ["syllabus_chapter_uuid", "syllabus_chapter_title"],
                    required: false,
                },
                {
                    model: SyllabusResourceType,
                    attributes: ["id", "syllabus_resource_type_name"],
                    required: false,
                },
            ],
        });

        if (!resource) {
            return ResponseHelper.OK(res, false, "Resource not found", null, null, "Fetch Syllabus Chapter Resource Details API");
        }

        return ResponseHelper.OK(res, true, "Resource details fetched successfully!", resource, null, "Fetch Syllabus Chapter Resource Details API");
    } catch (error) {
        return ResponseHelper.ISError(res, error.message || "Failed to fetch resource details", "Fetch Syllabus Chapter Resource Details API");
    }
};

export const getSyllabusChapterResourceList = async (req, res) => {
    try {
        const { syllabus_chapter_uuid } = req.params;
        if (!syllabus_chapter_uuid) {
            return ResponseHelper.BadRequest(res, "syllabus_chapter_uuid is required", "Get Syllabus Chapter Resource List API");
        }

        const syllabus_chapter_id = await CommonHelper.getIdFromUuid(SyllabusChapter, syllabus_chapter_uuid, res, "Get Syllabus Chapter Resource List API", "syllabus_chapter_uuid");
        if (!syllabus_chapter_id) return ResponseHelper.NotFound(res, false, "SyllabusChapter not found !", "Get Syllabus Chapter Resource List API");

        const resources = await SyllabusChapterResource.findAll({
            where: { syllabus_chapter_id, deleted_at: null },
            attributes: ["syllabus_chapter_resource_uuid", "syllabus_chapter_resource_link", "syllabus_resource_type_id"],
            include: [
                {
                    model: SyllabusResourceType,
                    attributes: ["id", "syllabus_resource_type_name"],
                    required: false,
                },
            ],
            order: [["created_at", "DESC"]],
        });

        return ResponseHelper.OK(res, true, "Resource list fetched successfully!", resources, null, "Get Syllabus Chapter Resource List API");
    } catch (error) {
        return ResponseHelper.ISError(res, error.message || "Failed to fetch resource list", "Get Syllabus Chapter Resource List API");
    }
};

export const removeSyllabusChapter = async (req, res) => {
    const t = await db.transaction();
    try {
        const { syllabus_chapter_uuid } = req.params;
        if (!syllabus_chapter_uuid) {
            await t.rollback();
            return ResponseHelper.BadRequest(res, "syllabus_chapter_uuid is required", "Remove Syllabus Chapter API");
        }
        const syllabusChapter = await SyllabusChapter.findOne({
            where: { syllabus_chapter_uuid, deleted_at: null },
            transaction: t,
        });
        if (!syllabusChapter) {
            await t.rollback();
            return ResponseHelper.OK(res, false, "Syllabus chapter not found", null, null, "Remove Syllabus Chapter API");
        }
        await syllabusChapter.update({ deleted_at: new Date(), updated_by: req.credentials.id }, { transaction: t });
        await t.commit();
        return ResponseHelper.OK(res, true, "Syllabus chapter removed successfully!", null, null, "Remove Syllabus Chapter API");
    } catch (error) {
        await t.rollback();
        return ResponseHelper.ISError(res, error.message || "Failed to remove syllabus chapter", "Remove Syllabus Chapter API");
    }
};
