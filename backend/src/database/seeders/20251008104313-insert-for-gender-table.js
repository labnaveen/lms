
import crypto from "crypto";
export const up = async (queryInterface) => {
  const genders = [
    { gender_name: "Male" },
    { gender_name: "Female" },
    { gender_name: "Other" },
  ];

  await queryInterface.bulkInsert(
    "gender",
    genders.map((g) => ({
      gender_uuid: crypto.randomUUID(),
      gender_name: g.gender_name,
      created_at: new Date(),
      updated_at: new Date(),
    }))
  );
};

export const down = async (queryInterface) => {
  await queryInterface.bulkDelete("gender", null, {});
};
