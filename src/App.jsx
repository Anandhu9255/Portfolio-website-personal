import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Timeline from "./components/Timeline";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ParticleBackground from "./components/ParticleBackground";

const Loader = ({ onDone }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onDone, 400);
          return 100;
        }
        return prev + 2;
      });
    }, 30);
    return () => clearInterval(interval);
  }, [onDone]);

  return (
    <motion.div
      className="loader"
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.6 }}
    >
      <div className="loader__content">
        <motion.div
          className="loader__logo"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          &lt;AAK/&gt;
        </motion.div>
        <p className="loader__text">INITIALIZING NEO-KYOTO INTERFACE...</p>
        <div className="loader__bar">
          <motion.div
            className="loader__bar-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="loader__percent">{progress}%</p>
      </div>
    </motion.div>
  );
};

function App() {
  const [loading, setLoading] = useState(true);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
    }
  }, [isDark]);

  return (
    <div className="app">
      <AnimatePresence mode="wait">
        {loading && <Loader key="loader" onDone={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <ParticleBackground />
          <Navbar darkMode={isDark} toggleDarkMode={() => setIsDark(!isDark)} />
          <main>
            <Hero />
            <Projects />
            <Skills />
            <Timeline />
            <Contact />
          </main>
          <Footer />
        </motion.div>
      )}
    </div>
  );
}

export default App;