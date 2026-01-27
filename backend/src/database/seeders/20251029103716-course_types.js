// 20251104143000-course-types-seeder.js
import { v4 as uuidv4 } from "uuid";

export const up = async (queryInterface) => {
  await queryInterface.bulkInsert(
    "course_types",
    [
      {
        course_type_uuid: uuidv4(),
        title: "Self-paced",
        description: "Course that allows learners to progress at their own speed.",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        course_type_uuid: uuidv4(),
        title: "Instructor-led",
        description: "Course guided by an instructor with scheduled sessions.",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ],
    {}
  );
};

export const down = async (queryInterface) => {
  await queryInterface.bulkDelete("course_types", null, {});
};
