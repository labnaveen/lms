import { DataTypes } from "sequelize";

export const up = async (queryInterface) => {
  const tableName = 'subject';
  const tableExists = await queryInterface.describeTable(tableName).then(() => true).catch(() => false);

  if (!tableExists) {
    await queryInterface.createTable(tableName, {
      id: {
        allowNull: false,
        autoIncrement: true,
        type: DataTypes.BIGINT,
        primaryKey: true,
      },

      subject_uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        unique: true,
      },

      subject_name: {
        type: DataTypes.STRING(150),
        allowNull: false,
      },

      subject_code: {
        type: DataTypes.STRING(20),
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
        allowNull: true,
        type: DataTypes.DATE,
        defaultValue: null,
      },
    });
  } else {
    console.log`${tableName} already exists !`
  }

};

export const down = async (queryInterface) => {

  const tableName = 'subject';
  const tableExists = await queryInterface.describeTable(tableName).then(() => true).catch(() => false);
  if(tableExists){
  await queryInterface.dropTable(tableName);
  }else{
    console.log(`${tableName} does not exists !`)
  }
};
