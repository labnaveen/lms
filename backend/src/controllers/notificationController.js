import { NotificationType } from "../models/NotificationTypeModel.js";
import ResponseHelper from "../helpers/ResponseHelper.js";
import { buildSearchQuery } from "../utils/searchHelper.js";
import sanitizeHtml from "sanitize-html";
import {
    getAllUsersBySchool,
    getAllTeachersBySchool,
    getAllStudentsBySchool,
    getTeachersByClass,
    getTeachersByClassSection,
    getStudentsByClass,
    getStudentsByClassSection,
    getAllStudentsByTeacher,
    getStudentsByTeacherAndClass,
    getStudentsByTeacherClassSection,
    getIndividualTeacher,
} from "../utils/notificationRecipientHelper.js";
import CommonHelper from "../helpers/CommonHelper.js";
import NotificationUserMap from "../models/NotificationUserMapModel.js";
import sequelize from "../config/db.config.js";
import Class from "../models/ClassModel.js";
import ClassSection from "../models/ClassSectionModel.js";
import User from "../models/UserModal.js";
import Schools from "../models/SchoolsModal.js";
import Notification from "../models/NotificationModel.js";
import NotificationTargetType from "../models/NotificationTargetTypeModel.js";
import { NOTIFICATION_TARGET_TYPES, USER_ROLE } from "../constants/Constants.js";
import Teacher from "../models/TeacherModel.js";
import Students from "../models/StudentsModel.js";

///---------------------NOTIFICATION TYPE APIS START------------------///

// Create Notification Type
export const createNotificationType = async (req, res) => {
    try {
        // Sanitize input
        const notification_type = sanitizeHtml?.(req?.body?.notification_type || "");
        const notification_description = sanitizeHtml?.(req?.body?.notification_description || "");

        if (!notification_type) {
            return ResponseHelper?.BadRequest?.(res, "notification_type is required");
        }
        const exists = await NotificationType?.findOne?.({ where: { notification_type, deleted_at: null } });
        if (exists) {
            return ResponseHelper?.BadRequest?.(res, "Notification type already exists");
        }
        await NotificationType?.create?.({ notification_type, notification_description });
        return ResponseHelper?.Created?.(res, true, "Notification type created successfully", null, null, "Create Notification Type API");
    } catch (err) {
        return ResponseHelper?.ISError?.(res, err?.message || "Failed to create notification type", "Create Notification Type API");
    }
};

// Update Notification Type
export const updateNotificationType = async (req, res) => {
    try {
        const notification_type_uuid = sanitizeHtml?.(req?.params?.notification_type_uuid || "");
        const notification_type = sanitizeHtml?.(req?.body?.notification_type || "");
        const notification_description = sanitizeHtml?.(req?.body?.notification_description || "");

        const type = await NotificationType?.findOne?.({ where: { notification_type_uuid, deleted_at: null } });
        if (!type) {
            return ResponseHelper?.OK?.(res, false, "Notification type not found", null, null, "Update Notification Type API");
        }
        await type?.update?.({ notification_type, notification_description });
        return ResponseHelper?.OK?.(res, true, "Notification type updated successfully", null, null, "Update Notification Type API");
    } catch (err) {
        return ResponseHelper?.ISError?.(res, err?.message || "Failed to update notification type", "Update Notification Type API");
    }
};

// Soft Delete Notification Type
export const deleteNotificationType = async (req, res) => {
    try {
        // Sanitize params
        const notification_type_uuid = sanitizeHtml?.(req?.params?.notification_type_uuid || "");
        const type = await NotificationType?.findOne?.({ where: { notification_type_uuid, deleted_at: null } });
        if (!type) {
            return ResponseHelper?.OK?.(res, false, "Notification type not found", null, null, "Delete Notification Type API");
        }
        await type?.update?.({ deleted_at: new Date() });
        return ResponseHelper?.OK?.(res, true, "Notification type deleted successfully", null, null, "Delete Notification Type API");
    } catch (err) {
        return ResponseHelper?.ISError?.(res, err?.message || "Failed to delete notification type", "Delete Notification Type API");
    }
};

// List Notification Types with Pagination and Search
export const listNotificationTypes = async (req, res) => {
    try {
        let { page = 1, limit = 10, search = "" } = req?.query || {};
        page = parseInt(sanitizeHtml?.(page?.toString?.()) || "1");
        limit = parseInt(sanitizeHtml?.(limit?.toString?.()) || "10");
        search = sanitizeHtml?.(search);

        const searchCondition = buildSearchQuery?.(search, ["notification_type", "notification_type_uuid", "notification_description"]);

        let data, count, meta;

        const attributes = { exclude: ["id", "created_at", "updated_at", "deleted_at"] };

        if (search) {
            // Ignore pagination, return all matching records if search is present
            data = await NotificationType?.findAll?.({
                where: {
                    deleted_at: null,
                    ...searchCondition,
                },
                order: [["created_at", "DESC"]],
                attributes,
            });
            count = data?.length;
            meta = {
                totalCount: count,
                pageCount: 1,
                currentPage: 1,
                perPage: count,
                hasNextPage: false,
                hasPrevPage: false,
            };
        } else {
            // Normal pagination if no search
            const offset = (page - 1) * limit;
            const { rows, count: total } = (await NotificationType?.findAndCountAll?.({
                where: {
                    deleted_at: null,
                },
                order: [["created_at", "DESC"]],
                limit,
                offset,
                attributes,
            })) || { rows: [], count: 0 };
            data = rows;
            count = total;
            meta = {
                totalCount: count,
                pageCount: Math.ceil(count / limit),
                currentPage: page,
                perPage: limit,
                hasNextPage: page < Math.ceil(count / limit),
                hasPrevPage: page > 1,
            };
        }

        if (!data || data?.length === 0) {
            return ResponseHelper?.OK?.(res, false, "No notification types found", null, null, "List Notification Types API");
        }

        return ResponseHelper?.OK?.(res, true, "Notification types retrieved successfully", data, meta, "List Notification Types API");
    } catch (err) {
        return ResponseHelper?.ISError?.(res, err?.message || "Failed to retrieve notification types", "List Notification Types API");
    }
};
// Fetch Notification Type Details by UUID
export const getNotificationTypeDetails = async (req, res) => {
    try {
        // Sanitize param
        const notification_type_uuid = sanitizeHtml?.(req?.params?.notification_type_uuid || "");

        // Exclude unwanted fields
        const attributes = { exclude: ["id", "created_at", "updated_at", "deleted_at"] };

        const notificationType = await NotificationType?.findOne?.({
            where: {
                notification_type_uuid,
                deleted_at: null,
            },
            attributes,
        });

        if (!notificationType) {
            return ResponseHelper?.OK?.(res, false, "Notification type not found", null, null, "Get Notification Type Details API");
        }

        return ResponseHelper?.OK?.(res, true, "Notification type details fetched successfully", notificationType, null, "Get Notification Type Details API");
    } catch (err) {
        return ResponseHelper?.ISError?.(res, err?.message || "Failed to fetch notification type details", "Get Notification Type Details API");
    }
};
///---------------------NOTIFICATION TYPE APIS END------------------///

///---------------------NOTIFICATION TARGET TYPE APIS START------------------///

// Create Notification Target Type
export const createNotificationTargetType = async (req, res) => {
    try {
        const target_type = sanitizeHtml?.(req?.body?.target_type || "");
        const target_description = sanitizeHtml?.(req?.body?.target_description || "");

        if (!target_type) {
            return ResponseHelper?.BadRequest?.(res, "target_type is required");
        }
        const exists = await NotificationTargetType?.findOne?.({ where: { target_type, deleted_at: null } });
        if (exists) {
            return ResponseHelper?.BadRequest?.(res, "Notification target type already exists");
        }
        await NotificationTargetType?.create?.({ target_type, target_description });
        return ResponseHelper?.Created?.(res, true, "Notification target type created successfully", null, null, "Create Notification Target Type API");
    } catch (err) {
        return ResponseHelper?.ISError?.(res, err?.message || "Failed to create notification target type", "Create Notification Target Type API");
    }
};

// Update Notification Target Type
export const updateNotificationTargetType = async (req, res) => {
    try {
        const notification_target_type_uuid = sanitizeHtml?.(req?.params?.notification_target_type_uuid || "");
        const target_type = sanitizeHtml?.(req?.body?.target_type || "");
        const target_description = sanitizeHtml?.(req?.body?.target_description || "");

        const type = await NotificationTargetType?.findOne?.({ where: { notification_target_type_uuid, deleted_at: null } });
        if (!type) {
            return ResponseHelper?.OK?.(res, false, "Notification target type not found", null, null, "Update Notification Target Type API");
        }
        await type?.update?.({ target_type, target_description });
        return ResponseHelper?.OK?.(res, true, "Notification target type updated successfully", null, null, "Update Notification Target Type API");
    } catch (err) {
        return ResponseHelper?.ISError?.(res, err?.message || "Failed to update notification target type", "Update Notification Target Type API");
    }
};

// Soft Delete Notification Target Type
export const deleteNotificationTargetType = async (req, res) => {
    try {
        const notification_target_type_uuid = sanitizeHtml?.(req?.params?.notification_target_type_uuid || "");
        const type = await NotificationTargetType?.findOne?.({ where: { notification_target_type_uuid, deleted_at: null } });
        if (!type) {
            return ResponseHelper?.OK?.(res, false, "Notification target type not found", null, null, "Delete Notification Target Type API");
        }
        await type?.update?.({ deleted_at: new Date() });
        return ResponseHelper?.OK?.(res, true, "Notification target type deleted successfully", null, null, "Delete Notification Target Type API");
    } catch (err) {
        return ResponseHelper?.ISError?.(res, err?.message || "Failed to delete notification target type", "Delete Notification Target Type API");
    }
};

// List Notification Target Types with Pagination and Search
export const listNotificationTargetTypes = async (req, res) => {
    try {
        let { page = 1, limit = 10, search = "" } = req?.query || {};
        page = parseInt(sanitizeHtml?.(page?.toString?.()) || "1");
        limit = parseInt(sanitizeHtml?.(limit?.toString?.()) || "10");
        search = sanitizeHtml?.(search);

        const searchCondition = buildSearchQuery?.(search, ["target_type", "notification_target_type_uuid", "target_description"]);

        let data, count, meta;

        const attributes = { exclude: ["id", "created_at", "updated_at", "deleted_at"] };

        if (search) {
            data = await NotificationTargetType?.findAll?.({
                where: {
                    deleted_at: null,
                    ...searchCondition,
                },
                order: [["created_at", "DESC"]],
                attributes,
            });
            count = data?.length;
            meta = {
                totalCount: count,
                pageCount: 1,
                currentPage: 1,
                perPage: count,
                hasNextPage: false,
                hasPrevPage: false,
            };
        } else {
            const offset = (page - 1) * limit;
            const { rows, count: total } = (await NotificationTargetType?.findAndCountAll?.({
                where: {
                    deleted_at: null,
                },
                order: [["created_at", "DESC"]],
                limit,
                offset,
                attributes,
            })) || { rows: [], count: 0 };
            data = rows;
            count = total;
            meta = {
                totalCount: count,
                pageCount: Math.ceil(count / limit),
                currentPage: page,
                perPage: limit,
                hasNextPage: page < Math.ceil(count / limit),
                hasPrevPage: page > 1,
            };
        }

        if (!data || data?.length === 0) {
            return ResponseHelper?.OK?.(res, false, "No notification target types found", null, null, "List Notification Target Types API");
        }

        return ResponseHelper?.OK?.(res, true, "Notification target types retrieved successfully", data, meta, "List Notification Target Types API");
    } catch (err) {
        return ResponseHelper?.ISError?.(res, err?.message || "Failed to retrieve notification target types", "List Notification Target Types API");
    }
};

// Fetch Notification Target Type Details by UUID
export const getNotificationTargetTypeDetails = async (req, res) => {
    try {
        const notification_target_type_uuid = sanitizeHtml?.(req?.params?.notification_target_type_uuid || "");
        const attributes = { exclude: ["id", "created_at", "updated_at", "deleted_at"] };

        const targetType = await NotificationTargetType?.findOne?.({
            where: {
                notification_target_type_uuid,
                deleted_at: null,
            },
            attributes,
        });

        if (!targetType) {
            return ResponseHelper?.OK?.(res, false, "Notification target type not found", null, null, "Get Notification Target Type Details API");
        }

        return ResponseHelper?.OK?.(res, true, "Notification target type details fetched successfully", targetType, null, "Get Notification Target Type Details API");
    } catch (err) {
        return ResponseHelper?.ISError?.(res, err?.message || "Failed to fetch notification target type details", "Get Notification Target Type Details API");
    }
};
///---------------------NOTIFICATION TARGET TYPE APIS END------------------///

///---------------------NOTIFICATIONS API START------------------///

export const createAndSendNotification = async (req, res) => {
    const t = await sequelize?.transaction?.();
    try {
        const userRole = req?.credentials?.roleId;
        const userId = req?.credentials?.id;
        const school_uuid = req?.credentials?.schoolUuid || req?.headers["school-uuid"];

        let { notification_title, notification_message, class_uuid, class_section_uuid, teacher_uuid, student_uuid, notification_target_type_uuid } = req?.body || {};

        let school_id = school_uuid ? await CommonHelper?.getIdFromUuid?.(Schools, school_uuid, res, "Create and Send Notification API", "school_uuid") : null;
        let class_id = class_uuid ? await CommonHelper?.getIdFromUuid?.(Class, class_uuid, res, "Create and Send Notification API", "class_uuid") : null;
        let class_section_id = class_section_uuid ? await CommonHelper?.getIdFromUuid?.(ClassSection, class_section_uuid, res, "Create and Send Notification API", "class_section_uuid") : null;
        let teacher_id = teacher_uuid ? await CommonHelper?.getIdFromUuid?.(Teacher, teacher_uuid, res, "Create and Send Notification API", "teacher_uuid") : null;
        let student_id = student_uuid ? await CommonHelper?.getIdFromUuid?.(Students, student_uuid, res, "Create and Send Notification API", "student_uuid") : null;

        let notification_target_type_id = notification_target_type_uuid
            ? await CommonHelper?.getIdFromUuid?.(NotificationTargetType, notification_target_type_uuid, res, "Create and Send Notification API", "notification_target_type_uuid")
            : null;
        // Fetch target_type using notification_target_type_id
        let targetTypeObj = null;
        if (notification_target_type_id) {
            targetTypeObj = await NotificationTargetType.findOne({
                where: { id: notification_target_type_id, deleted_at: null },
                attributes: ["target_type"],
            });
        }
        const target_type = targetTypeObj?.target_type;

        const sanitizedTitle = sanitizeHtml?.(notification_title || "");
        const sanitizedMessage = sanitizeHtml?.(notification_message || "");

        let recipientUserIds = [];

        // determine recipients (your existing logic)
        if (userRole === USER_ROLE.SUPERADMIN) {
            if (!school_id) {
                await t?.rollback?.();
                return ResponseHelper?.BadRequest?.(res, "school_uuid is required for SuperAdmin");
            }
            recipientUserIds = await getAllUsersBySchool?.(school_id);
        } else if (userRole ===  USER_ROLE.ADMIN) {
            switch (target_type) {
                case NOTIFICATION_TARGET_TYPES.WHOLE_SCHOOL:
                    recipientUserIds = await getAllUsersBySchool?.(school_id);
                    break;
                case NOTIFICATION_TARGET_TYPES.ALL_TEACHERS:
                    recipientUserIds = await getAllTeachersBySchool?.(school_id);
                    break;
                case NOTIFICATION_TARGET_TYPES.TEACHERS_BY_CLASS:
                    if (!class_id) {
                        await t?.rollback?.();
                        return ResponseHelper?.BadRequest?.(res, "class_uuid is required");
                    }
                    recipientUserIds = await getTeachersByClass?.(class_id);
                    break;
                case NOTIFICATION_TARGET_TYPES.TEACHERS_BY_CLASS_SECTION:
                    if (!class_id || !class_section_id) {
                        await t?.rollback?.();
                        return ResponseHelper?.BadRequest?.(res, "class_uuid and class_section_uuid are required");
                    }
                    recipientUserIds = await getTeachersByClassSection?.(class_id, class_section_id);
                    break;
                case NOTIFICATION_TARGET_TYPES.ALL_STUDENTS:
                    recipientUserIds = await getAllStudentsBySchool?.(school_id);
                    break;
                case NOTIFICATION_TARGET_TYPES.STUDENTS_BY_CLASS:
                    if (!class_id) {
                        await t?.rollback?.();
                        return ResponseHelper?.BadRequest?.(res, "class_uuid is required");
                    }
                    recipientUserIds = await getStudentsByClass?.(class_id);
                    break;
                case NOTIFICATION_TARGET_TYPES.STUDENTS_BY_CLASS_SECTION:
                    if (!class_id || !class_section_id) {
                        await t?.rollback?.();
                        return ResponseHelper?.BadRequest?.(res, "class_uuid and class_section_uuid are required");
                    }
                    recipientUserIds = await getStudentsByClassSection?.(class_id, class_section_id);
                    break;
                case NOTIFICATION_TARGET_TYPES.TEACHER:
                    if (!teacher_id) {
                        await t?.rollback?.();
                        return ResponseHelper?.BadRequest?.(res, "teacher_uuid is required");
                    }
                    recipientUserIds = await getIndividualTeacher(teacher_id);
                    break;
                default:
                    await t?.rollback?.();
                    return ResponseHelper?.BadRequest?.(res, "Invalid target_type for Admin");
            }
        } else if (userRole ===  USER_ROLE.TEACHER) {
            switch (target_type) {
                case NOTIFICATION_TARGET_TYPES.ALL_STUDENTS:
                    recipientUserIds = await getAllStudentsByTeacher?.(userId);
                    break;
                case NOTIFICATION_TARGET_TYPES.STUDENTS_BY_CLASS:
                    if (!class_id) {
                        await t?.rollback?.();
                        return ResponseHelper?.BadRequest?.(res, "class_uuid is required");
                    }
                    recipientUserIds = await getStudentsByTeacherAndClass?.(userId, class_id);
                    break;
                case NOTIFICATION_TARGET_TYPES.STUDENTS_BY_CLASS_SECTION:
                    if (!class_id || !class_section_id) {
                        await t?.rollback?.();
                        return ResponseHelper?.BadRequest?.(res, "class_uuid and class_section_uuid are required");
                    }
                    recipientUserIds = await getStudentsByTeacherClassSection?.(userId, class_id, class_section_id);
                    break;
                case NOTIFICATION_TARGET_TYPES.STUDENT:
                    if (!student_id) {
                        await t?.rollback?.();
                        return ResponseHelper?.BadRequest?.(res, "student_uuid is required");
                    }
                    recipientUserIds = [student_id];
                    break;
                default:
                    await t?.rollback?.();
                    return ResponseHelper?.BadRequest?.(res, "Invalid target_type for Teacher");
            }
        } else {
            await t?.rollback?.();
            return ResponseHelper?.BadRequest?.(res, "Invalid user role");
        }

        // --- normalize recipientUserIds to an array of ids ---
        let recipientIdsArray = [];

        if (recipientUserIds == null) {
            recipientIdsArray = [];
        } else if (Array.isArray(recipientUserIds)) {
            if (recipientUserIds.length > 0 && typeof recipientUserIds[0] === "object") {
                // array of objects -> try to extract id fields
                recipientIdsArray = recipientUserIds.map((r) => r.id ?? r.user_id ?? r.userId ?? r);
            } else {
                recipientIdsArray = recipientUserIds;
            }
        } else if (typeof recipientUserIds === "object") {
            recipientIdsArray = [recipientUserIds.id ?? recipientUserIds.user_id ?? recipientUserIds];
        } else {
            recipientIdsArray = [recipientUserIds];
        }

        // remove falsy and duplicates
        recipientIdsArray = Array.from(new Set(recipientIdsArray.filter(Boolean)));

        if (!Array.isArray(recipientIdsArray) || recipientIdsArray.length === 0) {
            await t?.rollback?.();
            return ResponseHelper?.BadRequest?.(res, "No recipients found for the notification");
        }

        // Fetch emails of all recipient users
        const recipientUsers = await User.findAll({
            where: { id: recipientIdsArray },
            attributes: ["email"],
        });

        const recipientEmails = recipientUsers.map((user) => user.email).filter(Boolean);

        if (recipientEmails.length > 0) {
            try {
                await CommonHelper.sendMultipleEmails({
                    to: recipientEmails,
                    subject: sanitizedTitle,
                    text: sanitizedMessage,
                    html: `<p>${sanitizedMessage}</p>`,
                });
            } catch (emailErr) {
                console.error("SendGrid email error:", emailErr);
            }
        }

        const notification = await Notification?.create?.(
            {
                notification_type: null,
                notification_title: sanitizedTitle,
                notification_message: sanitizedMessage,
                school_id: school_id,
                class_id: class_id || null,
                class_section_id: class_section_id || null,
                created_by: userId,
                notification_target_type_id: notification_target_type_id || null,
            },
            { transaction: t }
        );

        const notificationUserMapData = recipientIdsArray.map((id) => ({
            notification_id: notification?.id,
            user_id: id,
            is_read: false,
            created_at: new Date(),
            updated_at: new Date(),
        }));

        await NotificationUserMap?.bulkCreate?.(notificationUserMapData, { transaction: t });

        await t?.commit?.();
        return ResponseHelper?.Created?.(res, true, "Notification sent successfully", null, null, "Create and Send Notification API");
    } catch (err) {
        await t?.rollback?.();
        return ResponseHelper?.ISError?.(res, err?.message || "Failed to send notification", "Create and Send Notification API");
    }
};

// Mark a single notification as read
export const markNotificationAsRead = async (req, res) => {
    try {
        const userId = req?.credentials?.id;
        const notification_uuid = req?.params?.notification_uuid;

        if (!notification_uuid) {
            return ResponseHelper?.BadRequest?.(res, "notification_uuid is required");
        }

        // Use CommonHelper.getIdFromUuid to get notification_id
        const notification_id = await CommonHelper.getIdFromUuid(Notification, notification_uuid, res, "Mark Notification As Read API", "notifications_uuid");

        if (!notification_id) {
            return ResponseHelper?.BadRequest?.(res, "Notification not found");
        }

        const notificationUserMap = await NotificationUserMap.findOne({
            where: { notification_id, user_id: userId },
        });

        if (!notificationUserMap) {
            return ResponseHelper?.BadRequest?.(res, "Notification not found for this user");
        }

        await notificationUserMap.update({ is_read: true });

        return ResponseHelper?.OK?.(res, true, "Notification marked as read", null, null, "Mark Notification As Read API");
    } catch (err) {
        return ResponseHelper?.ISError?.(res, err?.message || "Failed to mark notification as read", "Mark Notification As Read API");
    }
};
// Mark all notifications as read for the user
export const markAllNotificationsAsRead = async (req, res) => {
    try {
        const userId = req?.credentials?.id;

        await NotificationUserMap.update({ is_read: true }, { where: { user_id: userId, is_read: false } });

        return ResponseHelper?.OK?.(res, true, "All notifications marked as read", null, null, "Mark All Notifications As Read API");
    } catch (err) {
        return ResponseHelper?.ISError?.(res, err?.message || "Failed to mark all notifications as read", "Mark All Notifications As Read API");
    }
};
// List notifications for the logged-in user
export const listUserNotifications = async (req, res) => {
    try {
        const userId = req?.credentials?.id;
        let { page = 1, limit = 10, search = "" } = req?.query || {};
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 10;
        search = (search || "").trim();

        // Step 1: Get all notification_ids for this user from NotificationUserMap
        const notificationUserMaps = await NotificationUserMap.findAll({
            where: { user_id: userId, is_read: false },
            attributes: ["notification_id", "is_read", "id"],
        });

        const notificationIdMap = {};
        notificationUserMaps.forEach((map) => {
            notificationIdMap[map.notification_id] = {
                is_read: map.is_read,
                notification_user_map_id: map.id,
            };
        });

        const notificationIds = Object.keys(notificationIdMap);

        if (notificationIds.length === 0) {
            return ResponseHelper?.OK?.(
                res,
                true,
                "No notifications found",
                [],
                {
                    totalCount: 0,
                    pageCount: 0,
                    currentPage: page,
                    perPage: limit,
                    hasNextPage: false,
                    hasPrevPage: false,
                },
                "List User Notifications API"
            );
        }

        // Step 2: Build search condition
        const notificationWhere = {
            id: notificationIds,
            ...buildSearchQuery(search, ["notifications_uuid", "notification_title", "notification_message"]),
        };

        let rows, count, meta;

        if (search) {
            // If search is present, ignore pagination and return all matching records
            rows = await Notification.findAll({
                where: notificationWhere,
                order: [["created_at", "DESC"]],
            });
            count = rows.length;
            meta = {
                totalCount: count,
                pageCount: 1,
                currentPage: 1,
                perPage: count,
                hasNextPage: false,
                hasPrevPage: false,
            };
        } else {
            // Normal pagination if no search
            const offset = (page - 1) * limit;
            const result = await Notification.findAndCountAll({
                where: notificationWhere,
                order: [["created_at", "DESC"]],
                limit,
                offset,
            });
            rows = result.rows;
            count = result.count;
            meta = {
                totalCount: count,
                pageCount: Math.ceil(count / limit),
                currentPage: page,
                perPage: limit,
                hasNextPage: page < Math.ceil(count / limit),
                hasPrevPage: page > 1,
            };
        }

        // Attach is_read and notification_user_map_id to each notification
        const notifications = rows.map((notification) => ({
            ...notification.toJSON(),
            is_read: notificationIdMap[notification.id]?.is_read,
            notification_user_map_id: notificationIdMap[notification.id]?.notification_user_map_id,
        }));

        return ResponseHelper?.OK?.(res, true, "Notifications fetched successfully", notifications, meta, "List User Notifications API");
    } catch (err) {
        return ResponseHelper?.ISError?.(res, err?.message || "Failed to fetch notifications", "List User Notifications API");
    }
};

// List notifications created by the logged-in user
export const listCreatedNotificationsByUser = async (req, res) => {
    try {
        const userId = req?.credentials?.id;
        let { page = 1, limit = 10, search = "" } = req?.query || {};
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 10;
        search = (search || "").trim();

        const notificationWhere = {
            created_by: userId,
            ...buildSearchQuery(search, ["notification_title", "notification_message"]),
        };

        let rows, count, meta;

        if (search) {
            rows = await Notification.findAll({
                where: notificationWhere,
                order: [["created_at", "DESC"]],
            });
            count = rows.length;
            meta = {
                totalCount: count,
                pageCount: 1,
                currentPage: 1,
                perPage: count,
                hasNextPage: false,
                hasPrevPage: false,
            };
        } else {
            const offset = (page - 1) * limit;
            const result = await Notification.findAndCountAll({
                where: notificationWhere,
                order: [["created_at", "DESC"]],
                attributes: ["notifications_uuid", "notification_title", "notification_message", "created_at"],

                limit,
                offset,
            });
            rows = result.rows;
            count = result.count;
            meta = {
                totalCount: count,
                pageCount: Math.ceil(count / limit),
                currentPage: page,
                perPage: limit,
                hasNextPage: page < Math.ceil(count / limit),
                hasPrevPage: page > 1,
            };
        }

        return ResponseHelper?.OK?.(res, true, "Notifications created by user fetched successfully", rows, meta, "List Created Notifications By User API");
    } catch (err) {
        return ResponseHelper?.ISError?.(res, err?.message || "Failed to fetch notifications created by user", "List Created Notifications By User API");
    }
};
///---------------------NOTIFICATIONS API END------------------///
