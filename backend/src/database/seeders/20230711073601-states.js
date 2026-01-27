import { Sequelize } from "sequelize";

export const up = async (queryInterface) => {
  const existingState = await queryInterface.rawSelect(
    "states",
    {
      where: {
        name: "Andaman and Nicobar Islands",
      },
    },
    ["id"]
  );

  if (!existingState) {
    const data = [
      ["AN", "Andaman and Nicobar Islands", "IN", 1],
      ["AP", "Andhra Pradesh", "IN", 1],
      ["AR", "Arunachal Pradesh", "IN", 1],
      ["AS", "Assam", "IN", 1],
      ["BR", "Bihar", "IN", 1],
      ["CH", "Chandigarh", "IN", 1],
      ["CT", "Chhattisgarh", "IN", 1],
      ["DN", "Dadra and Nagar Haveli", "IN", 1],
      ["DD", "Daman and Diu", "IN", 1],
      ["DL", "Delhi", "IN", 1],
      ["GA", "Goa", "IN", 1],
      ["GJ", "Gujarat", "IN", 1],
      ["HR", "Haryana", "IN", 1],
      ["HP", "Himachal Pradesh", "IN", 1],
      ["JK", "Jammu and Kashmir", "IN", 1],
      ["JH", "Jharkhand", "IN", 1],
      ["KA", "Karnataka", "IN", 1],
      ["KL", "Kerala", "IN", 1],
      ["LA", "Ladakh", "IN", 1],
      ["LD", "Lakshadweep", "IN", 1],
      ["MP", "Madhya Pradesh", "IN", 1],
      ["MH", "Maharashtra", "IN", 1],
      ["MN", "Manipur", "IN", 1],
      ["ML", "Meghalaya", "IN", 1],
      ["MZ", "Mizoram", "IN", 1],
      ["NL", "Nagaland", "IN", 1],
      ["OR", "Odisha", "IN", 1],
      ["PY", "Puducherry", "IN", 1],
      ["PB", "Punjab", "IN", 1],
      ["RJ", "Rajasthan", "IN", 1],
      ["SK", "Sikkim", "IN", 1],
      ["TN", "Tamil Nadu", "IN", 1],
      ["TG", "Telangana", "IN", 1],
      ["TR", "Tripura", "IN", 1],
      ["UP", "Uttar Pradesh", "IN", 1],
      ["UT", "Uttarakhand", "IN", 1],
      ["WB", "West Bengal", "IN", 1],
    ];

    const convertedData = data.map((item) => ({
      code: item[0],
      name: item[1],
      country_id: item[3],
      created_at: new Date(),
      updated_at: new Date(),
    }));

    await queryInterface.bulkInsert("states", convertedData, {});
  } else {
    console.log("States already exist!");
  }
};

export const down = async (queryInterface) => {
  await queryInterface.bulkDelete("states", null, {});
};
