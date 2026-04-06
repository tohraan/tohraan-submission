import { useState } from "react";
import { useEffect } from "react";

const Stage3 = ({ onNext }: { onNext: () => void }) => {
  useEffect(() => {
    document.title = "The Pencil (DO NOT STEAL)";
  }, []);

  const [showRightClick] = useState(true);

  const pencilAngles = [
    { label: "very sharp", rot: 0 },
    { label: "yellow part", rot: 5 },
    { label: "the end (mysterious)", rot: -3 },
    { label: "graphite core", rot: 2 },
    { label: "still sharp", rot: -5 },
    { label: "perfect", rot: 4 },
  ];

  return (
    <div
      className="stage-3-scrollbar"
      style={{
        background: "#000000",
        minHeight: "100vh",
        fontFamily: "Verdana, sans-serif",
        fontSize: "13px",
        color: "#FF69B4",
        position: "relative",
        overflow: "auto",
      }}
    >
      {/* DO NOT STEAL watermark */}
      <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: "none",
        zIndex: 1,
        overflow: "hidden",
      }}>
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} style={{
            position: "absolute",
            top: `${(i * 120) - 200}px`,
            left: "-100px",
            width: "2000px",
            fontFamily: "Comic Sans MS, cursive",
            fontSize: "10px",
            color: "rgba(255,0,255,0.06)",
            transform: "rotate(-45deg)",
            whiteSpace: "nowrap",
          }}>
            © MY PENCIL SITE 2003 DO NOT STEAL &nbsp;&nbsp;&nbsp;&nbsp; © MY PENCIL SITE 2003 DO NOT STEAL &nbsp;&nbsp;&nbsp;&nbsp; © MY PENCIL SITE 2003 DO NOT STEAL &nbsp;&nbsp;&nbsp;&nbsp; © MY PENCIL SITE 2003 DO NOT STEAL
          </div>
        ))}
      </div>

      {/* Sparkles */}
      {[{ top: 20, left: 20 }, { top: 20, right: 20 }, { bottom: 20, left: 20 }, { bottom: 20, right: 20 }].map((pos, i) => (
        <div key={i} style={{
          position: "fixed",
          ...pos,
          fontSize: "24px",
          animation: `sparkle 2s ${i * 0.5}s infinite`,
          zIndex: 10,
        }}>
          ✨
        </div>
      ))}

      <div style={{ position: "relative", zIndex: 2, padding: "40px" }}>
        {/* Title */}
        <h1 style={{
          fontFamily: "Impact, sans-serif",
          fontSize: "48px",
          textTransform: "uppercase",
          color: "#FF00FF",
          textAlign: "center",
          animation: "glow-pulse 3s infinite",
          margin: "0 0 20px",
        }}>
          ✧ THE PENCIL ✧
        </h1>
        <h2 style={{
          fontFamily: "Impact, sans-serif",
          fontSize: "24px",
          color: "#FF69B4",
          textAlign: "center",
          textTransform: "uppercase",
          marginBottom: "40px",
        }}>
          A Complete History & Specification Guide
        </h2>

        {/* UNDER CONSTRUCTION banner */}
        <div style={{
          background: "repeating-linear-gradient(45deg, #FF8C00, #FF8C00 10px, #000000 10px, #000000 20px)",
          padding: "12px",
          textAlign: "center",
          margin: "20px 0",
          animation: "construction-stripes 1s linear infinite",
          backgroundSize: "40px 40px",
        }}>
          <span style={{ background: "#000", padding: "4px 16px", fontFamily: "Impact, sans-serif", color: "#FF8C00", fontSize: "20px" }}>
            🚧 UNDER CONSTRUCTION 🚧
          </span>
        </div>

        {/* Backstory */}
        <div style={{ maxWidth: "800px", margin: "30px auto" }}>
          <h3 style={{ fontFamily: "Impact, sans-serif", color: "#FF00FF", animation: "glow-pulse 3s infinite", fontSize: "22px" }}>
            Origin Story
          </h3>
          <p style={{ lineHeight: 1.8 }}>
            Born in 2003, in a small factory in Ohio. It was a Tuesday. The factory workers said there was a strange light in the sky that day. The pencil emerged from the production line different. Better. It was never used. It was never sharpened. It waited.
          </p>
          <p style={{ lineHeight: 1.8, marginTop: "12px" }}>
            For twenty-three years, it sat in a drawer. Then the world ran out of pencils. And suddenly, this pencil was the last one.
          </p>
        </div>

        {/* Photo gallery */}
        <h3 style={{ fontFamily: "Impact, sans-serif", color: "#FF00FF", animation: "glow-pulse 3s infinite", fontSize: "22px", textAlign: "center", margin: "40px 0 20px" }}>
          Photo Gallery
        </h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px", maxWidth: "800px", margin: "0 auto" }}>
          {pencilAngles.map((angle, i) => (
            <div key={i} style={{
              background: "#1a1a1a",
              border: "2px solid #FF69B4",
              padding: "8px",
              transform: `rotate(${angle.rot}deg)`,
              position: "relative",
            }}>
              {/* Pencil drawing */}
              <div style={{
                width: "100%",
                height: "80px",
                background: "linear-gradient(to right, #DEB887 0%, #DEB887 15%, #FFD700 15%, #FFD700 85%, #FFCCCC 85%, #FFCCCC 92%, #333 92%)",
                borderRadius: "0 3px 3px 0",
              }} />
              {/* Red arrow */}
              <div style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                color: "#FF0000",
                fontFamily: "Comic Sans MS, cursive",
                fontSize: "11px",
                fontWeight: "bold",
              }}>
                ← {angle.label}
              </div>
              {i === 2 && showRightClick && (
                <div style={{
                  position: "absolute",
                  bottom: 5,
                  right: 5,
                  background: "#F0F0F0",
                  border: "1px solid #999",
                  padding: "4px 0",
                  fontSize: "10px",
                  fontFamily: "Tahoma, sans-serif",
                  color: "#000",
                  boxShadow: "2px 2px 4px rgba(0,0,0,0.3)",
                }}>
                  {["Save Image As...", "Copy Image", "Inspect Element"].map((item) => (
                    <div key={item} style={{ padding: "2px 16px", cursor: "default" }}>{item}</div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <h3 style={{ fontFamily: "Impact, sans-serif", color: "#FF00FF", animation: "glow-pulse 3s infinite", fontSize: "22px", textAlign: "center", margin: "40px 0 20px" }}>
          Testimonials
        </h3>
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", justifyContent: "center", maxWidth: "800px", margin: "0 auto" }}>
          <div style={{
            background: "#111",
            borderLeft: "4px solid #FF69B4",
            padding: "16px",
            width: "350px",
            transform: "rotate(-2deg)",
          }}>
            <p style={{ fontFamily: "Papyrus, fantasy", fontSize: "14px", fontStyle: "italic", color: "#FFD700" }}>
              "I held the pencil once. For three seconds. Those were the best three seconds of my life. I think about it every day."
            </p>
            <p style={{ fontFamily: "Papyrus, fantasy", color: "#FFD700", textAlign: "right", marginTop: "8px" }}>— Gerald, 58, Ohio</p>
          </div>
          <div style={{
            background: "#111",
            borderLeft: "4px solid #00FFFF",
            padding: "16px",
            width: "350px",
            transform: "rotate(3deg)",
          }}>
            <p style={{ fontFamily: "fantasy", fontSize: "13px", color: "#00FFFF" }}>
              "I was there when the last mine collapsed. The ground shook. My coffee spilled. The pencil didn't even flinch."
            </p>
            <p style={{ fontFamily: "fantasy", color: "#00FFFF", textAlign: "right", marginTop: "8px" }}>— Anonymous</p>
          </div>
        </div>

        {/* Spec table */}
        <h3 style={{ fontFamily: "Impact, sans-serif", color: "#FF00FF", animation: "glow-pulse 3s infinite", fontSize: "22px", textAlign: "center", margin: "40px 0 20px" }}>
          Specifications
        </h3>
        <table style={{ width: "100%", maxWidth: "600px", margin: "0 auto", borderCollapse: "collapse", border: "2px solid #FF69B4" }}>
          <tbody>
            {[
              ["Grade", "HB"],
              ["Length", "19cm"],
              ["Color", "Yellow (obviously)"],
              ["Sharpened", "No (pristine)"],
              ["Vibes", "Immaculate"],
              ["Aura", "Strong"],
              ["Previous Owners", "0 (virgin pencil)"],
              ["Serial Number", "LAST-001"],
            ].map(([k, v], i) => (
              <tr key={k} style={{ background: i % 2 === 0 ? "#1a001a" : "#330033" }}>
                <td style={{ padding: "8px 16px", fontFamily: "Arial Black, sans-serif", fontSize: "12px", borderBottom: "1px solid #FF69B4" }}>{k}</td>
                <td style={{ padding: "8px 16px", borderBottom: "1px solid #FF69B4" }}>{v}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Timeline */}
        <h3 style={{ fontFamily: "Impact, sans-serif", color: "#FF00FF", animation: "glow-pulse 3s infinite", fontSize: "22px", textAlign: "center", margin: "40px 0 20px" }}>
          Timeline
        </h3>
        <div style={{ display: "flex", justifyContent: "center", gap: "40px", flexWrap: "wrap", margin: "0 auto 40px" }}>
          {[
            { year: "2003", event: "Born" },
            { year: "2024", event: "Last One" },
            { year: "NOW", event: "Yours" },
          ].map((t) => (
            <div key={t.year} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "Impact, sans-serif", fontSize: "32px", color: "#FF00FF", animation: "glow-pulse 3s infinite" }}>{t.year}</div>
              <div style={{ color: "#FF69B4", marginTop: "4px" }}>{t.event}</div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign: "center", margin: "40px 0" }}>
          <button
            onClick={onNext}
            style={{
              fontFamily: "Impact, sans-serif",
              fontSize: "24px",
              padding: "16px 40px",
              background: "linear-gradient(to bottom, #FF00FF, #FF69B4)",
              color: "#000",
              border: "3px solid #00FFFF",
              cursor: "pointer",
              textTransform: "uppercase",
              textShadow: "0 0 10px #FF00FF",
              boxShadow: "0 0 20px #FF00FF",
            }}
          >
            I MUST HAVE THIS PENCIL →
          </button>
        </div>

        {/* Web ring */}
        <div style={{ borderTop: "2px solid #FF69B4", paddingTop: "20px", textAlign: "center", marginTop: "40px" }}>
          <div style={{ border: "1px solid #FF69B4", display: "inline-block", padding: "8px 24px", background: "#111" }}>
            <span style={{ color: "#00FFFF", cursor: "pointer" }}>← Previous Site</span>
            <span style={{ color: "#FF69B4", margin: "0 16px" }}>|</span>
            <span style={{ fontFamily: "Impact, sans-serif", color: "#FF00FF" }}>PENCIL WEB RING</span>
            <span style={{ color: "#FF69B4", margin: "0 16px" }}>|</span>
            <span style={{ color: "#00FFFF", cursor: "pointer" }}>Next Site →</span>
          </div>
          <div style={{ marginTop: "12px", fontFamily: "Courier New, monospace", fontSize: "14px", color: "#00FF00" }}>
            YOU ARE VISITOR 000,001,337
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stage3;
