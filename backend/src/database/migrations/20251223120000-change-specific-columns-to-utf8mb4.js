"use strict";

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface) {
  // Disable FK checks
  await queryInterface.sequelize.query(`
    SET FOREIGN_KEY_CHECKS = 0;
  `);

  /* =========================
     assessment
     ========================= */
  await queryInterface.sequelize.query(`
    ALTER TABLE assessment
      MODIFY assessment_title TEXT
        CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
      MODIFY assessment_description TEXT
        CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
  `);

  /* =========================
     assessment_question
     ========================= */
  await queryInterface.sequelize.query(`
    ALTER TABLE assessment_question
      MODIFY question_text TEXT
        CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
      MODIFY correct_answer_text TEXT
        CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
  `);

  /* =========================
     assessment_question_option
     ========================= */
  await queryInterface.sequelize.query(`
    ALTER TABLE assessment_question_option
      MODIFY option_text TEXT
        CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
  `);

  /* =========================
     assessment_student_answer
     ========================= */
  await queryInterface.sequelize.query(`
    ALTER TABLE assessment_student_answer
      MODIFY answer_text TEXT
        CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
  `);

  /* =========================
     skills
     ========================= */
  await queryInterface.sequelize.query(`
    ALTER TABLE skills
      MODIFY title TEXT
        CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
      MODIFY description TEXT
        CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
  `);

  /* =========================
     courses
     ========================= */
  await queryInterface.sequelize.query(`
    ALTER TABLE courses
      MODIFY title TEXT
        CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
      MODIFY description TEXT
        CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
  `);

  /* =========================
     course_modules
     ========================= */
  await queryInterface.sequelize.query(`
    ALTER TABLE course_modules
      MODIFY title TEXT
        CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
      MODIFY description TEXT
        CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
  `);

  /* =========================
     course_lessons
     ========================= */
  await queryInterface.sequelize.query(`
    ALTER TABLE course_lessons
      MODIFY title TEXT
        CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
      MODIFY description TEXT
        CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
  `);

  // Enable FK checks
  await queryInterface.sequelize.query(`
    SET FOREIGN_KEY_CHECKS = 1;
  `);
}

export async function down(queryInterface) {
  // ⚠️ Optional rollback (latin1)
  // Only add this if you REALLY need rollback
  await queryInterface.sequelize.query(`
    SET FOREIGN_KEY_CHECKS = 0;
  `);

  await queryInterface.sequelize.query(`
    ALTER TABLE assessment
      MODIFY assessment_title TEXT
        CHARACTER SET latin1 COLLATE latin1_swedish_ci,
      MODIFY assessment_description TEXT
        CHARACTER SET latin1 COLLATE latin1_swedish_ci;
  `);

  await queryInterface.sequelize.query(`
    SET FOREIGN_KEY_CHECKS = 1;
  `);
}
