import { v4 as uuidv4 } from "uuid";

export const up = async (queryInterface) => {
  await queryInterface.bulkInsert("sub_categories", [
    // Programming
    {
      sub_category_uuid: uuidv4(),
      category_id: 1,
      name: "Web Development",
      description: "Frontend and backend web development using modern frameworks.",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      sub_category_uuid: uuidv4(),
      category_id: 1,
      name: "Mobile App Development",
      description: "Building iOS and Android applications using native and cross-platform tools.",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      sub_category_uuid: uuidv4(),
      category_id: 1,
      name: "Programming Fundamentals",
      description: "Core programming concepts including data structures and algorithms.",
      created_at: new Date(),
      updated_at: new Date(),
    },

    // Data Analysis
    {
      sub_category_uuid: uuidv4(),
      category_id: 2,
      name: "Data Visualization",
      description: "Creating insights through data visualization tools and dashboards.",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      sub_category_uuid: uuidv4(),
      category_id: 2,
      name: "Statistical Analysis",
      description: "Applying statistical methods to understand data trends and patterns.",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      sub_category_uuid: uuidv4(),
      category_id: 2,
      name: "Machine Learning Basics",
      description: "Introduction to supervised and unsupervised learning techniques.",
      created_at: new Date(),
      updated_at: new Date(),
    },

    // Design
    {
      sub_category_uuid: uuidv4(),
      category_id: 3,
      name: "UI Design",
      description: "Designing intuitive and visually appealing user interfaces.",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      sub_category_uuid: uuidv4(),
      category_id: 3,
      name: "UX Research",
      description: "Understanding user needs through research and usability testing.",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      sub_category_uuid: uuidv4(),
      category_id: 3,
      name: "Graphic Design",
      description: "Creating visual content for digital and print media.",
      created_at: new Date(),
      updated_at: new Date(),
    },

    // Soft Skills
    {
      sub_category_uuid: uuidv4(),
      category_id: 4,
      name: "Communication Skills",
      description: "Enhancing verbal and written communication in professional settings.",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      sub_category_uuid: uuidv4(),
      category_id: 4,
      name: "Leadership Development",
      description: "Building leadership and decision-making abilities for team success.",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      sub_category_uuid: uuidv4(),
      category_id: 4,
      name: "Team Collaboration",
      description: "Working effectively within diverse teams to achieve shared goals.",
      created_at: new Date(),
      updated_at: new Date(),
    },

    // Teaching
    {
      sub_category_uuid: uuidv4(),
      category_id: 5,
      name: "Classroom Management",
      description: "Strategies for maintaining an engaging and disciplined classroom.",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      sub_category_uuid: uuidv4(),
      category_id: 5,
      name: "Instructional Design",
      description: "Creating effective lesson plans and learning materials.",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      sub_category_uuid: uuidv4(),
      category_id: 5,
      name: "Student Assessment",
      description: "Evaluating student performance using various assessment tools.",
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]);
};

export const down = async (queryInterface) => {
  await queryInterface.bulkDelete("sub_categories", null, {});
};
