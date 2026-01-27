import Joi from "joi";

export const addStudentSchema = Joi.object({
  roll_number: Joi.string().max(50).required(),
  enrollment_date: Joi.date().required(),
  date_of_birth: Joi.date().required(),
  class: Joi.string().uuid().required(),
  section: Joi.string().uuid().required(),
  gender: Joi.string().uuid().required(),
  parent_name: Joi.string().max(150).required(),
  parent_phone: Joi.string().max(20).required(),
  address: Joi.string().required(),
  name: Joi.string().max(150).required(),
  email: Joi.string().email().max(150).required(),
  phone: Joi.string().max(20).required(),
  password: Joi.string().min(6).required(),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
    "any.only": "Confirm password must match password",
  }),
  profileImage: Joi.any().optional(),
});

export const updateStudentSchema = Joi.object({
  roll_number: Joi.string().max(50).required(),
  enrollment_date: Joi.date().required(),
  date_of_birth: Joi.date().required(),
  class_section_id: Joi.number().integer().required(),
  gender_id: Joi.number().integer().required(),
  guardian_name: Joi.string().max(150).required(),
  guardian_phone: Joi.string().max(20).required(),
  address: Joi.string().required(),
  name: Joi.string().max(150).required(),
  phone: Joi.string().max(20).required(),
});
