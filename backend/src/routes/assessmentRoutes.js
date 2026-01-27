import { Router } from "express";
import Auth from "../middlewares/Auth.js";
import { checkPermission } from "../middlewares/CheckPermission.js";
import { PERMISSIONS } from "../constants/Constants.js";
import { validateBody } from "../middlewares/ValidateRequest.js";
import { createAssessmentSchema, studentAssessmentAnswerSubmitSchema, updateAssessmentSchema } from "../schemas/assessmentJoiSchema.js";
import { addAssessment, getAssessmentList, fetchAssessmentDetails, updateAssessment, deleteAssessment, studentStartsAssessment, studentAssessmentAnswerSubmit, evaluateAssessmentByStudent, evaluateAssessmentForAllStudents, fetchStudentsAttemptedList } from "../controllers/assessmentController.js";

const assessmentRouter = Router();

// assessmentRouter.get("/", Auth.authenticate(), checkPermission(PERMISSIONS.READ_SYLLABUS),getSyllabusList);
assessmentRouter.get("/", Auth.authenticate(), checkPermission(PERMISSIONS.READ_ASSIGNMENT), getAssessmentList);
assessmentRouter.post("/", Auth.authenticate(), checkPermission(PERMISSIONS.CREATE_ASSIGNMENT), validateBody(createAssessmentSchema), addAssessment);
// assessmentRouter.put("/:stream_uuid",Auth.authenticate(), updateStream);
assessmentRouter.get("/:assessment_uuid", Auth.authenticate(), checkPermission(PERMISSIONS.READ_ASSIGNMENT), fetchAssessmentDetails);
assessmentRouter.put("/:assessment_uuid", Auth.authenticate(), checkPermission(PERMISSIONS.UPDATE_ASSIGNMENT), validateBody(updateAssessmentSchema), updateAssessment);
assessmentRouter.delete("/:assessment_uuid", Auth.authenticate(), checkPermission(PERMISSIONS.DELETE_ASSIGNMENT), deleteAssessment);
assessmentRouter.get("/students-attempted/:assessment_uuid", Auth.authenticate(), checkPermission(PERMISSIONS.READ_ASSIGNMENT), fetchStudentsAttemptedList);
////TO EVALUATE ALL STUDENTS FOR THE SPECIFIC ASSESSMENT
assessmentRouter.put("/evaluate-assessment-for-all-students/:assessment_uuid", Auth.authenticate(), evaluateAssessmentForAllStudents);
////ROUTES RELATED TO STUDENT FOR ASSESSMENT
assessmentRouter.post("/student/start-assessment/:assessment_uuid", Auth.authenticate(), studentStartsAssessment);
assessmentRouter.post("/student/submit-answer", Auth.authenticate(), studentAssessmentAnswerSubmit);
assessmentRouter.put("/student/evaluate-assessment-by-student", Auth.authenticate(), evaluateAssessmentByStudent);



//// CLASS SECTION ROUTES
// assessmentRouter.get("/sections-list/:class_uuid", Auth.authenticate(), checkPermission(PERMISSIONS.READ_CLASS),getClassSectionsList);
// assessmentRouter.post("/sections-list/", Auth.authenticate(), checkPermission(PERMISSIONS.CREATE_CLASS),addClassSection);

export default assessmentRouter;
