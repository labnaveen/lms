export const up = async (queryInterface) => {
  const now = new Date();

  await queryInterface.bulkInsert("permissions", [
    // ---- School Management ----
    {
      name: "create_school_subject",
      description: "Create school subject",
      created_at: now,
      updated_at: now,
    },
    {
      name: "read_school_subject",
      description: "View school subject list and details",
      created_at: now,
      updated_at: now,
    },
    {
      name: "update_school_subject",
      description: "Update school subject details",
      created_at: now,
      updated_at: now,
    },
    {
      name: "delete_school_subject",
      description: "Delete school subject",
      created_at: now,
      updated_at: now,
    },
    
  ]);
};

export const down = async (queryInterface) => {
  await queryInterface.bulkDelete("permissions", {
    name: [
      "create_school_subject",
      "read_school_subject",
      "update_school_subject",
      "delete_school_subject",
    ],
  });
};
