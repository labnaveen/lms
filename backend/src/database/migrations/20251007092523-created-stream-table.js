import { DataTypes } from "sequelize";

export const up = async (queryInterface) => {
  const tableName = 'stream';
  const tableExists = await queryInterface.describeTable(tableName).then(() => true).catch(() => false);

  if (!tableExists) {
    await queryInterface.createTable(tableName, {
      id: {
        allowNull: false,
        autoIncrement: true,
        type: DataTypes.BIGINT,
        primaryKey: true,
      },

      stream_uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        unique: true,
      },

      stream_name: {
        type: DataTypes.STRING(150),
        allowNull: false,
      },

      stream_description: {
        type: DataTypes.STRING(512),
        allowNull: true,
      },
      
      school_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: "schools",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
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

  const tableName = 'stream';
  const tableExists = await queryInterface.describeTable(tableName).then(() => true).catch(() => false);
  if(tableExists){
  await queryInterface.dropTable(tableName);
  }else{
    console.log(`${tableName} does not exists !`)
  }
};
