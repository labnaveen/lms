import { Router } from "express";
import Auth from "../middlewares/Auth.js";
import { checkPermission } from "../middlewares/CheckPermission.js";
import { PERMISSIONS } from "../constants/Constants.js";

import {
    getAssessmentTypeListForDropdown,
    getCountries,
    getStates,
    getCities,
    getCurrentAcademicYear,
    getGenders,
    getSubjectsLists,
    getClassesLists,
    getClassSectionsList,
    getStreamsListForDropdown,
    getChaptersListForDropdown,
    getSyllabusResourceTypeListForDropdown,
    getAssessmentQuestionTypeListForDropdown,
    getSubjectsListByClassForDropdown,
    getStudentsByClassOrSection,
    getCourseTypeListForDropdown,
    getCourseStructureTypeListForDropdown,
    getCourseCategoryListForDropdown,
    getCourseSubCategoryListForDropdown,
    getTeachersListForDropdown,
    getCoursesListForDropdown,
    getProgressStatusListForDropdown,
    getNotificationTargetTypeListForDropdown,
} from "../controllers/commonController.js";

const commonRouter = Router();
commonRouter.get("/country", getCountries);
commonRouter.get("/states/:countryId", getStates);
commonRouter.get("/cities/:stateId", getCities);
commonRouter.get("/gender-list", getGenders);
commonRouter.get("/current-accademic-year/:isCurrent", getCurrentAcademicYear);
commonRouter.get("/subjects-list", Auth.authenticate(), getSubjectsLists);
commonRouter.get("/class-list", Auth.authenticate(), getClassesLists);
commonRouter.get("/class-sections-list/:class_uuid", Auth.authenticate(), getClassSectionsList);
commonRouter.get("/streams-list", Auth.authenticate(), getStreamsListForDropdown);
commonRouter.get("/chapters-list", Auth.authenticate(), getChaptersListForDropdown);
commonRouter.get("/syllabus-resource-type-list", Auth.authenticate(), getSyllabusResourceTypeListForDropdown);
commonRouter.get("/assessment-question-type-list", Auth.authenticate(), getAssessmentQuestionTypeListForDropdown);
commonRouter.get("/assessment-type-list", Auth.authenticate(), getAssessmentTypeListForDropdown);
commonRouter.get("/subjects-list-by-class/:class_uuid", Auth.authenticate(), getSubjectsListByClassForDropdown);
commonRouter.get("/students-list", Auth.authenticate(), getStudentsByClassOrSection);
commonRouter.get("/course-type-list", Auth.authenticate(), getCourseTypeListForDropdown);
commonRouter.get("/course-structure-type-list", Auth.authenticate(), getCourseStructureTypeListForDropdown);
commonRouter.get("/course-category-list", Auth.authenticate(), getCourseCategoryListForDropdown);
commonRouter.get("/sub-category-list/:categoryUuid", Auth.authenticate(), getCourseSubCategoryListForDropdown);
commonRouter.get("/teachers-list", Auth.authenticate(), getTeachersListForDropdown);
commonRouter.get("/course-list", Auth.authenticate(), getCoursesListForDropdown );
commonRouter.get("/progress-status-list", Auth.authenticate(), getProgressStatusListForDropdown );
commonRouter.get("/notification-target-type-list", Auth.authenticate(), getNotificationTargetTypeListForDropdown );


export default commonRouter;
