import { DataTypes } from "sequelize";

export const up = async (queryInterface) => {
  const tableName = 'assessment';
  const tableExists = await queryInterface.describeTable(tableName).then(() => true).catch(() => false);

  if (!tableExists) {

    await queryInterface.createTable(tableName, {
     id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT,
    },
    assessment_uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
    },
    assessment_type_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: { model: "assessment_type", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
    },
    school_subject_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: { model: "school_subject", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    class_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: { model: "class", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    class_section_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: { model: "class_section", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },

    assessment_title: {
      type: DataTypes.STRING(512),
      allowNull: false,
    },

    assessment_description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    start_date_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    end_date_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    duration_in_minutes: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    total_marks: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    created_by: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: { model: "users", key: "id" },
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

  const tableName = 'assessment';
  const tableExists = await queryInterface.describeTable(tableName).then(() => true).catch(() => false);
  if (tableExists) {
    await queryInterface.dropTable(tableName);
  } else {
    console.log(`${tableName} does not exists !`)
  }
};
