import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import portfolioData from "../data/portfolioData";

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = ["hero", "projects", "skills", "timeline", "contact"];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}
    >
      <div className="navbar__logo" onClick={() => scrollTo("hero")}>
        <span className="navbar__logo-bracket">&lt;</span>
        <span className="navbar__logo-name">
          {portfolioData.name.split(" ")[0]}
        </span>
        <span className="navbar__logo-bracket">/&gt;</span>
      </div>

      <ul className={`navbar__links ${menuOpen ? "navbar__links--open" : ""}`}>
        {navLinks.map((link, i) => (
          <motion.li
            key={link}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 + 0.3 }}
          >
            <button className="navbar__link" onClick={() => scrollTo(link)}>
              {link.toUpperCase()}
            </button>
          </motion.li>
        ))}

        {/* Mobile theme toggle inside menu */}
        <li className="navbar__theme-mobile">
          <button className="navbar__theme-btn" onClick={toggleDarkMode}>
            {darkMode ? "☀️ LIGHT MODE" : "🌙 DARK MODE"}
          </button>
        </li>
      </ul>

      <div className="navbar__right">
        {/* Desktop theme toggle */}
        <motion.button
          className="navbar__theme-btn navbar__theme-btn--desktop"
          onClick={toggleDarkMode}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <span className="navbar__theme-icon">
            {darkMode ? "☀️" : "🌙"}
          </span>
          <span className="navbar__theme-label">
            {darkMode ? "LIGHT" : "DARK"}
          </span>
        </motion.button>

        <button
          className={`navbar__hamburger ${menuOpen ? "navbar__hamburger--open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </motion.nav>
  );
};

export default Navbar;