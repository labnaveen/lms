import { DataTypes } from "sequelize";

export const up = async (queryInterface) => {
  const tableName = "student_assessment_result";
  const columnName = "grade_id";
  const columnExists = await queryInterface
    .describeTable(tableName)
    .then((tableDefinition) => !!tableDefinition[columnName])
    .catch(() => false);

  if (!columnExists) {
    await queryInterface.addColumn(tableName, columnName, {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: { model: "grade", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
      after: "total_score",
    });
    console.log(`Column '${columnName}' added to '${tableName}' table`);
  } else {
    console.log(`Column '${columnName}' already exists in '${tableName}' table`);
  }
};

export const down = async (queryInterface) => {
  const tableName = "student_assessment_result";
  const columnName = "grade_id";
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
