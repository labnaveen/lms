import Joi from "joi";

export const addEditSyllabusSchema = Joi.object({
    syllabus_title: Joi.string().max(150).required(),
    syllabus_description: Joi.string().optional().allow(null, ""),
    syllabus_link: Joi.string().optional().allow(null, ""),
    accademic_year_uuid: Joi.string().uuid().required(),
    school_subject_uuid: Joi.string().uuid().required(),
    user_uuid: Joi.string().uuid().optional().allow(null, ""),
    accademic_year_uuid: Joi.string().optional().allow(null, ""),
    class_section_uuid: Joi.string().optional().allow(null, ""),
    chapters: Joi.array()
        .items(
            Joi.object({
                syllabus_chapter_uuid: Joi.string().uuid(), // for update
                chapter_uuid: Joi.string().uuid(), // for add
                syllabus_chapter_title: Joi.string().max(250).required(),
                syllabus_chapter_description: Joi.string().optional().allow(null, ""),
            }).xor("syllabus_chapter_uuid", "chapter_uuid") // require one, not both
        )
        .optional(),
});

export const addEditSyllabusChapterResourceSchema = Joi.object({
    syllabus_chapter_uuid: Joi.string().uuid().required(),
    syllabus_resource_type_uuid: Joi.string().uuid().required(),
    resource_title: Joi.string().max(255).required(),
});
