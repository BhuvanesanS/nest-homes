import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Globe,
  Camera,
  Briefcase,
} from "lucide-react";

export default function Footer({ setCurrentPage }) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const navigateTo = (pageId) => {
    setCurrentPage(pageId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer style={styles.footer} className="glass-panel">
      <div style={styles.footerGrid}>
        {/* Company Info */}
        <div style={styles.col}>
          <div style={styles.logoSection} onClick={() => navigateTo("home")}>
            <img
              src="/nest-to-homes-logo.png"
              alt="Nest to Homes"
              style={styles.logoImage}
            />
            <div style={styles.logoTextWrapper}>
              <span style={styles.logoTextMain}>
                Nest <span style={{ color: "var(--accent-gold)" }}>to</span>{" "}
                Homes
              </span>
              <span style={styles.logoTagline}>Luxury Real Estate</span>
            </div>
          </div>
          <p style={styles.description}>
            Redefining residential luxury with handpicked properties, seamless
            3D virtual walkthroughs, and premier concierge consulting services.
            Find your perfect nest with us.
          </p>
          <div style={styles.socials}>
            <a href="#" className="social-icon" title="Website">
              <Globe size={18} />
            </a>
            <a href="#" className="social-icon" title="Newsletter">
              <Send size={18} />
            </a>
            <a href="#" className="social-icon" title="Gallery">
              <Camera size={18} />
            </a>
            <a href="#" className="social-icon" title="Careers">
              <Briefcase size={18} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div style={styles.col}>
          <h4 style={styles.colTitle}>Quick Links</h4>
          <ul style={styles.linkList}>
            <li>
              <button
                onClick={() => navigateTo("home")}
                className="footer-link-item"
                style={styles.footerLink}
              >
                Home
              </button>
            </li>
            <li>
              <button
                onClick={() => navigateTo("properties")}
                className="footer-link-item"
                style={styles.footerLink}
              >
                Property Listings
              </button>
            </li>
            <li>
              <button
                onClick={() => navigateTo("tour")}
                className="footer-link-item"
                style={styles.footerLink}
              >
                3D Virtual Tours
              </button>
            </li>
            <li>
              <button
                onClick={() => navigateTo("about")}
                className="footer-link-item"
                style={styles.footerLink}
              >
                About Our Company
              </button>
            </li>
            <li>
              <button
                onClick={() => navigateTo("contact")}
                className="footer-link-item"
                style={styles.footerLink}
              >
                Inquire / Contact
              </button>
            </li>
          </ul>
        </div>

        {/* Contact info */}
        <div style={styles.col}>
          <h4 style={styles.colTitle}>Get In Touch</h4>
          <div style={styles.contactInfo}>
            <div style={styles.contactItem}>
              <MapPin size={18} color="var(--accent-gold)" />
              <span style={styles.contactText}>
                BHIVE Workspace, No.112, AKR Tech Park, Hosur Rd, Kudlu Gate,
                Bengaluru, KA 560068
              </span>
            </div>
            <div style={styles.contactItem}>
              <Phone size={18} color="var(--accent-gold)" />
              <a href="tel:+919876543210" style={styles.contactText}>
                +91 98765 43210
              </a>
            </div>
            <div style={styles.contactItem}>
              <Mail
                size={18}
                color="var(--accent-gold)"
                className="glow-text-gold"
              />
              <a
                href="mailto:nesttohomes@gmail.com"
                style={styles.contactText}
                className="glow-text-gold"
              >
                nesttohomes@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div style={styles.col}>
          <h4 style={styles.colTitle}>Our Newsletter</h4>
          <p style={styles.description}>
            Subscribe to receive early listings access and market updates.
          </p>
          <form onSubmit={handleSubscribe} style={styles.subscribeForm}>
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.subscribeInput}
            />
            <button
              type="submit"
              style={styles.subscribeBtn}
              className="btn-gold"
            >
              <Send size={16} />
            </button>
          </form>
          {subscribed && (
            <p
              style={{
                color: "var(--accent-gold)",
                fontSize: "0.85rem",
                marginTop: "8px",
              }}
            >
              ✓ Subscribed! Welcome to our exclusive list.
            </p>
          )}
        </div>
      </div>

      <div style={styles.bottomBar}>
        <span style={styles.copyright}>
          © 2026 Nest to Homes. All rights reserved. Designed for elite living.
        </span>
        <div style={styles.legalLinks}>
          <a href="#" className="footer-link-item" style={styles.footerLink}>
            Privacy Policy
          </a>
          <span style={{ color: "var(--text-muted)" }}>|</span>
          <a href="#" className="footer-link-item" style={styles.footerLink}>
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    borderTop: "1px solid rgba(255, 255, 255, 0.05)",
    borderRadius: "16px 16px 0 0",
    background: "rgba(5, 12, 26, 0.95)",
    padding: "60px 40px 30px 40px",
    marginTop: "80px",
  },
  footerGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "40px",
    maxWidth: "1200px",
    margin: "0 auto",
    paddingBottom: "40px",
    borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
  },
  col: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  logoSection: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    cursor: "pointer",
  },
  logoImage: {
    height: "42px",
    width: "auto",
    objectFit: "contain",
  },
  logoTextWrapper: {
    display: "flex",
    flexDirection: "column",
  },
  logoTextMain: {
    fontSize: "1.15rem",
    fontWeight: "800",
    fontFamily: "var(--font-heading)",
    color: "#FFFFFF",
  },
  logoTagline: {
    fontSize: "0.6rem",
    textTransform: "uppercase",
    letterSpacing: "0.15em",
    color: "var(--text-muted)",
    marginTop: "-2px",
  },
  description: {
    fontSize: "0.85rem",
    color: "var(--text-secondary)",
    lineHeight: "1.6",
  },
  socials: {
    display: "flex",
    gap: "12px",
  },
  colTitle: {
    fontSize: "1rem",
    fontWeight: "600",
    color: "#FFFFFF",
    fontFamily: "var(--font-heading)",
    borderBottom: "1px solid rgba(212, 175, 55, 0.2)",
    paddingBottom: "8px",
    alignSelf: "flex-start",
  },
  linkList: {
    listStyle: "none",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  footerLink: {
    background: "none",
    border: "none",
    outline: "none",
    cursor: "pointer",
    fontSize: "0.85rem",
    textAlign: "left",
    padding: 0,
    display: "inline-block",
  },
  contactInfo: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  contactItem: {
    display: "flex",
    alignItems: "flex-start",
    gap: "12px",
  },
  contactText: {
    fontSize: "0.85rem",
    color: "var(--text-secondary)",
    lineHeight: "1.4",
    textDecoration: "none",
  },
  subscribeForm: {
    display: "flex",
    gap: "8px",
  },
  subscribeInput: {
    flex: 1,
    background: "rgba(255, 255, 255, 0.02)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    borderRadius: "8px",
    padding: "10px 16px",
    color: "var(--text-primary)",
    fontSize: "0.85rem",
    outline: "none",
    fontFamily: "var(--font-body)",
  },
  subscribeBtn: {
    padding: "10px 16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
  },
  bottomBar: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: "30px",
    fontSize: "0.75rem",
    color: "var(--text-muted)",
    "@media (min-width: 769px)": {
      flexDirection: "row",
    },
  },
  copyright: {
    textAlign: "center",
  },
  legalLinks: {
    display: "flex",
    gap: "12px",
    alignItems: "center",
  },
};
