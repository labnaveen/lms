import { Router } from "express";
import Auth from "../middlewares/Auth.js";
import { checkPermission } from "../middlewares/CheckPermission.js";
import { PERMISSIONS } from "../constants/Constants.js";
import { validateBody } from "../middlewares/ValidateRequest.js";
import {
    addSyllabus,
    getSyllabusList,
    updateSyllabus,
    removeSyllabus,
    fetchSyllabusDetails,
    addSyllabusChapterResource,
    updateSyllabusChapterResource,
    deleteSyllabusChapterResource,
    fetchSyllabusChapterResourceDetails,
    getSyllabusChapterResourceList,
    removeSyllabusChapter,
} from "../controllers/syllabusController.js";
import { addEditSyllabusSchema } from "../schemas/syllabusJoiSchema.js";
import { addEditSyllabusChapterResourceSchema } from "../schemas/syllabusJoiSchema.js";
import Uploader from "../middlewares/Uploader.js";

const syllabusRouter = Router();

syllabusRouter.get("/", Auth.authenticate(), checkPermission(PERMISSIONS.READ_SYLLABUS), getSyllabusList);
syllabusRouter.post(
    "/",
    Auth.authenticate(),
    checkPermission(PERMISSIONS.CREATE_SYLLABUS),
    Uploader.uploadMultipleFiles("public/chapter_resource_images"),
    validateBody(addEditSyllabusSchema),
    addSyllabus
);
syllabusRouter.put(
    "/:syllabus_uuid",
    Auth.authenticate(),
    checkPermission(PERMISSIONS.UPDATE_SYLLABUS),
    Uploader.uploadMultipleFiles("public/chapter_resource_images"),
    validateBody(addEditSyllabusSchema),
    updateSyllabus
);
syllabusRouter.delete("/:syllabus_uuid", Auth.authenticate(), checkPermission(PERMISSIONS.DELETE_SYLLABUS), removeSyllabus);
syllabusRouter.get("/:syllabus_uuid", Auth.authenticate(), checkPermission(PERMISSIONS.READ_SYLLABUS), fetchSyllabusDetails);
syllabusRouter.delete("/syllabus-chapter/:syllabus_chapter_uuid", Auth.authenticate(), removeSyllabusChapter);

syllabusRouter.post(
    "/chapter-resource",
    Auth.authenticate(),
    checkPermission(PERMISSIONS.CREATE_SYLLABUS),
    validateBody(addEditSyllabusChapterResourceSchema),
    Uploader.uploadMultipleFiles("public/chapter_resource_images"),
    addSyllabusChapterResource
);

syllabusRouter.put(
    "/chapter-resource/:resource_uuid",
    Auth.authenticate(),
    checkPermission(PERMISSIONS.UPDATE_SYLLABUS),
    validateBody(addEditSyllabusChapterResourceSchema),
    Uploader.uploadMultipleFiles("public/chapter_resource_images"),
    updateSyllabusChapterResource
);

syllabusRouter.delete("/chapter-resource/:resource_uuid", Auth.authenticate(), checkPermission(PERMISSIONS.DELETE_SYLLABUS), deleteSyllabusChapterResource);

syllabusRouter.get("/chapter-resource/:resource_uuid", Auth.authenticate(), checkPermission(PERMISSIONS.READ_SYLLABUS), fetchSyllabusChapterResourceDetails);

syllabusRouter.get("/chapter-resource-list/:syllabus_chapter_uuid", Auth.authenticate(), checkPermission(PERMISSIONS.READ_SYLLABUS), getSyllabusChapterResourceList);
// syllabusRouter.put("/:stream_uuid",Auth.authenticate(), updateStream);

//// CLASS SECTION ROUTES
// syllabusRouter.get("/sections-list/:class_uuid", Auth.authenticate(), checkPermission(PERMISSIONS.READ_CLASS),getClassSectionsList);
// syllabusRouter.post("/sections-list/", Auth.authenticate(), checkPermission(PERMISSIONS.CREATE_CLASS),addClassSection);

export default syllabusRouter;
