import { USER_ROLE } from "../constants/Constants.js";
import ResponseHelper from "../helpers/ResponseHelper.js";
import Permission from "../models/Permission.js";
import RolePermission from "../models/RolePermission.js";
import UserPermission from "../models/userPermissionModel.js";

export const checkPermission = (permissionName) => {
  return async (req, res, next) => {
    try {
      const { roleId, id } = req.credentials || {};

      if (!roleId || !id) {
        return ResponseHelper.BadRequest(
          res,
          "Unauthorized: Missing credentials",
          "Check Permission Middleware"
        );
      }

      // 1️⃣ Find the permission
      const permission = await Permission.findOne({
        where: { name: permissionName },
      });
      if (!permission) {
        return ResponseHelper.NotFound(
          res,
          false,
          "Permission not found",
          "Check Permission Middleware"
        );
      }

      // 2️⃣ Check user-specific permission first
      const userPermission = await UserPermission.findOne({
        where: {
          user_id: id,
          permission_id: permission.id,
        },
      });

      if (userPermission) {
        if (userPermission.is_allowed) {
          return next(); // ✅ explicitly allowed
        } else {
          return ResponseHelper.BadRequest(
            res,
            "Access denied by user-level restriction",
            "Check Permission Middleware"
          );
        }
      }

      // 3️⃣ Fallback to role permission
      const rolePermission = await RolePermission.findOne({
        where: {
          role_id: roleId,
          permission_id: permission.id,
        },
      });

      if (rolePermission) {
        return next(); // ✅ allowed by role
      }

      // 4️⃣ Neither role nor user allowed
      return ResponseHelper.BadRequest(
        res,
        "You aren't authorized",
        "Check Permission Middleware"
      );
    } catch (error) {
      console.error("Permission check error:", error);
      return ResponseHelper.ISError(res, error, "Check Permission Middleware");
    }
  };
};
