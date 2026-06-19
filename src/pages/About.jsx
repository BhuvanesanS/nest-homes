import React from "react";
import { Target, Users, Landmark, Award, Shield } from "lucide-react";

export default function About({ setCurrentPage }) {
  return (
    <div style={styles.container}>
      {/* 1. Header Hero */}
      <section style={styles.header} className="animate-fade-in-up">
        <span style={styles.badge}>OUR ANTECEDENTS</span>
        <h1 style={styles.title}>About Nest to Homes</h1>
        <p style={styles.subtitle}>
          The signature standard of luxury real estate brokerage. Blending
          premium security with cutting-edge visual experiences.
        </p>
      </section>

      {/* 2. Story with Image */}
      <section style={styles.storySection} className="glass-panel">
        <div style={styles.storyContent}>
          <h2 style={styles.sectionTitle}>The Nest Philosophy</h2>
          <p style={styles.storyText}>
            Established with a vision to redefine what a home represents, **Nest
            to Homes** was founded on a simple realization: a house is a
            structure, but a home is a protective, warm sanctuary.
          </p>
          <p style={styles.storyText}>
            Our logo captures this essence perfectly—depicting clean, modern
            architectural lines nestled securely within a golden nest of
            comfort. We do not just broker transactions; we guide families and
            investors to their ultimate sanctuaries.
          </p>
          <p style={styles.storyText}>
            By introducing high-fidelity 3D virtual walkthroughs and curated
            client advisor networks, we bypass standard real estate frictions to
            make property acquisition a pure luxury experience.
          </p>
        </div>
        <div style={styles.storyImageWrapper}>
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80"
            alt="Our philosophy"
            style={styles.storyImage}
          />
        </div>
      </section>

      {/* 3. Core Values Grid */}
      <section style={styles.valuesSection} className="section-padding">
        <div style={styles.sectionHeader}>
          <span style={styles.badge}>PRINCIPLES</span>
          <h2 style={styles.sectionTitle}>Our Core Pillars</h2>
          <p style={styles.sectionDesc}>
            The values that govern every client interaction.
          </p>
        </div>

        <div style={styles.valuesGrid}>
          <div style={styles.valueCard} className="glass-panel-gold">
            <div style={styles.valIcon}>
              <Shield size={22} color="var(--accent-gold)" />
            </div>
            <h4 style={styles.valTitle}>Integrity First</h4>
            <p style={styles.valDesc}>
              Every contract, land title, and price log is audited for 100%
              security.
            </p>
          </div>

          <div style={styles.valueCard} className="glass-panel-gold">
            <div style={styles.valIcon}>
              <Target size={22} color="var(--accent-gold)" />
            </div>
            <h4 style={styles.valTitle}>Immersive Tech</h4>
            <p style={styles.valDesc}>
              Deploying space simulators and drone feeds for real-time
              visualization.
            </p>
          </div>

          <div style={styles.valueCard} className="glass-panel-gold">
            <div style={styles.valIcon}>
              <Users size={22} color="var(--accent-gold)" />
            </div>
            <h4 style={styles.valTitle}>Bespoke Concierge</h4>
            <p style={styles.valDesc}>
              Highly customized consulting matching property tags with your
              lifestyle.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Statistics Panel */}
      <section style={styles.statsPanel} className="glass-panel">
        <div style={styles.statBox}>
          <span style={styles.statNum}>₹ 5,000 Cr+</span>
          <span style={styles.statLabel}>Volume Brokered</span>
        </div>
        <div style={styles.statDivider}></div>
        <div style={styles.statBox}>
          <span style={styles.statNum}>1,500+</span>
          <span style={styles.statLabel}>Luxury Homes Delivered</span>
        </div>
        <div style={styles.statDivider}></div>
        <div style={styles.statBox}>
          <span style={styles.statNum}>10+ Yrs</span>
          <span style={styles.statLabel}>Industry Leadership</span>
        </div>
      </section>

      {/* 5. Team Section */}
      <section style={styles.teamSection} className="section-padding">
        <div style={styles.sectionHeader}>
          <span style={styles.badge}>LEADERSHIP</span>
          <h2 style={styles.sectionTitle}>Meet Our Elite Advisors</h2>
        </div>

        <div style={styles.teamGrid}>
          <div style={styles.teamCard} className="glass-panel">
            <img
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80"
              alt="Bhuvanesan S"
              style={styles.teamAvatar}
            />
            <h4 style={styles.teamName}>Bhuvanesan S</h4>
            <span style={styles.teamRole}>
              Founder & Senior Principal Broker
            </span>
            <p style={styles.teamBio}>
              Over 12 years piloting luxury real-estate portfolios across
              Bangalore. Driven by technology and strict client confidentiality.
            </p>
          </div>

          <div style={styles.teamCard} className="glass-panel">
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80"
              alt="Sarah D Souza"
              style={styles.teamAvatar}
            />
            <h4 style={styles.teamName}>Sarah D'Souza</h4>
            <span style={styles.teamRole}>
              Head of Global Design & Concierge Brokerage
            </span>
            <p style={styles.teamBio}>
              Specializes in ultra-modern architectural trends, ensuring all
              featured listings meet elite space standards.
            </p>
          </div>
        </div>
      </section>
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
  storySection: {
    display: "grid",
    gridTemplateColumns: "1fr",
    "@media (min-width: 769px)": {
      gridTemplateColumns: "1.2fr 1fr",
    },
    gap: "40px",
    padding: "40px",
    borderRadius: "24px",
    alignItems: "center",
    border: "1px solid rgba(255, 255, 255, 0.08)",
  },
  storyContent: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  sectionTitle: {
    fontSize: "1.75rem",
    color: "#FFF",
    fontFamily: "var(--font-heading)",
  },
  storyText: {
    fontSize: "0.95rem",
    color: "var(--text-secondary)",
    lineHeight: "1.7",
  },
  storyImageWrapper: {
    borderRadius: "16px",
    overflow: "hidden",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
    aspectRatio: "4/3",
  },
  storyImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  valuesSection: {
    width: "100%",
  },
  sectionHeader: {
    textAlign: "center",
    marginBottom: "40px",
  },
  sectionDesc: {
    fontSize: "0.85rem",
    color: "var(--text-secondary)",
    marginTop: "4px",
  },
  valuesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "24px",
  },
  valueCard: {
    padding: "30px 24px",
    borderRadius: "16px",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  valIcon: {
    width: "44px",
    height: "44px",
    borderRadius: "50%",
    background: "rgba(212, 175, 55, 0.08)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid rgba(212, 175, 55, 0.15)",
  },
  valTitle: {
    fontSize: "1.1rem",
    fontWeight: "700",
    color: "#FFF",
    fontFamily: "var(--font-heading)",
  },
  valDesc: {
    fontSize: "0.85rem",
    color: "var(--text-secondary)",
    lineHeight: "1.6",
  },
  statsPanel: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    padding: "30px 20px",
    borderRadius: "16px",
    border: "1px solid rgba(255, 255, 255, 0.05)",
    flexWrap: "wrap",
    gap: "20px",
  },
  statBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "6px",
    flex: 1,
    minWidth: "150px",
  },
  statNum: {
    fontSize: "2rem",
    fontWeight: "800",
    color: "var(--accent-gold)",
    fontFamily: "var(--font-heading)",
    textShadow: "0 0 10px var(--accent-gold-glow)",
  },
  statLabel: {
    fontSize: "0.75rem",
    color: "var(--text-secondary)",
    textTransform: "uppercase",
    fontWeight: "600",
  },
  statDivider: {
    width: "1px",
    height: "50px",
    background: "rgba(255, 255, 255, 0.08)",
    display: "none",
    "@media (min-width: 600px)": {
      display: "block",
    },
  },
  teamSection: {
    width: "100%",
    paddingTop: "40px",
  },
  teamGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "30px",
    justifyContent: "center",
  },
  teamCard: {
    padding: "30px 24px",
    borderRadius: "16px",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "12px",
  },
  teamAvatar: {
    width: "90px",
    height: "90px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "3px solid var(--accent-gold)",
    marginBottom: "8px",
  },
  teamName: {
    fontSize: "1.2rem",
    fontWeight: "700",
    color: "#FFF",
    fontFamily: "var(--font-heading)",
  },
  teamRole: {
    fontSize: "0.8rem",
    color: "var(--accent-gold)",
    fontWeight: "600",
  },
  teamBio: {
    fontSize: "0.85rem",
    color: "var(--text-secondary)",
    lineHeight: "1.6",
    marginTop: "6px",
  },
};
