// migration-to-remove-section-id-from-courses.js
import { DataTypes } from "sequelize";

export const up = async (queryInterface) => {
  const tableName = "courses";
  const columnName = "section_id";

  const columnExists = await queryInterface
    .describeTable(tableName)
    .then((tableDefinition) => !!tableDefinition[columnName])
    .catch(() => false);

  if (columnExists) {
    await queryInterface.removeColumn(tableName, columnName);
    console.log(`Column '${columnName}' removed from '${tableName}' table`);
  } else {
    console.log(`Column '${columnName}' does not exist in '${tableName}', skipping removal`);
  }
};

export const down = async (queryInterface) => {
  const tableName = "courses";
  const columnName = "section_id";

  const columnExists = await queryInterface
    .describeTable(tableName)
    .then((tableDefinition) => !!tableDefinition[columnName])
    .catch(() => false);

  if (!columnExists) {
    await queryInterface.addColumn(tableName, columnName, {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: { model: "class_section", key: "id" },
    });
    console.log(`Column '${columnName}' added back to '${tableName}' table`);
  } else {
    console.log(`Column '${columnName}' already exists in '${tableName}', skipping add`);
  }
};
