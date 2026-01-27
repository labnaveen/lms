import { DataTypes } from "sequelize";

export const up = async (queryInterface) => {
  const tableName = 'assessment_question';
  const tableExists = await queryInterface.describeTable(tableName).then(() => true).catch(() => false);

  if (!tableExists) {

    await queryInterface.createTable(tableName, {

      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.BIGINT,
      },
      
      assessment_question_uuid: {
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
      assessment_question_type_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: { model: "assessment_question_type", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      question_text: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      max_marks: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      correct_answer_text: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: "Used for subjective/fill questions",
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

  const tableName = 'assessment_question';
  const tableExists = await queryInterface.describeTable(tableName).then(() => true).catch(() => false);
  if (tableExists) {
    await queryInterface.dropTable(tableName);
  } else {
    console.log(`${tableName} does not exists !`)
  }
};
