import { DataTypes } from "sequelize";

export const up = async (queryInterface) => {
  const tableName = 'assessment_question_option';
  const tableExists = await queryInterface.describeTable(tableName).then(() => true).catch(() => false);

  if (!tableExists) {

    await queryInterface.createTable(tableName, {

      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.BIGINT,
      },

      assessment_question_option_uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        unique: true,
      },
        
      assessment_question_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: { model: "assessment_question", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },

      option_text: {
        type: DataTypes.TEXT,
        allowNull: false,
      },

      is_correct: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
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

  const tableName = 'assessment_question_option';
  const tableExists = await queryInterface.describeTable(tableName).then(() => true).catch(() => false);
  if (tableExists) {
    await queryInterface.dropTable(tableName);
  } else {
    console.log(`${tableName} does not exists !`)
  }
};
