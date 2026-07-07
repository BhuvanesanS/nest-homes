import React, { useState } from "react";
import {
  Search,
  MapPin,
  Home as HomeIcon,
  IndianRupee,
  ArrowRight,
  Star,
  Shield,
  Award,
  Users,
} from "lucide-react";
import { propertiesData } from "../data/propertiesData";
import PropertyCard from "../components/PropertyCard";

export default function Home({ setCurrentPage, setSelectedProperty }) {
  const [searchLocation, setSearchLocation] = useState("");
  const [searchType, setSearchType] = useState("All");
  const [searchPrice, setSearchPrice] = useState("All");

  // Filter properties to display just 3 featured properties
  const featuredProperties = propertiesData.slice(0, 3);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // In a real application, we would pass these query options to our Properties page state.
    // We will redirect to the properties listings page directly.
    setCurrentPage("properties");
  };

  const handlePropertySelect = (property) => {
    setSelectedProperty(property);
    setCurrentPage("details");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div style={styles.container}>
      {/* 1. HERO SECTION WITH PARALLAX & SEARCH */}
      <section style={styles.hero} className="animate-fade-in-up">
        {/* Background Overlay */}
        <div style={styles.heroOverlay}></div>

        {/* Content */}
        <div style={styles.heroContent}>
          <div style={styles.badgeContainer} className="animate-float">
            <span style={styles.badgeText}>⭐ Elevating Living Standards</span>
          </div>
          <h1 style={styles.heroTitle}>
            Where Masterful Architecture <br />
            Meets{" "}
            <span className="gradient-text-gold-red">Sovereign Comfort</span>
          </h1>
          <p style={styles.heroSubtitle}>
            Acquire India's most prestigious residencies. Experience volumetric
            spatial dimensions with our custom 3D walkthroughs, backed by strict
            corporate safety standards.
          </p>

          {/* Search Console (Glassmorphic) */}
          <form
            onSubmit={handleSearchSubmit}
            style={styles.searchForm}
            className="glass-panel"
          >
            <div style={styles.searchFieldsGrid}>
              {/* Location Input */}
              <div style={styles.fieldGroup}>
                <label style={styles.fieldLabel}>Location</label>
                <div style={styles.fieldInputWrapper}>
                  <MapPin size={18} color="var(--accent-gold)" />
                  <input
                    type="text"
                    placeholder="Where are you looking?"
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    style={styles.fieldInput}
                  />
                </div>
              </div>

              {/* Type Select */}
              <div style={styles.fieldGroup}>
                <label style={styles.fieldLabel}>Property Type</label>
                <div style={styles.fieldInputWrapper}>
                  <HomeIcon size={18} color="var(--accent-gold)" />
                  <select
                    value={searchType}
                    onChange={(e) => setSearchType(e.target.value)}
                    style={styles.selectInput}
                  >
                    <option value="All">All Types</option>
                    <option value="Penthouse">Penthouse</option>
                    <option value="Villa">Villa</option>
                    <option value="Mansion">Mansion</option>
                    <option value="Apartment">Apartment</option>
                  </select>
                </div>
              </div>

              {/* Price Range Select */}
              <div style={styles.fieldGroup}>
                <label style={styles.fieldLabel}>Budget Range</label>
                <div style={styles.fieldInputWrapper}>
                  <IndianRupee size={18} color="var(--accent-gold)" />
                  <select
                    value={searchPrice}
                    onChange={(e) => setSearchPrice(e.target.value)}
                    style={styles.selectInput}
                  >
                    <option value="All">Any Budget</option>
                    <option value="under2cr">Under ₹ 2.0 Cr</option>
                    <option value="2to5cr">₹ 2.0 Cr - ₹ 5.0 Cr</option>
                    <option value="over5cr">Above ₹ 5.0 Cr</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Search Button */}
            <button type="submit" style={styles.searchBtn} className="btn-gold">
              <Search size={18} />
              <span>Search Listings</span>
            </button>
          </form>
        </div>
      </section>

      {/* 2. STATS & REASONS SECTION */}
      <section style={styles.statsSection} className="section-padding">
        <div style={styles.sectionHeader}>
          <span style={styles.sectionBadge}>ADVANTAGE</span>
          <h2 style={styles.sectionTitle}>Why Select Nest to Homes?</h2>
          <p style={styles.sectionDesc}>
            We offer a custom, highly elite home buying experience.
          </p>
        </div>

        <div style={styles.statsGrid}>
          <div style={styles.statCard} className="glass-panel-gold">
            <div style={styles.iconContainer}>
              <Shield size={24} color="var(--accent-gold)" />
            </div>
            <h3 style={styles.statValue}>Sovereign Security</h3>
            <p style={styles.statLabel}>
              Every title deed, contract log, and building permission is fully
              vetted by our principal legal desk for ultimate peace of mind.
            </p>
          </div>

          <div style={styles.statCard} className="glass-panel-gold">
            <div style={styles.iconContainer}>
              <Award size={24} color="var(--accent-gold)" />
            </div>
            <h3 style={styles.statValue}>Dimensional Walkthroughs</h3>
            <p style={styles.statLabel}>
              Step inside the blueprints. Experience volumetric scale, ambient
              solar lighting, and architectural acoustics from anywhere
              globally.
            </p>
          </div>

          <div style={styles.statCard} className="glass-panel-gold">
            <div style={styles.iconContainer}>
              <Users size={24} color="var(--accent-gold)" />
            </div>
            <h3 style={styles.statValue}>Concierge Brokerage</h3>
            <p style={styles.statLabel}>
              A dedicated lifestyle advisor tailoring a property portfolio
              matching your exact visual, geographical, and financial goals.
            </p>
          </div>
        </div>
      </section>

      {/* 3. FEATURED PROPERTIES GRID (3D CARDS) */}
      <section style={styles.featuredSection} className="section-padding">
        <div style={styles.featuredHeaderRow}>
          <div>
            <span style={styles.sectionBadge}>PORTFOLIO</span>
            <h2 style={styles.sectionTitle}>Featured Residencies</h2>
            <p style={styles.sectionDesc}>
              Handpicked properties optimized for elite lifestyles.
            </p>
          </div>
          <button
            onClick={() => setCurrentPage("properties")}
            className="btn-outline-glass"
          >
            <span>View All Properties</span>
            <ArrowRight size={16} />
          </button>
        </div>

        <div style={styles.propertiesGrid}>
          {featuredProperties.map((property) => (
            <div key={property.id} style={styles.gridItem}>
              <PropertyCard
                property={property}
                onSelect={handlePropertySelect}
              />
            </div>
          ))}
        </div>
      </section>

      {/* 4. DYNAMIC 3D VIRTUAL TOUR BANNER */}
      <section style={styles.tourBanner} className="section-padding">
        <div style={styles.tourBannerWrapper} className="glass-panel-gold">
          <div style={styles.tourInfo}>
            <span style={styles.sectionBadge}>IMMERSE YOURSELF</span>
            <h2 style={styles.tourBannerTitle}>
              Take a 3D Virtual Room Tour Now
            </h2>
            <p style={styles.tourBannerDesc}>
              Experience our premium listings directly on your screen. Rotate,
              view details, and walkthrough suites dynamically. Try our mock
              panorama simulator!
            </p>
            <button
              onClick={() => setCurrentPage("tour")}
              className="btn-gold pulse-gold-glow"
            >
              Launch 3D Room Simulator
            </button>
          </div>
          <div style={styles.tourMockup}>
            <div style={styles.tourScreenFrame}>
              <img
                src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=600&q=80"
                alt="3D Tour Preview"
                style={styles.tourMockupImg}
              />
              <div style={styles.tourPlayPulse}>
                <Star size={32} color="var(--accent-gold)" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. TESTIMONIALS */}
      <section style={styles.testimonialsSection} className="section-padding">
        <div style={styles.sectionHeader}>
          <span style={styles.sectionBadge}>TESTIMONIALS</span>
          <h2 style={styles.sectionTitle}>What Clients Say</h2>
        </div>

        <div style={styles.testimonialsGrid}>
          <div style={styles.testimonialCard} className="glass-panel">
            <div style={styles.rating}>
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  fill="var(--accent-gold)"
                  color="var(--accent-gold)"
                />
              ))}
            </div>
            <p style={styles.quote}>
              "Nest to Homes made finding our penthouse incredibly simple. The
              3D virtual tour feature was so realistic that we had complete
              confidence before we even visited. Exceptional customer care!"
            </p>
            <div style={styles.clientInfo}>
              <div style={styles.clientAvatar}>MD</div>
              <div>
                <h5 style={styles.clientName}>Mohit Dev</h5>
                <span style={styles.clientTitle}>Crest Penthouse Owner</span>
              </div>
            </div>
          </div>

          <div style={styles.testimonialCard} className="glass-panel">
            <div style={styles.rating}>
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  fill="var(--accent-gold)"
                  color="var(--accent-gold)"
                />
              ))}
            </div>
            <p style={styles.quote}>
              "Working with their concierge agent was like shopping with a
              luxury lifestyle planner. They tailored listings to my EXACT
              parameters and supported us with full legal paperwork audits."
            </p>
            <div style={styles.clientInfo}>
              <div style={styles.clientAvatar}>RK</div>
              <div>
                <h5 style={styles.clientName}>Rhea Kapoor</h5>
                <span style={styles.clientTitle}>Aura Heights Resident</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

const styles = {
  container: {
    width: "100%",
  },
  hero: {
    position: "relative",
    height: "85vh",
    minHeight: "600px",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0 24px",
    backgroundImage:
      'url("https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80")',
    backgroundSize: "cover",
    backgroundPosition: "center",
    overflow: "hidden",
  },
  heroOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background:
      "linear-gradient(to bottom, rgba(5, 12, 26, 0.75) 0%, rgba(5, 12, 26, 0.95) 100%)",
    zIndex: 1,
  },
  heroContent: {
    position: "relative",
    zIndex: 2,
    maxWidth: "850px",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  badgeContainer: {
    background: "rgba(212, 175, 55, 0.1)",
    border: "1px solid var(--accent-gold)",
    borderRadius: "20px",
    padding: "6px 16px",
    marginBottom: "24px",
    backdropFilter: "blur(8px)",
  },
  badgeText: {
    fontSize: "0.8rem",
    fontWeight: "600",
    color: "var(--accent-gold)",
    letterSpacing: "0.05em",
  },
  heroTitle: {
    fontSize: "3.5rem",
    lineHeight: "1.2",
    fontWeight: "800",
    fontFamily: "var(--font-heading)",
    marginBottom: "20px",
    color: "#FFF",
    "@media (max-width: 768px)": {
      fontSize: "2.5rem",
    },
  },
  heroSubtitle: {
    fontSize: "1.1rem",
    color: "var(--text-secondary)",
    lineHeight: "1.6",
    marginBottom: "40px",
    maxWidth: "650px",
  },
  searchForm: {
    width: "100%",
    maxWidth: "800px",
    padding: "24px",
    borderRadius: "16px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    boxShadow: "0 20px 50px rgba(0, 0, 0, 0.6)",
  },
  searchFieldsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "16px",
    width: "100%",
  },
  fieldGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    textAlign: "left",
  },
  fieldLabel: {
    fontSize: "0.75rem",
    textTransform: "uppercase",
    color: "var(--text-muted)",
    fontWeight: "600",
    letterSpacing: "0.05em",
  },
  fieldInputWrapper: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    background: "rgba(255, 255, 255, 0.03)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    borderRadius: "8px",
    padding: "10px 14px",
  },
  fieldInput: {
    background: "none",
    border: "none",
    outline: "none",
    color: "var(--text-primary)",
    fontSize: "0.9rem",
    width: "100%",
    fontFamily: "var(--font-body)",
  },
  selectInput: {
    background: "none",
    border: "none",
    outline: "none",
    color: "var(--text-primary)",
    fontSize: "0.9rem",
    width: "100%",
    fontFamily: "var(--font-body)",
    cursor: "pointer",
  },
  searchBtn: {
    width: "100%",
    justifyContent: "center",
    padding: "14px 0",
  },
  statsSection: {
    background: "rgba(5, 12, 26, 0.6)",
  },
  sectionHeader: {
    textAlign: "center",
    marginBottom: "50px",
  },
  sectionBadge: {
    fontSize: "0.75rem",
    color: "var(--accent-gold)",
    fontWeight: "700",
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    display: "block",
    marginBottom: "8px",
  },
  sectionTitle: {
    fontSize: "2rem",
    color: "#FFF",
    fontFamily: "var(--font-heading)",
  },
  sectionDesc: {
    fontSize: "0.9rem",
    color: "var(--text-secondary)",
    marginTop: "6px",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "30px",
  },
  statCard: {
    padding: "40px 30px",
    borderRadius: "16px",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "16px",
  },
  iconContainer: {
    width: "56px",
    height: "56px",
    borderRadius: "50%",
    background: "rgba(212, 175, 55, 0.1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid rgba(212, 175, 55, 0.2)",
  },
  statValue: {
    fontSize: "1.25rem",
    fontWeight: "700",
    color: "#FFFFFF",
    fontFamily: "var(--font-heading)",
  },
  statLabel: {
    fontSize: "0.85rem",
    color: "var(--text-secondary)",
    lineHeight: "1.6",
  },
  featuredSection: {
    width: "100%",
  },
  featuredHeaderRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: "40px",
    flexWrap: "wrap",
    gap: "20px",
  },
  propertiesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "30px",
    width: "100%",
  },
  gridItem: {
    height: "430px", // Standard height to prevent layout shifts
  },
  tourBanner: {
    width: "100%",
  },
  tourBannerWrapper: {
    display: "grid",
    gridTemplateColumns: "1fr",
    "@media (min-width: 769px)": {
      gridTemplateColumns: "1.2fr 1fr",
    },
    gap: "40px",
    padding: "40px",
    borderRadius: "24px",
    alignItems: "center",
  },
  tourInfo: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    alignItems: "flex-start",
  },
  tourBannerTitle: {
    fontSize: "2.25rem",
    color: "#FFF",
    fontFamily: "var(--font-heading)",
  },
  tourBannerDesc: {
    fontSize: "0.95rem",
    color: "var(--text-secondary)",
    lineHeight: "1.6",
  },
  tourMockup: {
    display: "flex",
    justifyContent: "center",
  },
  tourScreenFrame: {
    position: "relative",
    width: "100%",
    maxWidth: "400px",
    borderRadius: "16px",
    border: "8px solid #111",
    boxShadow: "0 20px 40px rgba(0,0,0,0.8)",
    overflow: "hidden",
    aspectRatio: "4/3",
  },
  tourMockupImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  tourPlayPulse: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "64px",
    height: "64px",
    borderRadius: "50%",
    background: "rgba(5, 12, 26, 0.85)",
    border: "2px solid var(--accent-gold)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    animation: "pulse-gold 1.5s infinite",
  },
  testimonialsSection: {
    background: "rgba(5, 12, 26, 0.4)",
  },
  testimonialsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "30px",
  },
  testimonialCard: {
    padding: "40px 30px",
    borderRadius: "16px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  rating: {
    display: "flex",
    gap: "4px",
  },
  quote: {
    fontSize: "0.95rem",
    color: "var(--text-secondary)",
    lineHeight: "1.7",
    fontStyle: "italic",
  },
  clientInfo: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginTop: "auto",
  },
  clientAvatar: {
    width: "44px",
    height: "44px",
    borderRadius: "50%",
    background: "rgba(212, 175, 55, 0.1)",
    border: "1px solid var(--accent-gold)",
    color: "var(--accent-gold)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "700",
    fontSize: "0.9rem",
    fontFamily: "var(--font-heading)",
  },
  clientName: {
    fontSize: "0.95rem",
    color: "#FFFFFF",
    fontWeight: "600",
  },
  clientTitle: {
    fontSize: "0.75rem",
    color: "var(--text-muted)",
  },
};
