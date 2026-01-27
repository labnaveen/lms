// 20251029160000-added-course-id-in-student_assessment_result-table.js
import { DataTypes } from "sequelize";

export const up = async (queryInterface) => {
  const tableName = "student_assessment_result";
  const columnName = "total_questions";

  const columnExists = await queryInterface
    .describeTable(tableName)
    .then((tableDefinition) => !!tableDefinition[columnName])
    .catch(() => false);

  if (!columnExists) {
    await queryInterface.addColumn(tableName, columnName, {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue:0,
      after: "submitted_at",
    });
    console.log(`Column '${columnName}' added to '${tableName}' table`);
  } else {
    console.log(`Column '${columnName}' already exists in '${tableName}' table`);
  }
};

export const down = async (queryInterface) => {
  const tableName = "student_assessment_result";
  const columnName = "total_questions";

  const columnExists = await queryInterface
    .describeTable(tableName)
    .then((tableDefinition) => !!tableDefinition[columnName])
    .catch(() => false);

  if (columnExists) {
    await queryInterface.removeColumn(tableName, columnName);
    console.log(`Column '${columnName}' removed from '${tableName}' table`);
  } else {
    console.log(`Column '${columnName}' does not exist in '${tableName}' table`);
  }
};
