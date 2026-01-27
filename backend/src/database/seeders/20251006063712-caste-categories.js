export const up = async (queryInterface) => {
  const categories = [
    { name: "General (GEN)", description: "Unreserved category" },
    { name: "Other Backward Class (OBC)", description: "OBC – Non-Creamy Layer category" },
    { name: "Scheduled Caste (SC)", description: "SC – Reserved category" },
    { name: "Scheduled Tribe (ST)", description: "ST – Reserved category" },
    { name: "Economically Weaker Section (EWS)", description: "EWS – General category with economic reservation" },
    { name: "Minority", description: "For candidates belonging to minority communities" },
    { name: "Others", description: "Other categories not listed above" },
  ];

  await queryInterface.bulkInsert(
    "caste_categories",
    categories.map((c) => ({
      name: c.name,
      description: c.description,
      created_at: new Date(),
      updated_at: new Date(),
    }))
  );
};

export const down = async (queryInterface) => {
  await queryInterface.bulkDelete("caste_categories", null, {});
};
