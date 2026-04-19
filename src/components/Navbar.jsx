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
      {/* LOGO */}
      <div className="navbar__logo" onClick={() => scrollTo("hero")}>
        <span className="navbar__logo-bracket">&lt;</span>
        <span className="navbar__logo-name">
          {portfolioData.name.split(" ")[0]}
        </span>
        <span className="navbar__logo-bracket">/&gt;</span>
      </div>

      {/* NAV LINKS */}
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
      </ul>

      {/* RIGHT SIDE — single toggle + hamburger */}
      <div className="navbar__right">
        <motion.button
          className="navbar__theme-btn"
          onClick={toggleDarkMode}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {darkMode ? "☀️" : "🌙"}
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