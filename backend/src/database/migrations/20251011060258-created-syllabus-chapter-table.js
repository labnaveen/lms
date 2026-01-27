import { DataTypes } from "sequelize";

export const up = async (queryInterface) => {
  const tableName = 'syllabus_chapter';
  const tableExists = await queryInterface.describeTable(tableName).then(() => true).catch(() => false);

  if (!tableExists) {

    await queryInterface.createTable(tableName, {
      id: {
        allowNull: false,
        autoIncrement: true,
        type: DataTypes.BIGINT,
        primaryKey: true,
      },

      syllabus_chapter_uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        unique: true,
      },

      syllabus_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: "syllabus",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },

       chapter_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: "chapter",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },

      syllabus_chapter_title: {
        type: DataTypes.STRING(250),
        allowNull: false,
      },

      syllabus_chapter_description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

      created_by: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: "users",
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

  const tableName = 'syllabus_chapter';
  const tableExists = await queryInterface.describeTable(tableName).then(() => true).catch(() => false);
  if (tableExists) {
    await queryInterface.dropTable(tableName);
  } else {
    console.log(`${tableName} does not exists !`)
  }
};
