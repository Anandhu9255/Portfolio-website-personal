import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useScrollAnimation from "../hooks/useScrollAnimation";
import portfolioData from "../data/portfolioData";

const techColors = {
  "React.js": "#00f5ff",
  "Vite": "#7c3aed",
  "CoinGecko API": "#06d6a0",
  "HTML": "#f97316",
  "CSS": "#3b82f6",
  "JavaScript": "#facc15",
  "OpenWeatherMap API": "#06d6a0",
  "Node.js": "#22c55e",
  "Express.js": "#94a3b8",
  "MongoDB": "#16a34a",
};

const ProjectCard = ({ project, index }) => {
  const [hovered, setHovered] = useState(false);
  const [ripple, setRipple] = useState(false);

  const handleMouseLeave = () => {
    setHovered(false);
    setRipple(true);
    setTimeout(() => setRipple(false), 600);
  };

  return (
    <motion.div
      className={`project-card ${ripple ? "project-card--ripple" : ""}`}
      style={{ "--card-color": project.color }}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: "easeOut" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.02, rotateX: 2, rotateY: 2 }}
    >
      <div className="project-card__glow" />

      <div className="project-card__header">
        <span className="project-card__index">0{index + 1}</span>
        <motion.div
          className="project-card__status"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          ● LIVE
        </motion.div>
      </div>

      <h3 className="project-card__title">{project.title}</h3>

      <AnimatePresence>
        {hovered && (
          <motion.p
            className="project-card__desc"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {project.description}
          </motion.p>
        )}
      </AnimatePresence>

      <div className="project-card__tech">
        {project.tech.map((t) => (
          <span
            key={t}
            className="project-card__tech-tag"
            style={{ borderColor: techColors[t] || project.color, color: techColors[t] || project.color }}
          >
            {t}
          </span>
        ))}
      </div>

      <div className="project-card__orbs">
        {["M", "E", "R", "N"].map((letter, i) => (
          <motion.span
            key={letter}
            className="project-card__orb"
            animate={{
              rotate: 360,
              x: Math.cos((i / 4) * Math.PI * 2) * 30,
              y: Math.sin((i / 4) * Math.PI * 2) * 30,
            }}
            transition={{ duration: 4 + i, repeat: Infinity, ease: "linear" }}
            style={{ color: project.color }}
          >
            {letter}
          </motion.span>
        ))}
      </div>

      <motion.a
        href={project.live}
        target="_blank"
        rel="noreferrer"
        className="project-card__btn"
        style={{ "--card-color": project.color }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        LAUNCH ↗
      </motion.a>
    </motion.div>
  );
};

const Projects = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="projects" className="projects" ref={ref}>
      <motion.div
        className="section__header"
        initial={{ opacity: 0, y: 30 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        <p className="section__label">&gt; LOADING PROJECTS...</p>
        <h2 className="section__title">
          THE <span className="section__title--accent">POWER 3</span>
        </h2>
        <div className="section__line" />
      </motion.div>

      <div className="projects__grid">
        {portfolioData.projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
};

export default Projects;