import { DataTypes } from "sequelize";

export const up = async (queryInterface) => {
  // Check if the country already exists
  const existingCountry = await queryInterface.rawSelect(
    "countries",
    {
      where: {
        name: "India",
      },
    },
    ["id"]
  );

  if (!existingCountry) {
    await queryInterface.bulkInsert("countries", [
      {
        code: "IN",
        name: "India",
        phone: 91,
        symbol: null,
        currency: "INR",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  } else {
    console.log("Country India already exists!");
  }
};

export const down = async (queryInterface) => {
  await queryInterface.bulkDelete("countries", null, {});
};
