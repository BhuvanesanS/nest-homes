import React, { useState } from "react";
import {
  Menu,
  X,
  Home,
  Compass,
  Phone,
  Info,
  Award,
  Sun,
  Moon,
} from "lucide-react";

export default function Navbar({
  currentPage,
  setCurrentPage,
  theme,
  toggleTheme,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "properties", label: "Properties", icon: Compass },
    { id: "tour", label: "3D Virtual Tour", icon: Award },
    { id: "about", label: "About Us", icon: Info },
    { id: "contact", label: "Contact", icon: Phone },
  ];

  const handleNavClick = (id) => {
    setCurrentPage(id);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav style={styles.navContainer} className="glass-panel">
      <div style={styles.navWrapper}>
        {/* Brand Logo & Name */}
        <div style={styles.logoSection} onClick={() => handleNavClick("home")}>
          <img
            src="/nest-to-homes-logo.png"
            alt="Nest to Homes Logo"
            style={styles.logoImage}
          />
          <div style={styles.logoTextWrapper}>
            <span style={styles.logoTextMain}>
              Nest <span style={{ color: "var(--accent-gold)" }}>to</span> Homes
            </span>
            <span style={styles.logoTagline}>Luxury Real Estate</span>
          </div>
        </div>

        {/* Desktop Navigation links */}
        <div className="nav-desktop">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                style={{
                  color: isActive
                    ? "var(--accent-gold)"
                    : "var(--text-secondary)",
                  borderBottom: isActive
                    ? "2px solid var(--accent-gold)"
                    : "2px solid transparent",
                }}
                className={`nav-link ${isActive ? "glow-text-gold" : ""}`}
              >
                <Icon size={16} />
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Action Button & Theme Toggle */}
        <div
          className="nav-action"
          style={{ display: "flex", alignItems: "center", gap: "16px" }}
        >
          <button
            onClick={toggleTheme}
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid var(--border-glass)",
              borderRadius: "8px",
              width: "40px",
              height: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "var(--accent-gold)",
              transition: "var(--transition-fast)",
            }}
            title="Toggle Light/Dark Theme"
          >
            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          <button
            onClick={() => handleNavClick("contact")}
            className="btn-gold pulse-gold-glow"
          >
            Inquire Now
          </button>
        </div>

        {/* Mobile menu triggers */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <button
            onClick={toggleTheme}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--accent-gold)",
              alignItems: "center",
              justifyContent: "center",
            }}
            className="nav-menu-toggle"
            title="Toggle Light/Dark Theme"
          >
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          <button
            className="nav-menu-toggle"
            onClick={() => setIsOpen(!isOpen)}
            style={{ background: "none", border: "none", cursor: "pointer" }}
          >
            {isOpen ? (
              <X size={24} color="var(--text-primary)" />
            ) : (
              <Menu size={24} color="var(--text-primary)" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div style={styles.mobileMenu} className="glass-panel">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                style={{
                  color: isActive
                    ? "var(--accent-gold)"
                    : "var(--text-secondary)",
                  backgroundColor: isActive
                    ? "rgba(212, 175, 55, 0.05)"
                    : "transparent",
                }}
                className="mobile-nav-link"
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </button>
            );
          })}
          <div style={{ padding: "16px 8px 8px 8px" }}>
            <button
              onClick={() => handleNavClick("contact")}
              style={{ width: "100%", justifyContent: "center" }}
              className="btn-gold"
            >
              Inquire Now
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

const styles = {
  navContainer: {
    position: "sticky",
    top: 0,
    left: 0,
    width: "100%",
    zIndex: 1000,
    borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
    borderRadius: "0 0 16px 16px",
    background: "var(--bg-glass)",
    backdropFilter: "blur(20px)",
    padding: "0 24px",
  },
  navWrapper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "76px",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  logoSection: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    cursor: "pointer",
  },
  logoImage: {
    height: "46px",
    width: "auto",
    objectFit: "contain",
  },
  logoTextWrapper: {
    display: "flex",
    flexDirection: "column",
  },
  logoTextMain: {
    fontSize: "1.25rem",
    fontWeight: "800",
    fontFamily: "var(--font-heading)",
    color: "var(--text-primary)",
    letterSpacing: "-0.02em",
  },
  logoTagline: {
    fontSize: "0.65rem",
    textTransform: "uppercase",
    letterSpacing: "0.15em",
    color: "var(--text-muted)",
    marginTop: "-2px",
  },
  mobileMenu: {
    position: "absolute",
    top: "80px",
    left: "16px",
    right: "16px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    padding: "16px",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "12px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
    zIndex: 999,
  },
};
