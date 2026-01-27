import Joi from "joi";

export const createSkillSchema = Joi.object({
  title: Joi.string().trim().min(3).max(150).required().messages({
    "string.base": "Title must be a string",
    "string.empty": "Title is required",
    "string.min": "Title must be at least 3 characters long",
    "any.required": "Title is required",
  }),

  description: Joi.string().trim().max(2000).required().messages({
    "string.base": "Description must be a string",
    "string.empty": "Description is required",
    "any.required": "Description is required",
  }),

  category_uuid: Joi.string()
    .guid({ version: "uuidv4" })
    .required()
    .messages({
      "string.guid": "Category UUID must be a valid UUID",
      "any.required": "Category UUID is required",
    }),

  difficulty_level_uuid: Joi.string()
    .guid({ version: "uuidv4" })
    .required()
    .messages({
      "string.guid": "Difficulty level UUID must be a valid UUID",
      "any.required": "Difficulty level UUID is required",
    }),

  estimated_time: Joi.string().required().messages({
    "any.required": "Estimated time is required",
  }),
  url: Joi.string().uri().optional().allow(null, "")
});


export const updateSkillSchema = Joi.object({
  title: Joi.string().trim().min(3).max(150).optional().messages({
    "string.base": "Title must be a string",
    "string.min": "Title must be at least 3 characters long",
  }),

  description: Joi.string().trim().max(2000).optional().messages({
    "string.base": "Description must be a string",
  }),

  category_uuid: Joi.string()
    .guid({ version: "uuidv4" })
    .optional()
    .messages({
      "string.guid": "Category UUID must be a valid UUID",
    }),

  difficulty_level_uuid: Joi.string()
    .guid({ version: "uuidv4" })
    .optional()
    .messages({
      "string.guid": "Difficulty level UUID must be a valid UUID",
    }),

  estimated_time: Joi.string().optional().messages({
    "string.base": "Estimated time must be a string",
  }),
  url: Joi.string().uri().optional().allow(null, ""),
});
