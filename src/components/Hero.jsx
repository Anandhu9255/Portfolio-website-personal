import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import portfolioData from "../data/portfolioData";

const Hero = () => {
  const [displayText, setDisplayText] = useState("");
  const [charIndex, setCharIndex] = useState(0);
  const fullText = portfolioData.title;

  useEffect(() => {
    if (charIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + fullText[charIndex]);
        setCharIndex((prev) => prev + 1);
      }, 60);
      return () => clearTimeout(timeout);
    }
  }, [charIndex, fullText]);

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <section id="hero" className="hero">
      <div className="hero__aura hero__aura--1" />
      <div className="hero__aura hero__aura--2" />
      <div className="hero__aura hero__aura--3" />

      <motion.div
        className="hero__content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.p className="hero__greeting" variants={itemVariants}>
          &gt; INITIALIZING PROFILE...
        </motion.p>

        <motion.h1 className="hero__name" variants={itemVariants}>
          {portfolioData.name.split(" ").map((word, i) => (
            <span key={i} className={i === 1 ? "hero__name--accent" : ""}>
              {word}{" "}
            </span>
          ))}
        </motion.h1>

        <motion.div className="hero__title-wrapper" variants={itemVariants}>
          <span className="hero__title">{displayText}</span>
          <span className="hero__cursor">|</span>
        </motion.div>

        <motion.p className="hero__location" variants={itemVariants}>
          📍 {portfolioData.location}
        </motion.p>

        <motion.div className="hero__tags" variants={itemVariants}>
          {["React", "Node.js", "Express", "MongoDB"].map((tag) => (
            <span key={tag} className="hero__tag">
              {tag}
            </span>
          ))}
        </motion.div>

        <motion.div className="hero__actions" variants={itemVariants}>
          <motion.button
            className="hero__cta"
            onClick={scrollToProjects}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            <span className="hero__cta-text">⚡ EXECUTE PROJECT VIEW</span>
            <div className="hero__cta-glow" />
          </motion.button>

          <motion.a
            href={portfolioData.github}
            target="_blank"
            rel="noreferrer"
            className="hero__secondary-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
          >
            GitHub ↗
          </motion.a>
        </motion.div>

        <motion.div className="hero__socials" variants={itemVariants}>
          <a href={`mailto:${portfolioData.email}`} className="hero__social-link">
            {portfolioData.email}
          </a>
          <span className="hero__social-divider">|</span>
          <a href={portfolioData.linkedin} target="_blank" rel="noreferrer" className="hero__social-link">
            LinkedIn ↗
          </a>
        </motion.div>
      </motion.div>

      <div className="hero__scroll-indicator">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="hero__scroll-dot"
        />
        <span>SCROLL</span>
      </div>
    </section>
  );
};

export default Hero;