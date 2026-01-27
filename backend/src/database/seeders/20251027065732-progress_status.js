import { v4 as uuidv4 } from "uuid";

export const up = async (queryInterface) => {
  await queryInterface.bulkInsert("progress_status", [
    {
      status_uuid: uuidv4(),
      name: "Not Started",
      description: "User has not started learning yet.",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      status_uuid: uuidv4(),
      name: "In Progress",
      description: "User has started learning but not completed.",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      status_uuid: uuidv4(),
      name: "Completed",
      description: "User has completed.",
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]);
};

export const down = async (queryInterface) => {
  await queryInterface.bulkDelete("progress_status", null, {});
};
