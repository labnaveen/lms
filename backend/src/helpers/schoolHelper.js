// helpers/schoolHelper.js
import School from "../models/SchoolsModal.js";
import ResponseHelper from "./ResponseHelper.js";

/**
 * Returns the numeric ID from UUID for any model.
 * @param {Object} model - Sequelize model to query (e.g., School, Stream, Teacher)
 * @param {string} uuid - The UUID value to lookup
 * @param {Object} res - Express response object
 * @param {string} apiName - Optional API name for logging in responses
 * @param {string} uuidField - Optional name of the UUID field in the model (default: 'uuid')
 * @returns {number|null} - Returns the numeric ID or null if not found (response is sent)
 */
export const getIdFromUuid = async (model, uuid, res, apiName = "API", uuidField = "uuid") => {
  if (!uuid) {
    ResponseHelper.BadRequest(res, `${model.name} UUID is required`, apiName);
    return null;
  }

  const record = await model.findOne({ where: { [uuidField]: uuid } });
  if (!record) {
    ResponseHelper.NotFound(res, `${model.name} not found`, apiName);
    return null;
  }

  return record.id;
};


/**
 * Returns school ID from UUID.
 * Throws an error if school not found.
//  */
// export const getSchoolIdFromUuid = async (school_uuid, res, apiName = "API") => {
//   if (!school_uuid) {
//     ResponseHelper.BadRequest(res, "School UUID is required in headers", apiName);
//     return null;
//   }

//   const school = await School.findOne({ where: { school_uuid: school_uuid } });
//   if (!school) {
//     ResponseHelper.NotFound(res, "School not found", apiName);
//     return null;
//   }

//   return school.id;
// };
