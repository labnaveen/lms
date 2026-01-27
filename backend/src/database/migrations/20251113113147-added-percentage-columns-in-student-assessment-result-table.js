// 20251113-add-evaluation-fields-in-student-assessment-result.js

import { DataTypes } from "sequelize";

export const up = async (queryInterface) => {
  const tableName = "student_assessment_result";

  // Add new columns only if they don't exist
  const tableDefinition = await queryInterface.describeTable(tableName);

  const addColumnIfNotExists = async (name, definition) => {
    if (!tableDefinition[name]) {
      await queryInterface.addColumn(tableName, name, definition);
    }
  };

  // 1️⃣ performance_percentage
  await addColumnIfNotExists("performance_percentage", {
    type: DataTypes.FLOAT,
    allowNull: true,
    comment: "Percentage of marks obtained out of total marks",
    after:"grade_id"
  });

  // 2️⃣ completion_percentage
  await addColumnIfNotExists("completion_percentage", {
    type: DataTypes.FLOAT,
    allowNull: true,
    comment: "Percentage of questions attempted by the student",
     after:"performance_percentage"
  });

  // 3️⃣ accuracy_percentage
  await addColumnIfNotExists("accuracy_percentage", {
    type: DataTypes.FLOAT,
    allowNull: true,
    comment: "Percentage of correct answers among attempted questions",
    after:"completion_percentage"
  });

};

export const down = async (queryInterface) => {
  const tableName = "student_assessment_result";
  await queryInterface.removeColumn(tableName, "performance_percentage");
  await queryInterface.removeColumn(tableName, "completion_percentage");
  await queryInterface.removeColumn(tableName, "accuracy_percentage");
};
