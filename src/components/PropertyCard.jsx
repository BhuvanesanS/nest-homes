import React from "react";
import { MapPin, BedDouble, Bath, Maximize, Eye } from "lucide-react";
import use3DTilt from "../hooks/use3DTilt";

export default function PropertyCard({ property, onSelect }) {
  const { elementRef, style, handleMouseMove, handleMouseLeave } =
    use3DTilt(12);

  return (
    <div
      ref={elementRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        ...styles.card,
        ...style,
      }}
      onClick={() => onSelect(property)}
      className="glass-panel-gold"
    >
      {/* Property Image & Tags */}
      <div style={styles.imageContainer}>
        <img src={property.image} alt={property.title} style={styles.image} />
        <div style={styles.priceTag}>{property.priceText}</div>
        {property.virtualTour && (
          <div style={styles.badgeTour}>
            <Eye size={12} style={{ marginRight: "4px" }} />
            3D TOUR
          </div>
        )}
        <div style={styles.badgeType}>{property.type}</div>
      </div>

      {/* Card Content (translated in Z-axis for 3D depth) */}
      <div style={styles.content} className="card-3d-inner">
        <h4 style={styles.title}>{property.title}</h4>

        <div style={styles.location}>
          <MapPin size={14} color="var(--accent-gold)" />
          <span style={styles.locationText}>{property.location}</span>
        </div>

        {/* Features Row */}
        <div style={styles.features}>
          <div style={styles.featureItem}>
            <BedDouble size={16} color="var(--text-secondary)" />
            <span style={styles.featureVal}>{property.beds} Bed</span>
          </div>
          <div style={styles.featureItem}>
            <Bath size={16} color="var(--text-secondary)" />
            <span style={styles.featureVal}>{property.baths} Bath</span>
          </div>
          <div style={styles.featureItem}>
            <Maximize size={16} color="var(--text-secondary)" />
            <span style={styles.featureVal}>{property.sqft} sqft</span>
          </div>
        </div>

        {/* Action button */}
        <button style={styles.actionBtn} className="btn-outline-glass">
          Explore Details
        </button>
      </div>
    </div>
  );
}

const styles = {
  card: {
    borderRadius: "16px",
    overflow: "hidden",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    position: "relative",
    transformStyle: "preserve-3d", // Necessary for inner 3D depth translation
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    height: "200px",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "transform 0.5s ease",
  },
  priceTag: {
    position: "absolute",
    bottom: "12px",
    left: "12px",
    background: "rgba(5, 12, 26, 0.85)",
    border: "1px solid var(--accent-gold)",
    color: "var(--accent-gold)",
    fontFamily: "var(--font-heading)",
    fontWeight: "700",
    padding: "6px 12px",
    borderRadius: "8px",
    fontSize: "0.95rem",
    backdropFilter: "blur(8px)",
  },
  badgeTour: {
    position: "absolute",
    top: "12px",
    left: "12px",
    background: "linear-gradient(135deg, var(--accent-red) 0%, #C1121F 100%)",
    color: "#FFF",
    fontFamily: "var(--font-heading)",
    fontWeight: "600",
    padding: "4px 10px",
    borderRadius: "6px",
    fontSize: "0.7rem",
    display: "flex",
    alignItems: "center",
    boxShadow: "0 4px 10px rgba(230, 57, 70, 0.4)",
  },
  badgeType: {
    position: "absolute",
    top: "12px",
    right: "12px",
    background: "rgba(255, 255, 255, 0.1)",
    color: "#FFF",
    fontFamily: "var(--font-heading)",
    fontWeight: "500",
    padding: "4px 10px",
    borderRadius: "6px",
    fontSize: "0.7rem",
    backdropFilter: "blur(8px)",
  },
  content: {
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    flex: 1,
    transform: "translateZ(30px)", // Pushes text/buttons forward in 3D perspective
  },
  title: {
    fontSize: "1.1rem",
    color: "#FFFFFF",
    fontWeight: "700",
    fontFamily: "var(--font-heading)",
    marginBottom: "8px",
  },
  location: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    marginBottom: "16px",
  },
  locationText: {
    color: "var(--text-secondary)",
    fontSize: "0.85rem",
  },
  features: {
    display: "flex",
    justifyContent: "space-between",
    paddingTop: "12px",
    borderTop: "1px solid rgba(255, 255, 255, 0.05)",
    marginBottom: "20px",
  },
  featureItem: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
  featureVal: {
    fontSize: "0.8rem",
    color: "var(--text-secondary)",
    fontWeight: "500",
  },
  actionBtn: {
    marginTop: "auto",
    width: "100%",
    justifyContent: "center",
    padding: "10px 0",
    fontSize: "0.85rem",
  },
};
