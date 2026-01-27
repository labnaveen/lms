import { DataTypes } from "sequelize";

export const up = async (queryInterface) => {
  const tableName = "students";
  const indexName = "roll_number"; // MySQL often uses column name as index name

  // Check if index exists
  const indexes = await queryInterface.showIndex(tableName);
  const existingIndex = indexes.find(
    (idx) => idx.name === indexName && idx.unique
  );

  if (existingIndex) {
    await queryInterface.removeIndex(tableName, indexName);
    console.log(`Unique index '${indexName}' removed from '${tableName}'`);
  } else {
    console.log(`Unique index '${indexName}' does not exist on '${tableName}'`);
  }
};

export const down = async (queryInterface) => {
  const tableName = "students";
  const indexName = "roll_number";

  // Check if index exists already
  const indexes = await queryInterface.showIndex(tableName);
  const existingIndex = indexes.find((idx) => idx.name === indexName);

  if (!existingIndex) {
    await queryInterface.addIndex(tableName, ["roll_number"], {
      unique: true,
      name: indexName,
    });

    console.log(
      `Unique index '${indexName}' added back to '${tableName}' (rollback)`
    );
  } else {
    console.log(
      `Index '${indexName}' already exists on '${tableName}', rollback skipped`
    );
  }
};
