import { DataTypes } from "sequelize";

export const up = async (queryInterface) => {
  const tableName = 'syllabus';
  const tableExists = await queryInterface.describeTable(tableName).then(() => true).catch(() => false);

  if (!tableExists) {

    await queryInterface.createTable(tableName, {
      id: {
        allowNull: false,
        autoIncrement: true,
        type: DataTypes.BIGINT,
        primaryKey: true,
      },

      syllabus_uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        unique: true,
      },

      syllabus_title: {
        type: DataTypes.STRING(150),
        allowNull: false,
      },

      accademic_year_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: "accademic_year",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },

      school_subject_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: "school_subject",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },

      syllabus_description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      syllabus_link: {
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

  const tableName = 'syllabus';
  const tableExists = await queryInterface.describeTable(tableName).then(() => true).catch(() => false);
  if (tableExists) {
    await queryInterface.dropTable(tableName);
  } else {
    console.log(`${tableName} does not exists !`)
  }
};
