import Joi from "joi";

// Question schema
const questionSchema = Joi.object({
    question_text: Joi.string().required(),
    assessment_question_type_uuid: Joi.string().uuid().required(),
    max_marks: Joi.number().integer().min(1).required(),
    // Options are required only for MCQ/MAQ/TRUE_FALSE
    options: Joi.array()
        .items(
            Joi.object({
                option_text: Joi.string().required(),
                is_correct: Joi.boolean().required(),
            })
        )
        .optional(),
    // Correct answer text for Descriptive/Fill-in
    correct_answer_text: Joi.string().allow(null, "").optional(),
});

// Main schema
export const createAssessmentSchema = Joi.object({
    assessment_title: Joi.string().max(512).required(),
    assessment_description: Joi.string().allow(null, "").optional(),
    school_subject_uuid: Joi.string().uuid().allow(null, "").optional(),
    course_uuid: Joi.string().uuid().allow(null, "").optional(),
    class_uuid: Joi.string().uuid().allow(null, "").optional(),
    class_section_uuid: Joi.alternatives().try(Joi.string().uuid(), Joi.array().items(Joi.string().uuid())).optional(),
    accademic_year_uuid: Joi.string().uuid().allow(null, "").optional(),
    assessment_type_uuid: Joi.string().uuid().required(),
    total_marks: Joi.number().integer().min(1).required(),
    duration_in_minutes: Joi.number().integer().min(1).required(),
    passing_marks: Joi.number().integer().min(0).required(),
    duration_minutes: Joi.number().integer().min(1).optional(),
    start_date_time: Joi.date().allow(null, "").optional(),
    end_date_time: Joi.date().greater(Joi.ref("start_date_time")).allow(null, "").optional(),
    questions: Joi.array().items(questionSchema).min(1).required(),
    user_uuid: Joi.string().uuid().allow(null, "").optional(),
});
export const updateAssessmentSchema = createAssessmentSchema;

export const studentAssessmentAnswerSubmitSchema = Joi.object({
    assessment_uuid: Joi.string()
        .guid({ version: ["uuidv4"] })
        .required()
        .messages({
            "any.required": "Assessment UUID is required",
            "string.guid": "Assessment UUID must be a valid UUID",
        }),
    assessment_question_uuid: Joi.string()
        .guid({ version: ["uuidv4"] })
        .required()
        .messages({
            "any.required": "Assessment Question UUID is required",
            "string.guid": "Assessment Question UUID must be a valid UUID",
        }),
    selected_option_ids: Joi.array()
        .items(
            Joi.string()
                .guid({ version: ["uuidv4"] })
                .messages({
                    "string.guid": "Each selected option ID must be a valid UUID",
                })
        )
        .optional(),
    answer_text: Joi.string().allow(null, "").optional(),
});
