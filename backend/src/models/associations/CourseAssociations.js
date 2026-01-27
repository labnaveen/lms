import CourseCategory from "../CourseCategoryModel.js";
import CourseSubCategory from "../CourseSubCategoryModel.js";
import Course from "../CourseModel.js";
import CourseModule from "../CourseModuleModel.js";
import CourseLesson from "../CourseLessonModel.js";
import LessonResource from "../LessonResource.js";
import Users from "../UserModal.js";
import Category from "../CategoryModel.js";
import SubCategory from "../SubCategoryModal.js";
import DifficultyLevel from "../DifficultyLevelModel.js";
import CourseVideoLink from "../CourseVideoLinks.js";
import CourseAdditionalDocument from "../CourseAdditionalDocument.js";
import Class from "../ClassModel.js";
import ClassSection from "../ClassSectionModel.js";
import UserCourseEnrollment from "../UserCourseEnrollment.js";
import Assessment from "../AssessmentModal.js";
import CourseClassSectionLink from "../CourseClassSectionLinkModel.js";

// ✅ Relations

// Category → SubCategory
Category.hasMany(SubCategory, { foreignKey: "category_id" });
SubCategory.belongsTo(Category, { foreignKey: "category_id" });

// SubCategory → Course
SubCategory.hasMany(Course, { foreignKey: "sub_category_id" });
Course.belongsTo(SubCategory, { foreignKey: "sub_category_id" });

// ✅ Difficulty Level → Course
DifficultyLevel.hasMany(Course, { foreignKey: "difficulty_level_id" });
Course.belongsTo(DifficultyLevel, { foreignKey: "difficulty_level_id" });

// Course → Modules
Course.hasMany(CourseModule, { foreignKey: "course_id" });
CourseModule.belongsTo(Course, { foreignKey: "course_id" });


Course.hasMany(CourseAdditionalDocument, {foreignKey: "course_id"});
CourseAdditionalDocument.belongsTo(Course, {foreignKey: "course_id"}); 

Course.hasMany(CourseVideoLink, {foreignKey: "course_id"});
CourseVideoLink.belongsTo(Course, {foreignKey: "course_id"}); 

// Module → Lesson
CourseModule.hasMany(CourseLesson, { foreignKey: "module_id" });
CourseLesson.belongsTo(CourseModule, { foreignKey: "module_id" });

// Lesson → Resources
CourseLesson.hasMany(LessonResource, { foreignKey: "lesson_id" });
LessonResource.belongsTo(CourseLesson, { foreignKey: "lesson_id" });

// Instructor → Courses
Users.hasMany(Course, { foreignKey: "instructor_id" });
Course.belongsTo(Users, { foreignKey: "instructor_id" });

Course.belongsTo(Class, { foreignKey: "class_id" });
// Course.belongsTo(ClassSection, { foreignKey: "section_id" });

Course.hasMany(UserCourseEnrollment, { foreignKey: "course_id" });
UserCourseEnrollment.belongsTo(Course, { foreignKey: "course_id" });

Course.hasMany(Assessment, { foreignKey: "course_id" });
Assessment.belongsTo(Course, { foreignKey: "course_id" });

Course.hasMany(CourseClassSectionLink, { foreignKey: "course_id" });
CourseClassSectionLink.belongsTo(Course, { foreignKey: "course_id" });


export {
  CourseCategory,
  CourseSubCategory,
  Course,
  CourseModule,
  CourseLesson,
  LessonResource,
  SubCategory,
  Category,
  DifficultyLevel,
  Users,
  CourseVideoLink,
  CourseAdditionalDocument,
  Class,
  ClassSection,
  UserCourseEnrollment
};
