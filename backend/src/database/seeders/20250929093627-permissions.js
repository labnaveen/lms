export const up = async (queryInterface) => {
  const now = new Date();

  await queryInterface.bulkInsert("permissions", [
    // ---- School Management ----
    {
      name: "create_school",
      description: "Create new school",
      created_at: now,
      updated_at: now,
    },
    {
      name: "read_school",
      description: "View school details",
      created_at: now,
      updated_at: now,
    },
    {
      name: "update_school",
      description: "Update school details",
      created_at: now,
      updated_at: now,
    },
    {
      name: "delete_school",
      description: "Delete school",
      created_at: now,
      updated_at: now,
    },
    // ---- Teacher Management ----
    {
      name: "create_teacher",
      description: "Create new teacher accounts",
      created_at: now,
      updated_at: now,
    },
    {
      name: "read_teacher",
      description: "View teacher details",
      created_at: now,
      updated_at: now,
    },
    {
      name: "update_teacher",
      description: "Update teacher details",
      created_at: now,
      updated_at: now,
    },
    {
      name: "delete_teacher",
      description: "Delete teacher accounts",
      created_at: now,
      updated_at: now,
    },

    // ---- Student Management ----
    {
      name: "create_student",
      description: "Create new student accounts",
      created_at: now,
      updated_at: now,
    },
    {
      name: "read_student",
      description: "View student details",
      created_at: now,
      updated_at: now,
    },
    {
      name: "update_student",
      description: "Update student details",
      created_at: now,
      updated_at: now,
    },
    {
      name: "delete_student",
      description: "Delete student accounts",
      created_at: now,
      updated_at: now,
    },

    // ---- Course Management ----
    {
      name: "create_course",
      description: "Create new courses",
      created_at: now,
      updated_at: now,
    },
    {
      name: "read_course",
      description: "View course details",
      created_at: now,
      updated_at: now,
    },
    {
      name: "update_course",
      description: "Update existing courses",
      created_at: now,
      updated_at: now,
    },
    {
      name: "delete_course",
      description: "Delete courses",
      created_at: now,
      updated_at: now,
    },

    // ---- Assignment & Test Management ----
    {
      name: "create_assignment",
      description: "Create assignments/tests",
      created_at: now,
      updated_at: now,
    },
    {
      name: "read_assignment",
      description: "View assignments/tests",
      created_at: now,
      updated_at: now,
    },
    {
      name: "update_assignment",
      description: "Update assignments/tests",
      created_at: now,
      updated_at: now,
    },
    {
      name: "delete_assignment",
      description: "Delete assignments/tests",
      created_at: now,
      updated_at: now,
    },
    {
      name: "grade_assignment",
      description: "Grade student submissions",
      created_at: now,
      updated_at: now,
    },
    {
      name: "submit_assignment",
      description: "Submit assignment (student)",
      created_at: now,
      updated_at: now,
    },

    // ---- Announcements ----
    {
      name: "create_announcement",
      description: "Post school announcements",
      created_at: now,
      updated_at: now,
    },
    {
      name: "read_announcement",
      description: "View announcements",
      created_at: now,
      updated_at: now,
    },
    {
      name: "update_announcement",
      description: "Edit announcements",
      created_at: now,
      updated_at: now,
    },
    {
      name: "delete_announcement",
      description: "Delete announcements",
      created_at: now,
      updated_at: now,
    },

    // ---- Materials ----
    {
      name: "upload_material",
      description: "Upload study materials (PDF, video, etc.)",
      created_at: now,
      updated_at: now,
    },
    {
      name: "read_material",
      description: "Access/download materials",
      created_at: now,
      updated_at: now,
    },
    {
      name: "update_material",
      description: "Update materials",
      created_at: now,
      updated_at: now,
    },
    {
      name: "delete_material",
      description: "Delete materials",
      created_at: now,
      updated_at: now,
    },

    // ---- Reports & Analytics ----
    {
      name: "read_report",
      description: "View progress and analytics",
      created_at: now,
      updated_at: now,
    },

    // ---- Online Classes ----
    {
      name: "generate_video_class_link",
      description: "Generate video class links",
      created_at: now,
      updated_at: now,
    },
    {
      name: "join_video_class",
      description: "Join video classes",
      created_at: now,
      updated_at: now,
    },

    // ---- User & Role Management ----
    {
      name: "create_user",
      description: "Create generic user accounts",
      created_at: now,
      updated_at: now,
    },
    {
      name: "read_user",
      description: "View user accounts",
      created_at: now,
      updated_at: now,
    },
    {
      name: "update_user",
      description: "Update user accounts",
      created_at: now,
      updated_at: now,
    },
    {
      name: "delete_user",
      description: "Delete user accounts",
      created_at: now,
      updated_at: now,
    },

    {
      name: "manage_roles",
      description: "Assign roles and permissions",
      created_at: now,
      updated_at: now,
    },
  ]);
};

export const down = async (queryInterface) => {
  await queryInterface.bulkDelete("permissions", null, {});
};
