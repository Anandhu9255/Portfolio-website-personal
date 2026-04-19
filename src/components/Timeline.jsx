import { useState } from "react";
import { motion } from "framer-motion";
import useScrollAnimation from "../hooks/useScrollAnimation";
import portfolioData from "../data/portfolioData";

const typeColors = {
  education: "#00f5ff",
  work: "#7c3aed",
};

const typeIcons = {
  education: "🎓",
  work: "⚡",
};

const Timeline = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [activeNode, setActiveNode] = useState(null);

  return (
    <section id="timeline" className="timeline" ref={ref}>
      <motion.div
        className="section__header"
        initial={{ opacity: 0, y: 30 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        <p className="section__label">&gt; LOADING LEGACY DATA...</p>
        <h2 className="section__title">
          THE <span className="section__title--accent">LEGACY</span>
        </h2>
        <div className="section__line" />
      </motion.div>

      <div className="timeline__container">
        <div className="timeline__line">
          <motion.div
            className="timeline__line-fill"
            initial={{ scaleY: 0 }}
            animate={isVisible ? { scaleY: 1 } : {}}
            transition={{ duration: 1.5, ease: "easeInOut", delay: 0.3 }}
          />
        </div>

        {portfolioData.timeline.map((item, index) => (
          <motion.div
            key={index}
            className={`timeline__item ${index % 2 === 0 ? "timeline__item--left" : "timeline__item--right"}`}
            initial={{ opacity: 0, x: index % 2 === 0 ? -60 : 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: index * 0.15 }}
          >
            <motion.div
              className={`timeline__node ${activeNode === index ? "timeline__node--active" : ""}`}
              style={{ "--node-color": typeColors[item.type] }}
              onClick={() => setActiveNode(activeNode === index ? null : index)}
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.9 }}
            >
              <span>{typeIcons[item.type]}</span>
              {activeNode === index && (
                <motion.div
                  className="timeline__node-pulse"
                  initial={{ scale: 0.8, opacity: 1 }}
                  animate={{ scale: 2.5, opacity: 0 }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  style={{ borderColor: typeColors[item.type] }}
                />
              )}
            </motion.div>

            <motion.div
              className="timeline__card glass-panel"
              style={{ "--node-color": typeColors[item.type] }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="timeline__card-year" style={{ color: typeColors[item.type] }}>
                {item.year}
              </div>
              <h3 className="timeline__card-title">{item.title}</h3>
              <p className="timeline__card-subtitle">{item.subtitle}</p>

              <motion.p
                className="timeline__card-detail"
                initial={{ opacity: 0, height: 0 }}
                animate={
                  activeNode === index
                    ? { opacity: 1, height: "auto" }
                    : { opacity: 0, height: 0 }
                }
                transition={{ duration: 0.4 }}
              >
                {item.detail}
              </motion.p>

              {activeNode === index && (
                <motion.div
                  className="timeline__level-up"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: [0, 1, 0], y: [-10, -30] }}
                  transition={{ duration: 1, repeat: 2 }}
                >
                  ✦ LEVEL UP ✦
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="timeline__certs"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <h3 className="timeline__certs-title">⚡ CERTIFICATES</h3>
        <div className="timeline__certs-grid">
          {portfolioData.certificates.map((cert, i) => (
            <motion.div
              key={i}
              className="timeline__cert-card glass-panel"
              whileHover={{ scale: 1.03 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              🏅 {cert}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Timeline;