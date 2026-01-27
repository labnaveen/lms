import { v4 as uuidv4 } from "uuid";

export const up = async (queryInterface) => {
  await queryInterface.bulkInsert("categories", [
    {
      category_uuid: uuidv4(),
      name: "Programming",
      description: "Courses and skills related to coding and software development.",
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      category_uuid: uuidv4(),
      name: "Data Analysis",
      description: "Skills for analyzing, visualizing, and interpreting data.",
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      category_uuid: uuidv4(),
      name: "Design",
      description: "Creative and UI/UX design related skills.",
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      category_uuid: uuidv4(),
      name: "Soft Skills",
      description: "Communication, teamwork, and leadership skills.",
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      category_uuid: uuidv4(),
      name: "Teaching",
      description: "Skills to enhance classroom management and teaching methods.",
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]);
};

export const down = async (queryInterface) => {
  await queryInterface.bulkDelete("categories", null, {});
};
