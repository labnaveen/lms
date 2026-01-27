import express from "express";
import Auth from "../middlewares/Auth.js";
import { courseEnrollment, createCourse, destroyCourse, getCourseDetails, getCoursesList, markUserCourseEnrollmentComplete, updateCourse } from "../controllers/courseController.js";
import Uploader from "../middlewares/Uploader.js";

const courseRouter = express.Router();

courseRouter.get("/", Auth.authenticate(), getCoursesList);

courseRouter.post(
  "/add-course",
  Auth.authenticate(),
  Uploader.uploadMultipleFiles("public/courses"),
  createCourse
);
courseRouter.post(
  "/user-course-enrollment/:course_uuid",
  Auth.authenticate(),
  courseEnrollment
);
courseRouter.put(
  "/user-course-enrollment/:course_uuid/complete",
  Auth.authenticate(),
  markUserCourseEnrollmentComplete
);
courseRouter.get("/details/:course_uuid", Auth.authenticate(), getCourseDetails);
courseRouter.put(
  "/update-course/:course_uuid",
  Auth.authenticate(),
  Uploader.uploadMultipleFiles("public/courses"),
  updateCourse
);
courseRouter.delete(
  "/delete-course/:course_uuid",
  Auth.authenticate(),
  destroyCourse
);

export default courseRouter;
