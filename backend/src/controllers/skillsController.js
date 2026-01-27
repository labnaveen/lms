import { Op, where } from "sequelize";
import Skill from "../models/SkillModel.js";
import Category from "../models/CategoryModel.js";
import ResponseHelper from "../helpers/ResponseHelper.js";
import DifficultyLevel from "../models/DifficultyLevelModel.js";
import Users from "../models/UserModal.js";
import UserSkill from "../models/UserSkill.js";
import ProgressStatus from "../models/ProgressStatus.js";

export const listSkills = async (req, res) => {
  try {
    const { search = "", page = 1, limit = 10 } = req.query;

    const pageInt = parseInt(page, 10);
    const limitInt = parseInt(limit, 10);
    const offset = (pageInt - 1) * limitInt;
    const { id } = req.credentials || {};

    const whereClause = { deleted_at: null, is_active: true };

    if (search) {
      whereClause.title = { [Op.like]: `%${search}%` };
    }

    const { rows, count } = await Skill.findAndCountAll({
      where: whereClause,
      limit: limitInt,
      offset,
      order: [["id", "DESC"]],
      attributes: {
        exclude: [
          "deleted_at",
          "updated_at",
          "created_at",
          "is_active",
          "id",
          "category",
          "difficulty_level_id",
          "created_by",
        ],
      },
      include: [
        {
          model: UserSkill,
          where: { user_id: id, deleted_at: null },
          required: false,
          attributes: ["status_id", "progress_percent", "completed_at"],
          include: [
            {
              model: ProgressStatus,
              attributes: ["status_uuid", "name"],
            },
          ],
        },
        {
          model: Users,
          attributes: ["user_uuid", "name", "email"],
        },
        {
          model: Category,
          attributes: ["category_uuid", "name"],
        },
        {
          model: DifficultyLevel,
          attributes: ["difficulty_level_uuid", "name"],
        },
      ],
    });

    const meta = {
      totalCount: count || 0,
      pageCount: Math.ceil((count || 0) / limitInt),
      currentPage: pageInt,
      perPage: limitInt,
      hasNextPage: pageInt < Math.ceil((count || 0) / limitInt),
      hasPrevPage: pageInt > 1,
    };

    return ResponseHelper.OK(
      res,
      true,
      rows.length ? "Skills list fetched successfully!" : "No skills found!",
      rows,
      rows.length ? meta : null,
      "List Skills API"
    );
  } catch (error) {
    return ResponseHelper.ISError(
      res,
      error.message || "Failed to list skills",
      "List Skills API"
    );
  }
};

export const getAllSkillsDetails = async (req, res) => {
  try {
    const { skill_uuid } = req.params;
    const { id } = req.credentials || {};
    if (!skill_uuid) {
      return ResponseHelper.BadRequest(
        res,
        false,
        "Skill UUID is required!",
        null,
        null,
        "Get Skill Details API"
      );
    }

    // 🔹 Fetch skill details with relations
    const skillDetails = await Skill.findOne({
      where: { skill_uuid, deleted_at: null },
      attributes: {
        exclude: [
          "deleted_at",
          "updated_at",
          "created_at",
          "is_active",
          "category",
          "difficulty_level_id",
          "created_by",
        ],
      },
      include: [
        {
          model: UserSkill,
          attributes: ["status_id", "progress_percent", "completed_at"],
          where: { user_id: id, deleted_at: null },
          required: false,
          include: [
            {
              model: ProgressStatus,
              attributes: ["status_uuid", "name"],
            },
          ],
        },
        {
          model: Users,
          attributes: ["user_uuid", "name", "email"],
        },
        {
          model: Category,
          attributes: ["category_uuid", "name"],
        },
        {
          model: DifficultyLevel,
          attributes: ["difficulty_level_uuid", "name"],
        },
      ],
    });

    if (!skillDetails) {
      return ResponseHelper.OK(
        res,
        false,
        "Skill not found!",
        null,
        null,
        "Get Skill Details API"
      );
    }

    return ResponseHelper.OK(
      res,
      true,
      "Skill details fetched successfully!",
      skillDetails,
      null,
      "Get Skill Details API"
    );
  } catch (error) {
    console.error("GetAllSkillsDetails Error:", error);
    return ResponseHelper.ISError(
      res,
      error.message || "Failed to get skill details",
      "Get Skill Details API"
    );
  }
};

export const createSkill = async (req, res) => {
  try {
    const {
      title,
      description,
      category_uuid,
      difficulty_level_uuid,
      estimated_time,
      url
    } = req.body;
    const { id: created_by } = req.credentials || {};

    const existingSkill = await Skill.findOne({
      where: { title, deleted_at: null },
    });
    if (existingSkill) {
      return ResponseHelper.Conflict(
        res,
        false,
        "A skill with this title already exists!",
        null,
        null,
        "Create Skill API"
      );
    }

    const category = await Category.findOne({
      where: { category_uuid: category_uuid, deleted_at: null },
      attributes: ["id"],
    });
    if (!category) {
      return ResponseHelper.NotFound(
        res,
        false,
        "Skill category not found!",
        null,
        null,
        "Create Skill API"
      );
    }

    const difficulty = await DifficultyLevel.findOne({
      where: { difficulty_level_uuid, deleted_at: null },
      attributes: ["id"],
    });
    if (!difficulty) {
      return ResponseHelper.NotFound(
        res,
        false,
        "Skill difficulty level not found!",
        null,
        null,
        "Create Skill API"
      );
    }

    let thumbnailUrl = null;
    let pdfUrl = null;

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        if (file.mimetype.startsWith("image/")) {
          thumbnailUrl = `public/skills/${file.filename}`;
        } else if (file.mimetype === "application/pdf") {
          pdfUrl = `public/skills/${file.filename}`;
        }
      }
    }

    const newSkill = await Skill.create({
      title,
      description,
      category: category?.id,
      difficulty_level_id: difficulty?.id,
      created_by,
      thumbnail_url: thumbnailUrl,
      pdf_url: pdfUrl,
      estimated_time,
      url
    });

    return ResponseHelper.Created(
      res,
      true,
      "Skill created successfully!",
      null,
      null,
      "Create Skill API"
    );
  } catch (error) {
    console.error("CreateSkill Error:", error);
    return ResponseHelper.ISError(
      res,
      error.message || "Failed to create skill",
      "Create Skill API"
    );
  }
};

export const updateSkill = async (req, res) => {
  try {
    const {
      title,
      description,
      category_uuid,
      difficulty_level_uuid,
      estimated_time,
      url
    } = req.body;
    const { skill_uuid } = req.params;
    if (!skill_uuid) {
      return ResponseHelper.BadRequest(
        res,
        false,
        "Skill UUID is required to update",
        null,
        null,
        "Update Skill API"
      );
    }

    // Fetch existing skill
    const skill = await Skill.findOne({
      where: { skill_uuid, deleted_at: null },
    });
    if (!skill) {
      return ResponseHelper.NotFound(
        res,
        false,
        "Skill not found!",
        null,
        null,
        "Update Skill API"
      );
    }

    // Check for duplicate title (exclude same skill)
    if (title && title !== skill.title) {
      const duplicate = await Skill.findOne({
        where: { title, deleted_at: null },
      });
      if (duplicate) {
        return ResponseHelper.Conflict(
          res,
          false,
          "A skill with this title already exists!",
          null,
          null,
          "Update Skill API"
        );
      }
    }

    // Fetch category & difficulty if updated
    let categoryId = skill.category;
    let difficultyId = skill.difficulty_level_id;

    if (category_uuid) {
      const category = await Category.findOne({
        where: { category_uuid, deleted_at: null },
        attributes: ["id"],
      });
      if (!category) {
        return ResponseHelper.NotFound(
          res,
          false,
          "Skill category not found!",
          null,
          null,
          "Update Skill API"
        );
      }
      categoryId = category.id;
    }

    if (difficulty_level_uuid) {
      const difficulty = await DifficultyLevel.findOne({
        where: { difficulty_level_uuid, deleted_at: null },
        attributes: ["id"],
      });
      if (!difficulty) {
        return ResponseHelper.NotFound(
          res,
          false,
          "Skill difficulty level not found!",
          null,
          null,
          "Update Skill API"
        );
      }
      difficultyId = difficulty.id;
    }

    // Handle file uploads
    let thumbnailUrl = skill.thumbnail_url;
    let pdfUrl = skill.pdf_url;

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        if (file.mimetype.startsWith("image/")) {
          thumbnailUrl = `public/skills/${file.filename}`;
        } else if (file.mimetype === "application/pdf") {
          pdfUrl = `public/skills/${file.filename}`;
        }
      }
    }

    // Update record
    await skill.update({
      title: title ?? skill.title,
      description: description ?? skill.description,
      category: categoryId,
      difficulty_level_id: difficultyId,
      estimated_time: estimated_time ?? skill.estimated_time,
      thumbnail_url: thumbnailUrl,
      pdf_url: pdfUrl,
      url: url ?? skill.url
    });

    return ResponseHelper.OK(
      res,
      true,
      "Skill updated successfully!",
      null,
      null,
      "Update Skill API"
    );
  } catch (error) {
    console.error("UpdateSkill Error:", error);
    return ResponseHelper.ISError(
      res,
      error.message || "Failed to update skill",
      "Update Skill API"
    );
  }
};

export const skillsCategoriesDropdown = async (req, res) => {
  try {
    const categories = await Category.findAll({
      where: { deleted_at: null, is_active: true },
      attributes: ["category_uuid", "name"],
      order: [["name", "ASC"]],
    });

    return ResponseHelper.OK(
      res,
      true,
      categories.length
        ? "Skill categories fetched successfully!"
        : "No skill categories found!",
      categories,
      null,
      "Skills Categories Dropdown API"
    );
  } catch (error) {
    return ResponseHelper.ISError(
      res,
      error.message || "Failed to fetch skill categories",
      "Skills Categories Dropdown API"
    );
  }
};

export const skillsDifficultyLevelsDropdown = async (req, res) => {
  try {
    const difficultyLevels = await DifficultyLevel.findAll({
      where: { deleted_at: null },
      attributes: ["difficulty_level_uuid", "name"],
      order: [["name", "ASC"]],
    });

    return ResponseHelper.OK(
      res,
      true,
      difficultyLevels.length
        ? "Skill difficulty levels fetched successfully!"
        : "No skill difficulty levels found!",
      difficultyLevels,
      null,
      "Skills Difficulty Levels Dropdown API"
    );
  } catch (error) {
    return ResponseHelper.ISError(
      res,
      error.message || "Failed to fetch skill difficulty levels",
      "Skills Difficulty Levels Dropdown API"
    );
  }
};

export const updateSkillStatus = async (req, res) => {
  try {
    const { skill_uuid, status_id, progress_percent, completed_at } = req.body;

    const { id } = req.credentials || {};

    if (!skill_uuid) {
      return ResponseHelper.BadRequest(
        res,
        false,
        "Skill UUID and user ID are required",
        null,
        null,
        "Update Skill Status API"
      );
    }

    // 🔹 Find skill by UUID
    const skill = await Skill.findOne({
      where: { skill_uuid, deleted_at: null },
    });

    if (!skill) {
      return ResponseHelper.NotFound(
        res,
        false,
        "Skill not found!",
        null,
        null,
        "Update Skill Status API"
      );
    }

    const skill_id = skill.id;

    // 🔹 Check if user_skill already exists
    let userSkill = await UserSkill.findOne({
      where: { user_id: id, skill_id, deleted_at: null },
    });

    if (userSkill) {
      // ✅ Update existing record
      await userSkill.update({
        status_id: status_id ?? userSkill.status_id,
        progress_percent: progress_percent ?? userSkill.progress_percent,
        completed_at: completed_at ?? userSkill.completed_at,
      });

      return ResponseHelper.OK(
        res,
        true,
        "User skill status updated successfully!",
        userSkill,
        null,
        "Update Skill Status API"
      );
    } else {
      // ✅ Create new record
      await UserSkill.create({
        user_id: id,
        skill_id,
        status_id: status_id || null,
        progress_percent: progress_percent || 0,
        completed_at: completed_at || null,
      });

      return ResponseHelper.OK(
        res,
        true,
        "User skill record created successfully!",
        null,
        null,
        "Update Skill Status API"
      );
    }
  } catch (error) {
    console.error("UpdateSkillStatus Error:", error);
    return ResponseHelper.ISError(
      res,
      error.message || "Failed to update or create user skill status",
      "Update Skill Status API"
    );
  }
};

export const destroySkill = async (req, res) => {
  try {
    const { skill_uuid } = req.params;
    if (!skill_uuid) {
      return ResponseHelper.BadRequest(
        res,
        false,
        "Skill UUID is required to delete",
        null,
        null,
        "Delete Skill API"
      );
    }

    const skill = await Skill.findOne({
      where: { skill_uuid, deleted_at: null },
    });

    if (!skill) {
      return ResponseHelper.NotFound(
        res,
        false,
        "Skill not found!",
        null,
        null,
        "Delete Skill API"
      );
    }

    await skill.update({ deleted_at: new Date() });

    return ResponseHelper.OK(
      res,
      true,
      "Skill deleted successfully!",
      null,
      null,
      "Delete Skill API"
    );
  } catch (error) {
    console.error("DestroySkill Error:", error);
    return ResponseHelper.ISError(
      res,
      error.message || "Failed to delete skill",
      "Delete Skill API"
    );
  }
};
