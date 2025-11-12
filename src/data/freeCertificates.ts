export interface FreeCertificate {
  name: string;
  provider: string;
  description: string;
  url: string;
  category: string;
  tags: string[];
}

export const freeCertificates: FreeCertificate[] = [
  // Cloud Computing
  {
    name: "AWS Certified Cloud Practitioner",
    provider: "Amazon Web Services",
    description: "Foundational understanding of AWS Cloud services and terminology. Great entry point to AWS certifications.",
    url: "https://aws.amazon.com/certification/certified-cloud-practitioner/",
    category: "Cloud",
    tags: ["AWS", "Cloud", "Beginner", "Infrastructure"]
  },
  {
    name: "Microsoft Azure Fundamentals (AZ-900)",
    provider: "Microsoft Learn",
    description: "Foundational knowledge of cloud concepts and Azure services. Perfect for beginners to cloud computing.",
    url: "https://learn.microsoft.com/en-us/certifications/azure-fundamentals/",
    category: "Cloud",
    tags: ["Azure", "Microsoft", "Cloud", "Beginner"]
  },
  {
    name: "Google Cloud Digital Leader",
    provider: "Google Cloud",
    description: "Demonstrate your knowledge of cloud computing basics and how Google Cloud products and services can achieve business goals.",
    url: "https://cloud.google.com/certification/cloud-digital-leader",
    category: "Cloud",
    tags: ["GCP", "Google Cloud", "Cloud", "Beginner"]
  },

  // AI/ML
  {
    name: "Google AI Essentials",
    provider: "Google",
    description: "Learn AI fundamentals and how to apply AI tools to enhance your work and productivity.",
    url: "https://www.coursera.org/learn/google-ai-essentials",
    category: "AI/ML",
    tags: ["AI", "Machine Learning", "Google", "Beginner"]
  },
  {
    name: "IBM AI Engineering Professional Certificate",
    provider: "IBM SkillsBuild",
    description: "Master AI engineering including machine learning, deep learning, and neural networks with hands-on projects.",
    url: "https://www.coursera.org/professional-certificates/ai-engineer",
    category: "AI/ML",
    tags: ["AI", "Deep Learning", "IBM", "Intermediate"]
  },
  {
    name: "Elements of AI",
    provider: "University of Helsinki",
    description: "Free online introduction to AI for non-experts. Learn what AI is, what it can do, and how it affects our lives.",
    url: "https://www.elementsofai.com/",
    category: "AI/ML",
    tags: ["AI", "Fundamentals", "Free", "Beginner"]
  },

  // Cybersecurity
  {
    name: "Introduction to Cybersecurity",
    provider: "Cisco Networking Academy",
    description: "Learn cybersecurity basics and how to protect personal data and privacy online. No prerequisites required.",
    url: "https://www.netacad.com/courses/cybersecurity/introduction-cybersecurity",
    category: "Cybersecurity",
    tags: ["Security", "Cisco", "Beginner", "Free"]
  },
  {
    name: "Google Cybersecurity Professional Certificate",
    provider: "Google",
    description: "Get job-ready for an entry-level cybersecurity role with hands-on training in security operations.",
    url: "https://www.coursera.org/professional-certificates/google-cybersecurity",
    category: "Cybersecurity",
    tags: ["Security", "Google", "Beginner", "Career"]
  },
  {
    name: "Junior Cybersecurity Analyst Career Path",
    provider: "Cisco",
    description: "Start your cybersecurity career with comprehensive training covering security fundamentals and threat detection.",
    url: "https://www.netacad.com/courses/cybersecurity/cybersecurity-essentials",
    category: "Cybersecurity",
    tags: ["Security", "Cisco", "Career Path", "Beginner"]
  },

  // Web Development
  {
    name: "Responsive Web Design Certification",
    provider: "FreeCodeCamp",
    description: "Learn HTML, CSS, Flexbox, Grid, and responsive design by building 5 projects from scratch.",
    url: "https://www.freecodecamp.org/learn/2022/responsive-web-design/",
    category: "Web Development",
    tags: ["HTML", "CSS", "Frontend", "Free"]
  },
  {
    name: "JavaScript Algorithms and Data Structures",
    provider: "FreeCodeCamp",
    description: "Master JavaScript fundamentals including ES6, regular expressions, debugging, and algorithmic thinking.",
    url: "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/",
    category: "Web Development",
    tags: ["JavaScript", "Algorithms", "Free", "Beginner"]
  },
  {
    name: "Front End Development Libraries",
    provider: "FreeCodeCamp",
    description: "Build interactive web apps with React, Redux, Bootstrap, and Sass through hands-on projects.",
    url: "https://www.freecodecamp.org/learn/front-end-development-libraries/",
    category: "Web Development",
    tags: ["React", "Redux", "Frontend", "Free"]
  },
  {
    name: "Meta Front-End Developer Certificate",
    provider: "Meta (Facebook)",
    description: "Launch your career as a front-end developer. Learn HTML, CSS, JavaScript, React, and responsive design.",
    url: "https://www.coursera.org/professional-certificates/meta-front-end-developer",
    category: "Web Development",
    tags: ["React", "JavaScript", "Meta", "Career"]
  },

  // Data Science
  {
    name: "IBM Data Science Professional Certificate",
    provider: "IBM",
    description: "Learn Python, data analysis, visualization, machine learning, and complete hands-on projects.",
    url: "https://www.coursera.org/professional-certificates/ibm-data-science",
    category: "Data Science",
    tags: ["Python", "Data Analysis", "IBM", "Career"]
  },
  {
    name: "Google Data Analytics Professional Certificate",
    provider: "Google",
    description: "Get job-ready skills in data analytics including SQL, R, Tableau, and data visualization.",
    url: "https://www.coursera.org/professional-certificates/google-data-analytics",
    category: "Data Science",
    tags: ["SQL", "Analytics", "Google", "Beginner"]
  },

  // Programming
  {
    name: "Python for Everybody Specialization",
    provider: "University of Michigan",
    description: "Learn to program in Python and use it to analyze data. No prior programming experience required.",
    url: "https://www.coursera.org/specializations/python",
    category: "Programming",
    tags: ["Python", "Programming", "Beginner", "Free"]
  },
  {
    name: "CS50's Introduction to Computer Science",
    provider: "Harvard University",
    description: "Harvard's legendary introduction to computer science covering algorithms, data structures, and more.",
    url: "https://cs50.harvard.edu/x/",
    category: "Programming",
    tags: ["Computer Science", "C", "Python", "Beginner"]
  },

  // Business & Project Management
  {
    name: "Google Project Management Certificate",
    provider: "Google",
    description: "Learn project management fundamentals including Agile methodology and hands-on practice.",
    url: "https://www.coursera.org/professional-certificates/google-project-management",
    category: "Business",
    tags: ["Project Management", "Agile", "Google", "Career"]
  },
  {
    name: "Google Digital Marketing & E-commerce Certificate",
    provider: "Google",
    description: "Get job-ready for careers in digital marketing and e-commerce with hands-on training.",
    url: "https://www.coursera.org/professional-certificates/google-digital-marketing-ecommerce",
    category: "Business",
    tags: ["Marketing", "E-commerce", "Google", "Career"]
  },

  // Design
  {
    name: "Google UX Design Professional Certificate",
    provider: "Google",
    description: "Learn the foundations of UX design and create a portfolio with 3 end-to-end projects.",
    url: "https://www.coursera.org/professional-certificates/google-ux-design",
    category: "Design",
    tags: ["UX", "UI", "Design", "Google"]
  },

  // IT Support
  {
    name: "Google IT Support Professional Certificate",
    provider: "Google",
    description: "Get job-ready for an entry-level IT support role with hands-on training in troubleshooting.",
    url: "https://www.coursera.org/professional-certificates/google-it-support",
    category: "IT Support",
    tags: ["IT", "Support", "Google", "Career"]
  },

  // Oracle
  {
    name: "Oracle Cloud Infrastructure Foundations",
    provider: "Oracle",
    description: "Learn Oracle Cloud Infrastructure basics including compute, storage, networking, and security.",
    url: "https://education.oracle.com/oracle-cloud-infrastructure-2024-foundations-associate/pexam_1Z0-1085-24",
    category: "Cloud",
    tags: ["Oracle", "Cloud", "Infrastructure", "Beginner"]
  }
];

export const categories = [
  "All",
  "Cloud",
  "AI/ML",
  "Cybersecurity",
  "Web Development",
  "Data Science",
  "Programming",
  "Business",
  "Design",
  "IT Support"
];
