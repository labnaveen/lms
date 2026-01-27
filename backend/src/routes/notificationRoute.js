import Auth from "../middlewares/Auth.js";
import { checkPermission } from "../middlewares/CheckPermission.js";
import { PERMISSIONS } from "../constants/Constants.js";
import { Router } from "express";
import {
    createNotificationType,
    deleteNotificationType,
    listNotificationTypes,
    getNotificationTypeDetails,
    updateNotificationType,
    createAndSendNotification,
    createNotificationTargetType,
    updateNotificationTargetType,
    deleteNotificationTargetType,
    listNotificationTargetTypes,
    getNotificationTargetTypeDetails,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    listUserNotifications,
    listCreatedNotificationsByUser,
} from "../controllers/notificationController.js";
import { validateBody } from "../middlewares/ValidateRequest.js";
import {
    createNotificationTypeSchema,
    sendNotificationSchema,
    updateNotificationTypeSchema,
    createNotificationTargetTypeSchema,
    updateNotificationTargetTypeSchema,
} from "../schemas/notificationJoiSchema.js";

const notificationsRouter = Router();

// Create Notification Type
notificationsRouter.post("/create-notification-type", Auth.authenticate(), checkPermission(PERMISSIONS.CREATE_NOTIFICATION), validateBody(createNotificationTypeSchema), createNotificationType);

// Update Notification Type
notificationsRouter.put(
    "/update-notification-type/:notification_type_uuid",
    Auth.authenticate(),
    checkPermission(PERMISSIONS.UPDATE_NOTIFICATION),
    validateBody(updateNotificationTypeSchema),
    updateNotificationType
);

// Delete (soft) Notification Type
notificationsRouter.delete("/delete-notification-type/:notification_type_uuid", Auth.authenticate(), checkPermission(PERMISSIONS.DELETE_NOTIFICATION), deleteNotificationType);

// List Notification Types
notificationsRouter.get("/get-notification-type-list", Auth.authenticate(), checkPermission(PERMISSIONS.READ_NOTIFICATION), listNotificationTypes);
notificationsRouter.get("/fetch-notification-type-details/:notification_type_uuid", Auth.authenticate(), checkPermission(PERMISSIONS.READ_NOTIFICATION), getNotificationTypeDetails);

notificationsRouter.post("/send-notification", Auth.authenticate(), checkPermission(PERMISSIONS.CREATE_NOTIFICATION), validateBody(sendNotificationSchema), createAndSendNotification);

// Create Notification Target Type
notificationsRouter.post(
    "/create-notification-target-type",
    Auth.authenticate(),
    checkPermission(PERMISSIONS.CREATE_NOTIFICATION),
    validateBody(createNotificationTargetTypeSchema),
    createNotificationTargetType
);

// Update Notification Target Type
notificationsRouter.put(
    "/update-notification-target-type/:notification_target_type_uuid",
    Auth.authenticate(),
    checkPermission(PERMISSIONS.UPDATE_NOTIFICATION),
    validateBody(updateNotificationTargetTypeSchema),
    updateNotificationTargetType
);

// Delete (soft) Notification Target Type
notificationsRouter.delete("/delete-notification-target-type/:notification_target_type_uuid", Auth.authenticate(), checkPermission(PERMISSIONS.DELETE_NOTIFICATION), deleteNotificationTargetType);

// List Notification Target Types
notificationsRouter.get("/get-notification-target-type-list", Auth.authenticate(), checkPermission(PERMISSIONS.READ_NOTIFICATION), listNotificationTargetTypes);

// Fetch Notification Target Type Details
notificationsRouter.get(
    "/fetch-notification-target-type-details/:notification_target_type_uuid",
    Auth.authenticate(),
    checkPermission(PERMISSIONS.READ_NOTIFICATION),
    getNotificationTargetTypeDetails
);

// Mark a single notification as read
notificationsRouter.patch("/mark-notification-as-read/:notification_uuid", Auth.authenticate(), markNotificationAsRead);

// Mark all notifications as read
notificationsRouter.patch("/mark-all-notifications-as-read", Auth.authenticate(), markAllNotificationsAsRead);

// List notifications for the logged-in user (with pagination and search)
notificationsRouter.get("/user-notifications-list", Auth.authenticate(), listUserNotifications);

// List notifications created by the logged-in user (with pagination and search)
notificationsRouter.get("/created-notifications-list", Auth.authenticate(), listCreatedNotificationsByUser);

export default notificationsRouter;
