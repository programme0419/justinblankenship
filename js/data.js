/**
 * Content for the node-flow portfolio.
 * Five stage nodes carry the workflow; panels carry the detail.
 */

const PROFILE = {
  name: "Justin Wade Blankenship",
  firstName: "Justin",
  title: "Senior Medical Coding Specialist",
  credentials: "CCS · CPC-A",
  location: "Waterford, MI",
  phoneDisplay: "(410) 508-0008",
  phoneHref: "tel:+14105080008",
  email: "justinblankenship177@gmail.com",
  linkedin: "https://www.linkedin.com/in/justin-b-62a62a438",
  resumeHref: "assets/docs/justin-blankenship-resume.pdf",
  coverHref: "assets/docs/cover-letter.pdf",
  tagline:
    "Ten years turning complex clinical documentation into accurate, compliant code.",
  stats: [
    { value: "10+", label: "Years coding" },
    { value: "5", label: "Organizations" },
    { value: "2", label: "Credentials" },
  ],
};

const STAGES = [
  { id: "overview", num: "01", label: "Overview", hint: "Who I am" },
  { id: "career", num: "02", label: "Career", hint: "Where I worked" },
  { id: "skills", num: "03", label: "Coding", hint: "What I code" },
  { id: "certs", num: "04", label: "Credentials", hint: "Verified" },
  { id: "contact", num: "05", label: "Contact", hint: "Get in touch" },
];

const HIGHLIGHTS = [
  {
    title: "ICD-10-CM · CPT · HCPCS",
    body: "Inpatient and outpatient code assignment from full chart review.",
  },
  {
    title: "HCC risk adjustment",
    body: "Retrospective review validating clinically supported chronic conditions.",
  },
  {
    title: "Documentation integrity",
    body: "Finds missing specificity and unsupported diagnoses before billing.",
  },
  {
    title: "Quality assurance",
    body: "Accuracy benchmarks held in high-volume production environments.",
  },
];

const ROLES = [
  {
    id: "guidehouse",
    employer: "Guidehouse",
    title: "Medical Coding Specialist II",
    dates: "2022 — 2026",
    fullDates: "March 2022 — July 2026",
    setting: "Healthcare consulting · high-volume production",
    tags: ["Inpatient", "Outpatient", "Compliance"],
    points: [
      "Evaluated clinical records and assigned ICD-10-CM, CPT, and HCPCS codes representing diagnoses, procedures, and rendered services.",
      "Reviewed progress notes, operative reports, diagnostic findings, and treatment records for code specificity.",
      "Applied coding guidelines and payer policies to reduce discrepancies and support accurate reimbursement.",
      "Flagged missing specificity and unsupported diagnoses for clarification or quality review.",
      "Held accuracy benchmarks while sustaining high-volume productivity.",
    ],
  },
  {
    id: "aquity",
    employer: "Aquity Solutions",
    title: "Medical Coding Specialist II",
    dates: "2021 — 2022",
    fullDates: "March 2021 — March 2022",
    setting: "Contract coding · multi-client delivery",
    tags: ["Multi-client", "Encoder tools"],
    points: [
      "Converted complex patient records into compliant diagnosis and procedure assignments for multiple clients.",
      "Validated documentation completeness and code selection against current coding standards.",
      "Supported revenue-cycle goals by flagging documentation improvement opportunities.",
      "Met quality, turnaround, and confidentiality requirements on independent assignments.",
    ],
  },
  {
    id: "mercy",
    employer: "Mercy",
    title: "Coding Specialist II",
    dates: "2017 — 2020",
    fullDates: "April 2017 — May 2020",
    setting: "Health system · multi-specialty professional coding",
    tags: ["Multi-specialty", "Chart review"],
    points: [
      "Coded professional encounters across multiple specialties from provider documentation.",
      "Determined code sequencing, diagnosis specificity, and procedural representation.",
      "Ran quality-focused chart reviews that closed documentation gaps.",
      "Resolved coding questions with clinical and internal stakeholders.",
    ],
  },
  {
    id: "inovalon",
    employer: "Inovalon",
    title: "Remote Coding Review Consultant",
    dates: "2016 — 2017",
    fullDates: "February 2016 — February 2017",
    setting: "Healthcare analytics · HCC risk adjustment",
    tags: ["HCC", "Risk adjustment"],
    points: [
      "Analyzed historical records and validated documented chronic conditions for risk adjustment.",
      "Ensured accurate capture of clinically supported diagnoses for analytics programs.",
    ],
  },
  {
    id: "os2",
    employer: "OS2 Healthcare Solutions",
    title: "Contract Coder",
    dates: "2016",
    fullDates: "January 2016 — February 2016",
    setting: "Deadline-driven contract support",
    tags: ["Contract"],
    points: [
      "Delivered contract coding through record analysis, compliant code assignment, and documentation review.",
    ],
  },
];

const EDUCATION = {
  school: "Davenport University",
  dates: "April 2009 — December 2011",
};

const SKILL_GROUPS = [
  {
    group: "Code assignment",
    items: [
      "Advanced ICD-10-CM diagnosis coding",
      "CPT procedure coding",
      "HCPCS Level II coding",
      "HCC risk adjustment",
    ],
  },
  {
    group: "Integrity & audit",
    items: [
      "Clinical documentation integrity review",
      "Medical necessity validation",
      "Coding compliance auditing",
      "Coding quality assurance",
    ],
  },
  {
    group: "Operations",
    items: [
      "Professional fee coding",
      "Facility coding support",
      "Retrospective chart review",
      "Remote coding operations",
    ],
  },
  {
    group: "Systems",
    items: [
      "EHR platforms",
      "Encoder applications",
      "Healthcare information systems",
      "HIPAA privacy compliance",
    ],
  },
];

const CERTS = [
  {
    id: "ccs",
    issuer: "AHIMA",
    short: "CCS",
    name: "Certified Coding Specialist",
    issued: "April 17, 2025",
    valid: "Valid through April 16, 2027",
    number: "No. 263416",
    image: "assets/certs/ccs.png",
  },
  {
    id: "cpc",
    issuer: "AAPC",
    short: "CPC-A",
    name: "Certified Professional Coder — Apprentice",
    issued: "March 2024",
    valid: "AAPC examination credential",
    number: "Apprentice",
    image: "assets/certs/cpc-apprentice.png",
  },
];

const COVER_LETTER = {
  subject: "Senior Medical Coding Specialist",
  greeting: "Dear Hiring Manager,",
  paragraphs: [
    "I am submitting my application for the Senior Medical Coding Specialist position with more than ten years of progressive experience supporting healthcare organizations through accurate clinical documentation analysis, compliant code assignment, and revenue cycle optimization. My background includes extensive work across hospital systems, physician organizations, and healthcare technology environments where I have developed advanced expertise in interpreting complex medical records and translating clinical information into precise ICD-10-CM, CPT, and HCPCS coding solutions.",
    "Throughout my career with Guidehouse, Aquity Solutions, Mercy, Jefferson City Medical Group, and Inovalon, I have performed high-level coding responsibilities requiring strong knowledge of official coding guidelines, payer requirements, and healthcare compliance standards. My experience includes professional fee coding, retrospective chart review, HCC risk adjustment coding, documentation validation, and quality assurance review processes designed to improve coding accuracy and healthcare data integrity.",
    "I specialize in analyzing detailed physician documentation, evaluating clinical indicators, and assigning accurate codes that appropriately represent documented diagnoses, procedures, and patient conditions. My approach combines technical coding knowledge with analytical review skills to identify documentation gaps, improve coding consistency, and support compliant reimbursement practices.",
    "I have successfully operated in demanding production environments where accuracy, productivity, and regulatory compliance must be maintained simultaneously. I am experienced in reviewing complex charts, resolving coding discrepancies, applying updated coding regulations, and collaborating with healthcare professionals to strengthen documentation quality and operational performance.",
    "I would welcome the opportunity to bring my senior-level coding expertise, commitment to compliance, and dedication to documentation accuracy to your organization. I am confident that my experience can support your coding operations while contributing to improved quality, efficiency, and revenue cycle outcomes.",
    "Thank you for your time and consideration. I look forward to discussing how my qualifications align with your organization's needs.",
  ],
  closing: "Sincerely,",
};
