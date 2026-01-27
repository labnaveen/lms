import Joi from "joi";

export const addAndUpdateChapterSchema = Joi.object({
    chapter_name: Joi.string().max(250).required(),
});
