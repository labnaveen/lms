import crypto from "crypto";

export const up = async (queryInterface) => {
  const resourceTypes = [
    { name: "PDF" },
    { name: "Video" },
    // { name: "Image" },
    { name: "Document" },
    // { name: "Audio" },
    // { name: "Other" },
  ];

  await queryInterface.bulkInsert(
    "syllabus_resource_type",
    resourceTypes.map((r) => ({
      syllabus_resource_type_uuid: crypto.randomUUID(),
      syllabus_resource_type_name: r.name,
      created_at: new Date(),
      updated_at: new Date(),
    }))
  );
};

export const down = async (queryInterface) => {
  await queryInterface.bulkDelete("syllabus_resource_type", null, {});
};
