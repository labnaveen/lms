import CommonHelper from "../helpers/CommonHelper.js";
import ResponseHelper from "../helpers/ResponseHelper.js";
import Schools from "../models/SchoolsModal.js";
import Stream from "../models/StreamModel.js";
import { literal, Op } from "sequelize";
import { buildSearchQuery } from "../utils/searchHelper.js";
import db from "../config/db.config.js";
import ClassSection from "../models/ClassSectionModel.js";
import SchoolSubjectStreamLink from "../models/SchoolSubjectStreamModel.js";
import SchoolSubject from "../models/SchoolSubjectModel.js";
import Subject from "../models/SubjectModel.js";
import { USER_ROLE } from "../constants/Constants.js";
import TeacherClassMap from "../models/TeacherClassMapModal.js";
import Teacher from "../models/TeacherModel.js";

export const getStreamsList = async (req, res) => {
  try {
    const {schoolUuid: school_uuid, roleId, id } = req.credentials;
    const { search = "", page = 1, limit = 10 } = req.query;
    const pageInt = parseInt(page, 10);
    const limitInt = parseInt(limit, 10);
    const offset = (pageInt - 1) * limitInt;

    const school_id = await CommonHelper.getIdFromUuid(
      Schools,
      school_uuid,
      res,
      "Get Streams List API",
      "school_uuid"
    );
    if (!school_id)
      return ResponseHelper.NotFound(
        res,
        false,
        "School not found !",
        "Get Streams List API"
      );

    const searchFields = ["stream_name", "stream_description"];
    const searchClause = buildSearchQuery(search.trim(), searchFields);

    const whereClause = {
      school_id,
      ...(searchClause || {}),
    };

    if (roleId === USER_ROLE.TEACHER) {
      const teacherClasses = await TeacherClassMap.findAll({
        where: { deleted_at: null },
        include: [
          {
            model: ClassSection,
            attributes: ["stream_id"],
            where: { deleted_at: null, stream_id: { [Op.ne]: null } },
          },
          {
            model: Teacher,
            where: { user_id: id, deleted_at: null },
            required: true,
          },
        ],
      });

      // To get unique array of stream_id
      const teacherStreamIds = [
        ...new Set(teacherClasses.map((tc) => tc.ClassSection.stream_id)),
      ];

      if (teacherStreamIds.length === 0) {
        return ResponseHelper.OK(
          res,
          true,
          "No streams assigned to this teacher.",
          [],
          null,
          "Get Class List API"
        );
      }

      if (teacherStreamIds.length > 0) {
        whereClause.id = teacherStreamIds;
      }
    }
    const { rows: streams, count } = await Stream.findAndCountAll({
      where: whereClause,
      attributes: {
        exclude: ["created_at", "updated_at", "deleted_at", "school_id"],
        include: [
          [
            literal(`(
                    SELECT COUNT(*)
                    FROM school_subject_stream_links AS s
                    WHERE s.stream_id = Stream.id
                    AND s.deleted_at IS NULL
                )`),
            "total_subjects",
          ],

          [
            literal(`(
                    SELECT COUNT(*)
                    FROM class_section AS s
                    WHERE s.stream_id = Stream.id
                    AND s.deleted_at IS NULL
                )`),
            "total_sections",
          ],
        ],
      },
      limit: limitInt,
      offset,
      order: [["id", "DESC"]],
    });

    if (!streams.length) {
      return ResponseHelper.OK(
        res,
        false,
        "No streams found!",
        null,
        null,
        "Get Streams List API"
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
      "Streams list fetched successfully!",
      streams,
      meta,
      "Get Streams List API"
    );
  } catch (error) {
    return ResponseHelper.ISError(
      res,
      error.message || "Failed to retrieve streams list",
      "Get Streams List API"
    );
  }
};

export const addStream = async (req, res) => {
  const t = await db.transaction();
  try {
    const { stream_name, stream_description } = req.body;
    const school_uuid = req.credentials.schoolUuid;

    const school_id = await CommonHelper.getIdFromUuid(
      Schools,
      school_uuid,
      res,
      "Add Stream API",
      "school_uuid"
    );
    if (!school_id) {
      await t.rollback();
      return ResponseHelper.NotFound(
        res,
        false,
        "School not found !",
        "Add Stream API"
      );
    }

    if (!stream_name) {
      await t.rollback();
      return ResponseHelper.BadRequest(
        res,
        "Stream name is required",
        "Add Stream API"
      );
    }

    const existingStream = await Stream.findOne({
      where: { stream_name, school_id },
      transaction: t,
    });

    if (existingStream) {
      await t.rollback();
      return ResponseHelper.BadRequest(
        res,
        "Stream already exists !",
        "Add Stream API"
      );
    }

    const newStream = await Stream.create(
      {
        stream_name,
        stream_description: stream_description || null,
        school_id,
      },
      { transaction: t }
    );

    await t.commit();
    return ResponseHelper.Created(
      res,
      true,
      "Stream added successfully!",
      newStream,
      null,
      "Add Stream API"
    );
  } catch (error) {
    await t.rollback();
    return ResponseHelper.ISError(
      res,
      error.message || "Failed to add stream",
      "Add Stream API"
    );
  }
};

export const updateStream = async (req, res) => {
  const t = await db.transaction();
  try {
    const { stream_uuid } = req.params;
    const { stream_name, stream_description } = req.body;
    const school_uuid = req.credentials.schoolUuid;

    const school_id = await CommonHelper.getIdFromUuid(
      Schools,
      school_uuid,
      res,
      "Update Stream API",
      "school_uuid"
    );
    if (!school_id) {
      await t.rollback();
      return ResponseHelper.NotFound(
        res,
        false,
        "School not found !",
        "Update Stream API"
      );
    }

    if (!stream_name) {
      await t.rollback();
      return ResponseHelper.BadRequest(
        res,
        "Stream name is required",
        "Update Stream API"
      );
    }

    const existingStream = await Stream.findOne({
      where: { stream_uuid },
      transaction: t,
    });
    if (!existingStream) {
      await t.rollback();
      return ResponseHelper.OK(
        res,
        false,
        "Stream not found",
        null,
        null,
        "Update Stream API"
      );
    }

    const duplicateStream = await Stream.findOne({
      where: {
        stream_name,
        school_id,
        stream_uuid: { [Op.ne]: stream_uuid },
      },
      transaction: t,
    });

    if (duplicateStream) {
      await t.rollback();
      return ResponseHelper.BadRequest(
        res,
        "Another stream with this name already exists for the selected school",
        "Update Stream API"
      );
    }

    await existingStream.update(
      {
        stream_name,
        stream_description: stream_description || null,
        school_id,
      },
      { transaction: t }
    );

    await t.commit();
    return ResponseHelper.OK(
      res,
      true,
      "Stream updated successfully!",
      existingStream,
      null,
      "Update Stream API"
    );
  } catch (error) {
    await t.rollback();
    return ResponseHelper.ISError(
      res,
      error.message || "Failed to update stream",
      "Update Stream API"
    );
  }
};

export const deleteStream = async (req, res) => {
  const t = await db.transaction();
  try {
    const { stream_uuid } = req.params;
    const school_uuid = req.credentials.schoolUuid;

    const school_id = await CommonHelper.getIdFromUuid(
      Schools,
      school_uuid,
      res,
      "Delete Stream API",
      "school_uuid"
    );
    if (!school_id) {
      await t.rollback();
      return ResponseHelper.NotFound(
        res,
        false,
        "School not found !",
        "Delete Stream API"
      );
    }

    const existingStream = await Stream.findOne({
      where: { stream_uuid, school_id },
      transaction: t,
    });

    if (!existingStream) {
      await t.rollback();
      return ResponseHelper.NotFound(
        res,
        "Stream not found",
        "Delete Stream API"
      );
    }

    await Stream.destroy({
      where: { stream_uuid, school_id },
      transaction: t,
    });

    await t.commit();
    return ResponseHelper.OK(
      res,
      true,
      "Stream deleted successfully!",
      null,
      null,
      "Delete Stream API"
    );
  } catch (error) {
    await t.rollback();
    return ResponseHelper.ISError(
      res,
      error.message || "Failed to delete stream",
      "Delete Stream API"
    );
  }
};

export const fetchStreamDetails = async (req, res) => {
  const t = await db.transaction();
  try {
    const { stream_uuid } = req?.params;
    const school_uuid = req?.credentials?.schoolUuid;

    const school_id = await CommonHelper.getIdFromUuid(
      Schools,
      school_uuid,
      res,
      "Fetch Stream Details API",
      "school_uuid"
    );
    if (!school_id) {
      await t.rollback();
      return ResponseHelper.NotFound(
        res,
        false,
        "School not found !",
        "Fetch Stream Details API"
      );
    }

    const streamOptions = {
      where: { stream_uuid, school_id },
      attributes: {
        exclude: ["created_at", "updated_at", "deleted_at", "school_id"],
      },
      include: [
        {
          model: Schools,
          attributes: ["school_uuid", "name", "address", "phone", "email"],
        },

        {
          model: ClassSection,
          attributes: ["class_section_name"],
        },

        {
          model: SchoolSubjectStreamLink,
          attributes: ["school_subject_stream_link_uuid"],
          include: [
            {
              model: SchoolSubject,
              attributes: ["school_subject_uuid"],
              include: [
                {
                  model: Subject,
                  attributes: ["subject_name", "subject_code"],
                },
              ],
            },
          ],
        },
      ],
      transaction: t,
    };
    const stream = await Stream.findOne(streamOptions);

    if (!stream) {
      await t.rollback();
      return ResponseHelper.OK(
        res,
        false,
        "Stream not found",
        null,
        null,
        "Fetch Stream Details API"
      );
    }

    await t.commit();
    return ResponseHelper.OK(
      res,
      true,
      "Stream details fetched successfully!",
      stream,
      null,
      "Fetch Stream Details API"
    );
  } catch (error) {
    await t.rollback();
    return ResponseHelper.ISError(
      res,
      error.message || "Failed to fetch stream details",
      "Fetch Stream Details API"
    );
  }
};
