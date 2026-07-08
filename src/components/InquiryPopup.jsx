import React, { useState, useEffect } from "react";
import { X, MessageCircle, Building, User, Phone, Mail } from "lucide-react";

export default function InquiryPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    site: "All Premium Sites",
    message: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Check if user has already dismissed or submitted the popup in this session
    const isDismissed = sessionStorage.getItem("nest_to_homes_popup_dismissed");
    const isSubmitted = sessionStorage.getItem("nest_to_homes_popup_submitted");

    if (!isDismissed && !isSubmitted) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem("nest_to_homes_popup_dismissed", "true");
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";

    const cleanPhone = form.phone.trim();
    if (!cleanPhone) {
      newErrors.phone = "Phone number is required";
    } else if (cleanPhone.length < 10) {
      newErrors.phone = "Enter a valid phone number";
    }

    const cleanEmail = form.email.trim();
    if (!cleanEmail) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(cleanEmail)) {
      newErrors.email = "Email is invalid";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const CONTACT_WHATSAPP =
        import.meta.env.VITE_CONTACT_WHATSAPP || "918217338802";

      // Build detailed WhatsApp message
      const text =
        `Hello Nest to Homes! I would like to request premium site information.\n\n` +
        `• *Name*: ${form.name.trim()}\n` +
        `• *Phone*: ${form.phone.trim()}\n` +
        `• *Email*: ${form.email.trim()}\n` +
        `• *Site/Property of Interest*: ${form.site}\n` +
        (form.message.trim()
          ? `• *Additional Note*: ${form.message.trim()}`
          : `• *Additional Note*: None`);

      const whatsappUrl = `https://wa.me/${CONTACT_WHATSAPP}?text=${encodeURIComponent(text)}`;

      // Redirect user to WhatsApp
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");

      // Mark as submitted in session storage and close
      sessionStorage.setItem("nest_to_homes_popup_submitted", "true");
      setIsOpen(false);
    }
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="popup-overlay" style={styles.overlay}>
      {/* Injected style tag for responsive media queries and keyframe animations */}
      <style>{`
        @keyframes popupFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes popupSlideUp {
          from {
            opacity: 0;
            transform: scale(0.92) translateY(30px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        .popup-overlay {
          animation: popupFadeIn 0.4s ease-out forwards;
        }
        .popup-card {
          animation: popupSlideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          background: rgba(10, 20, 40, 0.75) !important;
          backdrop-filter: blur(25px);
          -webkit-backdrop-filter: blur(25px);
          border: 1px solid rgba(212, 175, 55, 0.25);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6), 0 0 30px rgba(212, 175, 55, 0.1);
        }
        .light-theme .popup-card {
          background: rgba(255, 255, 255, 0.85) !important;
          backdrop-filter: blur(25px);
          -webkit-backdrop-filter: blur(25px);
          border: 1px solid rgba(184, 142, 20, 0.3);
          box-shadow: 0 20px 50px rgba(15, 23, 42, 0.1), 0 0 30px rgba(184, 142, 20, 0.05);
        }
        .site-badge {
          background: rgba(212, 175, 55, 0.1);
          color: var(--accent-gold);
          border: 1px solid rgba(212, 175, 55, 0.25);
        }
        .light-theme .site-badge {
          background: rgba(184, 142, 20, 0.08);
          color: #b88e14;
          border: 1px solid rgba(184, 142, 20, 0.2);
        }
        @media (max-width: 768px) {
          .popup-card {
            flex-direction: column !important;
            width: 90% !important;
            max-width: 440px !important;
            height: auto !important;
            max-height: 90vh !important;
            overflow-y: auto !important;
          }
          .popup-sidebar {
            display: none !important;
          }
          .popup-form-side {
            width: 100% !important;
            padding: 24px !important;
          }
        }
      `}</style>

      <div className="popup-card" style={styles.card}>
        {/* Close Button */}
        <button
          onClick={handleClose}
          style={styles.closeBtn}
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {/* Sidebar Info Section */}
        <div className="popup-sidebar" style={styles.sidebar}>
          <div style={styles.brandWrapper}>
            <div style={styles.logoCircle}>N</div>
            <div>
              <h3 style={styles.brandTitle}>
                Nest <span style={{ color: "var(--accent-gold)" }}>to</span>{" "}
                Homes
              </h3>
              <p style={styles.brandTagline}>Ultra-Luxury Living</p>
            </div>
          </div>

          <h2 style={styles.sidebarHeading}>Discover Premium Sites</h2>
          <p style={styles.sidebarText}>
            Get immediate catalogs, virtual tours, and schedule exclusive
            private viewings for our signature developments.
          </p>

          <div style={styles.sitesList}>
            <div style={styles.siteItem}>
              <div className="site-badge" style={styles.siteBadge}>
                Richmond Rd
              </div>
              <span style={styles.siteName}>The Raj Mahal Residency</span>
            </div>
            <div style={styles.siteItem}>
              <div className="site-badge" style={styles.siteBadge}>
                Koramangala
              </div>
              <span style={styles.siteName}>BHIVE Aura Sanctuary</span>
            </div>
            <div style={styles.siteItem}>
              <div className="site-badge" style={styles.siteBadge}>
                Whitefield
              </div>
              <span style={styles.siteName}>Gulmohar Redwood Villa</span>
            </div>
            <div style={styles.siteItem}>
              <div className="site-badge" style={styles.siteBadge}>
                Nandi Hills
              </div>
              <span style={styles.siteName}>The Nilgiri Crest Manor</span>
            </div>
          </div>

          <div style={styles.sidebarFooter}>
            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
              *Interactive details sent instantly to WhatsApp
            </span>
          </div>
        </div>

        {/* Form Section */}
        <div className="popup-form-side" style={styles.formSide}>
          <div style={styles.formHeader}>
            <h3 style={styles.formTitle}>Exclusive Site Inquiry</h3>
            <p style={styles.formSubtitle}>
              Share your details to unlock pricing & floor plans
            </p>
          </div>

          <form onSubmit={handleSubmit} style={styles.form}>
            {/* Name Input */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>
                <User size={14} style={{ marginRight: "6px" }} />
                Full Name
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="Aarav Sharma"
                style={{
                  ...styles.input,
                  borderColor: errors.name
                    ? "var(--accent-red)"
                    : "rgba(255,255,255,0.12)",
                }}
              />
              {errors.name && <span style={styles.error}>{errors.name}</span>}
            </div>

            {/* Phone Input */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>
                <Phone size={14} style={{ marginRight: "6px" }} />
                Mobile Number
              </label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                placeholder="e.g. +91 8217338802"
                style={{
                  ...styles.input,
                  borderColor: errors.phone
                    ? "var(--accent-red)"
                    : "rgba(255,255,255,0.12)",
                }}
              />
              {errors.phone && <span style={styles.error}>{errors.phone}</span>}
            </div>

            {/* Email Input */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>
                <Mail size={14} style={{ marginRight: "6px" }} />
                Email Address
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="aarav@example.com"
                style={{
                  ...styles.input,
                  borderColor: errors.email
                    ? "var(--accent-red)"
                    : "rgba(255,255,255,0.12)",
                }}
              />
              {errors.email && <span style={styles.error}>{errors.email}</span>}
            </div>

            {/* Site Select Dropdown */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>
                <Building size={14} style={{ marginRight: "6px" }} />
                Property of Interest
              </label>
              <select
                value={form.site}
                onChange={(e) => handleChange("site", e.target.value)}
                style={styles.select}
              >
                <option value="All Premium Sites">All Premium Sites</option>
                <option value="The Raj Mahal Residency (Richmond Road)">
                  The Raj Mahal Residency (Richmond Road)
                </option>
                <option value="BHIVE Aura Sanctuary (Koramangala)">
                  BHIVE Aura Sanctuary (Koramangala)
                </option>
                <option value="Gulmohar Redwood Villa (Whitefield)">
                  Gulmohar Redwood Villa (Whitefield)
                </option>
                <option value="Terrace Heights Residency (Indiranagar)">
                  Terrace Heights Residency (Indiranagar)
                </option>
                <option value="The Nilgiri Crest Manor (Nandi Hills)">
                  The Nilgiri Crest Manor (Nandi Hills)
                </option>
                <option value="Amber Shore Haven (East Coast Road)">
                  Amber Shore Haven (East Coast Road)
                </option>
              </select>
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn-gold" style={styles.submitBtn}>
              <MessageCircle size={18} style={{ marginRight: "8px" }} />
              Get Site Info on WhatsApp
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(5, 12, 26, 0.75)",
    zIndex: 100000,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    display: "flex",
    width: "820px",
    height: "530px",
    borderRadius: "20px",
    position: "relative",
    overflow: "hidden",
  },
  closeBtn: {
    position: "absolute",
    top: "20px",
    right: "20px",
    background: "none",
    border: "none",
    color: "var(--text-secondary)",
    cursor: "pointer",
    zIndex: 10,
    transition: "color 0.2s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  sidebar: {
    width: "42%",
    padding: "36px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    borderRight: "1px solid rgba(255, 255, 255, 0.06)",
    background: "rgba(255, 255, 255, 0.01)",
  },
  brandWrapper: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  logoCircle: {
    width: "38px",
    height: "38px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, var(--accent-gold), #b88e14)",
    color: "#050C1A",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "800",
    fontSize: "1.1rem",
    fontFamily: "var(--font-heading)",
  },
  brandTitle: {
    fontSize: "1.05rem",
    fontWeight: "700",
    color: "var(--text-primary)",
    margin: 0,
    lineHeight: 1.1,
  },
  brandTagline: {
    fontSize: "0.75rem",
    color: "var(--text-secondary)",
    margin: 0,
  },
  sidebarHeading: {
    fontSize: "1.5rem",
    fontWeight: "700",
    color: "var(--text-primary)",
    marginTop: "24px",
    marginBottom: "12px",
    lineHeight: 1.25,
  },
  sidebarText: {
    fontSize: "0.85rem",
    color: "var(--text-secondary)",
    lineHeight: 1.6,
    marginBottom: "20px",
  },
  sitesList: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  siteItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  siteBadge: {
    padding: "3px 8px",
    borderRadius: "4px",
    fontSize: "0.7rem",
    fontWeight: "700",
    whiteSpace: "nowrap",
  },
  siteName: {
    fontSize: "0.8rem",
    color: "var(--text-primary)",
    fontWeight: "500",
  },
  sidebarFooter: {
    marginTop: "20px",
  },
  formSide: {
    width: "58%",
    padding: "36px 40px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  formHeader: {
    marginBottom: "24px",
  },
  formTitle: {
    fontSize: "1.6rem",
    color: "var(--text-primary)",
    fontWeight: "700",
    marginBottom: "4px",
  },
  formSubtitle: {
    fontSize: "0.85rem",
    color: "var(--text-secondary)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  label: {
    fontSize: "0.8rem",
    fontWeight: "600",
    color: "var(--text-primary)",
    display: "flex",
    alignItems: "center",
  },
  input: {
    padding: "10px 14px",
    borderRadius: "8px",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    backgroundColor: "rgba(255, 255, 255, 0.02)",
    color: "var(--text-primary)",
    fontSize: "0.85rem",
    fontFamily: "var(--font-body)",
    outline: "none",
    transition: "var(--transition-fast)",
    width: "100%",
  },
  select: {
    padding: "10px 14px",
    borderRadius: "8px",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    backgroundColor: "rgba(5, 12, 26, 0.95)",
    color: "var(--text-primary)",
    fontSize: "0.85rem",
    fontFamily: "var(--font-body)",
    outline: "none",
    transition: "var(--transition-fast)",
    width: "100%",
    cursor: "pointer",
  },
  error: {
    color: "var(--accent-red)",
    fontSize: "0.75rem",
    marginTop: "2px",
  },
  submitBtn: {
    marginTop: "10px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "12px",
    borderRadius: "8px",
    fontSize: "0.9rem",
    fontWeight: "600",
    cursor: "pointer",
    border: "none",
  },
};
