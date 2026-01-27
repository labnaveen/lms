import { v4 as uuidv4 } from "uuid";

export const up = async (queryInterface) => {
  await queryInterface.bulkInsert("difficulty_levels", [
    {
      difficulty_level_uuid: uuidv4(),
      name: "Beginner",
      description: "Suitable for learners starting from scratch.",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      difficulty_level_uuid: uuidv4(),
      name: "Intermediate",
      description: "For learners with some prior experience.",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      difficulty_level_uuid: uuidv4(),
      name: "Advanced",
      description: "For expert-level learners seeking mastery.",
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]);
};

export const down = async (queryInterface) => {
  await queryInterface.bulkDelete("difficulty_levels", null, {});
};
