import React, { useState } from "react";
import {
  MapPin,
  BedDouble,
  Bath,
  Maximize,
  Phone,
  Mail,
  Award,
  CheckCircle,
  ArrowLeft,
} from "lucide-react";

const CONTACT_WHATSAPP =
  import.meta.env.VITE_CONTACT_WHATSAPP || "919876543210";

export default function PropertyDetails({ property, setCurrentPage }) {
  const [inquiryForm, setInquiryForm] = useState({
    name: "",
    email: "",
    phone: "",
    msg: "",
  });
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  if (!property) {
    return (
      <div style={styles.errorState} className="glass-panel">
        <h3>No Property Selected</h3>
        <p style={{ margin: "12px 0 24px 0", color: "var(--text-secondary)" }}>
          Please select a listing from the Properties view to see detailed
          records.
        </p>
        <button
          onClick={() => setCurrentPage("properties")}
          className="btn-gold"
        >
          Go to Listings
        </button>
      </div>
    );
  }

  const validateForm = () => {
    const newErrors = {};
    if (!inquiryForm.name.trim()) newErrors.name = "Name is required";
    if (!inquiryForm.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(inquiryForm.email)) {
      newErrors.email = "Email address is invalid";
    }
    if (!inquiryForm.phone.trim()) newErrors.phone = "Phone number is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Build WhatsApp message
      const propertyDetails = property
        ? `*Property*: ${property.title}\n*Price*: ${property.priceText}\n*Location*: ${property.location}\n\n`
        : "";

      const text =
        `Hello Nest to Homes! I would like to schedule a consultation:\n\n` +
        propertyDetails +
        `• *Name*: ${inquiryForm.name.trim()}\n` +
        `• *Email*: ${inquiryForm.email.trim()}\n` +
        `• *Phone*: ${inquiryForm.phone.trim()}\n` +
        `• *Details*: ${(inquiryForm.msg || "").trim()}`;

      const whatsappUrl = `https://wa.me/${CONTACT_WHATSAPP}?text=${encodeURIComponent(text)}`;

      // Open WhatsApp in a new tab
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");

      setSuccess(true);
      setInquiryForm({ name: "", email: "", phone: "", msg: "" });
      setTimeout(() => setSuccess(false), 8000);
    }
  };

  const handleInputChange = (field, val) => {
    setInquiryForm((prev) => ({ ...prev, [field]: val }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <div style={styles.container}>
      {/* Back Button */}
      <button
        onClick={() => setCurrentPage("properties")}
        style={styles.backBtn}
      >
        <ArrowLeft size={16} />
        <span>Back to Listings</span>
      </button>

      {/* Main Details Grid */}
      <div style={styles.grid}>
        {/* Left Side: Photo, details, amenities */}
        <div style={styles.leftCol}>
          {/* Main Photo Banner */}
          <div style={styles.bannerContainer}>
            <img
              src={property.image}
              alt={property.title}
              style={styles.bannerImage}
            />
            {property.virtualTour && (
              <button
                onClick={() => setCurrentPage("tour")}
                style={styles.floatingTourBtn}
                className="btn-red pulse-gold-glow"
              >
                <Award size={16} />
                <span>3D Virtual Tour Available</span>
              </button>
            )}
          </div>

          {/* Core Info Panel */}
          <div style={styles.infoWrapper}>
            <div style={styles.titleRow}>
              <div>
                <span style={styles.propertyType}>{property.type}</span>
                <h1 style={styles.titleText}>{property.title}</h1>
                <div style={styles.location}>
                  <MapPin size={16} color="var(--accent-gold)" />
                  <span style={styles.locationText}>{property.location}</span>
                </div>
              </div>
              <div style={styles.priceTag}>{property.priceText}</div>
            </div>

            {/* Numeric Metadata Row */}
            <div style={styles.metaRow} className="glass-panel">
              <div style={styles.metaBox}>
                <BedDouble size={20} color="var(--accent-gold)" />
                <span style={styles.metaLabel}>Bedrooms</span>
                <span style={styles.metaVal}>{property.beds} Rooms</span>
              </div>
              <div style={styles.metaDivider}></div>
              <div style={styles.metaBox}>
                <Bath size={20} color="var(--accent-gold)" />
                <span style={styles.metaLabel}>Bathrooms</span>
                <span style={styles.metaVal}>{property.baths} Baths</span>
              </div>
              <div style={styles.metaDivider}></div>
              <div style={styles.metaBox}>
                <Maximize size={20} color="var(--accent-gold)" />
                <span style={styles.metaLabel}>Square Footage</span>
                <span style={styles.metaVal}>{property.sqft} sqft</span>
              </div>
            </div>

            {/* Description Paragraph */}
            <div style={styles.sectionBlock}>
              <h3 style={styles.sectionHeader}>Description</h3>
              <p style={styles.descriptionText}>{property.description}</p>
            </div>

            {/* Amenities Grid */}
            <div style={styles.sectionBlock}>
              <h3 style={styles.sectionHeader}>Premium Amenities</h3>
              <div style={styles.amenitiesGrid}>
                {property.amenities.map((amenity, idx) => (
                  <div key={idx} style={styles.amenityItem}>
                    <CheckCircle size={16} color="var(--accent-gold)" />
                    <span style={styles.amenityText}>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Consultation Desk (Glassmorphic Form) & Agent profile */}
        <div style={styles.rightCol}>
          {/* Inquiry form card */}
          <div style={styles.inquiryCard} className="glass-panel-gold">
            <h3 style={styles.formTitle}>Schedule Consultation</h3>
            <p style={styles.formSubtitle}>
              Send booking requests directly to our office.
            </p>

            {success ? (
              <div style={styles.successBlock}>
                <CheckCircle
                  size={44}
                  color="var(--accent-gold)"
                  style={{ marginBottom: "12px" }}
                />
                <h4 style={{ color: "#FFF" }}>
                  Consultation Request Submitted
                </h4>
                <p style={styles.successText}>
                  A digital confirmation has been dispatched. Our concierge
                  agent will connect with you within 2 business hours.
                </p>
                <p
                  style={{
                    ...styles.successText,
                    color: "var(--accent-gold)",
                    fontSize: "0.8rem",
                    fontWeight: "600",
                  }}
                >
                  Forwarded to: nesttohomes@gmail.com
                </p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} style={styles.form}>
                <div style={styles.inputGroup}>
                  <label style={styles.inputLabel}>Full Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Aarav Sharma"
                    value={inquiryForm.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    style={{
                      ...styles.formInput,
                      borderColor: errors.name
                        ? "var(--accent-red)"
                        : "rgba(255, 255, 255, 0.08)",
                    }}
                  />
                  {errors.name && (
                    <span style={styles.errorSpan}>{errors.name}</span>
                  )}
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.inputLabel}>Email Address</label>
                  <input
                    type="email"
                    placeholder="e.g. aarav.sharma@example.com"
                    value={inquiryForm.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    style={{
                      ...styles.formInput,
                      borderColor: errors.email
                        ? "var(--accent-red)"
                        : "rgba(255, 255, 255, 0.08)",
                    }}
                  />
                  {errors.email && (
                    <span style={styles.errorSpan}>{errors.email}</span>
                  )}
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.inputLabel}>Phone Number</label>
                  <input
                    type="tel"
                    placeholder="e.g. +91 98765 43210"
                    value={inquiryForm.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    style={{
                      ...styles.formInput,
                      borderColor: errors.phone
                        ? "var(--accent-red)"
                        : "rgba(255, 255, 255, 0.08)",
                    }}
                  />
                  {errors.phone && (
                    <span style={styles.errorSpan}>{errors.phone}</span>
                  )}
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.inputLabel}>Consultation Details</label>
                  <textarea
                    rows={4}
                    placeholder="I am interested in scheduling a viewing or virtual walkthrough..."
                    value={inquiryForm.msg}
                    onChange={(e) => handleInputChange("msg", e.target.value)}
                    style={styles.formTextarea}
                  />
                </div>

                <button
                  type="submit"
                  style={styles.submitBtn}
                  className="btn-gold pulse-gold-glow"
                >
                  Send Booking Request
                </button>
              </form>
            )}
          </div>

          {/* Agent profile card */}
          <div style={styles.agentCard} className="glass-panel">
            <h4 style={styles.agentTitle}>Listing Agent</h4>
            <div style={styles.agentProfile}>
              <img
                src={property.agent.image}
                alt={property.agent.name}
                style={styles.agentAvatar}
              />
              <div>
                <h4 style={styles.agentName}>{property.agent.name}</h4>
                <p style={styles.agentPosition}>Senior Concierge Broker</p>
              </div>
            </div>

            <div style={styles.agentContacts}>
              <div style={styles.agentContactRow}>
                <Phone size={14} color="var(--accent-gold)" />
                <span style={styles.agentContactVal}>
                  {property.agent.phone}
                </span>
              </div>
              <div style={styles.agentContactRow}>
                <Mail size={14} color="var(--accent-gold)" />
                <span style={styles.agentContactVal}>
                  {property.agent.email}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "30px 24px",
  },
  backBtn: {
    background: "none",
    border: "none",
    color: "var(--text-secondary)",
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "0.85rem",
    fontWeight: "500",
    fontFamily: "var(--font-heading)",
    marginBottom: "24px",
    transition: "var(--transition-fast)",
    outline: "none",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr",
    "@media (min-width: 900px)": {
      gridTemplateColumns: "1.7fr 1fr",
    },
    gap: "40px",
  },
  leftCol: {
    display: "flex",
    flexDirection: "column",
    gap: "30px",
  },
  bannerContainer: {
    position: "relative",
    width: "100%",
    height: "420px",
    borderRadius: "16px",
    overflow: "hidden",
    boxShadow: "0 15px 30px rgba(0, 0, 0, 0.4)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
  },
  bannerImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  floatingTourBtn: {
    position: "absolute",
    bottom: "24px",
    right: "24px",
    boxShadow: "0 8px 25px rgba(230, 57, 70, 0.4)",
  },
  infoWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  },
  titleRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexWrap: "wrap",
    gap: "20px",
  },
  propertyType: {
    fontSize: "0.8rem",
    color: "var(--accent-gold)",
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: "0.1em",
  },
  titleText: {
    fontSize: "2.25rem",
    fontWeight: "800",
    fontFamily: "var(--font-heading)",
    color: "#FFF",
    marginTop: "4px",
  },
  location: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    marginTop: "8px",
  },
  locationText: {
    color: "var(--text-secondary)",
    fontSize: "0.9rem",
  },
  priceTag: {
    fontSize: "2rem",
    fontWeight: "800",
    fontFamily: "var(--font-heading)",
    color: "var(--accent-gold)",
    textShadow: "0 0 10px var(--accent-gold-glow)",
  },
  metaRow: {
    display: "flex",
    justifyContent: "space-around",
    padding: "20px",
    borderRadius: "12px",
    border: "1px solid rgba(255, 255, 255, 0.05)",
  },
  metaBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "6px",
    flex: 1,
  },
  metaLabel: {
    fontSize: "0.7rem",
    textTransform: "uppercase",
    color: "var(--text-muted)",
    fontWeight: "600",
  },
  metaVal: {
    fontSize: "0.95rem",
    fontWeight: "700",
    color: "#FFF",
    fontFamily: "var(--font-heading)",
  },
  metaDivider: {
    width: "1px",
    background: "rgba(255, 255, 255, 0.08)",
    alignSelf: "stretch",
  },
  sectionBlock: {
    borderTop: "1px solid rgba(255, 255, 255, 0.05)",
    paddingTop: "24px",
  },
  sectionHeader: {
    fontSize: "1.25rem",
    fontWeight: "700",
    color: "#FFF",
    fontFamily: "var(--font-heading)",
    marginBottom: "12px",
  },
  descriptionText: {
    fontSize: "0.95rem",
    color: "var(--text-secondary)",
    lineHeight: "1.7",
  },
  amenitiesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "16px",
  },
  amenityItem: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  amenityText: {
    fontSize: "0.9rem",
    color: "var(--text-secondary)",
  },
  rightCol: {
    display: "flex",
    flexDirection: "column",
    gap: "30px",
  },
  inquiryCard: {
    padding: "30px",
    borderRadius: "16px",
  },
  formTitle: {
    fontSize: "1.25rem",
    fontWeight: "700",
    color: "#FFF",
    fontFamily: "var(--font-heading)",
  },
  formSubtitle: {
    fontSize: "0.8rem",
    color: "var(--text-secondary)",
    marginTop: "2px",
    marginBottom: "24px",
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
  inputLabel: {
    fontSize: "0.75rem",
    fontWeight: "600",
    color: "var(--text-muted)",
    textTransform: "uppercase",
  },
  formInput: {
    background: "rgba(255, 255, 255, 0.02)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    borderRadius: "8px",
    padding: "10px 14px",
    color: "#FFF",
    fontSize: "0.85rem",
    outline: "none",
    width: "100%",
    transition: "var(--transition-fast)",
  },
  formTextarea: {
    background: "rgba(255, 255, 255, 0.02)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    borderRadius: "8px",
    padding: "10px 14px",
    color: "#FFF",
    fontSize: "0.85rem",
    outline: "none",
    width: "100%",
    resize: "none",
    fontFamily: "var(--font-body)",
  },
  errorSpan: {
    fontSize: "0.7rem",
    color: "var(--accent-red)",
    marginTop: "2px",
  },
  submitBtn: {
    width: "100%",
    justifyContent: "center",
    padding: "12px 0",
    marginTop: "10px",
  },
  successBlock: {
    textAlign: "center",
    padding: "20px 0",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  successText: {
    fontSize: "0.85rem",
    color: "var(--text-secondary)",
    lineHeight: "1.6",
    marginTop: "8px",
  },
  agentCard: {
    padding: "24px",
    borderRadius: "16px",
    border: "1px solid rgba(255, 255, 255, 0.05)",
  },
  agentTitle: {
    fontSize: "0.95rem",
    fontWeight: "700",
    color: "var(--text-muted)",
    textTransform: "uppercase",
    marginBottom: "16px",
    letterSpacing: "0.05em",
  },
  agentProfile: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    marginBottom: "20px",
  },
  agentAvatar: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "2px solid var(--accent-gold)",
  },
  agentName: {
    fontSize: "1.1rem",
    fontWeight: "700",
    color: "#FFF",
    fontFamily: "var(--font-heading)",
  },
  agentPosition: {
    fontSize: "0.8rem",
    color: "var(--text-secondary)",
  },
  agentContacts: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    paddingTop: "16px",
    borderTop: "1px solid rgba(255, 255, 255, 0.05)",
  },
  agentContactRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  agentContactVal: {
    fontSize: "0.85rem",
    color: "var(--text-secondary)",
  },
  errorState: {
    textAlign: "center",
    maxWidth: "500px",
    margin: "100px auto",
    padding: "40px",
    borderRadius: "16px",
  },
};
// Hover states styles integration
if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.textContent = `
    .form-input-focus:focus {
      border-color: var(--accent-gold) !important;
      background: rgba(255, 255, 255, 0.04) !important;
    }
  `;
  document.head.appendChild(style);
}
