import { DataTypes } from "sequelize";


  const tableName = "school_subject_stream_links";

export const up = async (queryInterface) => {
  const tableExists = await queryInterface
    .describeTable(tableName)
    .then(() => true)
    .catch(() => false);

  if (!tableExists) {
    await queryInterface.createTable(tableName, {
      id: {
        allowNull: false,
        autoIncrement: true,
        type: DataTypes.BIGINT,
        primaryKey: true,
      },
      school_subject_stream_link_uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        unique: true,
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
      stream_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
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
  }
};

export const down = async (queryInterface) => {
  
  const tableExists = await queryInterface
    .describeTable(tableName)
    .then(() => true)
    .catch(() => false);

  if (tableExists) {
    await queryInterface.dropTable(tableName);
  }
};
