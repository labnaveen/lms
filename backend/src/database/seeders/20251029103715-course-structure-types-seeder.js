// 20251104144500-course-structure-types-seeder.js
import { v4 as uuidv4 } from "uuid";

export const up = async (queryInterface) => {
  await queryInterface.bulkInsert(
    "course_structure_types",
    [
      {
        course_structure_type_uuid: uuidv4(),
        title: "Modular",
        description: "Course content divided into independent modules or units.",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        course_structure_type_uuid: uuidv4(),
        title: "Chapter-based",
        description: "Course organized into sequential chapters or lessons.",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ],
    {}
  );
};

export const down = async (queryInterface) => {
  await queryInterface.bulkDelete("course_structure_types", null, {});
};
