import ResponseHelper from "../helpers/ResponseHelper.js";
import Permission from "../models/Permission";
import Users from "../models/UserModal";
import UserPermission from "../models/userPermissionModel";

export const userPermissionsList = async (req, res) => {
  try {
    const permissions = await UserPermission.findAll({
      include: [
        {
          model: Users,
          attributes: ["id", "name", "email"],
          // as: "user",
        },
        {
          model: Permission,
          attributes: ["id", "name", "description"],
          // as: "permission",
        },
      ],
    });

    return ResponseHelper.OK(
      res,
      "User permissions fetched successfully",
      permissions
    );
  } catch (error) {
    return ResponseHelper.ISError(
      res,
      "Failed to fetch user permissions",
      null,
      error
    );
  }
};

   