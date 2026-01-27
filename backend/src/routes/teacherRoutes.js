import { Router } from "express";
import { allTeachersList, createTeacher, deleteTeacher, qualificationDropdown, singleTeacherDetails, teachersCategoriesDropdown, teachersPostDropdown, updateTeacher } from "../controllers/teacherController.js";
import { checkPermission } from "../middlewares/CheckPermission.js";
import { PERMISSIONS } from "../constants/Constants.js";
import Auth from "../middlewares/Auth.js";
import Uploader from "../middlewares/Uploader.js";

const teacherRouter = Router();

teacherRouter.get("/teachers-categories", teachersCategoriesDropdown);
teacherRouter.get("/teachers-post", teachersPostDropdown);
teacherRouter.get("/teachers-qualifications", qualificationDropdown);
teacherRouter.get("/teachers-details/:teacherUuid",Auth.authenticate(), singleTeacherDetails);
teacherRouter.post("/add-teacher", Auth.authenticate(), checkPermission(PERMISSIONS.CREATE_TEACHER), Uploader.uploadSingleFile("public/profile_images", "profileImage"), createTeacher);
teacherRouter.put("/update-teacher/:teacherUuid", Auth.authenticate(), checkPermission(PERMISSIONS.UPDATE_TEACHER), Uploader.uploadSingleFile("public/profile_images", "profileImage"), updateTeacher);
teacherRouter.get(
    "/teachersList",
    // checkPermission(PERMISSIONS.READ_TEACHER),
    allTeachersList
);
teacherRouter.delete("/delete-teacher/:teacher_uuid", Auth.authenticate(), checkPermission(PERMISSIONS.DELETE_TEACHER), deleteTeacher);

export default teacherRouter;
