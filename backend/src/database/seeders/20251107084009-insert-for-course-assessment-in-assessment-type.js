import { v4 as uuidv4 } from "uuid";

export const up = async (queryInterface) => {
  await queryInterface.bulkInsert("assessment_type", [
    {
      assessment_type_uuid: uuidv4(),
      assessment_type_name: "Course Assessment",
      description: "Assessment linked to specific courses, used to evaluate learner performance and determine course completion.",
      is_course_assessment: true,
      created_at: new Date(),
      updated_at: new Date(),

    },
  ]);
};

export const down = async (queryInterface) => {
  await queryInterface.bulkDelete("assessment_type", {
    assessment_type_name: "Course Assessment",
  });
};
