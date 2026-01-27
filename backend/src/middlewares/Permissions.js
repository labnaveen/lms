import ResponseHelper from '../helpers/ResponseHelper.js';
import { USER_ROLE } from '../constants/Constants.js';

class Permissions {
    /**
     * Middleware: Only allow Super Admins
     */
    checkAdminPermission() {
        return async (req, res, next) => {
            try {
                const { roleId } = req.credentials || {};

                if (!roleId) {
                    return ResponseHelper.UnAuthorized(
                        res,
                        "Missing role credentials!",
                        "Admin permission check middleware."
                    );
                }

                if (roleId !== USER_ROLE.SUPERADMIN) {
                    return ResponseHelper.UnAuthorized(
                        res,
                        "Unauthorized!",
                        "Admin permission check middleware."
                    );
                }

                return next();
            } catch (error) {
                return ResponseHelper.ISError(
                    res,
                    error.message,
                    "Permission check middleware."
                );
            }
        };
    }

    /**
     * Generic role-based middleware
     */
    checkRolePermission(allowedRoles = []) {
        return async (req, res, next) => {
            try {
                const { roleId } = req.credentials || {};

                if (!roleId || !allowedRoles.includes(roleId)) {
                    return ResponseHelper.UnAuthorized(
                        res,
                        "Unauthorized!",
                        "Role permission check middleware."
                    );
                }

                return next();
            } catch (error) {
                return ResponseHelper.ISError(
                    res,
                    error.message,
                    "Permission check middleware."
                );
            }
        };
    }
}

export default new Permissions();
