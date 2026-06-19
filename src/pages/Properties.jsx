import React, { useState, useMemo } from "react";
import {
  Search,
  MapPin,
  DollarSign,
  Home as HomeIcon,
  Star,
  Filter,
  SlidersHorizontal,
} from "lucide-react";
import { propertiesData } from "../data/propertiesData";
import PropertyCard from "../components/PropertyCard";

export default function Properties({ setCurrentPage, setSelectedProperty }) {
  const [filterLocation, setFilterLocation] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [filterPrice, setFilterPrice] = useState("All");
  const [filterBeds, setFilterBeds] = useState("All");
  const [sortBy, setSortBy] = useState("featured");

  // Filter listings dataset
  const filteredProperties = useMemo(() => {
    return propertiesData
      .filter((property) => {
        // 1. Location Filter
        if (
          filterLocation &&
          !property.location
            .toLowerCase()
            .includes(filterLocation.toLowerCase())
        ) {
          return false;
        }
        // 2. Type Filter
        if (filterType !== "All" && property.type !== filterType) {
          return false;
        }
        // 3. Price Filter
        if (filterPrice !== "All") {
          if (filterPrice === "under2cr" && property.price >= 20000000)
            return false;
          if (
            filterPrice === "2to5cr" &&
            (property.price < 20000000 || property.price > 50000000)
          )
            return false;
          if (filterPrice === "over5cr" && property.price <= 50000000)
            return false;
        }
        // 4. Beds Filter
        if (filterBeds !== "All") {
          if (filterBeds === "5plus" && property.beds < 5) return false;
          if (filterBeds !== "5plus" && property.beds !== parseInt(filterBeds))
            return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === "priceAsc") return a.price - b.price;
        if (sortBy === "priceDesc") return b.price - a.price;
        if (sortBy === "sqftDesc") return b.sqft - a.sqft;
        return 0; // featured (default order)
      });
  }, [filterLocation, filterType, filterPrice, filterBeds, sortBy]);

  const handlePropertySelect = (property) => {
    setSelectedProperty(property);
    setCurrentPage("details");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleResetFilters = () => {
    setFilterLocation("");
    setFilterType("All");
    setFilterPrice("All");
    setFilterBeds("All");
    setSortBy("featured");
  };

  return (
    <div style={styles.container}>
      {/* Page Header */}
      <section style={styles.headerSection} className="animate-fade-in-up">
        <span style={styles.sectionBadge}>EXPLORE THE PORTFOLIO</span>
        <h1 style={styles.title}>Luxury Property Listings</h1>
        <p style={styles.subtitle}>
          Discover prime properties handpicked for the most discerning
          investors.
        </p>
      </section>

      {/* Main Console Content */}
      <div style={styles.layoutWrapper}>
        {/* Filters Sidebar (Glassmorphic) */}
        <aside style={styles.sidebar} className="glass-panel">
          <div style={styles.sidebarHeader}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <SlidersHorizontal size={18} color="var(--accent-gold)" />
              <h3 style={styles.sidebarTitle}>Refine Search</h3>
            </div>
            <button onClick={handleResetFilters} style={styles.resetBtn}>
              Reset
            </button>
          </div>

          <div style={styles.filterList}>
            {/* Search Location */}
            <div style={styles.filterGroup}>
              <label style={styles.filterLabel}>Location Search</label>
              <div style={styles.inputWrapper}>
                <MapPin size={16} color="var(--text-muted)" />
                <input
                  type="text"
                  placeholder="e.g. Bangalore, ECR"
                  value={filterLocation}
                  onChange={(e) => setFilterLocation(e.target.value)}
                  style={styles.textInput}
                />
              </div>
            </div>

            {/* Property Type */}
            <div style={styles.filterGroup}>
              <label style={styles.filterLabel}>Home Type</label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                style={styles.selectInput}
              >
                <option value="All">All Types</option>
                <option value="Penthouse">Penthouse</option>
                <option value="Villa">Villa</option>
                <option value="Mansion">Mansion</option>
                <option value="Apartment">Apartment</option>
              </select>
            </div>

            {/* Price Segment */}
            <div style={styles.filterGroup}>
              <label style={styles.filterLabel}>Budget Segment</label>
              <select
                value={filterPrice}
                onChange={(e) => setFilterPrice(e.target.value)}
                style={styles.selectInput}
              >
                <option value="All">All Prices</option>
                <option value="under2cr">Under ₹ 2.0 Cr</option>
                <option value="2to5cr">₹ 2.0 Cr - ₹ 5.0 Cr</option>
                <option value="over5cr">Above ₹ 5.0 Cr</option>
              </select>
            </div>

            {/* Bedrooms count */}
            <div style={styles.filterGroup}>
              <label style={styles.filterLabel}>Bedrooms</label>
              <select
                value={filterBeds}
                onChange={(e) => setFilterBeds(e.target.value)}
                style={styles.selectInput}
              >
                <option value="All">Any Count</option>
                <option value="2">2 Bedrooms</option>
                <option value="3">3 Bedrooms</option>
                <option value="4">4 Bedrooms</option>
                <option value="5plus">5+ Bedrooms</option>
              </select>
            </div>

            {/* Sort Options */}
            <div style={styles.filterGroup}>
              <label style={styles.filterLabel}>Sort Order</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={styles.selectInput}
              >
                <option value="featured">Featured Listings</option>
                <option value="priceAsc">Price: Low to High</option>
                <option value="priceDesc">Price: High to Low</option>
                <option value="sqftDesc">Size: Large to Small</option>
              </select>
            </div>
          </div>
        </aside>

        {/* Listings Display Grid */}
        <main style={styles.mainContent}>
          <div style={styles.resultsInfoBar}>
            <span style={styles.resultsCount}>
              Found{" "}
              <strong style={{ color: "var(--accent-gold)" }}>
                {filteredProperties.length}
              </strong>{" "}
              matching premium residencies
            </span>
          </div>

          {filteredProperties.length > 0 ? (
            <div style={styles.listingsGrid}>
              {filteredProperties.map((property) => (
                <div key={property.id} style={styles.cardWrapper}>
                  <PropertyCard
                    property={property}
                    onSelect={handlePropertySelect}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div style={styles.emptyState} className="glass-panel">
              <Star
                size={36}
                color="var(--accent-gold)"
                style={{ marginBottom: "16px" }}
              />
              <h3>No Listings Found</h3>
              <p style={{ color: "var(--text-secondary)", marginTop: "8px" }}>
                We couldn't find any properties matching your current criteria.
                Try loosening your filters or resetting refinement
                configurations.
              </p>
              <button
                onClick={handleResetFilters}
                className="btn-gold"
                style={{ marginTop: "24px" }}
              >
                Reset Search
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "40px 24px",
  },
  headerSection: {
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
  },
  layoutWrapper: {
    display: "grid",
    gridTemplateColumns: "1fr",
    "@media (min-width: 900px)": {
      gridTemplateColumns: "280px 1fr",
    },
    gap: "30px",
  },
  sidebar: {
    padding: "24px",
    height: "fit-content",
    border: "1px solid rgba(255, 255, 255, 0.08)",
  },
  sidebarHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: "16px",
    borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
    marginBottom: "20px",
  },
  sidebarTitle: {
    fontSize: "1.05rem",
    fontWeight: "700",
    color: "#FFF",
    fontFamily: "var(--font-heading)",
  },
  resetBtn: {
    background: "none",
    border: "none",
    color: "var(--accent-gold)",
    fontSize: "0.8rem",
    cursor: "pointer",
    fontFamily: "var(--font-heading)",
    fontWeight: "600",
  },
  filterList: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  filterGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  filterLabel: {
    fontSize: "0.75rem",
    fontWeight: "600",
    color: "var(--text-muted)",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  },
  inputWrapper: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    background: "rgba(255, 255, 255, 0.02)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    borderRadius: "8px",
    padding: "10px 12px",
  },
  textInput: {
    background: "none",
    border: "none",
    outline: "none",
    color: "#FFF",
    fontSize: "0.85rem",
    width: "100%",
  },
  selectInput: {
    background: "rgba(255, 255, 255, 0.02)",
    border: "1px solid rgba(255, 255, 255, 0.08)",
    borderRadius: "8px",
    padding: "10px 12px",
    color: "#FFF",
    fontSize: "0.85rem",
    outline: "none",
    cursor: "pointer",
    width: "100%",
    fontFamily: "var(--font-body)",
  },
  mainContent: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  resultsInfoBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: "12px",
    borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
  },
  resultsCount: {
    fontSize: "0.9rem",
    color: "var(--text-secondary)",
  },
  listingsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
    gap: "24px",
    width: "100%",
  },
  cardWrapper: {
    height: "430px",
  },
  emptyState: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: "60px 40px",
    borderRadius: "16px",
    border: "1px dashed rgba(212,175,55,0.3)",
  },
};
