export const up = async (queryInterface) => {
  const qualifications = [
    // --- Core Teaching & Academic Qualifications ---
    "B.Ed",
    "M.Ed",
    "D.El.Ed",
    "B.El.Ed",
    "TTC (Teacher Training Certificate)",
    "D.Ed (Diploma in Education)",
    "Ph.D",
    "M.Phil",
    "NET (Education)",
    "SET (Education)",

    // --- Commerce & Management ---
    "B.Com",
    "M.Com",
    "MBA",
    "BBA",
    "PGDBM",
    "PGDM",

    // --- Science Stream ---
    "B.Sc (Physics)",
    "B.Sc (Chemistry)",
    "B.Sc (Biology)",
    "B.Sc (Maths)",
    "M.Sc (Physics)",
    "M.Sc (Chemistry)",
    "M.Sc (Biology)",
    "M.Sc (Maths)",
    "M.Sc (Computer Science)",
    "B.Sc (Computer Science)",

    // --- Arts & Humanities ---
    "BA (English)",
    "BA (History)",
    "BA (Geography)",
    "BA (Political Science)",
    "BA (Sociology)",
    "BA (Economics)",
    "MA (English)",
    "MA (History)",
    "MA (Political Science)",
    "MA (Geography)",
    "MA (Sociology)",
    "MA (Economics)",
    "MA (Education)",
    "MA (Psychology)",

    // --- Fine Arts, Music & Physical Education ---
    "BFA (Bachelor of Fine Arts)",
    "MFA (Master of Fine Arts)",
    "BA (Music Hons)",
    "MA (Music)",
    "B.P.Ed (Bachelor of Physical Education)",
    "M.P.Ed (Master of Physical Education)",
    "BP.Ed",
    "MP.Ed",
    "Diploma in Music",
    "Diploma in Fine Arts",

    // --- Library & Information Science ---
    "B.Lib.Sc",
    "M.Lib.Sc",

    // --- Computer & IT ---
    "BCA",
    "MCA",
    "PGDCA",
    "Diploma in Computer Applications",

    // --- Languages & Literature ---
    "BA (Hindi)",
    "MA (Hindi)",
    "BA (Sanskrit)",
    "MA (Sanskrit)",
    "BA (Urdu)",
    "MA (Urdu)",

    // --- Specialized ---
    "B.Sc (Bio)",
    "B.Sc (Home Science)",
    "B.A. (Education)",
    "M.A. (Education)",
    "M.A. (Psychology)",
    "M.A. (History) M.Ed NET (Edu.)",
    "M.A. (English) Ph.D (Education)",
    "M.A. (Political Science) B.Ed",
    "B.Sc (Bio) M.A. (History) M.Ed NET (Edu.)",
    "M.Com B.Ed",
    "M.Com M.Ed",
    "M.Com BP.Ed",
  ];

  await queryInterface.bulkInsert(
    "qualifications",
    qualifications.map((q) => ({
      name: q,
      description: `Qualification: ${q}`,
      created_at: new Date(),
      updated_at: new Date(),
    }))
  );
};

export const down = async (queryInterface) => {
  await queryInterface.bulkDelete("qualifications", null, {});
};
