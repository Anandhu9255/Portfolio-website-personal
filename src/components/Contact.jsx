import { useState } from "react";
import { motion } from "framer-motion";
import useScrollAnimation from "../hooks/useScrollAnimation";
import portfolioData from "../data/portfolioData";

const Contact = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null);
  const [focused, setFocused] = useState(null);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setStatus("error");
      return;
    }
    setStatus("sending");
    setTimeout(() => {
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    }, 1500);
  };

  return (
    <section id="contact" className="contact" ref={ref}>
      <motion.div
        className="section__header"
        initial={{ opacity: 0, y: 30 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        <p className="section__label">&gt; OPENING TRANSMISSION CHANNEL...</p>
        <h2 className="section__title">
          MAKE <span className="section__title--accent">CONTACT</span>
        </h2>
        <div className="section__line" />
      </motion.div>

      <div className="contact__layout">
        <motion.div
          className="contact__info glass-panel"
          initial={{ opacity: 0, x: -50 }}
          animate={isVisible ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <h3 className="contact__info-title">DIRECT LINK</h3>

          {[
            { label: "EMAIL", value: portfolioData.email, href: `mailto:${portfolioData.email}` },
            { label: "PHONE", value: portfolioData.phone, href: `tel:${portfolioData.phone}` },
            { label: "LOCATION", value: portfolioData.location, href: null },
          ].map((item) => (
            <div key={item.label} className="contact__info-item">
              <span className="contact__info-label">{item.label}</span>
              {item.href ? (
                <a href={item.href} className="contact__info-value contact__info-value--link">
                  {item.value}
                </a>
              ) : (
                <span className="contact__info-value">{item.value}</span>
              )}
            </div>
          ))}

          <div className="contact__socials">
            <motion.a
              href={portfolioData.github}
              target="_blank"
              rel="noreferrer"
              className="contact__social-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              GitHub ↗
            </motion.a>
            <motion.a
              href={portfolioData.linkedin}
              target="_blank"
              rel="noreferrer"
              className="contact__social-btn contact__social-btn--linkedin"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              LinkedIn ↗
            </motion.a>
          </div>
        </motion.div>

        <motion.div
          className="contact__form-wrapper glass-panel"
          initial={{ opacity: 0, x: 50 }}
          animate={isVisible ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <h3 className="contact__form-title">SEND TRANSMISSION</h3>

          <div className="contact__form">
            {["name", "email"].map((field) => (
              <div
                key={field}
                className={`contact__field ${focused === field ? "contact__field--focused" : ""}`}
              >
                <label className="contact__label">
                  {field.toUpperCase()}
                </label>
                <input
                  type={field === "email" ? "email" : "text"}
                  name={field}
                  value={form[field]}
                  onChange={handleChange}
                  onFocus={() => setFocused(field)}
                  onBlur={() => setFocused(null)}
                  className="contact__input"
                  placeholder={`Enter your ${field}...`}
                />
              </div>
            ))}

            <div className={`contact__field ${focused === "message" ? "contact__field--focused" : ""}`}>
              <label className="contact__label">MESSAGE</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                onFocus={() => setFocused("message")}
                onBlur={() => setFocused(null)}
                className="contact__input contact__input--textarea"
                placeholder="Enter your message..."
                rows={5}
              />
            </div>

            <motion.button
              className="contact__submit"
              onClick={handleSubmit}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              disabled={status === "sending"}
            >
              {status === "sending"
                ? "⚡ TRANSMITTING..."
                : status === "success"
                ? "✅ TRANSMISSION SENT"
                : "⚡ SEND TRANSMISSION"}
            </motion.button>

            {status === "error" && (
              <motion.p
                className="contact__error"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                ⚠ All fields required.
              </motion.p>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;