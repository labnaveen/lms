
import crypto from "crypto";
export const up = async (queryInterface) => {
  const academicYears = [
    { accademic_year: "2023-2024", is_current: false },
    { accademic_year: "2024-2025", is_current: false },
    { accademic_year: "2025-2026", is_current: true },
    { accademic_year: "2026-2027", is_current: false },
    { accademic_year: "2027-2028", is_current: false },
    { accademic_year: "2028-2029", is_current: false },
    { accademic_year: "2029-2030", is_current: false },
  ];

  await queryInterface.bulkInsert(
    "accademic_year",
    academicYears.map((g) => ({
      accademic_year_uuid: crypto.randomUUID(),
      accademic_year: g.accademic_year,
      is_current: g.is_current,
      created_at: new Date(),
      updated_at: new Date(),
    }))
  );
};

export const down = async (queryInterface) => {
  await queryInterface.bulkDelete("accademic_year", null, {});
};
