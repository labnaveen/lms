import { v4 as uuidv4 } from "uuid";

export const up = async (queryInterface) => {
  await queryInterface.bulkInsert("sub_categories", [
    // Other
    {
      sub_category_uuid: uuidv4(),
      category_id: 6,
      name: "Other",
      description: "Other sub-category.",
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]);
};

export const down = async (queryInterface) => {
  await queryInterface.bulkDelete("sub_categories", null, {});
};
