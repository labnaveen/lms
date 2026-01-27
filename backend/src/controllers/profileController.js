import { Op } from "sequelize";
import bcrypt from "bcrypt";
import sequelize from "../config/db.config.js";
import ResponseHelper from "../helpers/ResponseHelper.js";
import Class from "../models/ClassModel.js";
import Schools from "../models/SchoolsModal.js";
import ClassSection from "../models/ClassSectionModel.js";
import { USER_ROLE } from "../constants/Constants.js";
import Students from "../models/StudentsModel.js";
import Users from "../models/UserModal.js";
import Roles from "../models/RoleModel.js";
import Gender from "../models/GenderModel.js";
import Teacher from "../models/TeacherModel.js";
import Stream from "../models/StreamModel.js";
import Post from "../models/PostsModel.js";
import CasteCategory from "../models/CasteCategoryModal.js";
import TeacherClassMap from "../models/TeacherClassMapModal.js";
import TeacherQualification from "../models/TeacherQualification.js";
import Qualification from "../models/QualificationModel.js";
import TeacherSubjectMap from "../models/TeacherSubjectMapModal.js";
import SchoolSubject from "../models/SchoolSubjectModel.js";
import Subject from "../models/SubjectModel.js";

export const getProfileDetails = async (req, res) => {
  try {
    const userId = req.credentials.id;
    const roleId = req.credentials.roleId;
    const school_uuid = req.credentials.schoolUuid || req.headers["school-uuid"];

    const isStudent = roleId === USER_ROLE.STUDENT;
    const isTeacher = roleId === USER_ROLE.TEACHER;
    const isAdmin = roleId === USER_ROLE.ADMIN;
    const isSuperAdmin = roleId === USER_ROLE.SUPERADMIN;
    const schoolAttributes = isAdmin ? ["name", "code", "address", "pin_code", "website"] : ["name", "code", "email", "phone", "address", "pin_code", "website"]

    // base include
    const include = [
      {
        model: Roles,
        attributes: ["name"],
      },

      {
        model: Schools,
        attributes: schoolAttributes,
        required: isSuperAdmin ? false : true,
        where: isSuperAdmin ? {} : { school_uuid },
      },


    ];

    // ✅ Dynamically add includes based on role
    if (isStudent) {
      include.push({
        model: Students,
        attributes: ["roll_number", "enrollment_date", "date_of_birth", "guardian_name", "guardian_phone", "address"],
        include: [
          {

            model: Gender,
            attributes: ["gender_name"],
            required: true,
          },
          {
            model: ClassSection,
            attributes: ["class_section_name"],
            include: [
              {
                model: Class,
                attributes: ["class_name"],
              },
              {
                model: Stream,
                attributes: ["stream_name"],
              },
            ],
          },

        ],
      });
    }
    else if (isTeacher) {
      include.push({

        model: Teacher,
        attributes: ["teacher_code", "experience_years", "joining_date", "bio", "profile_image"],
        required: true,
        include: [

          {
            model: Post,
            attributes: ["name"],
            required: true
          },
          {
            model: CasteCategory,
            attributes: ["name"],
            required: false
          },
          {
            model: TeacherClassMap,
            required: true,
            attributes: ["teacher_id"],
            include: [

              {
                model: ClassSection,
                attributes: ["class_section_name"],
                required: true,
                include: [
                  {
                    model: Class,
                    attributes: ["class_name"],
                    required: true,
                  },
                  {
                    model: Stream,
                    attributes: ["stream_name"]
                  },
                ]

              },

              {
                model: TeacherSubjectMap,
                attributes: ["id"],
                include: [
                  {
                    model: SchoolSubject,
                    attributes: ["id"],
                    include: [
                      {
                        model: Subject,
                        attributes: ["subject_name", "subject_code"]

                      }
                    ]
                  }
                ]
              }
            ]

          },
          {
            model: TeacherQualification,
            attributes: ["id"],
            include: [
              {
                model: Qualification,
                attributes: ["name"]
              }
            ]
          },

        ],

      });
    }

    const profileDetails = await Users.findOne({
      where: { id: userId, deleted_at: null },
      attributes: ["name", "email", "phone", "profile_photo_url"],
      include,
    });

    return ResponseHelper.OK(
      res,
      true,
      "Profile details fetched successfully",
      profileDetails,
      null,
      "Fetch profile details api !"
    );
  } catch (error) {
    return ResponseHelper.ISError(res, "Internal Server Error", "Fetch profile details api !");
  }
};

export const updateProfile = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { id, roleId } = req.credentials;
    const { phone, email, website, bio } = req.body;
    const profileImagePath = req.file ? req.file.path : null;
    const isAdmin = roleId === USER_ROLE.ADMIN
    // Update base user data
    const user = await Users.findOne({
      where: { id, deleted_at: null },
      transaction: t,
    });

    if (!user) {
      await t.rollback();
      return ResponseHelper.NotFound(res, false, "User not found!", null, "Update Profile API");
    }

    // Prepare user update payload
    const userUpdateData = {
      phone: phone || user.phone,
      updated_at: new Date(),
    };

    if (profileImagePath) {
      userUpdateData.profile_photo_url = profileImagePath || user.profile_photo_url;
    }

    if (isAdmin && email) {
      userUpdateData.email = email || user.email

      const existingUserWithSameEmailId = await Users.findOne({

        where: {
          email: email,
          id: { [Op.ne]: id },
          deleted_at: null
        }
      })

      if (existingUserWithSameEmailId) {
        return ResponseHelper.Conflict(res, "Eamil already exists !", null, "Update Profile API");
      }
    }


    await user.update(userUpdateData, { transaction: t });

    // Update role-based tables
    if (isAdmin && website) {
      await Schools.update(
        {
          website,
          logo_url: profileImagePath || user.profile_photo_url,
          updated_at: new Date(),

        }, {
        where: { id: user?.school_id }
      },
        { transaction: t }
      );
    }

    if (roleId === USER_ROLE.TEACHER) {
      await Teacher.update(
        {
          bio,
          updated_at: new Date(),
          profile_image: profileImagePath

        },
        { where: { user_id: user?.id } },
        { transaction: t }
      );
    }

    await t.commit();

    return ResponseHelper.OK(res, true, "Profile updated successfully!", {
      phone: userUpdateData.phone,
      profile_photo_url: userUpdateData.profile_photo_url || user.profile_photo_url,
    }, null, "Update Profile API");
  } catch (error) {
    await t.rollback();
    return ResponseHelper.ISError(res, "Internal Server Error", "Update Profile API");
  }
};

export const changePassword = async (req, res) => {
  const t = await sequelize.transaction();

  try {
    const userId = req.credentials.id; // ✅ Extracted from token middleware
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      await t.rollback();
      return ResponseHelper.BadRequest(res, "Old and new passwords are required!", "Update Password API");
    }

    // 🔍 Fetch user details
    const user = await Users.findOne({
      where: { id: userId, deleted_at: null },
      transaction: t,
    });

    if (!user) {
      await t.rollback();
      return ResponseHelper.NotFound(res, false, "User not found!", null, "Update Password API");
    }

    // 🔒 Compare old password
    const isPasswordValid = await bcrypt.compare(oldPassword, user.password_hash);
    if (!isPasswordValid) {
      await t.rollback();
      return ResponseHelper.BadRequest(res, "Old password is incorrect!", "Update Password API");
    }

    // ✅ Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // 📝 Update password
    await user.update(
      {
        password_hash: hashedPassword,
        updated_at: new Date(),
      },
      { transaction: t }
    );

    await t.commit();

    return ResponseHelper.OK(res, true, "Password updated successfully!", null, null, "Update Password API");
  } catch (error) {
    await t.rollback();
    return ResponseHelper.ISError(res, "Internal Server Error", "Update Password API");
  }
};