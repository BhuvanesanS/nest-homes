import React from "react";
import { Award, Compass, Eye, ShieldCheck, Cpu } from "lucide-react";
import ThreeDVirtualTour from "../components/ThreeDVirtualTour";

export default function VirtualTourPage({ setCurrentPage }) {
  return (
    <div style={styles.container}>
      {/* Page Header */}
      <section style={styles.header} className="animate-fade-in-up">
        <span style={styles.badge}>CUTTING-EDGE VISUALIZATION</span>
        <h1 style={styles.title}>3D Immersive Tours</h1>
        <p style={styles.subtitle}>
          Step inside our properties from anywhere. Experience scale, lighting,
          and layout with absolute clarity.
        </p>
      </section>

      {/* Main 3D Simulator container */}
      <div style={styles.tourWrapper}>
        <ThreeDVirtualTour />
      </div>

      {/* Feature explanations */}
      <section style={styles.featuresSection} className="section-padding">
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>The Virtual Edge</h2>
          <p style={styles.sectionDesc}>
            We employ state of the art spatial rendering technologies.
          </p>
        </div>

        <div style={styles.featuresGrid}>
          <div style={styles.featureCard} className="glass-panel">
            <div style={styles.iconWrapper}>
              <Eye size={22} color="var(--accent-gold)" />
            </div>
            <h4>60 FPS Panoramic Rendering</h4>
            <p>
              Accelerated via hardware GPU rendering, allowing ultra-smooth room
              navigation.
            </p>
          </div>

          <div style={styles.featureCard} className="glass-panel">
            <div style={styles.iconWrapper}>
              <Cpu size={22} color="var(--accent-gold)" />
            </div>
            <h4>Spatially Accurate</h4>
            <p>
              Engineered to exact blueprint dimensions. Feel the exact depth of
              rooms and windows.
            </p>
          </div>

          <div style={styles.featureCard} className="glass-panel">
            <div style={styles.iconWrapper}>
              <ShieldCheck size={22} color="var(--accent-gold)" />
            </div>
            <h4>Pre-vetted Visuals</h4>
            <p>
              100% true-to-life renderings. What you see on screen matches
              reality with absolute accuracy.
            </p>
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section style={styles.cta} className="glass-panel-gold">
        <div style={styles.ctaContent}>
          <h2 style={styles.ctaTitle}>Ready to Experience in Person?</h2>
          <p style={styles.ctaDesc}>
            If you've completed your virtual tour and would like to arrange an
            in-person viewing of these properties, connect with us.
          </p>
          <button
            onClick={() => setCurrentPage("contact")}
            className="btn-gold pulse-gold-glow"
          >
            Book In-Person Viewing
          </button>
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
    marginBottom: "40px",
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
  tourWrapper: {
    width: "100%",
    boxShadow: "0 20px 50px rgba(0, 0, 0, 0.5)",
    borderRadius: "16px",
    overflow: "hidden",
    border: "1px solid rgba(255, 255, 255, 0.08)",
  },
  featuresSection: {
    width: "100%",
    padding: "60px 0 20px 0",
  },
  sectionHeader: {
    textAlign: "center",
    marginBottom: "40px",
  },
  sectionTitle: {
    fontSize: "1.75rem",
    color: "#FFF",
    fontFamily: "var(--font-heading)",
  },
  sectionDesc: {
    fontSize: "0.85rem",
    color: "var(--text-secondary)",
    marginTop: "4px",
  },
  featuresGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "24px",
  },
  featureCard: {
    padding: "30px 24px",
    borderRadius: "16px",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  iconWrapper: {
    width: "44px",
    height: "44px",
    borderRadius: "50%",
    background: "rgba(212, 175, 55, 0.08)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid rgba(212, 175, 55, 0.15)",
  },
  cta: {
    padding: "40px",
    borderRadius: "24px",
    textAlign: "center",
    marginTop: "40px",
  },
  ctaContent: {
    maxWidth: "600px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "16px",
  },
  ctaTitle: {
    fontSize: "1.75rem",
    color: "#FFF",
    fontFamily: "var(--font-heading)",
  },
  ctaDesc: {
    fontSize: "0.9rem",
    color: "var(--text-secondary)",
    lineHeight: "1.6",
  },
};
