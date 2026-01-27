import { v4 as uuidv4 } from "uuid";

export const up = async (queryInterface) => {
  await queryInterface.bulkInsert("categories", [
    {
      category_uuid: uuidv4(),
      name: "Other",
      description: "Other category.",
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]);
};

export const down = async (queryInterface) => {
  await queryInterface.bulkDelete("categories", null, {});
};
