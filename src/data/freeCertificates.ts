export interface FreeCertificate {
  name: string;
  provider: string;
  description: string;
  url: string;
  category: string;
  level: string;
  region: string;
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
    level: "Beginner",
    region: "Global",
    tags: ["AWS", "Cloud", "Beginner", "Infrastructure"]
  },
  {
    name: "Microsoft Azure Fundamentals (AZ-900)",
    provider: "Microsoft Learn",
    description: "Foundational knowledge of cloud concepts and Azure services. Perfect for beginners to cloud computing.",
    url: "https://learn.microsoft.com/en-us/certifications/azure-fundamentals/",
    category: "Cloud",
    level: "Beginner",
    region: "Global",
    tags: ["Azure", "Microsoft", "Cloud", "Beginner"]
  },
  {
    name: "Google Cloud Digital Leader",
    provider: "Google Cloud",
    description: "Demonstrate your knowledge of cloud computing basics and how Google Cloud products and services can achieve business goals.",
    url: "https://cloud.google.com/certification/cloud-digital-leader",
    category: "Cloud",
    level: "Beginner",
    region: "Global",
    tags: ["GCP", "Google Cloud", "Cloud", "Beginner"]
  },
  {
    name: "Oracle Cloud Infrastructure Foundations",
    provider: "Oracle",
    description: "Learn Oracle Cloud Infrastructure basics including compute, storage, networking, and security.",
    url: "https://education.oracle.com/oracle-cloud-infrastructure-2024-foundations-associate/pexam_1Z0-1085-24",
    category: "Cloud",
    level: "Beginner",
    region: "Global",
    tags: ["Oracle", "Cloud", "Infrastructure", "Beginner"]
  },
  {
    name: "IBM Cloud Essentials",
    provider: "IBM SkillsBuild",
    description: "Learn cloud computing fundamentals and IBM Cloud services for building scalable applications.",
    url: "https://www.ibm.com/training/cloud",
    category: "Cloud",
    level: "Beginner",
    region: "Global",
    tags: ["IBM", "Cloud", "Free", "Beginner"]
  },

  // AI/ML
  {
    name: "Google AI Essentials",
    provider: "Google",
    description: "Learn AI fundamentals and how to apply AI tools to enhance your work and productivity.",
    url: "https://www.coursera.org/learn/google-ai-essentials",
    category: "AI/ML",
    level: "Beginner",
    region: "Global",
    tags: ["AI", "Machine Learning", "Google", "Beginner"]
  },
  {
    name: "IBM AI Engineering Professional Certificate",
    provider: "IBM SkillsBuild",
    description: "Master AI engineering including machine learning, deep learning, and neural networks with hands-on projects.",
    url: "https://www.coursera.org/professional-certificates/ai-engineer",
    category: "AI/ML",
    level: "Intermediate",
    region: "Global",
    tags: ["AI", "Deep Learning", "IBM", "Intermediate"]
  },
  {
    name: "Elements of AI",
    provider: "University of Helsinki",
    description: "Free online introduction to AI for non-experts. Learn what AI is, what it can do, and how it affects our lives.",
    url: "https://www.elementsofai.com/",
    category: "AI/ML",
    level: "Beginner",
    region: "Global",
    tags: ["AI", "Fundamentals", "Free", "Beginner"]
  },
  {
    name: "ALX AI Career Essentials",
    provider: "ALX Africa",
    description: "Learn AI fundamentals and practical applications tailored for African tech professionals and job seekers.",
    url: "https://www.alxafrica.com/ai-essentials/",
    category: "AI/ML",
    level: "Beginner",
    region: "Africa",
    tags: ["AI", "ALX", "Africa", "Career", "Free"]
  },
  {
    name: "Microsoft AI Skills Challenge",
    provider: "Microsoft Africa Development Center",
    description: "Build AI skills with Microsoft's free training programs and certifications designed for African developers.",
    url: "https://www.microsoft.com/en-us/africa/",
    category: "AI/ML",
    level: "Intermediate",
    region: "Africa",
    tags: ["AI", "Microsoft", "Africa", "Free"]
  },
  {
    name: "Building AI",
    provider: "University of Helsinki",
    description: "Learn how to create AI methods and understand the technical concepts behind machine learning algorithms.",
    url: "https://buildingai.elementsofai.com/",
    category: "AI/ML",
    level: "Intermediate",
    region: "Global",
    tags: ["AI", "Machine Learning", "Free", "Python"]
  },
  {
    name: "AWS Machine Learning Foundations",
    provider: "Amazon Web Services",
    description: "Introduction to machine learning concepts and AWS ML services for building intelligent applications.",
    url: "https://aws.amazon.com/training/learn-about/machine-learning/",
    category: "AI/ML",
    level: "Beginner",
    region: "Global",
    tags: ["AWS", "Machine Learning", "AI", "Free"]
  },

  // Cybersecurity
  {
    name: "Introduction to Cybersecurity",
    provider: "Cisco Networking Academy",
    description: "Learn cybersecurity basics and how to protect personal data and privacy online. No prerequisites required.",
    url: "https://www.netacad.com/courses/cybersecurity/introduction-cybersecurity",
    category: "Cybersecurity",
    level: "Beginner",
    region: "Global",
    tags: ["Security", "Cisco", "Beginner", "Free"]
  },
  {
    name: "Google Cybersecurity Professional Certificate",
    provider: "Google",
    description: "Get job-ready for an entry-level cybersecurity role with hands-on training in security operations.",
    url: "https://www.coursera.org/professional-certificates/google-cybersecurity",
    category: "Cybersecurity",
    level: "Beginner",
    region: "Global",
    tags: ["Security", "Google", "Beginner", "Career"]
  },
  {
    name: "Junior Cybersecurity Analyst Career Path",
    provider: "Cisco",
    description: "Start your cybersecurity career with comprehensive training covering security fundamentals and threat detection.",
    url: "https://www.netacad.com/courses/cybersecurity/cybersecurity-essentials",
    category: "Cybersecurity",
    level: "Beginner",
    region: "Global",
    tags: ["Security", "Cisco", "Career Path", "Beginner"]
  },
  {
    name: "Cybersecurity Essentials",
    provider: "Cisco Networking Academy",
    description: "Learn to defend networks and systems from cyber attacks with hands-on cybersecurity skills.",
    url: "https://www.netacad.com/courses/cybersecurity/cybersecurity-essentials",
    category: "Cybersecurity",
    level: "Intermediate",
    region: "Global",
    tags: ["Security", "Cisco", "Network Security", "Free"]
  },
  {
    name: "IBM Cybersecurity Analyst",
    provider: "IBM SkillsBuild",
    description: "Develop cybersecurity skills to detect threats, protect systems, and respond to security incidents.",
    url: "https://www.coursera.org/professional-certificates/ibm-cybersecurity-analyst",
    category: "Cybersecurity",
    level: "Beginner",
    region: "Global",
    tags: ["Security", "IBM", "Career", "Free Audit"]
  },

  // Web Development
  {
    name: "Responsive Web Design Certification",
    provider: "FreeCodeCamp",
    description: "Learn HTML, CSS, Flexbox, Grid, and responsive design by building 5 projects from scratch.",
    url: "https://www.freecodecamp.org/learn/2022/responsive-web-design/",
    category: "Web Development",
    level: "Beginner",
    region: "Global",
    tags: ["HTML", "CSS", "Frontend", "Free"]
  },
  {
    name: "JavaScript Algorithms and Data Structures",
    provider: "FreeCodeCamp",
    description: "Master JavaScript fundamentals including ES6, regular expressions, debugging, and algorithmic thinking.",
    url: "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/",
    category: "Web Development",
    level: "Beginner",
    region: "Global",
    tags: ["JavaScript", "Algorithms", "Free", "Beginner"]
  },
  {
    name: "Front End Development Libraries",
    provider: "FreeCodeCamp",
    description: "Build interactive web apps with React, Redux, Bootstrap, and Sass through hands-on projects.",
    url: "https://www.freecodecamp.org/learn/front-end-development-libraries/",
    category: "Web Development",
    level: "Intermediate",
    region: "Global",
    tags: ["React", "Redux", "Frontend", "Free"]
  },
  {
    name: "Meta Front-End Developer Certificate",
    provider: "Meta (Facebook)",
    description: "Launch your career as a front-end developer. Learn HTML, CSS, JavaScript, React, and responsive design.",
    url: "https://www.coursera.org/professional-certificates/meta-front-end-developer",
    category: "Web Development",
    level: "Beginner",
    region: "Global",
    tags: ["React", "JavaScript", "Meta", "Career"]
  },
  {
    name: "ALX Software Engineering",
    provider: "ALX Africa",
    description: "Intensive full-stack software engineering program with job placement support for African tech talent.",
    url: "https://www.alxafrica.com/software-engineering/",
    category: "Web Development",
    level: "Intermediate",
    region: "Africa",
    tags: ["Full-Stack", "ALX", "Africa", "Career", "Free"]
  },
  {
    name: "Back End Development and APIs",
    provider: "FreeCodeCamp",
    description: "Learn back-end development with Node.js, Express, MongoDB, and build RESTful APIs.",
    url: "https://www.freecodecamp.org/learn/back-end-development-and-apis/",
    category: "Web Development",
    level: "Intermediate",
    region: "Global",
    tags: ["Node.js", "Backend", "APIs", "Free"]
  },
  {
    name: "Andela Learning Community",
    provider: "Andela",
    description: "Free access to Andela's learning resources and community for African developers to upskill.",
    url: "https://andela.com/alc/",
    category: "Web Development",
    level: "Beginner",
    region: "Africa",
    tags: ["Full-Stack", "Andela", "Africa", "Community", "Free"]
  },
  {
    name: "Full Stack Web Development",
    provider: "The Odin Project",
    description: "Free comprehensive curriculum covering HTML, CSS, JavaScript, Node.js, and React with hands-on projects.",
    url: "https://www.theodinproject.com/",
    category: "Web Development",
    level: "Beginner",
    region: "Global",
    tags: ["Full-Stack", "JavaScript", "React", "Free"]
  },

  // Data Science
  {
    name: "IBM Data Science Professional Certificate",
    provider: "IBM",
    description: "Learn Python, data analysis, visualization, machine learning, and complete hands-on projects.",
    url: "https://www.coursera.org/professional-certificates/ibm-data-science",
    category: "Data Science",
    level: "Beginner",
    region: "Global",
    tags: ["Python", "Data Analysis", "IBM", "Career"]
  },
  {
    name: "Google Data Analytics Professional Certificate",
    provider: "Google",
    description: "Get job-ready skills in data analytics including SQL, R, Tableau, and data visualization.",
    url: "https://www.coursera.org/professional-certificates/google-data-analytics",
    category: "Data Science",
    level: "Beginner",
    region: "Global",
    tags: ["SQL", "Analytics", "Google", "Beginner"]
  },
  {
    name: "Africa Data School",
    provider: "Africa Data School",
    description: "Free data science training for Africans covering Python, data analysis, and machine learning skills.",
    url: "https://africadataschool.com/",
    category: "Data Science",
    level: "Beginner",
    region: "Africa",
    tags: ["Python", "Data Science", "Africa", "Free"]
  },
  {
    name: "Data Analysis with Python",
    provider: "FreeCodeCamp",
    description: "Learn data analysis with Python using NumPy, Pandas, Matplotlib, and Seaborn through practical projects.",
    url: "https://www.freecodecamp.org/learn/data-analysis-with-python/",
    category: "Data Science",
    level: "Intermediate",
    region: "Global",
    tags: ["Python", "Data Analysis", "Free", "Pandas"]
  },
  {
    name: "Zindi Learn",
    provider: "Zindi Africa",
    description: "Learn data science and machine learning through African-focused competitions and practical challenges.",
    url: "https://zindi.africa/learn",
    category: "Data Science",
    level: "Intermediate",
    region: "Africa",
    tags: ["Machine Learning", "Africa", "Competitions", "Free"]
  },
  {
    name: "Machine Learning with Python",
    provider: "FreeCodeCamp",
    description: "Learn machine learning fundamentals with Python including TensorFlow and neural networks through hands-on projects.",
    url: "https://www.freecodecamp.org/learn/machine-learning-with-python/",
    category: "Data Science",
    level: "Advanced",
    region: "Global",
    tags: ["Machine Learning", "Python", "TensorFlow", "Free"]
  },
  {
    name: "Microsoft Power BI Data Analyst",
    provider: "Microsoft Learn",
    description: "Learn to analyze data and create reports and dashboards with Power BI for data-driven decisions.",
    url: "https://learn.microsoft.com/en-us/certifications/power-bi-data-analyst-associate/",
    category: "Data Science",
    level: "Intermediate",
    region: "Global",
    tags: ["Power BI", "Analytics", "Microsoft", "Free"]
  },

  // Programming
  {
    name: "Python for Everybody Specialization",
    provider: "University of Michigan",
    description: "Learn to program in Python and use it to analyze data. No prior programming experience required.",
    url: "https://www.coursera.org/specializations/python",
    category: "Programming",
    level: "Beginner",
    region: "Global",
    tags: ["Python", "Programming", "Beginner", "Free"]
  },
  {
    name: "CS50's Introduction to Computer Science",
    provider: "Harvard University",
    description: "Harvard's legendary introduction to computer science covering algorithms, data structures, and more.",
    url: "https://cs50.harvard.edu/x/",
    category: "Programming",
    level: "Beginner",
    region: "Global",
    tags: ["Computer Science", "C", "Python", "Beginner"]
  },
  {
    name: "Google Africa Developer Scholarship (GADS)",
    provider: "Google & Pluralsight",
    description: "Annual scholarship for African developers to learn cloud, mobile, and web development skills.",
    url: "https://www.pluralsight.com/partners/google/africa",
    category: "Programming",
    level: "Intermediate",
    region: "Africa",
    tags: ["Google", "Africa", "Scholarship", "Cloud"]
  },
  {
    name: "Scientific Computing with Python",
    provider: "FreeCodeCamp",
    description: "Learn Python fundamentals for scientific computing including data structures, algorithms, and OOP.",
    url: "https://www.freecodecamp.org/learn/scientific-computing-with-python/",
    category: "Programming",
    level: "Intermediate",
    region: "Global",
    tags: ["Python", "Scientific Computing", "Free", "Algorithms"]
  },
  {
    name: "Introduction to Programming",
    provider: "University of London (Coursera)",
    description: "Learn programming fundamentals using JavaScript and build interactive web applications from scratch.",
    url: "https://www.coursera.org/learn/uol-introduction-to-programming-1",
    category: "Programming",
    level: "Beginner",
    region: "Global",
    tags: ["JavaScript", "Programming", "Free Audit", "Beginner"]
  },
  {
    name: "CS50's Web Programming with Python and JavaScript",
    provider: "Harvard University",
    description: "Learn web development with Python, JavaScript, SQL, and frameworks like Django and React.",
    url: "https://cs50.harvard.edu/web/",
    category: "Programming",
    level: "Intermediate",
    region: "Global",
    tags: ["Python", "JavaScript", "Web Development", "Free"]
  },
  {
    name: "Java Programming",
    provider: "University of Helsinki",
    description: "Comprehensive Java programming course covering object-oriented programming and data structures.",
    url: "https://java-programming.mooc.fi/",
    category: "Programming",
    level: "Beginner",
    region: "Global",
    tags: ["Java", "OOP", "Programming", "Free"]
  },

  // Business & Project Management
  {
    name: "Google Project Management Certificate",
    provider: "Google",
    description: "Learn project management fundamentals including Agile methodology and hands-on practice.",
    url: "https://www.coursera.org/professional-certificates/google-project-management",
    category: "Business",
    level: "Beginner",
    region: "Global",
    tags: ["Project Management", "Agile", "Google", "Career"]
  },
  {
    name: "Google Digital Marketing & E-commerce Certificate",
    provider: "Google",
    description: "Get job-ready for careers in digital marketing and e-commerce with hands-on training.",
    url: "https://www.coursera.org/professional-certificates/google-digital-marketing-ecommerce",
    category: "Business",
    level: "Beginner",
    region: "Global",
    tags: ["Marketing", "E-commerce", "Google", "Career"]
  },
  {
    name: "Ajira Digital Program",
    provider: "Ajira Digital Kenya",
    description: "Free digital skills training for Kenyans including freelancing, digital marketing, and online work opportunities.",
    url: "https://ajiradigital.go.ke/",
    category: "Business",
    level: "Beginner",
    region: "Kenya",
    tags: ["Digital Skills", "Kenya", "Freelancing", "Free"]
  },
  {
    name: "Entrepreneurship Specialization",
    provider: "University of Pennsylvania (Coursera)",
    description: "Learn to launch and grow your business with Wharton's entrepreneurship fundamentals and strategies.",
    url: "https://www.coursera.org/specializations/wharton-entrepreneurship",
    category: "Business",
    level: "Intermediate",
    region: "Global",
    tags: ["Entrepreneurship", "Business", "Free Audit", "Strategy"]
  },
  {
    name: "Digital Marketing",
    provider: "OpenLearn",
    description: "Free digital marketing course covering SEO, social media, content marketing, and analytics.",
    url: "https://www.open.edu/openlearn/money-business/leadership-management/digital-marketing",
    category: "Business",
    level: "Beginner",
    region: "Global",
    tags: ["Marketing", "SEO", "Social Media", "Free"]
  },
  {
    name: "Financial Markets",
    provider: "Yale University (Coursera)",
    description: "Learn about financial markets, risk management, and behavioral finance from Yale professor Robert Shiller.",
    url: "https://www.coursera.org/learn/financial-markets-global",
    category: "Business",
    level: "Intermediate",
    region: "Global",
    tags: ["Finance", "Markets", "Free Audit", "Yale"]
  },

  // Design
  {
    name: "Google UX Design Professional Certificate",
    provider: "Google",
    description: "Learn the foundations of UX design and create a portfolio with 3 end-to-end projects.",
    url: "https://www.coursera.org/professional-certificates/google-ux-design",
    category: "Design",
    level: "Beginner",
    region: "Global",
    tags: ["UX", "UI", "Design", "Google"]
  },
  {
    name: "UI/UX Design Specialization",
    provider: "California Institute of the Arts (Coursera)",
    description: "Learn user interface and user experience design fundamentals from visual design to prototyping.",
    url: "https://www.coursera.org/specializations/ui-ux-design",
    category: "Design",
    level: "Beginner",
    region: "Global",
    tags: ["UX", "UI", "Design", "Free Audit"]
  },
  {
    name: "Graphic Design",
    provider: "OpenLearn",
    description: "Free introduction to graphic design covering typography, color theory, and visual composition.",
    url: "https://www.open.edu/openlearn/history-the-arts/visual-art/graphic-design",
    category: "Design",
    level: "Beginner",
    region: "Global",
    tags: ["Graphic Design", "Visual Arts", "Free"]
  },
  {
    name: "Interaction Design",
    provider: "University of California San Diego (Coursera)",
    description: "Learn to design better user experiences and interfaces through human-centered design principles.",
    url: "https://www.coursera.org/specializations/interaction-design",
    category: "Design",
    level: "Intermediate",
    region: "Global",
    tags: ["UX", "Interaction Design", "Free Audit"]
  },

  // IT Support
  {
    name: "Google IT Support Professional Certificate",
    provider: "Google",
    description: "Get job-ready for an entry-level IT support role with hands-on training in troubleshooting.",
    url: "https://www.coursera.org/professional-certificates/google-it-support",
    category: "IT Support",
    level: "Beginner",
    region: "Global",
    tags: ["IT", "Support", "Google", "Career"]
  },
  {
    name: "CompTIA IT Fundamentals",
    provider: "Cisco Networking Academy",
    description: "Learn IT fundamentals including hardware, software, networking, and security basics.",
    url: "https://www.netacad.com/courses/os-it/it-essentials",
    category: "IT Support",
    level: "Beginner",
    region: "Global",
    tags: ["IT", "Hardware", "Networking", "Free"]
  },
  {
    name: "IT Automation with Python",
    provider: "Google (Coursera)",
    description: "Learn to automate IT tasks with Python, including scripts for system administration and troubleshooting.",
    url: "https://www.coursera.org/professional-certificates/google-it-automation",
    category: "IT Support",
    level: "Intermediate",
    region: "Global",
    tags: ["Python", "Automation", "IT", "Free Audit"]
  },

  // Others
  {
    name: "Safaricom Digital Academy",
    provider: "Safaricom Kenya",
    description: "Free digital skills training for Kenyans in coding, digital marketing, and entrepreneurship.",
    url: "https://www.safaricom.co.ke/personal/",
    category: "Others",
    level: "Beginner",
    region: "Kenya",
    tags: ["Digital Skills", "Kenya", "Safaricom", "Free"]
  },
  {
    name: "African Leadership University Short Courses",
    provider: "ALU",
    description: "Free online courses on leadership, entrepreneurship, and African development from ALU.",
    url: "https://www.alueducation.com/",
    category: "Others",
    level: "Beginner",
    region: "Africa",
    tags: ["Leadership", "Africa", "Entrepreneurship", "Free"]
  },
  {
    name: "Introduction to Linux",
    provider: "Linux Foundation (edX)",
    description: "Learn Linux fundamentals including command line, file systems, and system administration basics.",
    url: "https://www.edx.org/learn/linux/the-linux-foundation-introduction-to-linux",
    category: "Others",
    level: "Beginner",
    region: "Global",
    tags: ["Linux", "Operating Systems", "Free", "Command Line"]
  },
  {
    name: "Git and GitHub",
    provider: "OpenLearn",
    description: "Learn version control with Git and collaboration on GitHub for software development projects.",
    url: "https://www.open.edu/openlearn/science-maths-technology/computing-and-ict/introduction-using-git-and-github",
    category: "Others",
    level: "Beginner",
    region: "Global",
    tags: ["Git", "GitHub", "Version Control", "Free"]
  },
  {
    name: "Learning How to Learn",
    provider: "University of California San Diego (Coursera)",
    description: "Powerful mental tools to help you master tough subjects and learn more effectively.",
    url: "https://www.coursera.org/learn/learning-how-to-learn",
    category: "Others",
    level: "Beginner",
    region: "Global",
    tags: ["Learning", "Study Skills", "Free Audit", "Personal Development"]
  },
  {
    name: "Relational Database",
    provider: "FreeCodeCamp",
    description: "Learn relational databases, SQL, PostgreSQL, and database design through hands-on projects.",
    url: "https://www.freecodecamp.org/learn/relational-database/",
    category: "Others",
    level: "Intermediate",
    region: "Global",
    tags: ["SQL", "Database", "PostgreSQL", "Free"]
  },
  {
    name: "Quality Assurance",
    provider: "FreeCodeCamp",
    description: "Learn software testing, test automation, and quality assurance best practices for software development.",
    url: "https://www.freecodecamp.org/learn/quality-assurance/",
    category: "Others",
    level: "Intermediate",
    region: "Global",
    tags: ["QA", "Testing", "Automation", "Free"]
  },
  {
    name: "Information Security",
    provider: "FreeCodeCamp",
    description: "Learn information security fundamentals including encryption, secure coding, and penetration testing.",
    url: "https://www.freecodecamp.org/learn/information-security/",
    category: "Others",
    level: "Advanced",
    region: "Global",
    tags: ["Security", "Encryption", "Penetration Testing", "Free"]
  },
  {
    name: "College Algebra and Problem Solving",
    provider: "Arizona State University (edX)",
    description: "Strengthen your math skills with college-level algebra and problem-solving techniques.",
    url: "https://www.edx.org/learn/algebra/arizona-state-university-college-algebra-and-problem-solving",
    category: "Others",
    level: "Beginner",
    region: "Global",
    tags: ["Math", "Algebra", "Free Audit", "Problem Solving"]
  },
  {
    name: "Microsoft Office Skills",
    provider: "OpenLearn",
    description: "Learn essential Microsoft Office skills including Word, Excel, PowerPoint, and Outlook.",
    url: "https://www.open.edu/openlearn/money-business/microsoft-office",
    category: "Others",
    level: "Beginner",
    region: "Global",
    tags: ["Microsoft Office", "Productivity", "Free", "Excel"]
  },
  {
    name: "Moringa School Prep",
    provider: "Moringa School",
    description: "Free preparatory course for aspiring software developers in Africa covering programming fundamentals.",
    url: "https://moringaschool.com/prep/",
    category: "Programming",
    level: "Beginner",
    region: "Africa",
    tags: ["Programming", "Africa", "Moringa", "Free"]
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
  "IT Support",
  "Others"
];

export const regions = [
  "All",
  "Global",
  "Africa",
  "Kenya"
];
