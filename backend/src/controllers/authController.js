import bcrypt from "bcrypt";
import sanitizeHtml from "sanitize-html";
import sequelize from "../config/db.config.js";
import Schools from "../models/SchoolsModal.js";
import Users from "../models/UserModal.js";
import ResponseHelper from "../helpers/ResponseHelper.js";
import CommonHelper from "../helpers/CommonHelper.js";
import UserEmailOTPModel from "../models/OtpModel.js";
import jwt from "jsonwebtoken";
import UserLogin from "../models/UserLoginModel.js";
import RolePermission from "../models/RolePermission.js";
import UserPermission from "../models/userPermissionModel.js";
import Permission from "../models/Permission.js";
import Class from "../models/ClassModel.js";
import { USER_ROLE } from "../constants/Constants.js";
import ClassSection from "../models/ClassSectionModel.js";
import SchoolSubject from "../models/SchoolSubjectModel.js";
import Students from "../models/StudentsModel.js";

export const schoolRegister = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const profileImagePath = req.file ? req.file.path : null;
    const schoolData = await Schools.create(
      {
        name: sanitizeHtml(req.body.name),
        code: sanitizeHtml(req.body.code),
        email: sanitizeHtml(req.body.email),
        phone: sanitizeHtml(req.body.phone),
        address: sanitizeHtml(req.body.address),
        country_id: parseInt(req.body.country_id),
        state_id: parseInt(req.body.state_id),
        city_name: sanitizeHtml(req.body.city_name) || null,
        city_id: parseInt(req.body.city_id) || null,
        pin_code: sanitizeHtml(req.body.pin_code) || null,
        website: sanitizeHtml(req.body.website) || null,
        logo_url: profileImagePath || null,
      },
      { transaction: t }
    );
    // check password & confirm password
    const password = sanitizeHtml(req.body.password);
    const confirmPassword = sanitizeHtml(req.body.confirmPassword);
    if (password !== confirmPassword) {
      await t.rollback();
      return await ResponseHelper.ISError(
        res,
        "Password & confirm password do not match",
        null,
        "School Register"
      );
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // sanitize user email
    const email = sanitizeHtml(schoolData.email);

    // check if user email already exists
    const isExistsUser = await Users.findOne({
      where: { email, deleted_at: null },
      transaction: t,
    });
    if (isExistsUser) {
      await t.rollback(); // rollback school insert
      return await ResponseHelper.Conflict(
        res,
        "User email already exists.",
        null,
        "School Register"
      );
    }

    // create user
    const userData = await Users.create(
      {
        school_id: schoolData.id,
        role_id: 2, // fixed role (e.g., SCHOOL_ADMIN)
        name: schoolData.name,
        email,
        phone: schoolData.phone || null,
        password_hash: hashedPassword,
        profile_photo_url: schoolData.logo_url,
        is_active: false,
      },
      { transaction: t }
    );

    // generate OTP
    const otp = await CommonHelper.genrateOTP();
    if (otp) {
      await CommonHelper.sendOtpMail(email, otp, req.body.user_phone);

      await UserEmailOTPModel.create(
        {
          user_id: userData.id,
          otp: otp,
          expires_at: new Date(Date.now() + 5 * 60 * 1000), // 5 minutes
        },
        { transaction: t }
      );
      CommonHelper.logActivity({
        title: "New School Registered",
        description: `${schoolData?.name} was registered.`,
        created_by: userData?.id,
      });

      await t.commit();
      return await ResponseHelper.OK(
        res,
        false,
        "OTP sent to your email successfully.",
        null,
        null,
        "School Register"
      );
    }
    await t.commit();
    return await ResponseHelper.Created(
      res,
      true,
      "School and User Users created successfully",
      { school: schoolData, user: userData },
      null,
      "School Register"
    );
  } catch (error) {
    await t.rollback();
    console.error("Error registering school:", error);
    return await ResponseHelper.ISError(res, error.message, "School Register");
  }
};

export const otpVerify = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    let { email, otp } = req.body;
    email = sanitizeHtml(email);
    otp = sanitizeHtml(otp);

    const user = await Users.findOne({
      where: { email, deleted_at: null },
      transaction,
    });
    if (!user) {
      await transaction.rollback();
      return ResponseHelper.OK(
        res,
        false,
        "Invalid email ID!",
        null,
        null,
        "Verify OTP API."
      );
    }

    const otpRecord = await UserEmailOTPModel.findOne({
      where: { user_id: user.id, otp },
      transaction,
    });

    if (!otpRecord) {
      await transaction.rollback();
      return ResponseHelper.OK(
        res,
        false,
        "Invalid OTP!",
        null,
        null,
        "Verify OTP API."
      );
    }

    // ✅ Compare directly using stored expires_at in UTC
    const nowUTC = new Date();
    const expiresAtUTC = new Date(otpRecord.expires_at);

    if (nowUTC > expiresAtUTC) {
      await transaction.rollback();
      return ResponseHelper.Conflict(
        res,
        "OTP expired!",
        null,
        "Verify OTP API."
      );
    }

    // ✅ Mark user as verified
    await Users.update(
      {
        is_verified: true,
        is_active: true,
      },
      { where: { id: user.id }, transaction }
    );

    const access_token = jwt.sign(
      {
        _id: user.user_hash,
        roleId: user.role_id,
        userId: user.user_id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "5m" }
    );

    await transaction.commit();

    return ResponseHelper.OK(
      res,
      true,
      "OTP verified successfully!",
      {
        is_validate: true,
        access_token,
      },
      null,
      "Verify OTP API."
    );
  } catch (error) {
    await transaction.rollback();
    console.error("OTP verify error:", error);
    return ResponseHelper.ISError(res, error.message, "Verify OTP API.");
  }
};

export const signIn = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    // Sanitize input
    const email = req.body.email
      ? sanitizeHtml(req.body.email).toLowerCase()
      : "";
    const password = req.body.password ? req.body.password.trim() : "";
    const option = {
      where: {
        email: email,
        deleted_at: null,
      },
      include: [
        {
          model: Schools,
          attributes: ["school_uuid", "name", "logo_url"],
          // as: "school",
          required: false,
        },
      ],
      transaction: t,
    };
    // Find user
    const user = await Users.findOne(option);
    if (!user) {
      await t.rollback();
      return ResponseHelper.NotFound(
        res,
        false,
        "User not found with this email!",
        null,
        "Sign In User API"
      );
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      await t.rollback();
      return ResponseHelper.BadRequest(
        res,
        "Invalid credentials!",
        "Sign In User API"
      );
    }

    // Handle unverified email (send OTP)
    if (!user.is_verified) {
      const otp = await CommonHelper.genrateOTP();
      await CommonHelper.sendOtpMail(email, otp);

      const otpData = {
        user_id: user.id,
        otp,
        expires_at: new Date(Date.now() + 5 * 60 * 1000), // 5 mins
        created_at: new Date(),
        updated_at: new Date(),
      };

      const existingOtp = await UserEmailOTPModel.findOne({
        where: { user_id: user.id },
        transaction: t,
      });

      if (existingOtp) {
        await existingOtp.update(otpData, { transaction: t });
      } else {
        await UserEmailOTPModel.create(otpData, { transaction: t });
      }

      await t.commit();

      return ResponseHelper.OK(
        res,
        false,
        "This email is not verified. OTP has been sent to your email!",
        { email_id: user.email, is_email_verified: false },
        null,
        "Sign In User API"
      );
    }
    const accessToken = jwt.sign(
      {
        id: user.id,
        email: user.email,
        roleId: user.role_id,
        schoolUuid: user?.School?.school_uuid || "",
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    const refreshToken = jwt.sign(
      {
        id: user.id,
        email: user.email,
        roleId: user.role_id,
        schoolUuid: user?.School?.school_uuid || "",
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    ////GETTING COUNT OF CLASS AND SECTIONS AND TEACHERS TO VALIDATE A BOOLEAN FOR ADMIN ROLE ONLY

    let isConfigured = false;
    if (user?.role_id === USER_ROLE.ADMIN) {
      const totalClassCounts = await Class.count({
        include: [
          {
            model: Schools,
            where: {
              school_uuid: user?.School?.school_uuid,
            },
          },
        ],
      });

      const totalClassSectionCounts = await ClassSection.count({
        include: [
          {
            model: Class,
            attributes: [],
            include: [
              {
                model: Schools,
                where: {
                  school_uuid: user?.School?.school_uuid,
                },
              },
            ],
          },
        ],
      });

      const totalSubjectCounts = await SchoolSubject.count({
        include: [
          {
            model: Schools,
            where: {
              school_uuid: user?.School?.school_uuid,
            },
          },
        ],
      });

      isConfigured =
        totalClassCounts > 0 &&
        totalClassSectionCounts > 0 &&
        totalSubjectCounts > 0
          ? true
          : false;
    }

    const userData = {
      user_id: user.user_uuid,
      schoolUuid: user?.School?.school_uuid || "",
      email_id: user.email,
      mobile: user.phone,
      profile_pic: user.profile_photo_url,
      school_logo_url: user?.School?.logo_url || null,
      access_token: accessToken,
      refresh_token: refreshToken,
      is_verified: !!user.is_verified,
      roleId: user.role_id,
      name: user.name,
      school_name: user?.School?.name || null,
      is_configured: isConfigured,
    };

    ////GETTING SECTION NAME FOR STUDENTS ONLY

    if (user.role_id === USER_ROLE.STUDENT) {
      const sectionDetail = await Students.findOne({
        where: {
          user_id: user?.id,
        },
        include: [
          {
            model: ClassSection,
            attributes: ["class_section_name"],
          },
        ],
      });

      userData.section_name =
        sectionDetail?.ClassSection?.class_section_name || "N/A";
    }

    await UserLogin.create(
      {
        user_id: user.id,
        token: userData.refresh_token,
      },
      { transaction: t }
    );
    await t.commit();

    return ResponseHelper.OK(
      res,
      true,
      "User signed in successfully!",
      userData,
      "Sign In User API"
    );
  } catch (error) {
    await t.rollback();
    console.error("Sign-in error:", error);
    return ResponseHelper.ISError(
      res,
      false,
      "Something went wrong!",
      error,
      "Sign In User API"
    );
  }
};

export const refreshToken = async (req, res) => {
  try {
    let { refresh_token } = req.body;
    refresh_token = sanitizeHtml(refresh_token);

    const verifyUser = jwt.verify(refresh_token, process.env.JWT_SECRET);
    if (!verifyUser) {
      return ResponseHelper.UnAuthorized(
        res,
        "Your session has expired, Please login again!",
        "Revoke token API."
      );
    }

    // Check that refresh token exists in DB
    const is_refresh_token_exist = await UserLogin.findOne({
      where: { token: refresh_token },
    });

    if (!is_refresh_token_exist) {
      return ResponseHelper.NotFound(
        res,
        false,
        "Invalid refresh token!",
        "Revoke token API."
      );
    }

    // ✅ Use consistent payload fields
    const payload = {
      id: verifyUser.id, // should exist if login token generation includes it
      email: verifyUser.email,
      roleId: verifyUser.roleId,
      schoolUuid: verifyUser.schoolUuid || "",
    };

    // Generate new tokens
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    const newRefreshToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // Update stored refresh token
    await is_refresh_token_exist.update({ token: newRefreshToken });

    const resData = {
      refresh_token: newRefreshToken,
      access_token: accessToken,
    };

    return ResponseHelper.OK(
      res,
      true,
      "Refresh token renewed successfully!",
      resData,
      null,
      "Revoke token API."
    );
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return ResponseHelper.UnAuthorized(
        res,
        "Refresh token expired, please login again.",
        "Revoke token API."
      );
    }
    return ResponseHelper.ISError(res, error.message, "Revoke token API.");
  }
};

export const getUserPermissions = async (req, res) => {
  try {
    const { roleId, id: userId } = req.credentials;
    const rolePermissions = await RolePermission.findAll({
      where: { role_id: roleId },
      include: [
        {
          model: Permission,
          attributes: ["name"],
          // as: "permission",
        },
      ],
    });

    const userPermissions = await UserPermission.findAll({
      where: { user_id: userId },
      include: [
        {
          model: Permission,
          attributes: ["name"],
          // as: "permission",
        },
      ],
    });

    const allowedPermissions = new Set(
      rolePermissions.map((rp) => rp.Permission.name)
    );

    userPermissions.forEach((up) => {
      const name = up.Permission.name;
      if (up.is_allowed === false) {
        allowedPermissions.delete(name); // block permission
      } else if (up.is_allowed === true) {
        allowedPermissions.add(name); // explicitly allow
      }
    });

    return ResponseHelper.OK(
      res,
      true,
      "User Permissions Fetched Successfully",
      { permissions: Array.from(allowedPermissions) }, // convert Set to array
      null,
      "User Permission Fetch API"
    );
  } catch (error) {
    console.error("Error fetching user permissions:", error);
    return ResponseHelper.ISError(
      res,
      false,
      "Failed to fetch user permissions",
      null,
      error,
      "User Permission Fetch API"
    );
  }
};

export const logout = async (req, res) => {
  try {
    const { id } = req.credentials;
    const tokenData = await UserLogin.findOne({
      where: {
        user_id: id,
      },
    });

    if (!tokenData) {
      return ResponseHelper.OK(
        res,
        true,
        "Logout already processed or device info not found.",
        "Sign-out API."
      );
    }

    await tokenData.destroy();

    return ResponseHelper.OK(
      res,
      true,
      "Logged out successfully!",
      "Sign-out API."
    );
  } catch (error) {
    return ResponseHelper.ISError(res, error.message, "Sign-out API.");
  }
};

export const resendOtpEmail = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    let { email } = req.body;
    email = sanitizeHtml(email);

    // 🔍 Check if Users exists
    const existingUser = await Users.findOne({
      where: { email, deleted_at: null },
      transaction: t,
    });

    if (!existingUser) {
      await t.rollback();
      return await ResponseHelper.NotFound(
        res,
        false,
        "This account does not exist!",
        "Resend OTP API."
      );
    }

    // 🔢 Generate OTP
    const otp = await CommonHelper.genrateOTP();
    if (!otp) {
      await t.rollback();
      return await ResponseHelper.ISError(
        res,
        "Failed to generate OTP. Please try again.",
        null,
        "Resend OTP API."
      );
    }

    // 📧 Send OTP Email
    await CommonHelper.sendOtpMail(email, otp, existingUser.phone);

    // 🔍 Check if an OTP record already exists
    const existingOtpRecord = await UserEmailOTPModel.findOne({
      where: { user_id: existingUser.id },
      transaction: t,
    });

    const otpData = {
      otp,
      expires_at: new Date(Date.now() + 5 * 60 * 1000), // valid for 5 minutes
      updated_at: new Date(),
    };

    if (existingOtpRecord) {
      // 🔄 Update existing OTP
      await UserEmailOTPModel.update(otpData, {
        where: { id: existingOtpRecord.id },
        transaction: t,
      });
    } else {
      // 🆕 Create new OTP entry
      await UserEmailOTPModel.create(
        {
          ...otpData,
          user_id: existingUser.id,
          created_at: new Date(),
        },
        { transaction: t }
      );
    }

    await t.commit();

    return await ResponseHelper.OK(
      res,
      true,
      "OTP has been resent to your email successfully.",
      null,
      null,
      "Resend OTP API."
    );
  } catch (error) {
    await t.rollback();
    console.error("Error in resendOtpEmail:", error);
    return await ResponseHelper.ISError(res, error.message, "Resend OTP API.");
  }
};

export const forgotPasswordWithOTP = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    let { email, otp, newPassword } = req.body;

    // 🧼 Sanitize and validate
    email = sanitizeHtml(email || "").trim();
    otp = sanitizeHtml(otp || "").trim();
    newPassword = sanitizeHtml(newPassword || "").trim();

    if (!email || !otp || !newPassword) {
      await transaction.rollback();
      return ResponseHelper.BadRequest(
        res,
        "Email, OTP, and new password are required!",
        "Forgot password with OTP API."
      );
    }

    if (newPassword.length < 8) {
      await transaction.rollback();
      return ResponseHelper.BadRequest(
        res,
        "New password must be at least 8 characters long!",
        "Forgot password with OTP API."
      );
    }

    // 👤 Check user
    const user = await Users.findOne({
      where: { email, deleted_at: null },
      transaction,
    });
    if (!user) {
      await transaction.rollback();
      return ResponseHelper.NotFound(
        res,
        false,
        "Invalid email ID!",
        "Forgot password with OTP API."
      );
    }

    // 🔢 Check OTP validity
    const otpRecord = await UserEmailOTPModel.findOne({
      where: { user_id: user.id, otp },
      transaction,
    });

    if (!otpRecord) {
      await transaction.rollback();
      return ResponseHelper.BadRequest(
        res,
        "Invalid OTP!",
        "Forgot password with OTP API."
      );
    }

    // 🕒 Check expiry (using `expires_at` from DB)
    const currentTime = new Date();
    const otpExpiry = new Date(otpRecord.expires_at);

    if (currentTime > otpExpiry) {
      await transaction.rollback();
      return ResponseHelper.Conflict(
        res,
        "OTP expired!",
        null,
        "Forgot password with OTP API."
      );
    }

    // 🔐 Safely compare passwords (skip if old hash missing)
    if (user.password_hash) {
      const isSamePassword = await bcrypt.compare(
        newPassword,
        user.password_hash
      );
      if (isSamePassword) {
        await transaction.rollback();
        return ResponseHelper.BadRequest(
          res,
          "New password cannot be the same as old password!",
          "Forgot password with OTP API."
        );
      }
    }

    // 🧩 Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await Users.update(
      { password_hash: hashedPassword },
      { where: { id: user.id }, transaction }
    );

    // 🧹 Delete used OTP
    await UserEmailOTPModel.destroy({
      where: { id: otpRecord.id },
      transaction,
    });

    await transaction.commit();
    return ResponseHelper.OK(
      res,
      true,
      "Password has been reset successfully!",
      null,
      null,
      "Forgot password with OTP API."
    );
  } catch (error) {
    await transaction.rollback();
    console.error("Forgot Password Error:", error);
    return ResponseHelper.ISError(
      res,
      error.message,
      "Forgot password with OTP API."
    );
  }
};

export const sendOtpToEmail = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    let { email } = req.body;
    email = sanitizeHtml(email || "").trim();

    // 🧩 Validate email
    if (!email) {
      await transaction.rollback();
      return ResponseHelper.BadRequest(
        res,
        false,
        "Email is required!",
        null,
        null,
        "Send OTP API"
      );
    }

    // 👤 Check if user exists
    const user = await Users.findOne({
      where: { email, deleted_at: null },
      transaction,
    });
    if (!user) {
      await transaction.rollback();
      return ResponseHelper.NotFound(
        res,
        false,
        "User not found!",
        null,
        null,
        "Send OTP API"
      );
    }

    // 🔢 Generate OTP
    const otp = await CommonHelper.genrateOTP();

    // 📧 Send OTP email
    await CommonHelper.sendOtpMail(email, otp);

    // 🧹 Delete any existing OTPs for this user (optional but recommended)
    await UserEmailOTPModel.destroy({
      where: { user_id: user.id },
      transaction,
    });

    // 🕒 Store new OTP in DB (with timezone-safe expiry)
    const expiryTime = new Date(
      new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
    );
    expiryTime.setMinutes(expiryTime.getMinutes() + 5); // 5 min expiry

    await UserEmailOTPModel.create(
      {
        user_id: user.id,
        otp,
        expires_at: expiryTime,
        created_at: new Date(),
        updated_at: new Date(),
      },
      { transaction }
    );

    await transaction.commit();

    return ResponseHelper.OK(
      res,
      true,
      "OTP sent successfully to your email.",
      null,
      null,
      "Send OTP API"
    );
  } catch (error) {
    if (transaction) await transaction.rollback();
    console.error("Send OTP Error:", error);
    return ResponseHelper.ISError(res, error.message, "Send OTP API");
  }
};

export const resetUserPassword = async (req, res) => {
  const t = await sequelize.transaction();

  try {
    const { roleId, schoolUuid } = req.credentials || {};
    const { email, newPassword, confirmPassword } = req.body;

    if (!email || !newPassword || !confirmPassword) {
      return ResponseHelper.BadRequest(
        res,
        "Email, password and confirm password are required!",
        "Reset Password API"
      );
    }

    if (newPassword !== confirmPassword) {
      return ResponseHelper.BadRequest(
        res,
        "Password and confirm password do not match!",
        "Reset Password API"
      );
    }

    if (roleId === USER_ROLE.STUDENT) {
      return ResponseHelper.Forbidden(
        res,
        "You are not authorized to reset passwords!",
        "Reset Password API"
      );
    }

    const targetUser = await Users.findOne({
      where: { email, deleted_at: null },
      include:
        roleId === USER_ROLE.SUPERADMIN
          ? []
          : [
              {
                model: Schools,
                required: true,
                where: { school_uuid: schoolUuid },
              },
            ],
      transaction: t,
    });

    if (!targetUser) {
      await t.rollback();
      return ResponseHelper.NotFound(
        res,
        false,
        "User not found or not in your school!",
        null,
        "Reset Password API"
      );
    }

    const targetRole = targetUser.role_id;

    const isSuperAdmin = roleId === USER_ROLE.SUPERADMIN;

    const isAdmin =
      roleId === USER_ROLE.ADMIN;

    const isTeacherAllowed =
      roleId === USER_ROLE.TEACHER &&
      targetRole === USER_ROLE.STUDENT;

    if (!isSuperAdmin && !isAdmin && !isTeacherAllowed) {
      await t.rollback();
      return ResponseHelper.Forbidden(
        res,
        "You are not authorized to change this user's password!",
        "Reset Password API"
      );
    }

    // 🔒 Hash password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // 📝 Update password
    await targetUser.update(
      {
        password_hash: hashedPassword,
        updated_at: new Date(),
      },
      { transaction: t }
    );

    await t.commit();

    return ResponseHelper.OK(
      res,
      true,
      "Password updated successfully!",
      null,
      null,
      "Reset Password API"
    );
  } catch (error) {
    await t.rollback();
    return ResponseHelper.ISError(
      res,
      error,
      "Reset Password API"
    );
  }
};

