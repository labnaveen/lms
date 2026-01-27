import { addChapter, updateChapter, deleteChapter, listChapters, fetchChapterDetails } from "../controllers/chapterController.js";
import Auth from "../middlewares/Auth.js";
import { checkPermission } from "../middlewares/CheckPermission.js";
import { PERMISSIONS } from "../constants/Constants.js";
import { validateBody } from "../middlewares/ValidateRequest.js";
import { addAndUpdateChapterSchema } from "../schemas/chapterJoiSchema.js";
import { Router } from "express";

const chaptersRouter = Router();

chaptersRouter.post("/", Auth.authenticate(), checkPermission(PERMISSIONS.CREATE_CHAPTER), validateBody(addAndUpdateChapterSchema), addChapter);
chaptersRouter.put("/:chapter_uuid", Auth.authenticate(), checkPermission(PERMISSIONS.UPDATE_CHAPTER), validateBody(addAndUpdateChapterSchema), updateChapter);
chaptersRouter.delete("/:chapter_uuid", Auth.authenticate(), checkPermission(PERMISSIONS.DELETE_CHAPTER), deleteChapter);
chaptersRouter.get("/", Auth.authenticate(), checkPermission(PERMISSIONS.READ_CHAPTER), listChapters);
chaptersRouter.get("/:chapter_uuid", Auth.authenticate(), checkPermission(PERMISSIONS.READ_CHAPTER), fetchChapterDetails);

export default chaptersRouter;
