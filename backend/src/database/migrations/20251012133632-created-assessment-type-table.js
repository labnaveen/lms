import { DataTypes } from "sequelize";

export const up = async (queryInterface) => {
  const tableName = 'assessment_type';
  const tableExists = await queryInterface.describeTable(tableName).then(() => true).catch(() => false);

  if (!tableExists) {

    await queryInterface.createTable(tableName, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.BIGINT,
      },

      assessment_type_uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        unique: true,
      },

      assessment_type_name: {
        type: DataTypes.STRING(250),
        allowNull: false,
        unique: true,
      },

      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      created_at: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },

      updated_at: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      deleted_at: {
        type: DataTypes.DATE,
        allowNull: true,
      }

    });
  } else {
    console.log`${tableName} already exists !`
  }

};

export const down = async (queryInterface) => {

  const tableName = 'assessment_type';
  const tableExists = await queryInterface.describeTable(tableName).then(() => true).catch(() => false);
  if (tableExists) {
    await queryInterface.dropTable(tableName);
  } else {
    console.log(`${tableName} does not exists !`)
  }
};
