import { DataTypes } from "sequelize";

export const up = async (queryInterface) => {
  const tableName = 'assessment_student_answer';
  const tableExists = await queryInterface.describeTable(tableName).then(() => true).catch(() => false);

  if (!tableExists) {

    await queryInterface.createTable(tableName, {

      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.BIGINT,
      },

      student_assessment_result_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: { model: "student_assessment_result", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },

      question_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: { model: "assessment_question", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },

      selected_option_ids: {
        type: DataTypes.JSON,
        allowNull: true,
        comment: "Array of option IDs for MCQ/MAQ questions",
      },

      answer_text: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: "For descriptive/fill questions",
      },

      is_correct: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },

      marks_obtained: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0,
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

  const tableName = 'assessment_student_answer';
  const tableExists = await queryInterface.describeTable(tableName).then(() => true).catch(() => false);
  if (tableExists) {
    await queryInterface.dropTable(tableName);
  } else {
    console.log(`${tableName} does not exists !`)
  }
};
