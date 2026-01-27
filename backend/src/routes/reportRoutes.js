import Auth from "../middlewares/Auth.js";
import { checkPermission } from "../middlewares/CheckPermission.js";
import { PERMISSIONS } from "../constants/Constants.js";
import { validateBody } from "../middlewares/ValidateRequest.js";
import { addAndUpdateChapterSchema } from "../schemas/chapterJoiSchema.js";
import { Router } from "express";
import { courseReport, studentWiseAcademicProgressReport, subjectWiseReport, teacherWiseContentUploadedReport } from "../controllers/reportController.js";

const reportRoutes = Router();
reportRoutes.get("/subject-wise-report", Auth.authenticate(), subjectWiseReport);
reportRoutes.get("/student-wise-academic-progress-report", Auth.authenticate(), studentWiseAcademicProgressReport);
reportRoutes.get("/teacher-wise-content-uploaded-report", Auth.authenticate(), checkPermission(PERMISSIONS.TEACHER_CONTENT_REPORT), teacherWiseContentUploadedReport);
reportRoutes.get("/course-report", Auth.authenticate(), courseReport);
// reportRoutes.put("/:chapter_uuid", Auth.authenticate(), checkPermission(PERMISSIONS.UPDATE_CHAPTER), validateBody(addAndUpdateChapterSchema), updateChapter);
// reportRoutes.delete("/:chapter_uuid", Auth.authenticate(), checkPermission(PERMISSIONS.DELETE_CHAPTER), deleteChapter);
// reportRoutes.get("/", Auth.authenticate(), checkPermission(PERMISSIONS.READ_CHAPTER), listChapters);
// reportRoutes.get("/:chapter_uuid", Auth.authenticate(), checkPermission(PERMISSIONS.READ_CHAPTER), fetchChapterDetails);

export default reportRoutes;
