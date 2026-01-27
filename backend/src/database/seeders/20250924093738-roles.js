export const up = async (queryInterface) => {
  await queryInterface.bulkInsert("roles", [
    {
      role_uuid: "a3f8c4b2-7d5e-4a1c-9f42-12b67e8a5f11",
      name: "superadmin",
      description: "Full access to all modules and settings",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      role_uuid: "b7d9e1a4-3c6f-4e2a-8f91-45a2c7d4e822",
      name: "admin",
      description: "Manages school, teachers, and students",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      role_uuid: "c6e4d7a1-9b23-46f0-a82c-13d8c5f44e93",
      name: "teacher",
      description: "Manages classes, assignments, and students",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      role_uuid: "d4f7a9e2-6c12-4f9b-87d5-98f2a4b3c7f4",
      name: "student",
      description: "Access courses, submit assignments, and take tests",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      role_uuid: "e8a2f6c1-5b9d-40d3-91f7-21c6a8e3b4d9",
      name: "parent",
      description: "Monitor child's progress and activities",
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]);
};

export const down = async (queryInterface) => {
  await queryInterface.bulkDelete("roles", null, {});
};
