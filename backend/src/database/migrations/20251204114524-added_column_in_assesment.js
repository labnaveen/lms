// 20251120120000-add-url-to-skills-table.js
import { DataTypes } from "sequelize";

export const up = async (queryInterface) => {
  const tableName = "assessment";
  const columnName = "added_by";

  const columnExists = await queryInterface
    .describeTable(tableName)
    .then((tableDefinition) => !!tableDefinition[columnName])
    .catch(() => false);

  if (!columnExists) {
    await queryInterface.addColumn(tableName, columnName, {
      type: DataTypes.BIGINT,
      allowNull: true,
      after: "created_by", // <- put after any existing column
      references: {
        model: "users",
        key: "id",
      },
    });
    console.log(`Column '${columnName}' added to '${tableName}' table`);
  } else {
    console.log(`Column '${columnName}' already exists in '${tableName}' table`);
  }
};

export const down = async (queryInterface) => {
  const tableName = "assessment";
  const columnName = "added_by";

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
