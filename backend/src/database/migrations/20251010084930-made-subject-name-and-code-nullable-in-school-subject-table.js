'use strict';

import { DataTypes } from "sequelize";

export const up = async (queryInterface) => {
  const tableName = 'school_subject';

  // Make subject_name nullable
  await queryInterface.changeColumn(tableName, 'subject_name', {
    type: DataTypes.STRING(150),
    allowNull: true,
  });

  // Make subject_code nullable (if not already)
  await queryInterface.changeColumn(tableName, 'subject_code', {
    type: DataTypes.STRING(20),
    allowNull: true,
  });
};

export const down = async (queryInterface) => {
  const tableName = 'school_subject';

  // Revert back to NOT NULL
  await queryInterface.changeColumn(tableName, 'subject_name', {
    type: DataTypes.STRING(150),
    allowNull: false,
  });

  await queryInterface.changeColumn(tableName, 'subject_code', {
    type: DataTypes.STRING(20),
    allowNull: false,
  });
};
