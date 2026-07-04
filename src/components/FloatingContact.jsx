import React, { useState, useEffect } from "react";
import { Phone, MessageCircle } from "lucide-react";

export default function FloatingContact() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [hoveredCall, setHoveredCall] = useState(false);
  const [hoveredWhatsapp, setHoveredWhatsapp] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const CONTACT_PHONE = import.meta.env.VITE_CONTACT_PHONE || "+91 98765 43210";
  const CONTACT_WHATSAPP =
    import.meta.env.VITE_CONTACT_WHATSAPP || "919876543210";
  const dialablePhone = CONTACT_PHONE.replace(/\s+/g, "");
  const generalText = encodeURIComponent(
    "Hello Nest to Homes! I would like to inquire about your premium property listings.",
  );
  const whatsappUrl = `https://wa.me/${CONTACT_WHATSAPP}?text=${generalText}`;

  if (isMobile) {
    return (
      <div style={styles.mobileBar}>
        <a
          href={`tel:${dialablePhone}`}
          style={{ ...styles.mobileButton, ...styles.mobileCall }}
        >
          <Phone size={18} />
          <span>Call Now</span>
        </a>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{ ...styles.mobileButton, ...styles.mobileWhatsapp }}
        >
          <MessageCircle size={18} />
          <span>WhatsApp</span>
        </a>
      </div>
    );
  }

  return (
    <div style={styles.desktopContainer}>
      {/* Phone Button */}
      <div
        style={{ position: "relative" }}
        onMouseEnter={() => setHoveredCall(true)}
        onMouseLeave={() => setHoveredCall(false)}
      >
        {hoveredCall && (
          <div style={styles.tooltip}>Call Concierge: {CONTACT_PHONE}</div>
        )}
        <a
          href={`tel:${dialablePhone}`}
          style={{
            ...styles.circleButton,
            ...styles.circleCall,
            transform: hoveredCall ? "scale(1.1) translateY(-2px)" : "scale(1)",
          }}
        >
          <Phone size={22} />
        </a>
      </div>

      {/* WhatsApp Button */}
      <div
        style={{ position: "relative" }}
        onMouseEnter={() => setHoveredWhatsapp(true)}
        onMouseLeave={() => setHoveredWhatsapp(false)}
      >
        {hoveredWhatsapp && <div style={styles.tooltip}>Chat on WhatsApp</div>}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            ...styles.circleButton,
            ...styles.circleWhatsapp,
            transform: hoveredWhatsapp
              ? "scale(1.1) translateY(-2px)"
              : "scale(1)",
          }}
        >
          <MessageCircle size={22} />
        </a>
      </div>
    </div>
  );
}

const styles = {
  mobileBar: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    height: "60px",
    display: "flex",
    zIndex: 9999,
    boxShadow: "0 -4px 16px rgba(0, 0, 0, 0.3)",
    background: "rgba(5, 12, 26, 0.95)",
    backdropFilter: "blur(12px)",
    borderTop: "1px solid rgba(255, 255, 255, 0.08)",
  },
  mobileButton: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    textDecoration: "none",
    fontSize: "0.95rem",
    fontWeight: "600",
    transition: "background-color 0.2s ease",
  },
  mobileCall: {
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    color: "var(--accent-gold)",
    borderRight: "1px solid rgba(255, 255, 255, 0.08)",
  },
  mobileWhatsapp: {
    backgroundColor: "#25D366",
    color: "#FFFFFF",
  },
  desktopContainer: {
    position: "fixed",
    bottom: "30px",
    right: "30px",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    zIndex: 9999,
  },
  circleButton: {
    width: "56px",
    height: "56px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 6px 20px rgba(0, 0, 0, 0.4)",
    textDecoration: "none",
    transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
  },
  circleCall: {
    backgroundColor: "var(--accent-gold)",
    color: "#050C1A",
  },
  circleWhatsapp: {
    backgroundColor: "#25D366",
    color: "#FFFFFF",
  },
  tooltip: {
    position: "absolute",
    right: "72px",
    top: "50%",
    transform: "translateY(-50%)",
    backgroundColor: "rgba(5, 12, 26, 0.95)",
    color: "#FFFFFF",
    padding: "8px 16px",
    borderRadius: "8px",
    fontSize: "0.85rem",
    whiteSpace: "nowrap",
    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
    border: "1px solid rgba(212, 175, 55, 0.3)",
    fontFamily: "var(--font-body)",
    pointerEvents: "none",
    animation: "fadeIn 0.2s ease-out",
  },
};
