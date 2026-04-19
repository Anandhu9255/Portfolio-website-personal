import { useState } from "react";
import { motion } from "framer-motion";
import useScrollAnimation from "../hooks/useScrollAnimation";
import portfolioData from "../data/portfolioData";

const layerColors = {
  Database: "#06d6a0",
  Backend: "#7c3aed",
  Frontend: "#00f5ff",
  Tools: "#f97316",
};

const Skills = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [activeLayer, setActiveLayer] = useState(null);
  const [activeSkill, setActiveSkill] = useState(null);

  const layers = Object.keys(portfolioData.skills);

  return (
    <section id="skills" className="skills" ref={ref}>
      <motion.div
        className="section__header"
        initial={{ opacity: 0, y: 30 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        <p className="section__label">&gt; SCANNING SKILL MATRIX...</p>
        <h2 className="section__title">
          SKILL <span className="section__title--accent">AURA</span>
        </h2>
        <div className="section__line" />
      </motion.div>

      <div className="skills__layout">
        <div className="skills__rings-wrapper">
          {layers.map((layer, i) => (
            <motion.div
              key={layer}
              className={`skills__ring ${activeLayer === layer ? "skills__ring--active" : ""}`}
              style={{
                "--ring-color": layerColors[layer],
                width: `${220 + i * 80}px`,
                height: `${220 + i * 80}px`,
              }}
              animate={{
                rotate: i % 2 === 0 ? 360 : -360,
              }}
              transition={{
                duration: 18 + i * 4,
                repeat: Infinity,
                ease: "linear",
              }}
              onClick={() =>
                setActiveLayer(activeLayer === layer ? null : layer)
              }
            >
              <span
                className="skills__ring-label"
                style={{ color: layerColors[layer] }}
              >
                {layer}
              </span>
            </motion.div>
          ))}

          <div className="skills__ring-center">
            <span className="skills__ring-center-text">MERN</span>
          </div>
        </div>

        <div className="skills__panel">
          {layers.map((layer) => (
            <motion.div
              key={layer}
              className={`skills__layer-group ${activeLayer === layer ? "skills__layer-group--active" : ""}`}
              initial={{ opacity: 0, x: 40 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: layers.indexOf(layer) * 0.1 }}
            >
              <div
                className="skills__layer-header"
                style={{ color: layerColors[layer] }}
                onClick={() =>
                  setActiveLayer(activeLayer === layer ? null : layer)
                }
              >
                <span className="skills__layer-dot" style={{ background: layerColors[layer] }} />
                {layer}
                {activeLayer === layer && (
                  <motion.span
                    className="skills__layer-ray"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    style={{ background: layerColors[layer] }}
                  />
                )}
              </div>

              <div className="skills__tags">
                {portfolioData.skills[layer].map((skill) => (
                  <motion.span
                    key={skill}
                    className={`skills__tag ${activeSkill === skill ? "skills__tag--active" : ""}`}
                    style={{
                      "--skill-color": layerColors[layer],
                      borderColor:
                        activeLayer === layer ? layerColors[layer] : "transparent",
                    }}
                    onClick={() =>
                      setActiveSkill(activeSkill === skill ? null : skill)
                    }
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;