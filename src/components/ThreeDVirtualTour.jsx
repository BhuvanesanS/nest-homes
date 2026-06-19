import React, { useState, useRef, useEffect } from "react";
import { RefreshCw, Move, Home, HelpCircle } from "lucide-react";

export default function ThreeDVirtualTour() {
  const [activeRoom, setActiveRoom] = useState("lounge");
  const [rotation, setRotation] = useState({ x: -5, y: 45 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const dragStartRotation = useRef({ x: 0, y: 0 });
  const containerRef = useRef(null);

  const rooms = {
    lounge: {
      name: "Penthouse Lounge",
      colorTheme: "linear-gradient(135deg, #0A1428 0%, #172554 100%)",
      wallColor: "rgba(30, 41, 59, 0.9)",
      floorColor: "#1e1b4b",
      accentColor: "var(--accent-gold)",
      desc: "Top-floor sky lounge featuring panoramic skyline vistas and gold-gilded trims.",
    },
    kitchen: {
      name: "Smart Concept Kitchen",
      colorTheme: "linear-gradient(135deg, #050C1A 0%, #1e1b4b 100%)",
      wallColor: "rgba(15, 23, 42, 0.95)",
      floorColor: "#111827",
      accentColor: "#3B82F6",
      desc: "Ultra-modern kitchen with integrated smart appliances and marble-textured panels.",
    },
    bedroom: {
      name: "Master Sanctuary Bedroom",
      colorTheme: "linear-gradient(135deg, #0A1428 0%, #311042 100%)",
      wallColor: "rgba(23, 15, 30, 0.92)",
      floorColor: "#180825",
      accentColor: "var(--accent-red)",
      desc: "Ambient back-lit suite optimized for peace, privacy, and architectural grandeur.",
    },
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY };
    dragStartRotation.current = { ...rotation };
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStart.current.x;
    const deltaY = e.clientY - dragStart.current.y;

    // Sensitivity scale factor
    const sensitivity = 0.25;

    // Calculate new rotation, limiting pitch (X axis) to prevent flipping upside down
    const nextX = Math.max(
      -45,
      Math.min(45, dragStartRotation.current.x - deltaY * sensitivity),
    );
    const nextY = dragStartRotation.current.y + deltaX * sensitivity;

    setRotation({ x: nextX, y: nextY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Add touch support for mobile screens
  const handleTouchStart = (e) => {
    if (e.touches.length !== 1) return;
    setIsDragging(true);
    dragStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    dragStartRotation.current = { ...rotation };
  };

  const handleTouchMove = (e) => {
    if (!isDragging || e.touches.length !== 1) return;
    const deltaX = e.touches[0].clientX - dragStart.current.x;
    const deltaY = e.touches[0].clientY - dragStart.current.y;
    const sensitivity = 0.35;
    const nextX = Math.max(
      -45,
      Math.min(45, dragStartRotation.current.x - deltaY * sensitivity),
    );
    const nextY = dragStartRotation.current.y + deltaX * sensitivity;
    setRotation({ x: nextX, y: nextY });
  };

  // Auto rotate when idle
  useEffect(() => {
    if (isDragging) return;
    const interval = setInterval(() => {
      setRotation((prev) => ({
        ...prev,
        y: prev.y + 0.05,
      }));
    }, 16);
    return () => clearInterval(interval);
  }, [isDragging]);

  const currentRoom = rooms[activeRoom];

  // Cube style rotation helper
  const cubeStyle = {
    transform: `translateZ(-250px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
    transformStyle: "preserve-3d",
    width: "100%",
    height: "100%",
    position: "absolute",
    transition: isDragging ? "none" : "transform 0.1s ease-out",
  };

  return (
    <div style={styles.container} className="glass-panel-gold">
      {/* Header bar */}
      <div style={styles.header}>
        <div>
          <h3 style={styles.roomName}>{currentRoom.name}</h3>
          <p style={styles.roomDesc}>{currentRoom.desc}</p>
        </div>
        <div style={styles.controls}>
          <div style={styles.dragHelp}>
            <Move size={14} color="var(--accent-gold)" />
            <span>Drag inside to look around</span>
          </div>
          <button
            style={styles.resetBtn}
            onClick={() => setRotation({ x: -5, y: 45 })}
            title="Reset Camera"
          >
            <RefreshCw size={14} />
          </button>
        </div>
      </div>

      {/* 3D Viewport */}
      <div
        ref={containerRef}
        style={{
          ...styles.viewport,
          background: currentRoom.colorTheme,
          cursor: isDragging ? "grabbing" : "grab",
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseUp}
      >
        {/* Render 3D Cube */}
        <div style={cubeStyle}>
          {/* FRONT WALL */}
          <div
            style={{
              ...styles.cubeFace,
              transform: "rotateY(0deg) translateZ(300px)",
              backgroundColor: currentRoom.wallColor,
              border: `2px solid ${currentRoom.accentColor}33`,
            }}
          >
            <div style={styles.wallDetails}>
              <div
                style={{
                  ...styles.window,
                  borderColor: currentRoom.accentColor,
                }}
              >
                <div style={styles.cityscape}></div>
              </div>
              <div style={styles.pictureFrame}>
                <span
                  style={{
                    fontSize: "0.8rem",
                    color: currentRoom.accentColor,
                    opacity: 0.6,
                  }}
                >
                  Nest to Homes Art Gallery
                </span>
              </div>
            </div>
          </div>

          {/* BACK WALL */}
          <div
            style={{
              ...styles.cubeFace,
              transform: "rotateY(180deg) translateZ(300px)",
              backgroundColor: currentRoom.wallColor,
              border: `2px solid ${currentRoom.accentColor}33`,
            }}
          >
            <div style={styles.wallDetails}>
              <div
                style={{
                  ...styles.doorFrame,
                  borderColor: currentRoom.accentColor,
                }}
              >
                <div style={styles.doorHandle}></div>
              </div>
              <div style={styles.bookshelf}>
                <div style={styles.bookshelfRow}></div>
                <div style={styles.bookshelfRow}></div>
              </div>
            </div>
          </div>

          {/* LEFT WALL */}
          <div
            style={{
              ...styles.cubeFace,
              transform: "rotateY(-90deg) translateZ(300px)",
              backgroundColor: currentRoom.wallColor,
              border: `2px solid ${currentRoom.accentColor}33`,
            }}
          >
            <div style={styles.wallDetails}>
              <div style={styles.fireplace}>
                <div
                  style={{
                    ...styles.fireplaceFire,
                    background:
                      activeRoom === "bedroom"
                        ? "var(--accent-red)"
                        : "var(--accent-gold)",
                  }}
                ></div>
              </div>
              <div style={styles.accentLightStrip}></div>
            </div>
          </div>

          {/* RIGHT WALL */}
          <div
            style={{
              ...styles.cubeFace,
              transform: "rotateY(90deg) translateZ(300px)",
              backgroundColor: currentRoom.wallColor,
              border: `2px solid ${currentRoom.accentColor}33`,
            }}
          >
            <div style={styles.wallDetails}>
              <div style={{ ...styles.tvScreen, border: "4px solid #111" }}>
                <div style={styles.tvContent}>
                  <h4 style={{ color: currentRoom.accentColor }}>
                    Nest to Homes TV
                  </h4>
                  <p style={{ fontSize: "0.5rem" }}>
                    Virtual walkthrough mode active
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CEILING */}
          <div
            style={{
              ...styles.cubeFace,
              transform: "rotateX(90deg) translateZ(300px)",
              backgroundColor: "#0a0a14",
              border: `2px solid ${currentRoom.accentColor}22`,
            }}
          >
            <div style={styles.ceilingCenter}>
              <div
                style={{
                  ...styles.chandelier,
                  boxShadow: `0 0 30px ${currentRoom.accentColor}`,
                }}
              ></div>
            </div>
          </div>

          {/* FLOOR */}
          <div
            style={{
              ...styles.cubeFace,
              transform: "rotateX(-90deg) translateZ(300px)",
              backgroundColor: currentRoom.floorColor,
              border: `2px solid ${currentRoom.accentColor}22`,
            }}
          >
            <div style={styles.floorPattern}>
              <div
                style={{
                  ...styles.carpet,
                  borderColor: currentRoom.accentColor,
                }}
              >
                <span
                  style={{ color: currentRoom.accentColor, fontSize: "0.8rem" }}
                >
                  NEST TO HOMES
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Ambient Overlay to feel more real */}
        <div style={styles.ambientLighting}></div>

        {/* Navigation Hotspots inside the viewport */}
        <div style={{ ...styles.hotspot, bottom: "20%", left: "50%" }}>
          <div
            style={{
              ...styles.hotspotPulse,
              background: currentRoom.accentColor,
            }}
          ></div>
          <div style={styles.hotspotLabel}>Walkway to Terrace</div>
        </div>
      </div>

      {/* Room selectors */}
      <div style={styles.roomSelectorContainer}>
        {Object.entries(rooms).map(([key, room]) => {
          const isActive = activeRoom === key;
          return (
            <button
              key={key}
              onClick={() => {
                setActiveRoom(key);
                setRotation({ x: -5, y: 45 });
              }}
              style={{
                ...styles.roomBtn,
                backgroundColor: isActive
                  ? room.accentColor
                  : "rgba(255,255,255,0.03)",
                borderColor: isActive
                  ? room.accentColor
                  : "rgba(255,255,255,0.1)",
                color: isActive ? "#050C1A" : "var(--text-primary)",
              }}
            >
              <Home size={14} style={{ marginRight: "6px" }} />
              {room.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    width: "100%",
    height: "500px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 20px",
    borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
  },
  roomName: {
    fontSize: "1.1rem",
    fontWeight: "700",
    fontFamily: "var(--font-heading)",
    color: "#FFFFFF",
  },
  roomDesc: {
    fontSize: "0.8rem",
    color: "var(--text-secondary)",
    marginTop: "2px",
  },
  controls: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  dragHelp: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "0.75rem",
    color: "var(--text-muted)",
    background: "rgba(255, 255, 255, 0.02)",
    padding: "6px 12px",
    borderRadius: "20px",
    border: "1px solid rgba(255, 255, 255, 0.05)",
  },
  resetBtn: {
    background: "rgba(255, 255, 255, 0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "8px",
    width: "32px",
    height: "32px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "var(--text-primary)",
    cursor: "pointer",
    transition: "var(--transition-fast)",
  },
  viewport: {
    flex: 1,
    position: "relative",
    overflow: "hidden",
    perspective: "600px", // Creates standard 3D depth of field
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  cubeFace: {
    position: "absolute",
    width: "600px",
    height: "600px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxSizing: "border-box",
    backfaceVisibility: "hidden", // Crucial for 3D boxes
  },
  wallDetails: {
    position: "relative",
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  window: {
    width: "280px",
    height: "200px",
    border: "8px solid",
    borderRadius: "4px",
    position: "absolute",
    top: "120px",
    background: "rgba(0, 0, 0, 0.4)",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  cityscape: {
    width: "100%",
    height: "100%",
    background: "linear-gradient(to bottom, #1e1b4b, #3b0764, #9d174d)",
    opacity: 0.8,
    position: "relative",
    // Mock buildings
    backgroundImage: `repeating-linear-gradient(90deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 10px, transparent 10px, transparent 20px)`,
  },
  pictureFrame: {
    width: "120px",
    height: "160px",
    border: "4px solid #D4AF37",
    background: "#111",
    position: "absolute",
    left: "60px",
    top: "140px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: "10px",
  },
  doorFrame: {
    width: "140px",
    height: "320px",
    border: "6px solid",
    borderBottom: "none",
    position: "absolute",
    bottom: 0,
    background: "rgba(0, 0, 0, 0.5)",
  },
  doorHandle: {
    width: "10px",
    height: "24px",
    background: "var(--accent-gold)",
    borderRadius: "4px",
    position: "absolute",
    right: "12px",
    top: "50%",
  },
  bookshelf: {
    position: "absolute",
    left: "50px",
    bottom: "40px",
    width: "160px",
    height: "260px",
    border: "4px solid #8B4513",
    background: "rgba(139, 69, 19, 0.1)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
  },
  bookshelfRow: {
    height: "4px",
    background: "#8B4513",
    position: "relative",
  },
  fireplace: {
    width: "200px",
    height: "160px",
    border: "8px solid #555",
    background: "#111",
    position: "absolute",
    bottom: 0,
    borderBottom: "none",
  },
  fireplaceFire: {
    width: "60px",
    height: "60px",
    borderRadius: "50% 50% 0 0",
    position: "absolute",
    bottom: 0,
    left: "50%",
    transform: "translateX(-50%)",
    filter: "blur(8px)",
  },
  accentLightStrip: {
    width: "10px",
    height: "100%",
    background:
      "linear-gradient(to bottom, transparent, var(--accent-gold), transparent)",
    position: "absolute",
    right: "80px",
    opacity: 0.3,
  },
  tvScreen: {
    width: "320px",
    height: "180px",
    background: "#020202",
    boxShadow: "0 0 20px rgba(0,0,0,0.8)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "4px",
  },
  tvContent: {
    textAlign: "center",
    color: "#fff",
  },
  ceilingCenter: {
    width: "100%",
    height: "100%",
    position: "relative",
  },
  chandelier: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    background: "#fff",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  floorPattern: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundImage:
      "radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)",
    backgroundSize: "30px 30px",
  },
  carpet: {
    width: "300px",
    height: "300px",
    border: "2px dashed",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transform: "rotate(45deg)",
  },
  ambientLighting: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    pointerEvents: "none", // Allow clicking/dragging through
    background:
      "radial-gradient(circle, transparent 40%, rgba(5, 12, 26, 0.4) 100%)",
  },
  hotspot: {
    position: "absolute",
    transform: "translate(-50%, -50%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
    zIndex: 10,
  },
  hotspotPulse: {
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    boxShadow: "0 0 10px rgba(255,255,255,0.8)",
    animation: "pulse-gold 1.5s infinite",
  },
  hotspotLabel: {
    marginTop: "6px",
    background: "rgba(5, 12, 26, 0.85)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "4px",
    padding: "4px 8px",
    color: "#fff",
    fontSize: "0.7rem",
    whiteSpace: "nowrap",
  },
  roomSelectorContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "12px",
    padding: "16px",
    background: "rgba(5, 12, 26, 0.5)",
    borderTop: "1px solid rgba(255, 255, 255, 0.05)",
    flexWrap: "wrap",
  },
  roomBtn: {
    border: "1px solid",
    borderRadius: "8px",
    padding: "8px 16px",
    fontSize: "0.85rem",
    fontWeight: "600",
    fontFamily: "var(--font-heading)",
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    transition: "var(--transition-fast)",
  },
};
