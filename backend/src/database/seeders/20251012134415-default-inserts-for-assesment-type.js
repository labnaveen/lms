// import crypto from "crypto";

import { v4 as uuidv4 } from "uuid";

export const up = async (queryInterface) => {


  await queryInterface.bulkInsert(
    "assessment_type",
    [
      {
        assessment_type_uuid: uuidv4(), assessment_type_name: "Unit Test", description: "Test conducted for a single unit or chapter", "created_at": new Date(),
        "updated_at": new Date(),
      },
      {
        assessment_type_uuid: uuidv4(), assessment_type_name: "Periodic Test", description: "Test conducted periodically to assess overall progress", "created_at": new Date(),
        "updated_at": new Date(),
      },
      {
        assessment_type_uuid: uuidv4(), assessment_type_name: "Quiz", description: "Short test or online quiz for quick assessment", "created_at": new Date(),
        "updated_at": new Date(),"deleted_at": new Date(),
      },

      {
        assessment_type_uuid: uuidv4(), assessment_type_name: "Mid-Term Examination", description: "Examination covering first half of syllabus", "created_at": new Date(),
        "updated_at": new Date(),"deleted_at": new Date(),
      },
      {
        assessment_type_uuid: uuidv4(), assessment_type_name: "Final Examination", description: "Examination covering the full syllabus", "created_at": new Date(),
        "updated_at": new Date(),"deleted_at": new Date(),
      },
      
      {
        assessment_type_uuid: uuidv4(), assessment_type_name: "Project", description: "Assessment based on project work or assignments", "created_at": new Date(),
        "updated_at": new Date(),"deleted_at": new Date(),
      },
      {
        assessment_type_uuid: uuidv4(), assessment_type_name: "Practical", description: "Lab-based practical assessment", "created_at": new Date(),
        "updated_at": new Date(),"deleted_at": new Date(),
      },
      {
        assessment_type_uuid: uuidv4(), assessment_type_name: "Oral Test", description: "Assessment conducted orally", "created_at": new Date(),
        "updated_at": new Date(),"deleted_at": new Date(),
      },
    ]);

};

export const down = async (queryInterface) => {
  await queryInterface.bulkDelete("assessment_type", null, {});
};
