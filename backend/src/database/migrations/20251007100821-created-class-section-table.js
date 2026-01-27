import { DataTypes } from "sequelize";

export const up = async (queryInterface) => {
  const tableName = 'class_section';
  const tableExists = await queryInterface.describeTable(tableName).then(() => true).catch(() => false);

  if (!tableExists) {
    await queryInterface.createTable(tableName, {
      id: {
        allowNull: false,
        autoIncrement: true,
        type: DataTypes.BIGINT,
        primaryKey: true,
      },

      class_section_uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        unique: true,
      },

      class_section_name: {
        type: DataTypes.STRING(150),
        allowNull: false,
      },

       class_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: "class",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
     
      stream_id: {
        type: DataTypes.BIGINT,
        allowNull: null,
        references: {
          model: "stream",
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
