import Joi from "joi";
export const addSchoolSubjectSchema = Joi.object({
    subject_name: Joi.string().max(150).optional().allow(null, ""), // nullable in DB
    subject_code: Joi.string().max(20).optional().allow(null, ""), // nullable in DB

    // school_id: Joi.number().integer().required(),  // required FK
    // subject_id: Joi.number().integer().required(), // required FK

    // class_id: Joi.number().integer().optional().allow(null),  // optional FK
    // stream_id: Joi.number().integer().optional().allow(null), // optional FK

    subject_uuid: Joi.string().uuid().required(), // required
    class_uuid: Joi.string().uuid().required(), // required
    // stream_uuid: Joi.string().uuid().optional().allow(null, ""), //

    stream_uuids: Joi.array()
        .items(Joi.string().uuid())
        .optional()
        .allow(null),


    // is_common: Joi.boolean().default(false), // has a default value
    max_marks: Joi.number().integer().min(0).default(0),
    passing_marks: Joi.number().integer().min(0).default(0),
});

export const updateSchoolSubjectSchema = Joi.object({
    subject_uuid: Joi.string().uuid().optional().allow(null, ""),
    class_uuid: Joi.string().uuid().optional().allow(null, ""),
    // stream_uuid: Joi.string().uuid().optional().allow(null, ""),
    stream_uuids: Joi.array()
        .items(Joi.string().uuid())
        .optional()
        .allow(null),

    max_marks: Joi.number().integer().min(0).optional(),
    passing_marks: Joi.number().integer().min(0).optional(),
});
