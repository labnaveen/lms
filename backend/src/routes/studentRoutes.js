import express from "express";
import { listStudents, addStudent, updateStudent, getStudentDetails, deleteStudent } from "../controllers/studentController.js";
import { checkPermission } from "../middlewares/CheckPermission.js";
import { PERMISSIONS } from "../constants/Constants.js";
import Auth from "../middlewares/Auth.js";
import { addStudentSchema, updateStudentSchema } from "../schemas/studentJoiSchema.js";
import { validateBody } from "../middlewares/ValidateRequest.js";
import Uploader from "../middlewares/Uploader.js";

const router = express.Router();

router.get("/students-list", Auth.authenticate(), listStudents);

router.post("/add-student-details", Auth.authenticate(), Uploader.uploadSingleFile("public/profile_images", "profileImage"), addStudent);

router.put("/update-student-details/:student_uuid", Auth.authenticate(), checkPermission(PERMISSIONS.UPDATE_STUDENT),  Uploader.uploadSingleFile("public/profile_images", "profile_photo_url"), updateStudent);

router.get("/fetch-student-details/:student_uuid", Auth.authenticate(), checkPermission(PERMISSIONS.READ_STUDENT), getStudentDetails);

router.delete("/delete-student/:student_uuid", Auth.authenticate(), checkPermission(PERMISSIONS.DELETE_STUDENT), deleteStudent);

export default router;
