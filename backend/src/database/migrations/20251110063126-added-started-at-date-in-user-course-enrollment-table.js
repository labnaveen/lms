// 20251029160000-added-course-id-in-user_course_enrollments-table.js
import { DataTypes } from "sequelize";

export const up = async (queryInterface) => {
  const tableName = "user_course_enrollments";
  const columnName = "started_at";

  const columnExists = await queryInterface
    .describeTable(tableName)
    .then((tableDefinition) => !!tableDefinition[columnName])
    .catch(() => false);

  if (!columnExists) {
    await queryInterface.addColumn(tableName, columnName, {
      type: DataTypes.DATE,
      allowNull: true,
      after: "progress_percentage",
    });
    console.log(`Column '${columnName}' added to '${tableName}' table`);
  } else {
    console.log(`Column '${columnName}' already exists in '${tableName}' table`);
  }
};

export const down = async (queryInterface) => {
  const tableName = "user_course_enrollments";
  const columnName = "started_at";

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
