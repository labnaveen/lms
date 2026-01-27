import crypto from "crypto";

export const up = async (queryInterface) => {
  const chapters = Array.from({ length: 20 }, (_, i) => ({
    chapter_name: `Chapter ${i + 1}`, // CBSE style: Chapter 1, Chapter 2, ...
  }));

  await queryInterface.bulkInsert(
    "chapter",
    chapters.map((c) => ({
      chapter_uuid: crypto.randomUUID(),
      chapter_name: c.chapter_name,
      created_at: new Date(),
      updated_at: new Date(),
    }))
  );
};

export const down = async (queryInterface) => {
  await queryInterface.bulkDelete("chapter", null, {});
};
