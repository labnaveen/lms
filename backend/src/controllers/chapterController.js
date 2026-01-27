import Chapter from "../models/ChapterModel.js";
import ResponseHelper from "../helpers/ResponseHelper.js";
import sanitizeHtml from "sanitize-html";
import db from "../config/db.config.js";

export const addChapter = async (req, res) => {
    const t = await db.transaction();
    try {
        const { chapter_name } = req.body;
        if (!chapter_name) {
            await t.rollback();
            return ResponseHelper.BadRequest(res, "chapter_name is required", "Add Chapter API");
        }
        // Duplicacy check (case-insensitive, not deleted)
        const existing = await Chapter.findOne({
            where: {
                chapter_name: db.Sequelize.where(db.Sequelize.fn("LOWER", db.Sequelize.col("chapter_name")), sanitizeHtml(chapter_name).toLowerCase()),
                deleted_at: null,
            },
            transaction: t,
        });
        if (existing) {
            await t.rollback();
            return ResponseHelper.Conflict(res, "Chapter name already exists", null, null, "Add Chapter API");
        }
        await Chapter.create(
            {
                chapter_name: sanitizeHtml(chapter_name),
            },
            { transaction: t }
        );
        await t.commit();
        return ResponseHelper.Created(res, true, "Chapter added successfully!", null, null, "Add Chapter API");
    } catch (error) {
        await t.rollback();
        return ResponseHelper.ISError(res, error.message || "Failed to add chapter", "Add Chapter API");
    }
};

export const updateChapter = async (req, res) => {
    const t = await db.transaction();
    try {
        const { chapter_uuid } = req.params;
        const { chapter_name } = req.body;
        const chapter = await Chapter.findOne({ where: { chapter_uuid, deleted_at: null }, transaction: t });
        if (!chapter) {
            await t.rollback();
            return ResponseHelper.OK(res, false, "Chapter not found", null, null, "Update Chapter API");
        }
        // Duplicacy check (case-insensitive, not deleted, exclude self)
        if (chapter_name) {
            const duplicate = await Chapter.findOne({
                where: {
                    chapter_name: db.Sequelize.where(db.Sequelize.fn("LOWER", db.Sequelize.col("chapter_name")), sanitizeHtml(chapter_name).toLowerCase()),
                    deleted_at: null,
                    chapter_uuid: { [db.Sequelize.Op.ne]: chapter_uuid },
                },
                transaction: t,
            });
            if (duplicate) {
                await t.rollback();
                return ResponseHelper.Conflict(res, "Chapter name already exists", null, null, "Update Chapter API");
            }
        }
        await chapter.update(
            {
                chapter_name: chapter_name ? sanitizeHtml(chapter_name) : chapter.chapter_name,
            },
            { transaction: t }
        );
        await t.commit();
        return ResponseHelper.OK(res, true, "Chapter updated successfully!", null, null, "Update Chapter API");
    } catch (error) {
        await t.rollback();
        return ResponseHelper.ISError(res, error.message || "Failed to update chapter", "Update Chapter API");
    }
};

export const deleteChapter = async (req, res) => {
    const t = await db.transaction();
    try {
        const { chapter_uuid } = req.params;
        const chapter = await Chapter.findOne({ where: { chapter_uuid, deleted_at: null }, transaction: t });
        if (!chapter) {
            await t.rollback();
            return ResponseHelper.OK(res, false, "Chapter not found", null, null, "Delete Chapter API");
        }
        await chapter.update({ deleted_at: new Date() }, { transaction: t });
        await t.commit();
        return ResponseHelper.OK(res, true, "Chapter deleted successfully!", null, null, "Delete Chapter API");
    } catch (error) {
        await t.rollback();
        return ResponseHelper.ISError(res, error.message || "Failed to delete chapter", "Delete Chapter API");
    }
};

export const listChapters = async (req, res) => {
    try {
        const { search = "", page = 1, limit = 10 } = req.query;
        const pageInt = parseInt(page, 10);
        const limitInt = parseInt(limit, 10);
        const offset = (pageInt - 1) * limitInt;
        const whereClause = { deleted_at: null };
        if (search) {
            whereClause.chapter_title = { $like: `%${search}%` };
        }
        const { rows, count } = await Chapter.findAndCountAll({
            where: whereClause,
            limit: limitInt,
            offset,
            order: [["id", "DESC"]],
            attributes: ["chapter_uuid", "chapter_name"], // exclude unwanted fields
        });
        const meta = {
            totalCount: count || 0,
            pageCount: Math.ceil((count || 0) / limitInt),
            currentPage: pageInt,
            perPage: limitInt,
            hasNextPage: pageInt < Math.ceil((count || 0) / limitInt),
            hasPrevPage: pageInt > 1,
        };
        return ResponseHelper.OK(res, true, rows.length ? "Chapters list fetched successfully!" : "No chapters found!", rows, rows.length ? meta : null, "List Chapters API");
    } catch (error) {
        return ResponseHelper.ISError(res, error.message || "Failed to list chapters", "List Chapters API");
    }
};

export const fetchChapterDetails = async (req, res) => {
    try {
        const { chapter_uuid } = req.params;
        if (!chapter_uuid) return ResponseHelper.BadRequest(res, "chapter_uuid is required", "Fetch Chapter Details API");
        const chapter = await Chapter.findOne({
            where: { chapter_uuid, deleted_at: null },
            attributes: ["chapter_uuid", "chapter_name"], // exclude unwanted fields
        });
        return chapter
            ? ResponseHelper.OK(res, true, "Chapter details fetched successfully!", chapter, null, "Fetch Chapter Details API")
            : ResponseHelper.OK(res, false, "Chapter not found", null, null, "Fetch Chapter Details API");
    } catch (error) {
        return ResponseHelper.ISError(res, error.message || "Failed to fetch chapter details", "Fetch Chapter Details API");
    }
};
