import { DataTypes } from "sequelize";

export const up = async (queryInterface) => {
  const tableName = "syllabus";
  const columnName = "created_by"; // example column
  const columnExists = await queryInterface
    .describeTable(tableName)
    .then((tableDefinition) => !!tableDefinition[columnName])
    .catch(() => false);

  if (!columnExists) {
    await queryInterface.addColumn(tableName, columnName, {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      after: "syllabus_link", // optional: specify position
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
    console.log(`✅ Column '${columnName}' added to '${tableName}' table`);
  } else {
    console.log(`⚠️ Column '${columnName}' already exists in '${tableName}' table`);
  }

};

export const down = async (queryInterface) => {
  const tableName = "syllabus";
  const columnName = "created_by"; // example column
  const columnExists = await queryInterface
    .describeTable(tableName)
    .then((tableDefinition) => !!tableDefinition[columnName])
    .catch(() => false);

  if (columnExists) {
    await queryInterface.removeColumn(tableName, columnName);
    console.log(`🗑️ Column '${columnName}' removed from '${tableName}' table`);
  } else {
    console.log(`⚠️ Column '${columnName}' does not exist in '${tableName}' table`);
  }
};
