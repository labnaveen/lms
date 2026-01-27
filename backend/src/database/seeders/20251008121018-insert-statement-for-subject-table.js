
import crypto from "crypto";
export const up = async (queryInterface) => {
  const subjects = [
  { subject_name: "English", subject_code: "EN" },
  { subject_name: "Hindi", subject_code: "HI" },
  { subject_name: "Mathematics", subject_code: "MA" },
  { subject_name: "Urdu", subject_code: "UR" },
  { subject_name: "Arts", subject_code: "AR" },
  { subject_name: "Physical Education", subject_code: "PE" },
  { subject_name: "Our Wondrous World", subject_code: "OWW" },
  { subject_name: "Sanskrit", subject_code: "SA" },
  { subject_name: "Science", subject_code: "SC" },
  { subject_name: "Social Science", subject_code: "SS" },
  { subject_name: "Vocational Education", subject_code: "VE" },
  { subject_name: "ICT", subject_code: "ICT" },
  { subject_name: "Accountancy", subject_code: "AC" },
  { subject_name: "Biology", subject_code: "BI" },
  { subject_name: "Biotechnology", subject_code: "BT" },
  { subject_name: "Business Studies", subject_code: "BS" },
  { subject_name: "Chemistry", subject_code: "CH" },
  { subject_name: "Computer Science", subject_code: "CS" },
  { subject_name: "Creative Writing and Translation", subject_code: "CWT" },
  { subject_name: "Economics", subject_code: "EC" },
  { subject_name: "Fine Arts", subject_code: "FA" },
  { subject_name: "Geography", subject_code: "GE" },
  { subject_name: "History", subject_code: "HS" },
  { subject_name: "Home Science", subject_code: "HM" },
  { subject_name: "Informatics Practices", subject_code: "IP" },
  { subject_name: "Knowledge Tradition and Practice of India", subject_code: "KTPI" },
  { subject_name: "Physics", subject_code: "PH" },
  { subject_name: "Political Science", subject_code: "PS" },
  { subject_name: "Psychology", subject_code: "PY" },
  { subject_name: "Sangeet", subject_code: "SG" },
  { subject_name: "Sociology", subject_code: "SO" },
];

  // const subjects = [
  //   { subject_name: "English", subject_code: "EN" },
  //   { subject_name: "Hindi", subject_code: "HI" },
  //   { subject_name: "Mathematics", subject_code: "MA" },
  //   { subject_name: "Physics", subject_code: "PH" },
  //   { subject_name: "Chemistry", subject_code: "CH" },
  //   { subject_name: "Biology", subject_code: "BI" },
  //   { subject_name: "Computer Science", subject_code: "CS" },
  //   { subject_name: "Physical Education", subject_code: "PE" },
  //   { subject_name: "Economics", subject_code: "EC" },
  //   { subject_name: "Political Science", subject_code: "PS" },
  //   { subject_name: "History", subject_code: "HS" },
  //   { subject_name: "Geography", subject_code: "GE" },
  //   { subject_name: "Sociology", subject_code: "SO" },
  //   { subject_name: "Psychology", subject_code: "PY" },
  //   { subject_name: "Accountancy", subject_code: "AC" },
  //   { subject_name: "Business Studies", subject_code: "BS" },
  //   { subject_name: "Informatics Practices", subject_code: "IP" },
  // ];

  await queryInterface.bulkInsert(
    "subject",
    subjects.map((sub) => ({

      subject_uuid: crypto.randomUUID(),
      subject_name: sub.subject_name,
      subject_code: sub.subject_code,
      created_at: new Date(),
      updated_at: new Date(),

    }))
  );

};

export const down = async (queryInterface) => {
  const subjectNames = [
    "English", "Hindi", "Mathematics", "Physics", "Chemistry", "Biology",
    "Computer Science", "Physical Education", "Economics", "Political Science",
    "History", "Geography", "Sociology", "Psychology", "Accountancy",
    "Business Studies", "Informatics Practices"
  ];

  await queryInterface.bulkDelete("subject", {
    subject_name: subjectNames,
  });
};
