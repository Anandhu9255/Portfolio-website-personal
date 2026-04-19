const portfolioData = {
  name: "Anandhu Anil Kumar",
  title: "FULL STACK (MERN) DEVELOPER",
  location: "Adoor, Kerala",
  email: "contactmeanandhuanilkumar@gmail.com",
  phone: "9495450152",
  github: "https://github.com/Anandhu9255",
  linkedin: "https://linkedin.com/in/anandhuanilkumar-web-developer",

  projects: [
    {
      id: 1,
      title: "CoinPulse",
      description:
        "Real-time crypto tracker showing top 5 coins by market cap. Search any coin by name for live price and market cap data via CoinGecko API.",
      tech: ["React.js", "Vite", "CoinGecko API"],
      live: "https://coin-pulse-six.vercel.app/",
      color: "#00f5ff",
    },
    {
      id: 2,
      title: "Weather App",
      description:
        "Responsive weather app using vanilla JS and OpenWeatherMap API, supporting real-time data for 200,000+ cities worldwide with debounced search.",
      tech: ["HTML", "CSS", "JavaScript", "OpenWeatherMap API"],
      live: "https://weather-app-drab-ten-24.vercel.app/",
      color: "#7c3aed",
    },
    {
      id: 3,
      title: "Personal Finance Planner",
      description:
        "Personal finance tracker supporting 6 expense categories with full CRUD operations, localStorage persistence and real-time dashboard.",
      tech: ["HTML", "CSS", "JavaScript"],
      live: "https://personal-finance-planner-xi.vercel.app/",
      color: "#06d6a0",
    },
  ],

  skills: {
    Database: ["MongoDB", "MongoDB Atlas"],
    Backend: ["Node.js", "Express.js", "REST APIs"],
    Frontend: ["React.js", "HTML", "CSS", "JavaScript"],
    Tools: ["Git", "Postman", "Vite"],
  },

  timeline: [
    {
      year: "2019–2020",
      title: "High School",
      subtitle: "Kerala State Board",
      detail: "82% — Strong foundation in science and mathematics.",
      type: "education",
    },
    {
      year: "2020–2022",
      title: "Higher Secondary — Computer Science",
      subtitle: "Kerala State Board",
      detail: "79% — Developed core programming fundamentals.",
      type: "education",
    },
    {
      year: "2022–2025",
      title: "Bachelor of Computer Application",
      subtitle: "Mahatma Gandhi University",
      detail: "62% — Specialized in web technologies and software development.",
      type: "education",
    },
    {
      year: "Sep–Nov 2025",
      title: "MERN Stack Developer Intern",
      subtitle: "Zecser Business",
      detail:
        "Built 2 full-stack apps, designed 8+ REST API endpoints, integrated MongoDB Atlas, collaborated with a 3-developer team.",
      type: "work",
    },
  ],

  certificates: [
    "UNXT Soft Skill Development Program (2024)",
    "Foundations of Cyber Security — Coursera (2025)",
    "Full Stack Web Development with MERN & Computer Fundamentals (2025)",
  ],
};

export default portfolioData;