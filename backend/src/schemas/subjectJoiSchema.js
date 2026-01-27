import Joi from "joi";

export const addEditSubjectSchema = Joi.object({
    roll_number: Joi.string().max(50).required(),
    enrollment_date: Joi.date().required(),
    date_of_birth: Joi.date().required(),
    class_section_id: Joi.number().integer().required(),
    gender_id: Joi.number().integer().required(),
    guardian_name: Joi.string().max(150).required(),
    guardian_phone: Joi.string().max(20).required(),
    address: Joi.string().required(),
});
