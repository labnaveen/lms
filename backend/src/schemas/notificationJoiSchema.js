import Joi from "joi";

// Schema for creating a notification type
export const createNotificationTypeSchema = Joi.object({
    notification_type: Joi.string().required(),
    notification_description: Joi.string().allow(null, "").max(1000),
});

// Schema for updating a notification type
export const updateNotificationTypeSchema = Joi.object({
    notification_type: Joi.string().required(),
    notification_description: Joi.string().allow(null, "").max(1000),
});

// Schema for sending a notification (using UUIDs in request body)
export const sendNotificationSchema = Joi.object({
    notification_title: Joi.string().max(500).required(),
    notification_message: Joi.string().required(),
    class_uuid: Joi.string().uuid().optional(),
    class_section_uuid: Joi.string().uuid().optional(),
    notification_target_type_uuid: Joi.string().uuid().required(),
    teacher_uuid: Joi.string().uuid().optional(),
    student_uuid: Joi.string().uuid().optional(),
});
export const createNotificationTargetTypeSchema = Joi.object({
    target_type: Joi.string().max(100).required(),
    target_description: Joi.string().allow(null, "").max(1000),
});

// Schema for updating a notification target type
export const updateNotificationTargetTypeSchema = Joi.object({
    target_type: Joi.string().max(100).required(),
    target_description: Joi.string().allow(null, "").max(1000),
});
