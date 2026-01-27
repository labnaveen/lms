import Joi from "joi";

export const streamAddSchema = Joi.object({
    stream_name: Joi.string().trim().min(2).max(100).required().messages({
        "string.base": "Stream name must be a string",
        "string.empty": "Stream name is required",
        "string.min": "Stream name must be at least 2 characters",
        "string.max": "Stream name must be at most 100 characters",
        "any.required": "Stream name is required",
    }),
    stream_description: Joi.string().trim().max(512).allow("").optional().messages({
        "string.base": "Stream description must be a string",
        "string.max": "Stream description must be at most 512 characters",
    }),
});

export const streamUpdateSchema = Joi.object({
    stream_name: Joi.string().trim().min(2).max(100).required().messages({
        "string.base": "Stream name must be a string",
        "string.empty": "Stream name is required",
        "string.min": "Stream name must be at least 2 characters",
        "string.max": "Stream name must be at most 100 characters",
        "any.required": "Stream name is required",
    }),
    stream_description: Joi.string().trim().max(512).allow("").optional().messages({
        "string.base": "Stream description must be a string",
        "string.max": "Stream description must be at most 512 characters",
    }),
});
