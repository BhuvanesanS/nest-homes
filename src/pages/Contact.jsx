import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  CheckCircle,
  Send,
  Globe,
  Clock,
} from "lucide-react";

const CONTACT_PHONE = import.meta.env.VITE_CONTACT_PHONE || "+91 98765 43210";
const CONTACT_WHATSAPP =
  import.meta.env.VITE_CONTACT_WHATSAPP || "919876543210";
const CONTACT_EMAIL =
  import.meta.env.VITE_CONTACT_EMAIL || "nesttohomes@gmail.com";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Email address is invalid";
    }
    if (!form.subject.trim()) newErrors.subject = "Subject is required";
    if (!form.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Build WhatsApp message
      const text =
        `Hello Nest to Homes! I would like to get in touch. Here are my details:\n\n` +
        `• *Name*: ${form.name.trim()}\n` +
        `• *Email*: ${form.email.trim()}\n` +
        `• *Subject*: ${form.subject.trim()}\n` +
        `• *Message*: ${form.message.trim()}`;

      const whatsappUrl = `https://wa.me/${CONTACT_WHATSAPP}?text=${encodeURIComponent(text)}`;

      // Open in a new tab
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");

      setSubmitted(true);
      setForm({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSubmitted(false), 8000);
    }
  };

  const handleChange = (field, val) => {
    setForm((prev) => ({ ...prev, [field]: val }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <div style={styles.container}>
      {/* Page Header */}
      <section style={styles.header} className="animate-fade-in-up">
        <span style={styles.badge}>COMMUNICATE</span>
        <h1 style={styles.title}>Connect With Our Office</h1>
        <p style={styles.subtitle}>
          Have an inquiry about our portfolios or virtual tours? Our concierge
          representatives are available 24/7.
        </p>
      </section>

      {/* Main Grid */}
      <div style={styles.grid}>
        {/* Left Side: Contact Info & Map mockup */}
        <div style={styles.leftCol}>
          <div style={styles.infoCard} className="glass-panel">
            <h3 style={styles.cardHeader}>Office Contacts</h3>

            <div style={styles.contactList}>
              <div style={styles.contactItem}>
                <div style={styles.iconBox}>
                  <MapPin size={18} color="var(--accent-gold)" />
                </div>
                <div>
                  <h5 style={styles.contactLabel}>Corporate Headquarters</h5>
                  <span style={styles.contactVal}>
                    BHIVE Workspace - No.112, AKR Tech Park, "A" and "B" Block,
                    7th Mile Hosur Rd, Kudlu Gate, Krishna Reddy Industrial
                    Area, Hosapalaya, Muneshwara Nagar, Bengaluru, Karnataka
                    560068
                  </span>
                </div>
              </div>

              <div style={styles.contactItem}>
                <div style={styles.iconBox}>
                  <Phone size={18} color="var(--accent-gold)" />
                </div>
                <div>
                  <h5 style={styles.contactLabel}>Direct Concierge line</h5>
                  <a
                    href={`tel:${CONTACT_PHONE.replace(/\s+/g, "")}`}
                    style={styles.contactLink}
                  >
                    {CONTACT_PHONE}
                  </a>
                </div>
              </div>

              <div style={styles.contactItem}>
                <div style={styles.iconBox}>
                  <Mail size={18} color="var(--accent-gold)" />
                </div>
                <div>
                  <h5 style={styles.contactLabel}>Official Inbox</h5>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    style={{
                      ...styles.contactLink,
                      color: "var(--accent-gold)",
                      fontWeight: "600",
                    }}
                    className="glow-text-gold"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </div>
              </div>

              <div style={styles.contactItem}>
                <div style={styles.iconBox}>
                  <Clock size={18} color="var(--accent-gold)" />
                </div>
                <div>
                  <h5 style={styles.contactLabel}>Advising Hours</h5>
                  <span style={styles.contactVal}>
                    Monday - Saturday: 09:00 AM - 08:00 PM IST
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Map Placeholder (Ultra premium digital styled container) */}
          <div style={styles.mapContainer} className="glass-panel-gold">
            <div style={styles.mapGridBg}></div>
            <div style={styles.mapOverlay}>
              <Globe
                size={32}
                color="var(--accent-gold)"
                className="animate-float"
                style={{ marginBottom: "12px" }}
              />
              <h4 style={{ color: "#FFF" }}>Bangalore Corporate Hub</h4>
              <p
                style={{
                  fontSize: "0.8rem",
                  color: "var(--text-secondary)",
                  marginTop: "4px",
                }}
              >
                12.9716° N, 77.5946° E
              </p>
              <div style={styles.mapPinPulse}>
                <div style={styles.mapPinInner}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Contact Form */}
        <div style={styles.rightCol} className="glass-panel-gold">
          <h3 style={styles.cardHeader}>Consultation Desk</h3>
          <p style={styles.formDesc}>
            Submit this form to route messages to our advisory team.
          </p>

          {submitted ? (
            <div style={styles.successBlock}>
              <CheckCircle
                size={48}
                color="var(--accent-gold)"
                style={{ marginBottom: "16px" }}
              />
              <h4 style={{ color: "#FFF" }}>Message Dispatched</h4>
              <p style={styles.successText}>
                Thank you for connecting with Nest to Homes. Your request has
                been forwarded to our corporate desk at{" "}
                <strong>{CONTACT_EMAIL}</strong>. A senior advisor will follow
                up shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={styles.formRow}>
                <div style={styles.inputGroup}>
                  <label style={styles.inputLabel}>Your Name</label>
                  <input
                    type="text"
                    placeholder="Aarav Sharma"
                    value={form.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    style={{
                      ...styles.input,
                      borderColor: errors.name
                        ? "var(--accent-red)"
                        : "rgba(255, 255, 255, 0.08)",
                    }}
                  />
                  {errors.name && (
                    <span style={styles.errorText}>{errors.name}</span>
                  )}
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.inputLabel}>Email Address</label>
                  <input
                    type="email"
                    placeholder="aarav.sharma@example.com"
                    value={form.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    style={{
                      ...styles.input,
                      borderColor: errors.email
                        ? "var(--accent-red)"
                        : "rgba(255, 255, 255, 0.08)",
                    }}
                  />
                  {errors.email && (
                    <span style={styles.errorText}>{errors.email}</span>
                  )}
                </div>
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.inputLabel}>Subject</label>
                <input
                  type="text"
                  placeholder="e.g. Schedule Villa Viewing"
                  value={form.subject}
                  onChange={(e) => handleChange("subject", e.target.value)}
                  style={{
                    ...styles.input,
                    borderColor: errors.subject
                      ? "var(--accent-red)"
                      : "rgba(255, 255, 255, 0.08)",
                  }}
                />
                {errors.subject && (
                  <span style={styles.errorText}>{errors.subject}</span>
                )}
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.inputLabel}>Message Details</label>
                <textarea
                  rows={5}
                  placeholder="Provide any specific requests or properties you are interested in..."
                  value={form.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  style={{
                    ...styles.textarea,
                    borderColor: errors.message
                      ? "var(--accent-red)"
                      : "rgba(255, 255, 255, 0.08)",
                  }}
                />
                {errors.message && (
                  <span style={styles.errorText}>{errors.message}</span>
                )}
              </div>

              <button
                type="submit"
                style={styles.submitBtn}
                className="btn-gold pulse-gold-glow"
              >
                <Send size={16} />
                <span>Submit Message</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "1000px",
    margin: "0 auto",
    padding: "40px 24px",
  },
  header: {
    textAlign: "center",
    marginBottom: "50px",
  },
  badge: {
    fontSize: "0.75rem",
    color: "var(--accent-gold)",
    fontWeight: "700",
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    display: "block",
    marginBottom: "8px",
  },
  title: {
    fontSize: "2.5rem",
    fontWeight: "800",
    fontFamily: "var(--font-heading)",
    color: "#FFFFFF",
  },
  subtitle: {
    fontSize: "1rem",
    color: "var(--text-secondary)",
    marginTop: "8px",
    maxWidth: "600px",
    margin: "8px auto 0 auto",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr",
    "@media (min-width: 900px)": {
      gridTemplateColumns: "1fr 1.2fr",
    },
    gap: "30px",
  },
  leftCol: {
    display: "flex",
    flexDirection: "column",
    gap: "30px",
  },
  infoCard: {
    padding: "30px",
    borderRadius: "16px",
    border: "1px solid rgba(255, 255, 255, 0.08)",
  },
  cardHeader: {
    fontSize: "1.25rem",
    fontWeight: "700",
    color: "#FFF",
    fontFamily: "var(--font-heading)",
    marginBottom: "8px",
  },
  contactList: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    marginTop: "24px",
  },
  contactItem: {
    display: "flex",
    alignItems: "flex-start",
    gap: "16px",
  },
  iconBox: {
    width: "40px",
    height: "40px",
    borderRadius: "8px",
    background: "rgba(212, 175, 55, 0.08)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid rgba(212, 175, 55, 0.15)",
    flexShrink: 0,
  },
  contactLabel: {
    fontSize: "0.75rem",
    textTransform: "uppercase",
    color: "var(--text-muted)",
    fontWeight: "600",
    marginBottom: "4px",
  },
  contactVal: {
    fontSize: "0.9rem",
    color: "var(--text-secondary)",
    lineHeight: "1.4",
  },
  contactLink: {
    fontSize: "0.9rem",
    color: "var(--text-secondary)",
    textDecoration: "none",
  },
  mapContainer: {
    height: "240px",
    borderRadius: "16px",
    position: "relative",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#09152b",
  },
  mapGridBg: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundImage: `radial-gradient(var(--accent-gold-glow) 1px, transparent 1px)`,
    backgroundSize: "24px 24px",
    opacity: 0.15,
  },
  mapOverlay: {
    position: "relative",
    zIndex: 2,
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  mapPinPulse: {
    width: "16px",
    height: "16px",
    borderRadius: "50%",
    background: "var(--accent-gold)",
    position: "absolute",
    top: "-30px",
    boxShadow: "0 0 15px var(--accent-gold)",
    animation: "pulse-gold 1.5s infinite",
  },
  mapPinInner: {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    background: "#FFF",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  rightCol: {
    padding: "30px",
    borderRadius: "16px",
  },
  formDesc: {
    fontSize: "0.85rem",
    color: "var(--text-secondary)",
    marginBottom: "24px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  formRow: {
    display: "grid",
    gridTemplateColumns: "1fr",
    "@media (min-width: 600px)": {
      gridTemplateColumns: "1fr 1fr",
    },
    gap: "16px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  inputLabel: {
    fontSize: "0.75rem",
    fontWeight: "600",
    color: "var(--text-muted)",
    textTransform: "uppercase",
  },
  input: {
    background: "rgba(255, 255, 255, 0.02)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    borderRadius: "8px",
    padding: "12px 14px",
    color: "#FFF",
    fontSize: "0.85rem",
    outline: "none",
    width: "100%",
    transition: "var(--transition-fast)",
  },
  textarea: {
    background: "rgba(255, 255, 255, 0.02)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    borderRadius: "8px",
    padding: "12px 14px",
    color: "#FFF",
    fontSize: "0.85rem",
    outline: "none",
    width: "100%",
    resize: "none",
    fontFamily: "var(--font-body)",
    transition: "var(--transition-fast)",
  },
  errorText: {
    fontSize: "0.7rem",
    color: "var(--accent-red)",
    marginTop: "2px",
  },
  submitBtn: {
    width: "100%",
    justifyContent: "center",
    padding: "14px 0",
    marginTop: "10px",
  },
  successBlock: {
    textAlign: "center",
    padding: "40px 10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  successText: {
    fontSize: "0.9rem",
    color: "var(--text-secondary)",
    lineHeight: "1.7",
    marginTop: "12px",
  },
};
