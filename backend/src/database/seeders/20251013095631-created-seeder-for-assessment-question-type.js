import { v4 as uuidv4 } from "uuid";

export const up = async (queryInterface) => {
  await queryInterface.bulkInsert(
    "assessment_question_type",
    [
      {
        assessment_question_type_uuid: uuidv4(),
        name: "MCQ",
        description: "Multiple Choice Question",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        assessment_question_type_uuid: uuidv4(),
        name: "MAQ",
        description: "Multiple Answer Question",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        assessment_question_type_uuid: uuidv4(),
        name: "TRUE_FALSE",
        description: "True or False Question",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        assessment_question_type_uuid: uuidv4(),
        name: "FILL_BLANK",
        description: "Fill in the Blank Question",
        created_at: new Date(),
        updated_at: new Date(),
        // deleted_at: new Date(),
      },
      {
        assessment_question_type_uuid: uuidv4(),
        name: "DESCRIPTIVE",
        description: "Descriptive / Subjective Question",
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: new Date(),
      },
    ]
  );
};

export const down = async (queryInterface) => {
  await queryInterface.bulkDelete("assessment_question_type", null, {});
};
