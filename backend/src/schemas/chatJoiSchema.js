import Joi from "joi";

export const chatSchema = Joi.object({
    message: Joi.string().required(),
});
