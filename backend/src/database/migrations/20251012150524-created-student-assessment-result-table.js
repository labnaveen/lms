import { DataTypes } from "sequelize";

export const up = async (queryInterface) => {
  const tableName = 'student_assessment_result';
  const tableExists = await queryInterface.describeTable(tableName).then(() => true).catch(() => false);

  if (!tableExists) {

    await queryInterface.createTable(tableName, {

      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.BIGINT,
      },

      student_assessment_result_uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        unique: true,
      },

      assessment_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: { model: "assessment", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },

      student_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: { model: "users", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },

      started_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },

      submitted_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },

      total_questions_attempted: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },

      total_score: {
        type: DataTypes.FLOAT,
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
      },

    });
  } else {
    console.log`${tableName} already exists !`
  }

};

export const down = async (queryInterface) => {

  const tableName = 'student_assessment_result';
  const tableExists = await queryInterface.describeTable(tableName).then(() => true).catch(() => false);
  if (tableExists) {
    await queryInterface.dropTable(tableName);
  } else {
    console.log(`${tableName} does not exists !`)
  }
};