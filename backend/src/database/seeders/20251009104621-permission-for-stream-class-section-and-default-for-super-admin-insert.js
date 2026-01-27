export const up = async (queryInterface) => {
  const now = new Date();

  await queryInterface.bulkInsert("permissions", [
    // ---- School Management ----
    {
      name: "create_stream",
      description: "Create new stream",
      created_at: now,
      updated_at: now,
    },
    {
      name: "read_stream",
      description: "View stream details",
      created_at: now,
      updated_at: now,
    },
    {
      name: "update_stream",
      description: "Update stream details",
      created_at: now,
      updated_at: now,
    },
    {
      name: "delete_stream",
      description: "Delete stream",
      created_at: now,
      updated_at: now,
    },
    // ---- Teacher Management ----
    {
      name: "create_class",
      description: "Create new class",
      created_at: now,
      updated_at: now,
    },
    {
      name: "read_class",
      description: "View class details",
      created_at: now,
      updated_at: now,
    },
    {
      name: "update_class",
      description: "Update class details",
      created_at: now,
      updated_at: now,
    },
    {
      name: "delete_class",
      description: "Delete class",
      created_at: now,
      updated_at: now,
    },
  ]);
};

export const down = async (queryInterface) => {
  await queryInterface.bulkDelete("permissions", {
    name: [
      "create_stream",
      "read_stream",
      "update_stream",
      "delete_stream",
      "create_class",
      "read_class",
      "update_class",
      "delete_class",
    ],
  });
};
