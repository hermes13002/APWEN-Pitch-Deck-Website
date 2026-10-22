// Configuration constants for APWEN-LASU Career Summit 2.0 Pitch Competition

export const EVENT_DETAILS = {
  title: "APWEN-LASU Career Summit 2.0",
  subtitle: "Pitch Competition",
  theme: "Building Engineers For Impact, Wealth & Innovation",
  taglines: [
    "Where Ideas Meet Opportunities",
    "Innovation • Problem-Solving • Entrepreneurship • Impact",
    "Ideas. Innovation. Impact."
  ],
  venue: "Lagos State University (LASU), Epe Campus",
  venueDetails: "Lagos State, Nigeria",
  edition: "2.0",
  year: "2026",
  dateString: "Friday, 27 November 2026",
  summitDate: "2026-11-27T09:00:00+01:00",
  registrationOpenDate: "2026-10-19T00:00:00+01:00",
  registrationCloseDate: "2026-11-06T23:59:59+01:00",
};

// External Resource Links
export const LINKS = {
  // Live Google Apps Script Web App endpoint
  googleAppsScriptUrl: "https://script.google.com/macros/s/AKfycbyCIg2VgbESdcUp_XIOWf2hlKaL_1N1Ibx7253fvNeGJdzc31KbSFGlvGhX7OZhNviFyg/exec",
  
  // Official WhatsApp Community/Group invite URL
  whatsappCommunityUrl: "https://chat.whatsapp.com/GBtp0oHLWrPAY3AH47YI4B?s=cl&p=a&mlu=4&ilr=4",
  
  // Google Drive folder containing Pitch Deck Guide, Rubric PDF & Templates
  pitchGuideDriveUrl: "https://drive.google.com/drive/folders/1RBu_yvnFR0QdVTZKPMxxtDJUC_XS2Tqd?usp=drive_link",
  
  // Fallback Google Form if needed
  googleFormFallbackUrl: "https://docs.google.com/forms/d/e/1FAIpQLScz-Jyc7sjwB_0hiISx-VPT-BrFOZxwjgL-jgV1N6lC3vm7ew/viewform?usp=header",
  
  // Socials
  instagram: "https://www.instagram.com/apwenlasu?igsh=MXI0cGdzdXMyc2lrcQ==",
  linkedin: "https://www.linkedin.com/company/apwen-lasu/",
  email: "apwenlasu@gmail.com",
  phones: ["+234 903 997 7151", "+234 708 382 7808"],
};

// The 5 Solution-Focused Tracks from the Official 2026 Brochure
export const COMPETITION_TRACKS = [
  {
    id: "tech-ai",
    title: "Technology & AI",
    iconName: "Cpu",
    tagline: "Intelligent Software & Digital Transformation",
    description: "Harness artificial intelligence, automation, and modern computing to solve African challenges.",
    subcategories: [
      "AI & Machine Learning",
      "Software & Mobile Apps",
      "Cybersecurity",
      "Robotics & Automation",
      "ICT & Cloud Systems",
      "EdTech"
    ]
  },
  {
    id: "health-life",
    title: "Health & Life Sciences",
    iconName: "HeartPulse",
    tagline: "Accessible Healthcare & Medical Innovations",
    description: "Innovate healthcare delivery, diagnostics, maternal health, and community wellbeing.",
    subcategories: [
      "HealthTech & Telemedicine",
      "Women's Health",
      "Mental Wellbeing",
      "Healthcare Accessibility",
      "Assistive Tech",
      "Community & Public Health"
    ]
  },
  {
    id: "business-finance",
    title: "Business, Finance & Entrepreneurship",
    iconName: "LineChart",
    tagline: "Empowering Commerce & Economic Inclusion",
    description: "Develop novel financial mechanisms, e-commerce systems, and SME empowerment solutions.",
    subcategories: [
      "FinTech & Payments",
      "Financial Inclusion",
      "SME Enablement Solutions",
      "E-Commerce & Supply Chain",
      "Student Finance",
      "Innovative Business Models"
    ]
  },
  {
    id: "energy-climate",
    title: "Engineering, Sustainability & Climate",
    iconName: "Leaf",
    tagline: "Clean Energy & Circular Economy",
    description: "Pioneer renewable energy, circular waste management, and sustainable environmental solutions.",
    subcategories: [
      "Renewable Energy & Solar",
      "Waste Management & Recycling",
      "Climate Tech Solutions",
      "Sustainable Agriculture & AgTech",
      "Water Resource Management",
      "Energy Efficiency"
    ]
  },
  {
    id: "social-innovation",
    title: "Social Innovation & Community Development",
    iconName: "Users",
    tagline: "Human-Centered Social Progress",
    description: "Create impact-driven platforms fostering equity, youth skills, inclusion, and civic empowerment.",
    subcategories: [
      "Quality Education",
      "Youth & Career Development",
      "Gender Inclusion in STEM",
      "Public Safety & Emergency Response",
      "Civic & Community Development"
    ]
  }
];

// Confirmed 4-Stage Competition Timeline
export const TIMELINE_MILESTONES = [
  {
    step: "01",
    phase: "Phase 1",
    title: "Registration & Initial Submission",
    date: "19 October – 6 November 2026",
    badge: "Active",
    description: "Register your team and submit your core project proposal online. Join the exclusive WhatsApp cohort to receive pitch templates and live check-ins.",
    actionText: "Register Team",
    highlight: true,
  },
  {
    step: "02",
    phase: "Phase 2",
    title: "Screening & Shortlisting",
    date: "7 – 12 November 2026",
    badge: "Review",
    description: "Expert review committee evaluates all submissions for eligibility, problem significance, innovation, and practical feasibility.",
    actionText: null,
    highlight: false,
  },
  {
    step: "03",
    phase: "Phase 3",
    title: "Virtual Pre-Finals",
    date: "13 November 2026",
    badge: "Virtual",
    description: "Shortlisted teams undergo an online evaluation with virtual judges to test pitch clarity, problem validation, and select the grand finalists.",
    actionText: null,
    highlight: false,
  },
  {
    step: "04",
    phase: "Phase 4",
    title: "Grand Finale & Career Summit 2.0",
    date: "Friday, 27 November 2026",
    badge: "Live Event",
    description: "Finalists pitch live before industry leaders, tech executives, and investors at LASU Epe Campus. Uniform 100-point scoring and awards presentation.",
    actionText: "Summit Day",
    highlight: true,
  }
];

// Official 100-Point Scoring Framework from 2026 Judges Brochure
export const JUDGING_RUBRIC = [
  {
    id: "problem",
    title: "Problem Identification & Relevance",
    weight: 15,
    description: "Is the problem clearly defined? Is there empirical evidence it exists? Does the team understand the community affected?",
    icon: "Target"
  },
  {
    id: "innovation",
    title: "Innovation & Creativity",
    weight: 15,
    description: "Is the approach original? Does it meaningfully improve on existing solutions? Has the team demonstrated inventive thinking?",
    icon: "Lightbulb"
  },
  {
    id: "solution",
    title: "Solution / Technical Approach",
    weight: 15,
    description: "Does the solution directly address the problem? Is the technology appropriate and practically explained?",
    icon: "Code2"
  },
  {
    id: "market",
    title: "Target Users & Market Understanding",
    weight: 10,
    description: "Who are the users, customers, or beneficiaries? Does the team demonstrate nuanced understanding of market needs?",
    icon: "Users2"
  },
  {
    id: "business",
    title: "Business & Sustainability Model",
    weight: 15,
    description: "How will the solution operate? How will it generate revenue, maintain funding, or sustain community operations?",
    icon: "TrendingUp"
  },
  {
    id: "feasibility",
    title: "Feasibility",
    weight: 10,
    description: "Can the idea realistically be implemented? Has the team considered resource constraints, skills, and implementation hurdles?",
    icon: "CheckSquare"
  },
  {
    id: "scalability",
    title: "Scalability",
    weight: 10,
    description: "Can the solution expand to serve broader demographics, larger regions, or alternative contexts?",
    icon: "Maximize2"
  },
  {
    id: "impact",
    title: "Potential Impact",
    weight: 5,
    description: "Net tangible social, economic, environmental, or technological value created for Africa and beyond.",
    icon: "Globe"
  },
  {
    id: "pitch",
    title: "Pitch Delivery & Q&A",
    weight: 5,
    description: "Poise, structure, time management (5 min pitch), and depth/quality of answers during the 3-minute Q&A.",
    icon: "Mic"
  }
];

// The 8 Elements of a Strong Pitch Deck
export const PITCH_ELEMENTS = [
  { step: 1, name: "The Problem", detail: "What exact pain point or bottleneck is being addressed?" },
  { step: 2, name: "The Target User", detail: "Who experiences the problem and benefits from the solution?" },
  { step: 3, name: "The Solution", detail: "What exactly is proposed, and how does the product work?" },
  { step: 4, name: "Innovation", detail: "What makes your approach novel, defensible, and superior?" },
  { step: 5, name: "Sustainability / Business Model", detail: "How will operations be funded and sustained over time?" },
  { step: 6, name: "Feasibility", detail: "Can it realistically be built with available skills and tech?" },
  { step: 7, name: "Impact", detail: "What measurable social, economic, or environmental value is created?" },
  { step: 8, name: "Scalability", detail: "How can the solution expand beyond its initial pilot community?" }
];

// FAQs for Summit 2.0
export const FAQS = [
  {
    question: "Who is eligible to participate in the Summit 2.0 Pitch Competition?",
    answer: "The competition is open to all undergraduate students of Lagos State University (LASU) as well as students from visiting collegiate chapters (e.g. APWEN UNILAG, APWEN Covenant, etc.) from any department. Interdisciplinary collaboration (engineering, computer science, physical sciences, management) is actively encouraged."
  },
  {
    question: "What is the team size and composition requirement?",
    answer: "Teams must consist of 2 to 4 undergraduate students. Because APWEN is a female-empowerment engineering association, every team must have female representation — all-male teams are strictly not permitted. Male students are fully welcomed to participate as team members and attend the summit, but each team must include female engineers/innovators."
  },
  {
    question: "Do we need a finished slide deck to register right now?",
    answer: "No! You can register your team and core concept today through our native registration form. Once registered, join the official WhatsApp cohort where you'll receive the official pitch deck guide, templates, and check-in support before the final deck submission deadline on November 6."
  },
  {
    question: "What is the pitch format and time allocation on Pitch Day?",
    answer: "Each team is allocated 8 minutes total: 5 minutes for the live slide pitch presentation, followed strictly by 3 minutes of interactive Q&A with our panel of judges."
  },
  {
    question: "Is there any registration or entry fee?",
    answer: "No. Participation in the APWEN-LASU Career Summit 2.0 Pitch Competition is 100% free for all students."
  },
  {
    question: "What are the key stages of the competition?",
    answer: "Stage 1: Initial Registration & Submission (19 Oct – 6 Nov) → Stage 2: Screening & Shortlisting (7 – 12 Nov) → Stage 3: Virtual Pre-Finals (13 Nov) → Stage 4: Live Grand Finale at LASU Epe Campus (Friday, 27 Nov)."
  },
  {
    question: "How will entries be judged?",
    answer: "Judging uses a uniform 100-point scoring framework covering: Problem Relevance (15%), Innovation (15%), Technical Approach (15%), Business/Sustainability (15%), Feasibility (10%), Target Market (10%), Scalability (10%), Impact (5%), and Delivery/Q&A (5%)."
  }
];
