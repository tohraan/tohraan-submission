import { useEffect, useState } from "react";

const SIDE_TEXTS = [
  "GRAPHITE IS ETERNAL",
  "PENCILS > PENS",
  "HB FOREVER",
  "WRITE YOUR DESTINY",
  "ERASE YOUR PAST",
  "THE CHOSEN ONE READS",
  "SCROLL DEEPER",
  "TRUTH AWAITS BELOW",
  "DO NOT QUESTION THE PENCIL",
  "LEAD IS LOVE",
  "SHARPEN YOUR MIND",
  "NO. 2 IS NO. 1",
  "GRAPHITE NEVER DIES",
  "INK IS A LIE",
];

const GRADIENT_COLORS = [
  "linear-gradient(180deg, #FF0000, #FF8800, #FFFF00)",
  "linear-gradient(180deg, #00FF00, #0088FF, #FF00FF)",
  "linear-gradient(180deg, #FFFF00, #FF0000, #8800FF)",
  "linear-gradient(180deg, #00FFFF, #FF00FF, #FFFF00)",
  "linear-gradient(180deg, #FF69B4, #FFD700, #00FF00)",
  "linear-gradient(180deg, #FF6347, #4682B4, #32CD32)",
];

const Stage1 = ({ onNext }: { onNext: () => void }) => {
  const [showSquiggles, setShowSquiggles] = useState(false);
  const [scrollNum, setScrollNum] = useState(1);

  useEffect(() => {
    document.title = "READ THIS CAREFULLY";
    const t = setTimeout(() => setShowSquiggles(true), 1500);
    return () => clearTimeout(t);
  }, []);

  const squiggly = (text: string) =>
    showSquiggles ? (
      <span style={{ borderBottom: "2px wavy red", paddingBottom: 1 }}>{text}</span>
    ) : (
      <span>{text}</span>
    );

  const pageStyle: React.CSSProperties = {
    fontFamily: "'Times New Roman', Times, serif",
    fontSize: "16px",
    lineHeight: 1.5,
    color: "#000000",
    background: "#FFFFFF",
    maxWidth: "816px",
    margin: "0 auto",
    padding: "96px 96px",
    minHeight: "100vh",
    position: "relative",
  };

  // Side gradient texts
  const leftTexts = SIDE_TEXTS.filter((_, i) => i % 2 === 0);
  const rightTexts = SIDE_TEXTS.filter((_, i) => i % 2 === 1);

  return (
    <div style={{ background: "#FFFFFF", minHeight: "100vh", position: "relative", overflow: "hidden" }}>
      {/* Left side gradient texts */}
      <div style={{ position: "fixed", left: 0, top: 0, bottom: 0, width: "90px", zIndex: 50, overflow: "hidden", pointerEvents: "none" }}>
        {leftTexts.map((text, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              top: `${i * 140 + 20}px`,
              left: "8px",
              fontFamily: "Comic Sans MS, cursive",
              fontSize: "11px",
              fontWeight: "bold",
              background: GRADIENT_COLORS[i % GRADIENT_COLORS.length],
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              writingMode: "vertical-rl",
              textOrientation: "mixed",
              transform: `rotate(${(i % 3 - 1) * 5}deg)`,
              opacity: 0.8,
              whiteSpace: "nowrap",
              letterSpacing: "2px",
              textShadow: "none",
            }}
          >
            {text}
          </div>
        ))}
      </div>

      {/* Right side gradient texts */}
      <div style={{ position: "fixed", right: 0, top: 0, bottom: 0, width: "90px", zIndex: 50, overflow: "hidden", pointerEvents: "none" }}>
        {rightTexts.map((text, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              top: `${i * 150 + 50}px`,
              right: "8px",
              fontFamily: i % 2 === 0 ? "Impact, sans-serif" : "Comic Sans MS, cursive",
              fontSize: i % 3 === 0 ? "13px" : "10px",
              fontWeight: "bold",
              background: GRADIENT_COLORS[(i + 3) % GRADIENT_COLORS.length],
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              writingMode: "vertical-rl",
              textOrientation: "mixed",
              transform: `rotate(${(i % 3 - 1) * -4}deg)`,
              opacity: 0.75,
              whiteSpace: "nowrap",
              letterSpacing: "3px",
            }}
          >
            {text}
          </div>
        ))}
      </div>

      {/* News ticker */}
      <div style={{ background: "#CC0000", padding: "6px 0", overflow: "hidden", whiteSpace: "nowrap", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ display: "inline-block", animation: "ticker-scroll 8s linear infinite", fontFamily: "Arial, sans-serif", color: "#FFFFFF", fontSize: "14px", fontWeight: "bold", marginLeft: "8px" }}>
          🔴 BREAKING: World pencil reserves hit zero — Global Pencil Authority declares LEVEL 5 emergency — 47 world leaders notified — Citizens urged not to panic
        </div>
      </div>

      <div style={pageStyle}>
        {/* Scroll 1: The Crisis */}
        {scrollNum >= 1 && (
          <div>
            <h2 style={{ fontFamily: "'Times New Roman', serif", fontSize: "21px", fontWeight: "bold", textDecoration: "underline", marginBottom: "12px" }}>
              Chapter I: The Crisis
            </h2>
            <p style={{ marginBottom: "12px" }}>
              On the morning of March 14th, 2026, the last {squiggly("graphite")} mine in the world collapsed. Not from an earthquake. Not from war. From {squiggly("exhaustion")}.
            </p>
            <p style={{ marginBottom: "12px" }}>
              The Dixon Ticonderoga factory in {squiggly("Versailles")}, Missouri, closed its doors at 4:47 PM. The foreman wept. The machines were silent. The pencils were gone.
            </p>

            {/* Clipart pencil */}
            <div style={{ float: "right", margin: "0 0 16px 20px", textAlign: "center" }}>
              <div style={{
                width: "200px",
                height: "60px",
                background: "linear-gradient(to right, #FFD700 0%, #FFD700 85%, #FFCCCC 85%, #FFCCCC 92%, #333 92%)",
                borderRadius: "0 2px 2px 0",
                border: "1px solid #999",
                position: "relative",
              }}>
                <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "30px", background: "#DEB887", borderRight: "2px solid #8B7355" }} />
              </div>
              <p style={{ fontFamily: "'Times New Roman', serif", fontSize: "13px", fontStyle: "italic", marginTop: "4px" }}>Figure 1: The Pencil</p>
            </div>

            <p style={{ marginBottom: "12px" }}>
              Every pencil on {squiggly("Earth")} has been used. Every stub discarded. Every mechanical pencil has {squiggly("jammed")} for the last time. 
            </p>

            {/* Rotated text box */}
            <div style={{
              border: "2px solid #000",
              padding: "16px",
              margin: "20px 40px",
              transform: "rotate(3deg)",
              background: "#FFFFFF",
              clear: "both",
            }}>
              <p style={{ fontFamily: "Courier New, monospace", fontSize: "14px", margin: 0 }}>
                ⚠ INTERNAL MEMO — GLOBAL PENCIL AUTHORITY<br />
                Classification: MAXIMUM GRAPHITE<br />
                Subject: Confirmation of Last Remaining Unit<br />
                Status: One (1) pencil confirmed. Location: THIS WEBSITE.
              </p>
            </div>

            <p style={{ textAlign: "center", marginTop: "20px", marginBottom: "8px" }}>
              <em style={{ fontSize: "13px", color: "#666" }}>— Page 1 of 11 —</em>
            </p>

            {scrollNum === 1 && (
              <p style={{ textAlign: "center", marginTop: "30px" }}>
                <a
                  href="#"
                  onClick={(e) => { e.preventDefault(); setScrollNum(2); }}
                  style={{ color: "#0000FF", textDecoration: "underline", fontFamily: "'Times New Roman', serif" }}
                >
                  Continue to next section →
                </a>
              </p>
            )}
          </div>
        )}

        {/* Scroll 2: The Weight */}
        {scrollNum >= 2 && (
          <div style={{ marginTop: "40px", borderTop: "1px solid #ccc", paddingTop: "30px" }}>
            <h2 style={{ fontFamily: "'Times New Roman', serif", fontSize: "21px", fontWeight: "bold", textDecoration: "underline", marginBottom: "12px" }}>
              Chapter II: The Weight
            </h2>
            <p style={{ marginBottom: "12px" }}>
              Governments have {squiggly("mobilized")}. The United Nations convened an emergency session. Forty-seven world leaders were notified by encrypted carrier pigeon.
            </p>
            <p style={{ marginBottom: "12px" }}>
              The pencil — HB grade, 19 centimeters, unsharpened — sits in a {squiggly("climate-controlled")} vault beneath this very website. Its value is incalculable. Its price is not.
            </p>
            <p style={{ marginBottom: "12px", fontWeight: "bold" }}>
              Its price is AED 0.50.
            </p>
            <p style={{ marginBottom: "12px" }}>
              This information was available to you from the {squiggly("beginning")}. You chose not to look.
            </p>

            <p style={{ textAlign: "center", marginTop: "20px", marginBottom: "8px" }}>
              <em style={{ fontSize: "13px", color: "#666" }}>— Page 2 of 11 —</em>
            </p>

            {scrollNum === 2 && (
              <p style={{ textAlign: "center", marginTop: "30px" }}>
                <a
                  href="#"
                  onClick={(e) => { e.preventDefault(); setScrollNum(3); }}
                  style={{ color: "#0000FF", textDecoration: "underline" }}
                >
                  Continue to next section →
                </a>
              </p>
            )}
          </div>
        )}

        {/* Scroll 3: The Call */}
        {scrollNum >= 3 && (
          <div style={{ marginTop: "40px", borderTop: "1px solid #ccc", paddingTop: "30px" }}>
            <h2 style={{ fontFamily: "'Times New Roman', serif", fontSize: "21px", fontWeight: "bold", textDecoration: "underline", marginBottom: "12px" }}>
              Chapter III: The Call
            </h2>
            <p style={{ marginBottom: "12px" }}>
              You were chosen. We don't know why.
            </p>
            <p style={{ marginBottom: "12px" }}>
              The Global Pencil Authority's {squiggly("algorithm")} scanned 8.1 billion humans and selected you. The criteria are classified. The decision is final.
            </p>
            <p style={{ marginBottom: "12px" }}>
              You are the buyer. The pencil is waiting. The world is watching.
            </p>
            <p style={{ fontSize: "11px", color: "#999", marginBottom: "20px" }}>
              Price: AED 0.50 (before applicable fees and mandatory Pencil Insurance)
            </p>

            <div style={{ textAlign: "center", margin: "30px 0" }}>
              <button
                onClick={onNext}
                style={{
                  fontFamily: "'Times New Roman', serif",
                  fontSize: "18px",
                  padding: "12px 40px",
                  background: "#FFFFFF",
                  border: "2px solid #0000FF",
                  color: "#0000FF",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
              >
                I accept this responsibility →
              </button>
            </div>

            <p style={{ textAlign: "center", marginTop: "20px" }}>
              <em style={{ fontSize: "13px", color: "#666" }}>— Page 3 of 11 —</em>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Stage1;
