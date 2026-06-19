import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Properties from "./pages/Properties";
import PropertyDetails from "./pages/PropertyDetails";
import VirtualTourPage from "./pages/VirtualTourPage";
import About from "./pages/About";
import Contact from "./pages/Contact";

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    if (theme === "light") {
      document.body.classList.add("light-theme");
    } else {
      document.body.classList.remove("light-theme");
    }
  }, [theme]);

  // Render current page based on state router
  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return (
          <Home
            setCurrentPage={setCurrentPage}
            setSelectedProperty={setSelectedProperty}
          />
        );
      case "properties":
        return (
          <Properties
            setCurrentPage={setCurrentPage}
            setSelectedProperty={setSelectedProperty}
          />
        );
      case "details":
        return (
          <PropertyDetails
            property={selectedProperty}
            setCurrentPage={setCurrentPage}
          />
        );
      case "tour":
        return <VirtualTourPage setCurrentPage={setCurrentPage} />;
      case "about":
        return <About setCurrentPage={setCurrentPage} />;
      case "contact":
        return <Contact />;
      default:
        return (
          <Home
            setCurrentPage={setCurrentPage}
            setSelectedProperty={setSelectedProperty}
          />
        );
    }
  };

  return (
    <div style={styles.appContainer}>
      {/* Background glow animations */}
      <div className="glow-blob blob-gold"></div>
      <div className="glow-blob blob-red"></div>
      <div className="glow-blob blob-blue"></div>

      {/* Navigation Header */}
      <Navbar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {/* Main Page Area */}
      <main style={styles.mainContent}>{renderPage()}</main>

      {/* Footer Details */}
      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}

const styles = {
  appContainer: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    background: "var(--bg-primary)",
    color: "var(--text-primary)",
    transition: "var(--transition-smooth)",
  },
  mainContent: {
    flex: 1,
    width: "100%",
  },
};

export default App;
