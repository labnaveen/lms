import { Router } from "express";
import Auth from "../middlewares/Auth.js";
import { checkPermission } from "../middlewares/CheckPermission.js";
import { PERMISSIONS } from "../constants/Constants.js";
import {
    addClass,
    addClassSection,
    getClassList,
    getClassSectionsList,
    deleteClassSection,
    updateClassSection,
    fetchClassDetails,
    updateClass,
    deleteClass,
} from "../controllers/classAndClassSectionController.js";
import { validateBody } from "../middlewares/ValidateRequest.js";
import { addEditClassSchema } from "../schemas/classAndClassSectionJoiSchema.js";

const classAndClassSectionRouter = Router();

classAndClassSectionRouter.get("/", Auth.authenticate(), checkPermission(PERMISSIONS.READ_CLASS), getClassList);
classAndClassSectionRouter.get("/:class_uuid", Auth.authenticate(), checkPermission(PERMISSIONS.READ_CLASS), fetchClassDetails);
classAndClassSectionRouter.post("/", Auth.authenticate(), checkPermission(PERMISSIONS.CREATE_CLASS), validateBody(addEditClassSchema), addClass);
classAndClassSectionRouter.put("/:class_uuid", Auth.authenticate(), checkPermission(PERMISSIONS.UPDATE_CLASS), validateBody(addEditClassSchema), updateClass);
classAndClassSectionRouter.delete("/:class_uuid", Auth.authenticate(), checkPermission(PERMISSIONS.DELETE_CLASS), deleteClass);

// classAndClassSectionRouter.put("/:stream_uuid",Auth.authenticate(), updateStream);

//// CLASS SECTION ROUTES
classAndClassSectionRouter.get("/sections-list/:class_uuid", Auth.authenticate(), checkPermission(PERMISSIONS.READ_CLASS), getClassSectionsList);
classAndClassSectionRouter.post("/sections-list/", Auth.authenticate(), checkPermission(PERMISSIONS.CREATE_CLASS), addClassSection);
classAndClassSectionRouter.delete("/sections-list/:class_section_uuid", Auth.authenticate(), checkPermission(PERMISSIONS.DELETE_CLASS), deleteClassSection);
classAndClassSectionRouter.put("/sections-list/:class_section_uuid", Auth.authenticate(), checkPermission(PERMISSIONS.UPDATE_CLASS), updateClassSection);

export default classAndClassSectionRouter;
