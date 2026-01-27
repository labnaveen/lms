"use strict";

import { DataTypes } from "sequelize";

export const up = async (queryInterface) => {
  const tableName = "assessment_type";
  const columnName = "is_course_assessment";

  // Check if column already exists
  const tableDesc = await queryInterface.describeTable(tableName);
  if (!tableDesc[columnName]) {
    await queryInterface.addColumn(tableName, columnName, {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    });
  } else {
    console.log(`${columnName} already exists in ${tableName}`);
  }
};

export const down = async (queryInterface) => {
  const tableName = "assessment_type";
  const columnName = "is_course_assessment";

  // Check if column exists before removing
  const tableDesc = await queryInterface.describeTable(tableName);
  if (tableDesc[columnName]) {
    await queryInterface.removeColumn(tableName, columnName);
  } else {
    console.log(`${columnName} does not exist in ${tableName}`);
  }
};
