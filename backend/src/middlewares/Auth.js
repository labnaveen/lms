import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import UserModal from "../models/UserModal.js";
import ResponseHelper from "../helpers/ResponseHelper.js";
import UserLogin from "../models/UserLoginModel.js";

dotenv.config();

class Auth {
  /**
   * Middleware: Authenticate user via JWT access token
   */
  authenticate() {
    return async (req, res, next) => {
      try {
        let token;

        // Get token from Authorization header
        if (req.headers.authorization) {
          token = req.headers.authorization.split(" ")[1];
        }

        if (!token) {
          return ResponseHelper.Forbidden(
            res,
            "Unauthorized, access token required!",
            "Authorization middleware - missing token"
          );
        }

        // Verify token validity
        const secret = process.env.JWT_SECRET;
        const verifyUser = jwt.verify(token, secret); // throws if invalid or expired
        
        // Check if user exists
        const isExistsUser = await UserModal.findOne({
          where: { id: verifyUser.id },
        });
        if (!isExistsUser) {
          return ResponseHelper.Forbidden(
            res,
            "Unauthorized, invalid access token!",
            "Authorization middleware - user not found"
          );
        }

        // Check if refresh token exists in UserLogin table
        const isRefreshTokenValid = await UserLogin.findOne({
          where: { user_id: isExistsUser.id },
        });

        if (!isRefreshTokenValid) {
          return ResponseHelper.UnAuthorized(
            res,
            "Your session has expired, please login again!",
            "Authorization middleware - refresh token missing"
          );
        }

        // Attach user credentials to request
        req.credentials = {
          id: isExistsUser.id,
          email: isExistsUser.email,
          roleId: isExistsUser.role_id,
          schoolUuid: verifyUser?.schoolUuid || req.headers['school-uuid'] || null,
        };

        return next();
      } catch (e) {
        if (e.name === "TokenExpiredError") {
          return ResponseHelper.UnAuthorized(
            res,
            "Access token has expired. Please refresh the token.",
            "Authorization middleware - token expired"
          );
        }

        return ResponseHelper.Forbidden(
          res,
          "Unauthorized access.",
          "Authorization middleware - invalid token"
        );
      }
    };
  }
}

export default new Auth();
