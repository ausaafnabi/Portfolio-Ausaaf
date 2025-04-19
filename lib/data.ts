export const personalData = {
  name: "Ausaaf Nabi",
  title: "Software Engineer & Researcher",
  email: "nabiausaaf@gmail.com",
  location: "Netherlands",
  website: "https://ausaafnabi.github.io",
  githubUsername: "ausaafnabi",
  summary:
    "Versatile software engineer and researcher with hands-on experience in AI systems, 3D computer vision, and bioinformatics. Adept at designing scalable architectures, developing data-intensive applications, and contributing to cutting-edge research.",
  availableFor: ["Full-time", "Freelance", "Consulting"],
  social: [
    {
      name: "GitHub",
      url: "https://github.com/ausaafnabi",
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/ausaaf-nabi",
    },
  ],
  experience: [
    {
      position: "Software Engineer",
      company: "VIRSIGN",
      period: "January 2024 - February 2025",
      achievements: [
        "Developed 3D Computer Vision models for crane automation",
        "Engineered Dockerized FastAPI backend for model deployment",
        "Added observability with Prometheus/Grafana for system monitoring",
        "Built Kafka-powered real-time data processing pipelines",
        "Reduced inference time by 40% through model optimization",
      ],
    },
    {
      position: "Bioinformatics Researcher",
      company: "BioCluster MIPT, Lab Medvedeva",
      period: "April 2023 - January 2024",
      achievements: [
        "Built CUDA C++ toolkits for RNA sequence analysis",
        "Worked on GPU benchmarking via SLURM clusters",
        "Contributed to scientific publications in bioinformatics",
        "Optimized parallel computing algorithms for genomic data",
        "Reduced processing time for large datasets by 65%",
      ],
    },
    {
      position: "Software Architect",
      company: "AmberFlux EdgeAI Private Limited",
      period: "June 2021 - April 2023",
      achievements: [
        "Led AI product development including GUS inference engine",
        "Developed diabetic retinopathy prediction system with 92% accuracy",
        "Managed cross-functional teams of 8 engineers",
        "Implemented CI/CD pipelines for streamlined deployment",
        "Designed scalable microservices architecture for AI applications",
      ],
    },
    {
      position: "Freelancer",
      company: "Self-employed",
      period: "May 2021 - July 2021",
      achievements: [
        "Developed custom web solutions for small businesses",
        "Created an order management system for a local restaurant",
        "Designed and implemented organization landing pages",
        "Integrated payment gateways for e-commerce platforms",
        "Provided technical consultation for startups",
      ],
    },
  ],
  education: [
    {
      degree: "Masters in Applied Physics and Mathematics",
      institution: "Moscow Institute of Physics and Technology (MIPT)",
      period: "Graduated June 2024",
      description:
        "Specialized in Applied Bioinformatics. Full scholarship via Opendoors Olympiad (Computer Science). GPA: 3.62.",
    },
    {
      degree: "Bachelor's in Computer Science",
      institution: "University of Delhi",
      period: "August 2019 - July 2022",
      description:
        "Focused on core computer science subjects and participated in academic and extracurricular tech projects.",
    },
  ],
  skills: {
    programmingLanguages: [
      { name: "Python", level: 95 },
      { name: "CUDA C++", level: 90 },
      { name: "R", level: 80 },
      { name: "Golang", level: 75 },
      { name: "Java", level: 70 },
      { name: "SQL", level: 85 },
      { name: "JavaScript", level: 85 },
      { name: "TypeScript", level: 80 },
    ],
    frameworks: [
      { name: "React", level: 80 },
      { name: "FastAPI", level: 85 },
      { name: "Django", level: 75 },
      { name: "TensorFlow", level: 85 },
      { name: "PyTorch", level: 80 },
      { name: "Spring Boot", level: 65 },
      { name: "Next.js", level: 75 },
    ],
    developerTools: [
      { name: "Docker", level: 90 },
      { name: "Kubernetes", level: 75 },
      { name: "Git", level: 90 },
      { name: "CI/CD", level: 80 },
      { name: "AWS", level: 70 },
      { name: "GCP", level: 65 },
      { name: "Prometheus", level: 75 },
    ],
    libraries: [
      { name: "NumPy", level: 90 },
      { name: "Pandas", level: 85 },
      { name: "scikit-learn", level: 80 },
      { name: "OpenCV", level: 85 },
      { name: "Redux", level: 75 },
      { name: "Matplotlib", level: 80 },
      { name: "Tailwind CSS", level: 85 },
    ],
    softSkills: [
      { name: "Leadership", level: 85 },
      { name: "Team playing", level: 80 },
      { name: "Open communications", level: 75 },
      { name: "Management", level: 85 },
    ],
    languages: [
      { name: "English", level: 90 },
      { name: "Hindi", level: 100 },
      { name: "Dutch", level: 30 },
    ],
  },
  projects: [
    {
      name: "GADES",
      organization: "Lab Medvedeva",
      period: "November 2022 - April 2024",
      github: "https://github.com/lab-medvedeva/GADES-main",
    },
    {
      name: "Reward Distribution Telegram Bot",
      organization: "Algent",
      period: "January 2024",
      features: [
        "Monitor relevant w3 contract",
        "Calculates and shows reward for the contract chain",
        "Configure multiple distributor accounts",
      ],
    },
  ],
  publications: [
    {
      title: "GPU-accelerated Kendall distance computation for large or sparse data",
      year: "2024",
      journal: "Oxford GigaScience",
      doi: "10.1093/gigascience/giae088",
      highlights: [
        "Implemented GADES, a GPU-enhanced software package for massively parallelized Kendall-distance matrices computation",
        "Achieved significant speedup in processing large datasets through optimized memory management and algorithmic solutions",
      ],
    },
    {
      title: "Effective Load Balancing and Load Sharing in Multi-access Edge Computing",
      year: "2023",
      publisher: "Springer Singapore",
      doi: "10.1007/978-981-19-9228-5_11",
      highlights: [
        "Developed a MEC framework for efficient load balancing and sharing in network congestion",
        "Proposed two algorithms for proactive load rationalization and data distribution",
      ],
    },
  ],
}
