import { DataTypes } from "sequelize";

export const up = async (queryInterface) => {
  const tableName = 'grade';
  const tableExists = await queryInterface.describeTable(tableName).then(() => true).catch(() => false);

  if (!tableExists) {

    await queryInterface.createTable(tableName, {

      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.BIGINT,
      },

      grade_uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        unique: true,
      },

      grade_name: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      
      min_percentage: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },

      max_percentage: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },

      grade_point: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },


      school_id: {
        type: DataTypes.BIGINT,
        allowNull: true,
        references: { model: "schools", key: "id" },
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
        type: DataTypes.DATE,
        allowNull: true,
      },

    });
  } else {
    console.log`${tableName} already exists !`
  }

};

export const down = async (queryInterface) => {

  const tableName = 'grade';
  const tableExists = await queryInterface.describeTable(tableName).then(() => true).catch(() => false);
  if (tableExists) {
    await queryInterface.dropTable(tableName);
  } else {
    console.log(`${tableName} does not exists !`)
  }
};