import { v4 as uuidv4 } from "uuid";

export const up = async (queryInterface) => {
  await queryInterface.bulkInsert("notification_target_type", [
    {
      notification_target_type_uuid: uuidv4(),
      target_type: "whole_school",
      target_description: "Whole school",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      notification_target_type_uuid: uuidv4(),
      target_type: "all_teachers",
      target_description: "All teachers",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      notification_target_type_uuid: uuidv4(),
      target_type: "teachers_by_class",
      target_description: "Teachers by class",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      notification_target_type_uuid: uuidv4(),
      target_type: "teachers_by_class_section",
      target_description: "Teachers by class section",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      notification_target_type_uuid: uuidv4(),
      target_type: "all_students",
      target_description: "All students",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      notification_target_type_uuid: uuidv4(),
      target_type: "students_by_class",
      target_description: "Students by class",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      notification_target_type_uuid: uuidv4(),
      target_type: "students_by_class_section",
      target_description: "Students by class section",
      created_at: new Date(),
      updated_at: new Date(),
    },

    {
      notification_target_type_uuid: uuidv4(),
      target_type: "teacher",
      target_description: "Teacher",
      created_at: new Date(),
      updated_at: new Date(),
    },

    {
      notification_target_type_uuid: uuidv4(),
      target_type: "student",
      target_description: "Student",
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]);
};

export const down = async (queryInterface) => {
  await queryInterface.bulkDelete("notification_target_type", null, {});
};
