import { DataTypes } from "sequelize";

export const up = async (queryInterface) => {
  const tableName = 'school_subject';
  const tableExists = await queryInterface.describeTable(tableName).then(() => true).catch(() => false);

  if (!tableExists) {

    await queryInterface.createTable(tableName, {
      id: {
        allowNull: false,
        autoIncrement: true,
        type: DataTypes.BIGINT,
        primaryKey: true,
      },

      school_subject_uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        unique: true,
      },

      subject_name: {
        type: DataTypes.STRING(150),
        allowNull: true,
      },

      subject_code: {
        type: DataTypes.STRING(20),
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

      subject_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: "subject",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
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

      // is_common: {
      //   type: DataTypes.BOOLEAN,
      //   allowNull: false,
      //   defaultValue: false,
      //   comment: 'This Is To Check Common Subjects For All Classes e.g Sport, Music etc'
      // },

      max_marks: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue:0
      },

      passing_marks: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue:0
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

  const tableName = 'school_subject';
  const tableExists = await queryInterface.describeTable(tableName).then(() => true).catch(() => false);
  if (tableExists) {
    await queryInterface.dropTable(tableName);
  } else {
    console.log(`${tableName} does not exists !`)
  }
};
