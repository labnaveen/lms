import { v4 as uuidv4 } from "uuid";
export const up = async (queryInterface) => {
  const now = new Date();

  // Check if any grades already exist for this system
  const existing = await queryInterface.sequelize.query(
    `SELECT COUNT(*) AS count FROM grade WHERE  id > 0;`,
    { type: queryInterface.sequelize.QueryTypes.SELECT }
  );

  if (parseInt(existing[0].count, 10) > 0) {
    console.log("Grades for CUSTOM system already exist. Skipping insert.");
    return;
  }

  // Define updated grade mapping
  const grades = [
    { grade_uuid: uuidv4(), grade_name: "A++", min_percentage: 96, max_percentage: 100, grade_point: 10},
    { grade_uuid: uuidv4(), grade_name: "A+", min_percentage: 86, max_percentage: 95, grade_point: 9},
    { grade_uuid: uuidv4(), grade_name: "A", min_percentage: 76, max_percentage: 85, grade_point: 8},
    { grade_uuid: uuidv4(), grade_name: "B++", min_percentage: 66, max_percentage: 75, grade_point: 7},
    { grade_uuid: uuidv4(), grade_name: "B+", min_percentage: 56, max_percentage: 65, grade_point: 6},
    { grade_uuid: uuidv4(), grade_name: "B", min_percentage: 46, max_percentage: 55, grade_point: 5},
    { grade_uuid: uuidv4(), grade_name: "C", min_percentage: 36, max_percentage: 45, grade_point: 4},
    { grade_uuid: uuidv4(), grade_name: "D", min_percentage: 0, max_percentage: 35, grade_point: 0},
  ];

  const gradesToInsert = grades.map((g) => ({
    ...g,
    created_at: now,
    updated_at: now,
  }));

  await queryInterface.bulkInsert("grade", gradesToInsert, {});
  console.log(`Inserted ${gradesToInsert.length} grades.`);
};

export const down = async (queryInterface) => {
  await queryInterface.bulkDelete("grade", { board_type: "CUSTOM" }, {});
  console.log("Deleted CUSTOM grades.");
};
