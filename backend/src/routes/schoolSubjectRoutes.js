import { Router } from "express";
import Auth from "../middlewares/Auth.js";
import { checkPermission } from "../middlewares/CheckPermission.js";
import { PERMISSIONS } from "../constants/Constants.js";
import { validateBody } from "../middlewares/ValidateRequest.js";
import { addSchoolSubject, getSchoolSubjectList, updateSchoolSubject, deleteSchoolSubject, fetchSchoolSubjectDetails } from "../controllers/schoolSubjectController.js";
import { addSchoolSubjectSchema, updateSchoolSubjectSchema } from "../schemas/schoolSubjectJoiSchema.js";

const schoolSubjectRouter = Router();

schoolSubjectRouter.get("/", Auth.authenticate(), checkPermission(PERMISSIONS.READ_SCHOOL_SUBJECT), getSchoolSubjectList);
schoolSubjectRouter.post("/", Auth.authenticate(), checkPermission(PERMISSIONS.CREATE_SCHOOL_SUBJECT), validateBody(addSchoolSubjectSchema), addSchoolSubject);
schoolSubjectRouter.get("/:school_subject_uuid", Auth.authenticate(), checkPermission(PERMISSIONS.READ_SCHOOL_SUBJECT), fetchSchoolSubjectDetails);
schoolSubjectRouter.put("/:school_subject_uuid", Auth.authenticate(), checkPermission(PERMISSIONS.UPDATE_SCHOOL_SUBJECT), validateBody(updateSchoolSubjectSchema), updateSchoolSubject);
schoolSubjectRouter.delete("/:school_subject_uuid", Auth.authenticate(), checkPermission(PERMISSIONS.DELETE_SCHOOL_SUBJECT), deleteSchoolSubject);
// schoolSubjectRouter.put("/:stream_uuid",Auth.authenticate(), updateStream);

//// CLASS SECTION ROUTES
// schoolSubjectRouter.get("/sections-list/:class_uuid", Auth.authenticate(), checkPermission(PERMISSIONS.READ_CLASS),getClassSectionsList);
// schoolSubjectRouter.post("/sections-list/", Auth.authenticate(), checkPermission(PERMISSIONS.CREATE_CLASS),addClassSection);

export default schoolSubjectRouter;
