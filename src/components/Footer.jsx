import { motion } from "framer-motion";
import portfolioData from "../data/portfolioData";

const Footer = () => {
  return (
    <motion.footer
      className="footer"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
    >
      <div className="footer__line" />

      <div className="footer__content">
        <div className="footer__logo">
          <span className="navbar__logo-bracket">&lt;</span>
          <span className="navbar__logo-name">{portfolioData.name.split(" ")[0]}</span>
          <span className="navbar__logo-bracket">/&gt;</span>
        </div>

        <p className="footer__text">
          Built with <span className="footer__accent">React</span> +{" "}
          <span className="footer__accent">Framer Motion</span> — Neo-Kyoto Tech Hub
        </p>

        <div className="footer__links">
          <a href={portfolioData.github} target="_blank" rel="noreferrer" className="footer__link">
            GitHub
          </a>
          <a href={portfolioData.linkedin} target="_blank" rel="noreferrer" className="footer__link">
            LinkedIn
          </a>
          <a href={`mailto:${portfolioData.email}`} className="footer__link">
            Email
          </a>
        </div>

        <p className="footer__copy">
          © 2025 {portfolioData.name} — All rights reserved.
        </p>
      </div>
    </motion.footer>
  );
};

export default Footer;