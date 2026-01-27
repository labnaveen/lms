export const up = async (queryInterface) => {
  await queryInterface.bulkInsert("posts", [
    {
      name: "Principal",
      description: "Oversees overall administration, leadership, and performance of the school.",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: "Vice Principal",
      description: "Assists the principal with school management and coordination of academics.",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: "PGT (Post Graduate Teacher)",
      description: "Teaches senior secondary classes (11th & 12th) in specialized subjects.",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: "TGT (Trained Graduate Teacher)",
      description: "Teaches middle and secondary classes (6th to 10th) in various subjects.",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: "PRT (Primary Teacher)",
      description: "Teaches foundational subjects to students from classes 1 to 5.",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: "PET (Physical Education Teacher)",
      description: "Conducts physical training, sports, and health education activities.",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: "Counselor",
      description: "Supports students’ emotional, academic, and social well-being.",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: "Music Teacher",
      description: "Teaches instrumental and vocal music and conducts school music programs.",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: "Art Teacher",
      description: "Instructs students in visual arts, drawing, painting, and craftwork.",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: "Computer Teacher",
      description: "Teaches computer science, IT fundamentals, and digital literacy.",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: "Librarian",
      description: "Maintains library resources, manages book circulation, and assists students.",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: "Lab Assistant",
      description: "Assists teachers and students during science practicals and maintains lab inventory.",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: "Accountant",
      description: "Handles financial transactions, school fees, and accounting records.",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: "Office Assistant",
      description: "Supports administrative tasks, record keeping, and documentation.",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: "Receptionist",
      description: "Greets visitors, answers calls, and manages school front office operations.",
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]);
};

export const down = async (queryInterface) => {
  await queryInterface.bulkDelete("posts", null, {});
};
