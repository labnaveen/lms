import { literal, Op, where } from "sequelize";
import CommonHelper from "../helpers/CommonHelper.js";
import ResponseHelper from "../helpers/ResponseHelper.js";
import Class from "../models/ClassModel.js";
import ClassSection from "../models/ClassSectionModel.js";
import Schools from "../models/SchoolsModal.js";
import Stream from "../models/StreamModel.js";
import { buildSearchQuery } from "../utils/searchHelper.js";
import sanitizeHtml from "sanitize-html";
import TeacherClassMap from "../models/TeacherClassMapModal.js";
import Teacher from "../models/TeacherModel.js";
import { USER_ROLE } from "../constants/Constants.js";

export const getClassList = async (req, res) => {
  try {
    const school_uuid = req.credentials.schoolUuid;
    const { roleId, id } = req.credentials;
    const { search = "", page = 1, limit = 10 } = req.query;
    const pageInt = parseInt(page, 10);
    const limitInt = parseInt(limit, 10);
    const offset = (pageInt - 1) * limitInt;

    const school_id = await CommonHelper.getIdFromUuid(
      Schools,
      school_uuid,
      res,
      "Get Class List API",
      "school_uuid"
    );
    if (!school_id)
      return ResponseHelper.NotFound(
        res,
        false,
        "School not found !",
        "Get Class List API"
      );

    const searchFields = ["class_name"];
    const searchClause = buildSearchQuery(search.trim(), searchFields);

    const whereClause = {
      school_id,
      deleted_at: null,
      ...(searchClause || {}),
    };

    const classSectionWhereClause={deleted_at: null}

    if (roleId === USER_ROLE.TEACHER) {
      const teacherClasses = await TeacherClassMap.findAll({
        where: { deleted_at: null },
        include: [
          {
            model: ClassSection,
            attributes: ["id", "class_id"],
            where: { deleted_at: null },
          },
          {
            model: Teacher,
            where: { user_id: id, deleted_at: null },
            required: true,
          },
        ],
      });
      // To get unique array of classId
      const teacherClassIds = [
        ...new Set(teacherClasses.map((tc) => tc.ClassSection.class_id)),
      ];

      if (teacherClassIds.length === 0) {
        return ResponseHelper.OK(
          res,
          true,
          "No classes assigned to this teacher.",
          [],
          null,
          "Get Class List API"
        );
      }

      if (teacherClassIds.length > 0) {
        whereClause.id = teacherClassIds;
      }

      const teacherSectionIds = [
        ...new Set(teacherClasses.map((tc) => tc.ClassSection.id)),
      ];

      classSectionWhereClause.id=teacherSectionIds
    }

    const { rows: classesList, count } = await Class.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: ClassSection,
          attributes: ["class_section_name"],
          separate: true,
          order: [["class_section_name", "ASC"]],
          where: classSectionWhereClause,
          include: [
            {
              model: Stream,
              attributes: ["stream_name"],
            },
          ],
        },
      ],
      attributes: ["class_uuid", "class_name"],
      limit: limitInt,
      offset,
      order: [["id", "DESC"]],
    });

    const meta = {
      totalCount: count || 0,
      pageCount: Math.ceil((count || 0) / limitInt),
      currentPage: pageInt,
      perPage: limitInt,
      hasNextPage: pageInt < Math.ceil((count || 0) / limitInt),
      hasPrevPage: pageInt > 1,
    };

    return ResponseHelper.OK(
      res,
      true,
      classesList.length
        ? "Class list fetched successfully!"
        : "No classes found!",
      classesList,
      classesList.length ? meta : null,
      "Get Class List API"
    );
  } catch (error) {
    return ResponseHelper.ISError(
      res,
      error.message || "Failed to retrieve classesList list",
      "Get Class List API"
    );
  }
};

export const addClass = async (req, res) => {
  try {
    const { class_name, class_sections } = req.body;
    const school_uuid = req.credentials.schoolUuid;

    const school_id = await CommonHelper.getIdFromUuid(
      Schools,
      school_uuid,
      res,
      "Add Class API",
      "school_uuid"
    );
    if (!school_id) {
      return ResponseHelper.NotFound(
        res,
        false,
        "School not found !",
        "Add Class API"
      );
    }

    if (!class_name) {
      return ResponseHelper.BadRequest(
        res,
        "Class name is required",
        "Add Class API"
      );
    }

    // 1️⃣ Check if class exists (active)
    let existingClass = await Class.findOne({
      where: { class_name, school_id, deleted_at: null },
    });

    // 2️⃣ Check if class exists soft-deleted
    let deletedClass = await Class.findOne({
      where: { class_name, school_id, deleted_at: { [Op.ne]: null } },
      paranoid: false,
    });

    let finalClass;

    if (existingClass) {
      return ResponseHelper.BadRequest(
        res,
        "Class with same name already exists !",
        "Add Class API"
      );
    } else if (deletedClass) {
      // Restore deleted class
      await deletedClass.restore();
      finalClass = deletedClass;
    } else {
      // Create new class
      finalClass = await Class.create({
        class_name,
        school_id,
      });
    }

    // 3️⃣ PROCESS CLASS SECTIONS
    if (Array.isArray(class_sections) && class_sections.length > 0) {
      for (const section of class_sections) {
        const { class_section_name, stream_uuid } = section;
        if (!class_section_name) continue;

        // Get stream ID
        let stream_id = null;
        if (stream_uuid) {
          const stream = await Stream.findOne({
            where: { stream_uuid, deleted_at: null },
          });
          stream_id = stream ? stream.id : null;
        }

        // Check if section exists (active)
        let existingSection = await ClassSection.findOne({
          where: {
            class_section_name,
            class_id: finalClass.id,
            stream_id,
            deleted_at: null,
          },
        });

        if (existingSection) continue; // already exists

        // Check if same section exists but soft-deleted
        let deletedSection = await ClassSection.findOne({
          where: {
            class_section_name,
            class_id: finalClass.id,
            stream_id,
            deleted_at: { [Op.ne]: null },
          },
          paranoid: false,
        });

        if (deletedSection) {
          // Restore section
          // await deletedSection.restore();
          await deletedSection.update({
            deleted_at: null,
            class_section_name,
            stream_id,
          });
        } else {
          // Create new section
          await ClassSection.create({
            class_section_name,
            class_id: finalClass.id,
            stream_id,
          });
        }
      }
    }

    return ResponseHelper.Created(
      res,
      true,
      "Class added successfully!",
      null,
      null,
      "Add Class API"
    );
  } catch (error) {
    return ResponseHelper.ISError(
      res,
      error.message || "Failed to add class",
      "Add Class API"
    );
  }
};

export const updateClass = async (req, res) => {
  try {
    const { class_uuid } = req.params;
    const { class_name, class_sections, class_sections_to_delete } = req.body;
    const school_uuid = req.credentials.schoolUuid;

    // -------- Validate School --------
    const school_id = await CommonHelper.getIdFromUuid(
      Schools,
      school_uuid,
      res,
      "Update Class API",
      "school_uuid"
    );

    if (!school_id)
      return ResponseHelper.NotFound(
        res,
        false,
        "School not found !",
        "Update Class API"
      );

    // -------- Validate Class --------
    const existingClass = await Class.findOne({
      where: { class_uuid, school_id, deleted_at: null },
    });

    if (!existingClass) {
      return ResponseHelper.NotFound(
        res,
        "Class not found",
        "Update Class API"
      );
    }

    // -------- Duplicate Class Name Check --------
    if (class_name) {
      const duplicate = await Class.findOne({
        where: {
          class_name,
          school_id,
          deleted_at: null,
          id: { [Op.ne]: existingClass.id },
        },
      });

      if (duplicate) {
        return ResponseHelper.BadRequest(
          res,
          "Class name already exists!",
          "Update Class API"
        );
      }
    }

    // -------- Update Class Name --------
    await existingClass.update({
      class_name: class_name || existingClass.class_name,
    });

    // -------- Soft Delete Class Sections --------
    if (
      Array.isArray(class_sections_to_delete) &&
      class_sections_to_delete.length > 0
    ) {
      await ClassSection.update(
        { deleted_at: new Date() },
        {
          where: {
            class_section_uuid: class_sections_to_delete,
            class_id: existingClass.id,
            deleted_at: null,
          },
        }
      );
    }

    // -------- UPDATE & CREATE SECTION LOGIC --------
    if (Array.isArray(class_sections) && class_sections.length > 0) {
      for (const section of class_sections) {
        const { class_section_uuid, class_section_name, stream_uuid } = section;

        if (!class_section_name) continue;

        // Resolve Stream ID
        let stream_id = null;
        if (stream_uuid) {
          const stream = await Stream.findOne({
            where: { stream_uuid, deleted_at: null },
          });
          stream_id = stream ? stream.id : null;
        }

        // --------- DUPLICATE SECTION VALIDATION ----------
        const duplicateSection = await ClassSection.findOne({
          where: {
            class_id: existingClass.id,
            class_section_name,
            stream_id,
            deleted_at: null,
            ...(class_section_uuid && {
              class_section_uuid: { [Op.ne]: class_section_uuid },
            }),
          },
        });

        if (duplicateSection) {
          return ResponseHelper.BadRequest(
            res,
            `Section "${class_section_name}" already exists!`,
            "Update Class API"
          );
        }

        // --------- RESTORE SOFT-DELETED SECTION ----------
        const deletedSection = await ClassSection.findOne({
          where: {
            class_id: existingClass.id,
            class_section_name,
            stream_id,
            deleted_at: { [Op.ne]: null },
          },
          paranoid: false,
        });

        if (deletedSection) {
          await deletedSection.update({
            deleted_at: null,
            class_section_name,
            stream_id,
          });

          continue; // go to next section
        }

        // --------- UPDATE EXISTING SECTION ----------
        if (class_section_uuid) {
          const existingSection = await ClassSection.findOne({
            where: {
              class_section_uuid,
              class_id: existingClass.id,
              deleted_at: null,
            },
          });

          if (existingSection) {
            await existingSection.update({
              class_section_name,
              stream_id,
            });
            continue;
          }
        }

        // --------- CREATE NEW SECTION ----------
        await ClassSection.create({
          class_section_name,
          class_id: existingClass.id,
          stream_id,
        });
      }
    }

    return ResponseHelper.OK(
      res,
      true,
      "Class updated successfully!",
      null,
      null,
      "Update Class API"
    );
  } catch (error) {
    return ResponseHelper.ISError(
      res,
      error.message || "Failed to update class",
      "Update Class API"
    );
  }
};

export const fetchClassDetails = async (req, res) => {
  try {
    const { class_uuid } = req.params;
    const school_uuid = req.credentials.schoolUuid;

    const school_id = await CommonHelper.getIdFromUuid(
      Schools,
      school_uuid,
      res,
      "Fetch Class Details API",
      "school_uuid"
    );
    if (!school_id)
      return ResponseHelper.NotFound(
        res,
        false,
        "School not found !",
        "Fetch Class Details API"
      );

    const classDetails = await Class.findOne({
      where: { class_uuid, school_id, deleted_at: null },
      attributes: {
        exclude: ["created_at", "updated_at", "deleted_at", "school_id"],
      },
      include: [
        {
          model: ClassSection,
          separate: true,
          order: [["class_section_name", "ASC"]],
          where: {
            deleted_at: null,
          },

          attributes: [
            "class_section_uuid",
            "class_section_name",

            // 👇 COUNT STUDENTS
            [
              literal(`(
                SELECT COUNT(*) 
                FROM students AS s 
                WHERE s.class_section_id = ClassSection.id 
                AND s.deleted_at IS NULL
              )`),
              "student_count",
            ],

            // 👇 COUNT TEACHERS
            [
              literal(`(
                SELECT COUNT(*) 
                FROM teacher_class_map AS tcm 
                WHERE tcm.class_section_id = ClassSection.id 
                AND tcm.deleted_at IS NULL
              )`),
              "teacher_count",
            ],
          ],
          include: [
            {
              model: Stream,
              attributes: ["stream_uuid", "stream_name"],
            },
          ],
        },
      ],
    });

    if (!classDetails) {
      return ResponseHelper.OK(
        res,
        false,
        "Class not found",
        null,
        null,
        "Fetch Class Details API"
      );
    }

    return ResponseHelper.OK(
      res,
      true,
      "Class details fetched successfully!",
      classDetails,
      null,
      "Fetch Class Details API"
    );
  } catch (error) {
    return ResponseHelper.ISError(
      res,
      error.message || "Failed to fetch class details",
      "Fetch Class Details API"
    );
  }
};

//// ============CLASS SECTION APIS=============

export const getClassSectionsList = async (req, res) => {
  try {
    const { class_uuid } = req.params;
    const { search = "", page = 1, limit = 10 } = req.query;
    const school_uuid = req.credentials.schoolUuid;
    if (!school_uuid) {
      return ResponseHelper.BadRequest(
        res,
        "School UUID missing in credentials",
        "Get Class Sections API"
      );
    }
    const pageInt = parseInt(page, 10);
    const limitInt = parseInt(limit, 10);
    const offset = (pageInt - 1) * limitInt;

    const searchFields = [
      "class_section_name",
      "class_section_uuid",
      "stream_id",
    ];
    const searchClause = buildSearchQuery(search.trim(), searchFields);

    const whereClause = {
      deleted_at: null,
      ...(searchClause || {}),
    };

    const { rows: classSections, count } = await ClassSection.findAndCountAll({
      include: [
        {
          model: Class,
          where: { class_uuid, deleted_at: null },
          attributes: ["class_name"],
        },
        {
          model: Stream,
          attributes: ["stream_name"],
        },
      ],
      where: whereClause,
      attributes: ["class_section_uuid", "class_section_name", "stream_id"],
      limit: limitInt,
      offset,
      order: [["id", "ASC"]],
    });

    if (!classSections || classSections.length === 0) {
      return ResponseHelper.OK(
        res,
        false,
        "No class sections found for this class",
        null,
        null,
        "Get Class Sections API"
      );
    }

    const meta = {
      totalCount: count || 0,
      pageCount: Math.ceil((count || 0) / limitInt),
      currentPage: pageInt,
      perPage: limitInt,
      hasNextPage: pageInt < Math.ceil((count || 0) / limitInt),
      hasPrevPage: pageInt > 1,
    };

    return ResponseHelper.OK(
      res,
      true,
      "Class sections retrieved successfully!",
      classSections,
      meta,
      "Get Class Sections API"
    );
  } catch (error) {
    return ResponseHelper.ISError(
      res,
      error.message || "Failed to retrieve class sections",
      "Get Class Sections API"
    );
  }
};

export const addClassSection = async (req, res) => {
  try {
    const { class_section_name, class_uuid, stream_uuid } = req.body;
    const school_uuid = req.credentials.schoolUuid;

    let existingStream;

    const existingClassSection = await ClassSection.findOne({
      include: [
        {
          model: Class,
          where: { class_uuid, deleted_at: null },
          attributes: ["class_name"],
        },
      ],
      where: { class_section_name, deleted_at: null },
      attributes: ["class_section_name"],
    });

    if (existingClassSection) {
      return ResponseHelper.Conflict(
        res,
        "Class section already exists!",
        null,
        "Add Class Section Add API"
      );
    }

    const existingClass = await Class.findOne({
      where: { class_uuid, deleted_at: null },
      include: [
        {
          model: Schools,
          where: { school_uuid, deleted_at: null }, // filter by UUID here
          attributes: [], // expose UUID not ID
        },
      ],
    });

    if (!existingClass) {
      return ResponseHelper.OK(
        res,
        false,
        "Selected class not found !",
        null,
        null,
        "Add Class Section Add API"
      );
    }

    if (stream_uuid) {
      existingStream = await Stream.findOne({
        where: { stream_uuid, deleted_at: null },
        include: [
          {
            model: Schools,
            where: { school_uuid, deleted_at: null }, // filter by UUID here
            attributes: [], // expose UUID not ID
          },
        ],
        attributes: ["id"],
      });

      if (!existingStream) {
        return ResponseHelper.OK(
          res,
          false,
          "Selected stream not found !",
          null,
          null,
          "Add Class Section Add API"
        );
      }
    }

    const newClassSection = await ClassSection.create({
      class_section_name,
      class_id: existingClass?.id,
      stream_id: existingStream?.id || null,
    });

    return ResponseHelper.Created(
      res,
      true,
      "Section added successfully!",
      null,
      null,
      "Add Class Section Add API"
    );
  } catch (error) {
    return ResponseHelper.ISError(
      res,
      error.message || "Failed to add stream",
      "Add Class Section Add API"
    );
  }
};

export const deleteClassSection = async (req, res) => {
  try {
    const { class_section_uuid } = req.params;
    const school_uuid = req.credentials.schoolUuid;
    if (!school_uuid) {
      return ResponseHelper.BadRequest(
        res,
        "School UUID missing in credentials",
        "Delete Class Section API"
      );
    }
    // Find the class section and ensure it belongs to the school
    const classSection = await ClassSection.findOne({
      where: { class_section_uuid, deleted_at: null },
      include: [
        {
          model: Class,
          include: [
            {
              model: Schools,
              where: { school_uuid, deleted_at: null },
              attributes: [],
            },
          ],
          attributes: [],
        },
      ],
    });
    if (!classSection) {
      return ResponseHelper.NotFound(
        res,
        "Class section not found for this school",
        "Delete Class Section API"
      );
    }
    await classSection.update({ deleted_at: new Date() });
    return ResponseHelper.OK(
      res,
      true,
      "Class section deleted successfully!",
      null,
      null,
      "Delete Class Section API"
    );
  } catch (error) {
    return ResponseHelper.ISError(
      res,
      error.message || "Failed to delete class section",
      "Delete Class Section API"
    );
  }
};

export const updateClassSection = async (req, res) => {
  try {
    const { class_section_uuid } = req.params;
    const { class_section_name, stream_uuid } = req.body;
    const school_uuid = req.credentials.schoolUuid;
    if (!school_uuid) {
      return ResponseHelper.BadRequest(
        res,
        "School UUID missing in credentials",
        "Update Class Section API"
      );
    }
    // Find the class section and ensure it belongs to the school
    const classSection = await ClassSection.findOne({
      where: { class_section_uuid, deleted_at: null },
      include: [
        {
          model: Class,
          include: [
            {
              model: Schools,
              where: { school_uuid, deleted_at: null },
              attributes: [],
            },
          ],
          attributes: [],
        },
      ],
    });
    if (!classSection) {
      return ResponseHelper.NotFound(
        res,
        "Class section not found for this school",
        "Update Class Section API"
      );
    }
    let stream_id = classSection.stream_id;
    if (stream_uuid) {
      const stream = await Stream.findOne({
        where: { stream_uuid, deleted_at: null },
      });
      if (!stream) {
        return ResponseHelper.NotFound(
          res,
          "Stream not found",
          "Update Class Section API"
        );
      }
      stream_id = stream.id;
    }
    await classSection.update({
      class_section_name: class_section_name || classSection.class_section_name,
      stream_id,
    });
    return ResponseHelper.OK(
      res,
      true,
      "Class section updated successfully!",
      classSection,
      null,
      "Update Class Section API"
    );
  } catch (error) {
    return ResponseHelper.ISError(
      res,
      error.message || "Failed to update class section",
      "Update Class Section API"
    );
  }
};

export const deleteClass = async (req, res) => {
  try {
    const { class_uuid } = req.params;
    const school_uuid = req.credentials.schoolUuid;
    if (!school_uuid) {
      return ResponseHelper.BadRequest(
        res,
        "School UUID missing in credentials",
        "Delete Class Section API"
      );
    }
    // Find the class section and ensure it belongs to the school
    const classDetail = await Class.findOne({
      where: { class_uuid, deleted_at: null },
      include: [
        {
          model: Schools,
          where: { school_uuid, deleted_at: null },
          attributes: [],
        },
      ],
    });
    if (!classDetail) {
      return ResponseHelper.NotFound(
        res,
        "Class details not found",
        "Delete Class API"
      );
    }
    await classDetail.destroy();

    await ClassSection.update(
      { deleted_at: new Date() },
      {
        where: {
          class_id: classDetail?.id,
        },
      }
    );

    return ResponseHelper.OK(
      res,
      true,
      "Class successfully deleted!",
      null,
      null,
      "Delete Class API"
    );
  } catch (error) {
    return ResponseHelper.ISError(
      res,
      error.message || "Failed to delete class section",
      "Delete Class API"
    );
  }
};
