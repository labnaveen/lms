import { Op, where } from "sequelize";
import ResponseHelper from "../helpers/ResponseHelper.js";
import Schools from "../models/SchoolsModal.js";
import { buildSearchQuery } from "../utils/searchHelper.js";
import sanitizeHtml from "sanitize-html";
import sequelize from "../config/db.config.js";
import bcrypt from "bcrypt";
import Users from "../models/UserModal.js";
import City from "../models/CityModel.js";
import State from "../models/StatesModel.js";
import Country from "../models/CountryModel.js";
import CommonHelper from "../helpers/CommonHelper.js";
import { USER_ROLE } from "../constants/Constants.js";
import Teacher from "../models/TeacherModel.js";
import Students from "../models/StudentsModel.js";
import Course from "../models/CourseModel.js";
import Skill from "../models/SkillModel.js";
import Notification from "../models/NotificationModel.js";
import ActivityLogs from "../models/ActivityLogs.js";
import checkDiskSpace from "check-disk-space";
import os from "os";
import fs from "fs";
import { execSync } from "child_process";

export const allSchoolsList = async (req, res) => {
  try {
    const { search, page = 1, limit = 10 } = req.query;

    const pageInt = parseInt(page, 10);
    const limitInt = parseInt(limit, 10);
    const offset = (pageInt - 1) * limitInt;

    const whereClause = {
      ...buildSearchQuery(search, ["name", "email"]),
      deleted_at: null, // Only include active (non-deleted) records
    };

    // ordering
    const order = [["id", "DESC"]];

    // DB query
    const { rows, count } = await Schools.findAndCountAll({
      limit: limitInt,
      offset,
      order,
      where: whereClause,
      include: [
        {
          model: Country,
          as: "country", // alias must match your association
          attributes: ["id", "name"], // pick only needed fields
        },
        {
          model: City,
          as: "city", // alias must match your association
          attributes: ["id", "name"], // pick only needed fields
        },
        {
          model: State,
          as: "state",
          attributes: ["id", "name"],
        },
      ],
    });

    // pagination metadata
    const totalPages = Math.ceil(count / limitInt);
    const meta = {
      totalCount: count,
      pageCount: totalPages,
      currentPage: pageInt,
      perPage: limitInt,
      hasNextPage: pageInt < totalPages,
      hasPrevPage: pageInt > 1,
    };

    return await ResponseHelper.OK(
      res,
      true,
      "Schools list fetched successfully!",
      rows,
      meta,
      "Fetch schools list API."
    );
  } catch (error) {
    return await ResponseHelper.ISError(
      res,
      error.message,
      "Fetch schools list API."
    );
  }
};

export const allSchoolsListWithUuid = async (req, res) => {
  try {
    const { search } = req.query;
    const whereClause = buildSearchQuery(search, ["name"]);
    // ordering
    const order = [["id", "DESC"]];

    // DB query
    const list = await Schools.findAndCountAll({
      order,
      attributes: ["school_uuid", "name"],
      where: whereClause,
    });
    return await ResponseHelper.OK(
      res,
      true,
      "Schools list with uuid fetched successfully!",
      list.rows,
      null,
      "Fetch schools list API."
    );
  } catch (error) {
    return await ResponseHelper.ISError(
      res,
      error.message,
      "Fetch schools list API."
    );
  }
};

export const schoolRegisterSuperAdmin = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const filesData = req.files;
    const profileImagePath = filesData.length > 0 ? filesData[0].path : null;
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
        pin_code: sanitizeHtml(req.body.pin_code),
        website: sanitizeHtml(req.body.website),
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
      where: { email },
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
        is_verified: true,
      },
      { transaction: t }
    );

    await CommonHelper.logActivity(
      {
        title: "New School Created",
        description: `${schoolData.name} was added by Admin.`,
        created_by: req.credentials.id,
      },
      { transaction: t }
    );

    await t.commit();
    return await ResponseHelper.Created(
      res,
      true,
      "School and User account created successfully",
      { school: schoolData, user: userData },
      null,
      "School Register"
    );
  } catch (error) {
    await t.rollback();

    return await ResponseHelper.ISError(res, error.message, "School Register");
  }
};

export const singleSchoolDetails = async (req, res) => {
  try {
    const { schoolUuid } = req.params;

    if (!schoolUuid) {
      return ResponseHelper.BadRequest(
        res,
        false,
        "School UUID is required",
        "Fetch single school details API"
      );
    }

    const schoolDetails = await Schools.findOne({
      where: { school_uuid: schoolUuid },
      attributes: [
        "id",
        "name",
        "code",
        "email",
        "phone",
        "address",
        "pin_code",
        "website",
        "logo_url",
        "city_name",
      ],
      include: [
        {
          model: Country,
          as: "country", // alias must match your association
          attributes: ["id", "name"], // pick only needed fields
        },
        {
          model: City,
          as: "city", // alias must match your association
          attributes: ["id", "name"], // pick only needed fields
        },
        {
          model: State,
          as: "state",
          attributes: ["id", "name"],
        },
      ],
    });

    if (!schoolDetails) {
      return ResponseHelper.OK(
        res,
        false,
        "School not found",
        null,
        null,
        "Fetch single school details API"
      );
    }

    // 🧮 Now, run a separate COUNT query to get total students
    const totalStudents = await Users.count({
      where: {
        school_id: schoolDetails.id,
        deleted_at: null,
        role_id: USER_ROLE.STUDENT,
      },
      include: [
        {
          model: Schools,
          where: {
            school_uuid: schoolUuid,
            deleted_at: null,
          },
        },
      ],
      distinct: true,
      col: "id",
    });

    // 🧮 Now, run a separate COUNT query to get total students
    const totalTeachers = await Users.count({
      where: {
        school_id: schoolDetails.id,
        deleted_at: null,
        role_id: USER_ROLE.TEACHER,
      },
      include: [
        {
          model: Schools,
          where: {
            school_uuid: schoolUuid,
            deleted_at: null,
          },
        },
      ],
      distinct: true,
      col: "id",
    });

    const schoolData = schoolDetails.toJSON();
    schoolData.total_students = totalStudents;
    schoolData.total_teachers = totalTeachers;

    return ResponseHelper.OK(
      res,
      true,
      "School details fetched successfully!",
      schoolData,
      null,
      "Fetch single school details API"
    );
  } catch (error) {
    // console.error("Error fetching school details:", error);
    return ResponseHelper.ISError(
      res,
      "Failed to retrieve school details",
      "Fetch single school details API"
    );
  }
};

export const updateSchoolSuperAdmin = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { school_uuid } = req.params;

    // Find school by UUID
    const existingSchool = await Schools.findOne({
      where: { school_uuid: school_uuid },
      transaction: t,
    });

    if (!existingSchool) {
      await t.rollback();
      return await ResponseHelper.NotFound(
        res,
        "School not found",
        null,
        "Update School"
      );
    }

    // Sanitize and update school data
    const filesData = req.files;
    const profileImagePath = filesData.length > 0 ? filesData[0].path : null;
    const rawCityName = sanitizeHtml(req.body.city_name)?.trim();
    const rawCityId = req.body.city_id ? parseInt(req.body.city_id) : null;

    const updatedData = {
      name: sanitizeHtml(req.body.name),
      code: sanitizeHtml(req.body.code),
      email: sanitizeHtml(req.body.email),
      phone: sanitizeHtml(req.body.phone),
      address: sanitizeHtml(req.body.address),
      country_id: parseInt(req.body.country_id),
      state_id: parseInt(req.body.state_id),
      // ✅ Ensure only one of city_id / city_name is saved
      city_id: rawCityId || null,
      city_name: rawCityId ? null : rawCityName || null,
      pin_code: sanitizeHtml(req.body.pin_code) || null,
      website: sanitizeHtml(req.body.website) || null,
      logo_url: profileImagePath || null,
    };

    await existingSchool.update(updatedData, { transaction: t });

    // Update related user by school_id
    const existingUser = await Users.findOne({
      where: { school_id: existingSchool.id },
      transaction: t,
    });

    if (existingUser) {
      await existingUser.update(
        {
          name: updatedData.name,
          email: updatedData.email,
          phone: updatedData.phone,
          profile_photo_url: updatedData.logo_url,
        },
        { transaction: t }
      );
    }

    await t.commit();

    return await ResponseHelper.OK(
      res,
      true,
      "School and User details updated successfully",
      { school: existingSchool, user: existingUser },
      null,
      "Update School"
    );
  } catch (error) {
    await t.rollback();
    return await ResponseHelper.ISError(res, error.message, "Update School");
  }
};

export const deleteSchool = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { school_uuid } = req?.params ?? {};

    // 🧩 Validate input
    if (!school_uuid) {
      await t.rollback();
      return ResponseHelper.BadRequest(
        res,
        "School UUID is required",
        null,
        "Delete school API."
      );
    }

    // 🧠 Get School ID from UUID
    const school_id = await CommonHelper.getIdFromUuid(
      Schools,
      school_uuid,
      res,
      "Delete school API",
      "school_uuid"
    );

    if (!school_id) {
      await t.rollback();
      return ResponseHelper.OK(
        res,
        false,
        "School not found",
        null,
        null,
        "Delete school API."
      );
    }

    // 🔍 Check if school exists
    const school = await Schools.findOne({
      where: { id: school_id, deleted_at: null },
      transaction: t,
    });

    if (!school) {
      await t.rollback();
      return ResponseHelper.OK(
        res,
        false,
        "School not found or already deleted",
        null,
        null,
        "Delete school API."
      );
    }

    // 🔍 Find the associated user (school admin)
    const user = await Users.findOne({
      where: { school_id: school.id, deleted_at: null },
      transaction: t,
    });

    // 🗑️ Soft delete school
    await Schools.update(
      { deleted_at: new Date() },
      { where: { id: school.id }, transaction: t }
    );

    // 🗑️ Soft delete user (if exists)
    if (user) {
      await Users.update(
        { deleted_at: new Date() },
        { where: { id: user.id }, transaction: t }
      );
    }

    await t.commit();
    return ResponseHelper.OK(
      res,
      true,
      "School deleted successfully",
      null,
      null,
      "Delete school API."
    );
  } catch (error) {
    await t.rollback();
    console.error("Delete School Error:", error);
    return ResponseHelper.ISError(
      res,
      error?.message ?? "Unknown error",
      "Delete school API."
    );
  }
};

function getLinuxDistro() {
  try {
    const data = fs.readFileSync("/etc/os-release", "utf8");

    const lines = Object.fromEntries(
      data.split("\n").map((line) => {
        const [key, value] = line.split("=");
        return [key, value?.replace(/"/g, "")];
      })
    );

    return {
      name: lines.PRETTY_NAME || "Unknown Linux",
      id: lines.ID || "",
      version: lines.VERSION || "",
      version_id: lines.VERSION_ID || "",
    };
  } catch (error) {
    return { name: "Unknown Linux", id: "", version: "" };
  }
}

// Get Private (local) IP
function getPrivateIP() {
  const nets = os.networkInterfaces();
  let ip = "Unknown";

  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      if (net.family === "IPv4" && !net.internal) {
        return net.address;
      }
    }
  }
  return ip;
}

// Get Public (Internet) IP
function getPublicIP() {
  try {
    return execSync("curl -s https://api.ipify.org").toString().trim();
  } catch {
    return "Unknown";
  }
}

export const getSuperAdminDashboardStats = async (req, res) => {
  try {
    // BASIC COUNTS
    const totalSchools = await Schools.count({ where: { deleted_at: null } });
    const totalTeachers = await Teacher.count({ where: { deleted_at: null } });
    const totalStudents = await Students.count({ where: { deleted_at: null } });
    const totalCourses = await Course.count({ where: { deleted_at: null } });
    const totalSkills = await Skill.count({ where: { deleted_at: null } });

    const userCounts = await Users.count({
      where: {
        deleted_at: null,
        role_id: { [Op.ne]: USER_ROLE.SUPERADMIN },
      },
    });

    // SYSTEM HEALTH ────────────────

    // CPU USAGE
    const getCpuUsage = () => {
      const cpus = os.cpus();

      let user = 0, nice = 0, sys = 0, idle = 0, irq = 0;

      for (let cpu of cpus) {
        user += cpu.times.user;
        nice += cpu.times.nice;
        sys += cpu.times.sys;
        idle += cpu.times.idle;
        irq += cpu.times.irq;
      }

      const total = user + nice + sys + idle + irq;

      return {
        user,
        sys,
        idle,
        total,
        usage_percentage: Number((((total - idle) / total) * 100).toFixed(2)),
      };
    };

    const cpu = getCpuUsage();

    // UPTIME
    const uptime = process.uptime();

    // DISK
    const disk = await checkDiskSpace("/");
    const storage = {
      total: disk.size,
      used: disk.size - disk.free,
      free: disk.free,
    };

    // RAM
    const totalRam = os.totalmem();
    const freeRam = os.freemem();
    const usedRam = totalRam - freeRam;

    const ram = {
      total: totalRam,
      free: freeRam,
      used: usedRam,
      used_percentage: Number(((usedRam / totalRam) * 100).toFixed(2)),
    };

    // OS INFO
    const osInfo = {
      platform: os.platform(),
      type: os.type(),
      arch: os.arch(),
      release: os.release(),
      cpus: os.cpus().length,
      hostname: os.hostname(),
      distro: getLinuxDistro(),
      private_ip: getPrivateIP(),
      public_ip: getPublicIP(),
      node_version: process.version, // ⭐ REPLACED notifications_sent
    };

    // RECENT ACTIVITY
    const recentActivities = await ActivityLogs.findAll({
      where: { deleted_at: null },
      order: [["id", "DESC"]],
      limit: 10,
      attributes: ["id", "title", "description", "created_at"],
      include: [{ model: Users, attributes: ["name", "email"] }],
    });

    // RESPONSE DATA ───────────────────
    const dashboardData = {
      counts: {
        total_schools: totalSchools,
        total_teachers: totalTeachers,
        total_students: totalStudents,
        total_courses: totalCourses,
        total_skills: totalSkills,
        total_users: userCounts,
      },

      system_health: {
        api_status: "OK",
        uptime,
        cpu,          // ⭐ ADDED CPU USAGE
        storage,
        ram,
        os: osInfo,
        timestamp: Date.now(),
      },

      recent_activity: recentActivities,
    };

    return ResponseHelper.OK(
      res,
      true,
      "Super Admin Dashboard data fetched successfully!",
      dashboardData,
      null,
      "Super Admin Dashboard API"
    );
  } catch (error) {
    return ResponseHelper.ISError(
      res,
      error.message,
      "Super Admin Dashboard API"
    );
  }
};


//**************** TEACHERS CONTROLLERS ****************

// export const addTeacher = async (req, res) => {
//   try {
//     const { name, email, password, profile_photo_url } = req.body;
//     const {schoolUuid} = req.cre
//     const userData = await Users.create(
//       {
//         school_id: schoolData.id,
//         role_id: 2, // fixed role (e.g., SCHOOL_ADMIN)
//         name: schoolData.name,
//         email,
//         phone: schoolData.phone || null,
//         password_hash: hashedPassword,
//         profile_photo_url: schoolData.logo_url,
//         is_verified: true,
//       },
//       { transaction: t }
//     );
//   } catch (error) {}
// };
