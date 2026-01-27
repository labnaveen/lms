import db from "../config/db.config.js";
import CommonHelper from "../helpers/CommonHelper.js";
import ResponseHelper from "../helpers/ResponseHelper.js";
import sanitizeHtml from "sanitize-html";
import Class from "../models/ClassModel.js";
import Schools from "../models/SchoolsModal.js";
import SchoolSubject from "../models/SchoolSubjectModel.js";
import Stream from "../models/StreamModel.js";
import Subject from "../models/SubjectModel.js";
import SchoolSubjectStreamLink from "../models/SchoolSubjectStreamModel.js";
import { USER_ROLE } from "../constants/Constants.js";
import Teacher from "../models/TeacherModel.js";
import TeacherSubjectMap from "../models/TeacherSubjectMapModal.js";
import TeacherClassMap from "../models/TeacherClassMapModal.js";
import { Op } from "sequelize";
import { buildSearchQuery } from "../utils/searchHelper.js";

export const getSchoolSubjectList = async (req, res) => {
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
      "Get School Subjects List",
      "school_uuid"
    );
    if (!school_id)
      return ResponseHelper.NotFound(
        res,
        false,
        "School not found !",
        "Get School Subjects List"
      );

    const whereCondition = { school_id, deleted_at: null };
    let allowedSchoolSubjectIds = [];

    if (roleId === USER_ROLE.TEACHER) {
      const teacherClassesAndSubjects = await TeacherClassMap.findAll({
        where: { deleted_at: null },
        include: [
          {
            model: Teacher,
            where: { user_id: id, deleted_at: null },
            required: true,
          },
          {
            model: TeacherSubjectMap,
            attributes: ["school_subject_id"],
            where: { deleted_at: null },
            required: true,
          },
        ],
      });

      // To get unique array of school subjectIds

      allowedSchoolSubjectIds = [
        ...new Set(
          teacherClassesAndSubjects.flatMap((tc) =>
            tc.TeacherSubjectMaps.map((ts) => ts.school_subject_id)
          )
        ),
      ];

      if (!allowedSchoolSubjectIds.length) {
        return ResponseHelper.OK(
          res,
          true,
          "No subjects assigned to this teacher",
          [],
          null,
          "Get School Subject List API"
        );
      }

      if (allowedSchoolSubjectIds.length > 0) {
        whereCondition.id = {
          [Op.in]: allowedSchoolSubjectIds,
        };
      }
    }

    const options = {
      limit: limitInt,
      offset,
      distinct: true,
      col: "id",
      where: whereCondition,
      attributes: {
        exclude: [
          "created_at",
          "updated_at",
          "deleted_at",
          "subject_name",
          "id",
          "subject_code",
          "school_id",
          "subject_id",
          "class_id",
          "stream_id",
        ],
      },
      include: [
        { model: Schools, attributes: ["name"] },
        {
          model: Subject,
          attributes: ["subject_name"],
          where: search
            ? {
                subject_name: {
                  [Op.like]: `%${search}%`,
                },
              }
            : undefined,
          required: !!search, // ⭐ VERY IMPORTANT
        },

        { model: Class, attributes: ["class_name"] },
        { model: Stream, attributes: ["Stream_name"] },
        {
          model: SchoolSubjectStreamLink,
          attributes: ["school_subject_stream_link_uuid"],
          include: [
            {
              model: Stream,
              attributes: ["Stream_name"],
            },
          ],
        },
      ],
      order: [["id", "DESC"]],
    };
    const { rows, count } = await SchoolSubject.findAndCountAll(options);
    const totalPages = Math.ceil(count / limitInt);
    const meta = {
      totalCount: count,
      pageCount: totalPages,
      currentPage: pageInt,
      perPage: limitInt,
      hasNextPage: pageInt < totalPages,
      hasPrevPage: pageInt > 1,
    };
    return ResponseHelper.OK(
      res,
      true,
      "Schools subject list fetched successfully!",
      rows,
      meta,
      "Get School Subject List API"
    );
  } catch (error) {
    return ResponseHelper.ISError(
      res,
      error.message || "Failed to retrieve school subject list",
      "Get School Subject List API"
    );
  }
};

export const addSchoolSubject = async (req, res) => {
  const t = await db.transaction();

  try {
    let {
      subject_name,
      subject_code,
      subject_uuid,
      class_uuid,
      stream_uuids,
      max_marks,
      passing_marks,
    } = req.body;
    const school_uuid = req.credentials.schoolUuid;

    // Sanitize strings
    if (subject_name) subject_name = sanitizeHtml(subject_name);
    if (subject_code) subject_code = sanitizeHtml(subject_code);
    subject_uuid = sanitizeHtml(subject_uuid);
    class_uuid = sanitizeHtml(class_uuid);

    let streamIds = [];

    // -------------------------------------------------------
    // STEP 1 → VALIDATE STREAM UUIDs IF PROVIDED
    // -------------------------------------------------------
    if (Array.isArray(stream_uuids) && stream_uuids.length > 0) {
      const streamUuids = stream_uuids.map((uuid) => sanitizeHtml(uuid));

      const streamsList = await Stream.findAll({
        where: { stream_uuid: streamUuids, deleted_at: null },
        transaction: t,
      });

      if (!streamsList || streamsList.length !== streamUuids.length) {
        await t.rollback();
        return ResponseHelper.OK(
          res,
          false,
          "One or more stream details not found!",
          null,
          null,
          "Add School Subject API"
        );
      }

      streamIds = streamsList.map((s) => s.id);
    }

    // Parse marks
    max_marks = parseInt(max_marks);
    passing_marks = parseInt(passing_marks);

    // -------------------------------------------------------
    // STEP 2 → FETCH school_id, subject_id, class_id
    // -------------------------------------------------------
    const school_id = await CommonHelper.getIdFromUuid(
      Schools,
      school_uuid,
      res,
      "Add School Subject API",
      "school_uuid"
    );
    if (!school_id) {
      await t.rollback();
      return ResponseHelper.NotFound(
        res,
        false,
        "School details not found !",
        "Add School Subject API"
      );
    }
    const subject_id = await CommonHelper.getIdFromUuid(
      Subject,
      subject_uuid,
      res,
      "Add School Subject API",
      "subject_uuid"
    );
    if (!subject_id) {
      await t.rollback();
      return ResponseHelper.NotFound(
        res,
        false,
        "Subject details not found !",
        "Add School Subject API"
      );
    }

    const class_id = await CommonHelper.getIdFromUuid(
      Class,
      class_uuid,
      res,
      "Add School Subject API",
      "class_uuid"
    );

    if (!class_id) {
      await t.rollback();
      return ResponseHelper.NotFound(
        res,
        false,
        "Class details not found !",
        "Add School Subject API"
      );
    }

    // -------------------------------------------------------
    // STEP 3 → Check if SchoolSubject exists (NO matter streams)
    // -------------------------------------------------------
    let schoolSubject = await SchoolSubject.findOne({
      where: { school_id, subject_id, class_id, deleted_at: null },
      transaction: t,
    });

    // -------------------------------------------------------
    // CASE 1 → NO STREAMS PROVIDED
    // -------------------------------------------------------
    if (streamIds.length === 0) {
      if (schoolSubject) {
        await t.rollback();
        return ResponseHelper.Conflict(
          res,
          "Subject for this class already exists!",
          null,
          "Add School Subject API"
        );
      }

      // Create subject WITHOUT streams
      schoolSubject = await SchoolSubject.create(
        {
          subject_name,
          subject_code,
          school_id,
          subject_id,
          class_id,
          max_marks,
          passing_marks,
        },
        { transaction: t }
      );

      await t.commit();

      return ResponseHelper.Created(
        res,
        true,
        "Subject added successfully!",
        schoolSubject,
        null,
        "Add School Subject API"
      );
    }

    // -------------------------------------------------------
    // CASE 2 → STREAMS PROVIDED
    // -------------------------------------------------------

    // If subject does not exist → create it
    if (!schoolSubject) {
      schoolSubject = await SchoolSubject.create(
        {
          subject_name,
          subject_code,
          school_id,
          subject_id,
          class_id,
          max_marks,
          passing_marks,
        },
        { transaction: t }
      );
    }

    // Check which stream links already exist
    const existingLinks = await SchoolSubjectStreamLink.findAll({
      where: {
        school_subject_id: schoolSubject.id,
        stream_id: streamIds,
        deleted_at: null,
      },
      transaction: t,
    });

    const existingStreamIds = existingLinks.map((e) => e.stream_id);

    // Filter only NEW streamIds
    const newStreamIds = streamIds.filter(
      (id) => !existingStreamIds.includes(id)
    );

    // Insert only NEW stream links
    if (newStreamIds.length > 0) {
      const links = newStreamIds.map((streamId) => ({
        school_subject_id: schoolSubject.id,
        stream_id: streamId,
      }));

      await SchoolSubjectStreamLink.bulkCreate(links, { transaction: t });
    }

    await t.commit();

    return ResponseHelper.Created(
      res,
      true,
      "Subject added successfully!",
      schoolSubject,
      null,
      "Add School Subject API"
    );
  } catch (error) {
    await t.rollback();
    return ResponseHelper.ISError(
      res,
      error.message || "Failed to add subject",
      "Add School Subject API"
    );
  }
};

// export const addSchoolSubject = async (req, res) => {
//     try {
//         let { subject_name, subject_code, subject_uuid, class_uuid, stream_uuid, max_marks, passing_marks } = req.body;
//         const school_uuid = req.credentials.schoolUuid;

//         let stream_id;

//         if (subject_name) {
//             subject_name = sanitizeHtml(subject_name);
//         }
//         if (subject_code) {
//             subject_code = sanitizeHtml(subject_code);
//         }

//         subject_uuid = sanitizeHtml(subject_uuid);
//         class_uuid = sanitizeHtml(class_uuid);
//         if (stream_uuid) {
//             stream_uuid = sanitizeHtml(stream_uuid);
//         }
//         max_marks = parseInt(max_marks);
//         passing_marks = parseInt(passing_marks);

//         const school_id = await CommonHelper.getIdFromUuid(Schools, school_uuid, res, "Add School Subject API", "school_uuid");
//         if (!school_id) return; // response already sent by helper

//         ////CHECKING AND GETTING SUBJECT ID BY SUBJECT UUID
//         const subject_id = await CommonHelper.getIdFromUuid(Subject, subject_uuid, res, "Add School Subject API", "subject_uuid");
//         if (!subject_id) return; // response already sent by helper

//         ////CHECKING AND GETTING CLASS ID BY SUBJECT UUID
//         const class_id = await CommonHelper.getIdFromUuid(Class, class_uuid, res, "Add School Subject API", "class_uuid");
//         if (!class_id) return; // response already sent by helper

//         if (stream_uuid) {
//             ////CHECKING AND GETTING CLASS ID BY SUBJECT UUID
//             stream_id = await CommonHelper.getIdFromUuid(Stream, stream_uuid, res, "Add School Subject API", "stream_uuid");
//             if (!stream_id) return; // response already sent by helper
//         }

//         const existingSchoolSubject = await SchoolSubject.findOne({
//             where: {
//                 school_id,
//                 subject_id,
//                 class_id,
//                 deleted_at: null,
//             },
//         });

//         if (existingSchoolSubject) {
//             return ResponseHelper.Conflict(res, "Subject already exists !", null, "Add School Subject API");
//         }

//         const schoolSubjectDataToCreate = {
//             subject_name,
//             subject_code,
//             school_id,
//             subject_id,
//             class_id,
//             stream_id,
//             max_marks,
//             passing_marks,
//         };

//         const createdSubject = await SchoolSubject.create(schoolSubjectDataToCreate);

//         // const existingStream = await Stream.findOne({
//         //   where: { stream_name, school_id },
//         // });

//         // if (existingStream) {
//         //   return ResponseHelper.BadRequest(
//         //     res,
//         //     "Stream with this name already exists for the selected school",
//         //     "Add Stream API"
//         //   );
//         // }

//         return ResponseHelper.Created(res, true, "Subject added successfully!", createdSubject, null, "Add School Subject API");
//     } catch (error) {
//         return ResponseHelper.ISError(res, error.message || "Failed to add stream", "Add Stream API");
//     }
// };

// Controller to update a SchoolSubject

export const updateSchoolSubject = async (req, res) => {
  const t = await db.transaction();

  try {
    // -------------------------------------------------------
    // STEP 1 → Extract Params & Body
    // -------------------------------------------------------
    const { school_subject_uuid } = req.params;
    let { stream_uuids, max_marks, passing_marks } = req.body;

    // Sanitize
    const cleanUuid = sanitizeHtml(school_subject_uuid);
    max_marks = parseInt(max_marks);
    passing_marks = parseInt(passing_marks);

    // -------------------------------------------------------
    // STEP 2 → Fetch the SchoolSubject
    // -------------------------------------------------------
    const schoolSubject = await SchoolSubject.findOne({
      where: { school_subject_uuid: cleanUuid, deleted_at: null },
      transaction: t,
    });

    if (!schoolSubject) {
      await t.rollback();
      return ResponseHelper.NotFound(
        res,
        false,
        "School subject not found!",
        "Update School Subject API"
      );
    }

    // -------------------------------------------------------
    // STEP 3 → Validate Stream UUIDs → Convert to IDs
    // -------------------------------------------------------
    let streamIds = [];

    if (Array.isArray(stream_uuids)) {
      const cleanUuids = stream_uuids.map((u) => sanitizeHtml(u));

      if (cleanUuids.length > 0) {
        const streams = await Stream.findAll({
          where: { stream_uuid: cleanUuids, deleted_at: null },
          transaction: t,
        });

        if (!streams || streams.length !== cleanUuids.length) {
          await t.rollback();
          return ResponseHelper.OK(
            res,
            false,
            "One or more stream details not found!",
            null,
            null,
            "Update School Subject API"
          );
        }

        streamIds = streams.map((s) => s.id);
      }
    }

    // -------------------------------------------------------
    // STEP 4 → Update Marks Only
    // -------------------------------------------------------
    await schoolSubject.update(
      { max_marks, passing_marks },
      { transaction: t }
    );

    // -------------------------------------------------------
    // STEP 5 → STREAM SYNC LOGIC (Best Version)
    // -------------------------------------------------------

    // Fetch ALL rows including soft-deleted ones
    const allLinks = await SchoolSubjectStreamLink.findAll({
      where: { school_subject_id: schoolSubject.id },
      paranoid: false, // import: include soft deleted
      transaction: t,
    });

    // Active stream IDs
    const existingActiveStreamIds = allLinks
      .filter((l) => l.deleted_at === null)
      .map((l) => l.stream_id);

    // Soft deleted stream IDs
    const existingSoftDeletedStreamIds = allLinks
      .filter((l) => l.deleted_at !== null)
      .map((l) => l.stream_id);

    // Identify needed operations
    const streamsToAddOrRestore = streamIds.filter(
      (id) => !existingActiveStreamIds.includes(id)
    );

    const streamsToRemove = existingActiveStreamIds.filter(
      (id) => !streamIds.includes(id)
    );

    // -------------------------------------------------------
    // RESTORE soft deleted or ADD new links
    // -------------------------------------------------------
    for (const streamId of streamsToAddOrRestore) {
      const existing = allLinks.find((l) => l.stream_id === streamId);

      if (existing) {
        // Restore soft-deleted link
        await SchoolSubjectStreamLink.update(
          { deleted_at: null },
          {
            where: { id: existing.id },
            paranoid: false,
            transaction: t,
          }
        );
      } else {
        // Insert new link
        await SchoolSubjectStreamLink.create(
          {
            school_subject_id: schoolSubject.id,
            stream_id: streamId,
          },
          { transaction: t }
        );
      }
    }

    // -------------------------------------------------------
    // SOFT DELETE removed streams
    // -------------------------------------------------------

    //  if (streamsToRemove.length > 0) {
    //     await SchoolSubjectStreamLink.update(
    //         { deleted_at: new Date() },
    //         {
    //             where: {
    //                 school_subject_id: schoolSubject.id,
    //                 stream_id: streamsToRemove,
    //             },
    //             paranoid: false,
    //             transaction: t,
    //         }
    //     );
    // }

    if (streamsToRemove.length > 0) {
      await SchoolSubjectStreamLink.destroy({
        where: {
          school_subject_id: schoolSubject.id,
          stream_id: streamsToRemove,
        },
        paranoid: true,
        transaction: t,
      });
    }

    await t.commit();

    return ResponseHelper.OK(
      res,
      true,
      "School subject updated successfully!",
      null,
      null,
      "Update School Subject API"
    );
  } catch (error) {
    await t.rollback();
    return ResponseHelper.ISError(
      res,
      error?.message || "Failed to update subject",
      "Update School Subject API"
    );
  }
};

// export const updateSchoolSubject = async (req, res) => {
//     try {
//         const { school_subject_uuid } = req.params;
//         let { subject_uuid, class_uuid, stream_uuid, max_marks, passing_marks } = req.body;
//         const school_uuid = req.credentials.schoolUuid;
//         let subject_id, class_id, stream_id;
//         if (subject_uuid) subject_uuid = sanitizeHtml(subject_uuid);
//         if (class_uuid) class_uuid = sanitizeHtml(class_uuid);
//         if (stream_uuid) stream_uuid = sanitizeHtml(stream_uuid);
//         max_marks = max_marks ? parseInt(max_marks) : undefined;
//         passing_marks = passing_marks ? parseInt(passing_marks) : undefined;

//         const school_id = await CommonHelper.getIdFromUuid(Schools, school_uuid, res, "Update School Subject API", "school_uuid");
//         if (!school_id) return;

//         const schoolSubject = await SchoolSubject.findOne({ where: { school_subject_uuid, school_id, deleted_at: null } });
//         if (!schoolSubject) {
//             return ResponseHelper.OK(res, false, "School subject not found!", null, null, "Update School Subject API");
//         }
//         if (subject_uuid) {
//             subject_id = await CommonHelper.getIdFromUuid(Subject, subject_uuid, res, "Update School Subject API", "subject_uuid");
//             if (!subject_id) return;
//         }
//         if (class_uuid) {
//             class_id = await CommonHelper.getIdFromUuid(Class, class_uuid, res, "Update School Subject API", "class_uuid");
//             if (!class_id) return;
//         }
//         if (stream_uuid) {
//             stream_id = await CommonHelper.getIdFromUuid(Stream, stream_uuid, res, "Update School Subject API", "stream_uuid");
//             if (!stream_id && stream_uuid) return;
//         }

//         await schoolSubject.update({
//             subject_id: subject_id ?? schoolSubject.subject_id,
//             class_id: class_id ?? schoolSubject.class_id,
//             stream_id: stream_id ?? schoolSubject.stream_id,
//             max_marks: max_marks ?? schoolSubject.max_marks,
//             passing_marks: passing_marks ?? schoolSubject.passing_marks,
//         });

//         return ResponseHelper.OK(res, true, "School subject updated successfully!", null, null, "Update School Subject API");
//     } catch (error) {
//         return ResponseHelper.ISError(res, error.message || "Failed to update school subject", "Update School Subject API");
//     }
// };

export const deleteSchoolSubject = async (req, res) => {
  try {
    const { school_subject_uuid } = req.params;
    const school_uuid = req.credentials.schoolUuid;
    const school_id = await CommonHelper.getIdFromUuid(
      Schools,
      school_uuid,
      res,
      "Delete School Subject API",
      "school_uuid"
    );
    if (!school_id)
      return ResponseHelper.NotFound(
        res,
        false,
        "School not found !",
        "Delete School Subject API"
      );
    const schoolSubject = await SchoolSubject.findOne({
      where: { school_subject_uuid, school_id, deleted_at: null },
    });
    if (!schoolSubject) {
      return ResponseHelper.OK(
        res,
        false,
        "School subject not found!",
        null,
        null,
        "Delete School Subject API"
      );
    }
    await schoolSubject.update({ deleted_at: new Date() });
    return ResponseHelper.OK(
      res,
      true,
      "School subject deleted successfully!",
      null,
      null,
      "Delete School Subject API"
    );
  } catch (error) {
    return ResponseHelper.ISError(
      res,
      error.message || "Failed to delete school subject",
      "Delete School Subject API"
    );
  }
};

export const fetchSchoolSubjectDetails = async (req, res) => {
  try {
    const { school_subject_uuid } = req.params;
    const school_uuid = req.credentials.schoolUuid;
    const school_id = await CommonHelper.getIdFromUuid(
      Schools,
      school_uuid,
      res,
      "Fetch School Subject Details API",
      "school_uuid"
    );
    if (!school_id)
      return ResponseHelper.NotFound(
        res,
        false,
        "School not found !",
        "Fetch School Subject Details API"
      );
    const schoolSubject = await SchoolSubject.findOne({
      where: { school_subject_uuid, school_id, deleted_at: null },
      attributes: {
        exclude: [
          "subject_name",
          "subject_code",
          "school_id",
          "subject_id",
          "class_id",
          "stream_id",
          "id",
          "created_at",
          "updated_at",
          "deleted_at",
        ],
      },
      include: [
        { model: Schools, attributes: ["name"] },
        {
          model: Subject,
          attributes: ["subject_uuid", "subject_name", "subject_code"],
        },
        { model: Class, attributes: ["class_uuid", "class_name"] },
        // { model: Stream, attributes: ["Stream_name"] },
        {
          model: SchoolSubjectStreamLink,
          attributes: ["school_subject_stream_link_uuid"],
          include: [
            {
              model: Stream,
              attributes: ["stream_uuid", "Stream_name"],
            },
          ],
        },
      ],
    });
    if (!schoolSubject) {
      return ResponseHelper.OK(
        res,
        false,
        "School subject details not found!",
        null,
        null,
        "Fetch School Subject Details API"
      );
    }
    return ResponseHelper.OK(
      res,
      true,
      "School subject details fetched successfully!",
      schoolSubject,
      null,
      "Fetch School Subject Details API"
    );
  } catch (error) {
    return ResponseHelper.ISError(
      res,
      error.message || "Failed to fetch school subject details",
      "Fetch School Subject Details API"
    );
  }
};
