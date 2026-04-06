import { useState, useEffect, useCallback } from "react";

interface Star {
  id: number;
  x: number;
  y: number;
  created: number;
}

const Stage0 = ({ onNext }: { onNext: () => void }) => {
  const [phase, setPhase] = useState(0); // 0=black, 1=text reveal, 2=full page
  const [wordIndex, setWordIndex] = useState(0);
  const [counter, setCounter] = useState(7_832_491);
  const [stars, setStars] = useState<Star[]>([]);
  const words = ["It", "has", "begun."];

  useEffect(() => {
    document.title = "THE LAST PENCIL";
    const t1 = setTimeout(() => setPhase(1), 2000);
    return () => clearTimeout(t1);
  }, []);

  useEffect(() => {
    if (phase === 1 && wordIndex < words.length) {
      const t = setTimeout(() => setWordIndex((i) => i + 1), 800);
      return () => clearTimeout(t);
    }
    if (phase === 1 && wordIndex >= words.length) {
      const t = setTimeout(() => setPhase(2), 1500);
      return () => clearTimeout(t);
    }
  }, [phase, wordIndex]);

  useEffect(() => {
    if (phase < 2) return;
    const interval = setInterval(() => {
      setCounter((c) => Math.max(0, c - Math.floor(Math.random() * 47 + 1)));
    }, 200);
    return () => clearInterval(interval);
  }, [phase]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const now = Date.now();
    setStars((prev) => [
      ...prev.filter((s) => now - s.created < 600),
      { id: now, x: e.clientX, y: e.clientY, created: now },
    ]);
  }, []);

  // Phase 0: Black screen
  if (phase === 0) {
    return <div style={{ width: "100vw", height: "100vh", background: "#000" }} />;
  }

  // Phase 1: Text reveal
  if (phase === 1) {
    return (
      <div style={{ width: "100vw", height: "100vh", background: "#000", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ fontFamily: "Comic Sans MS, cursive", fontSize: "48px", color: "#FFFF00", textAlign: "center" }}>
          {words.slice(0, wordIndex).map((w, i) => (
            <span key={i} style={{ marginRight: "16px", opacity: 1 }}>{w}</span>
          ))}
        </div>
      </div>
    );
  }

  // Phase 2: Full Geocities page
  return (
    <div
      onMouseMove={handleMouseMove}
      style={{
        width: "100%",
        minHeight: "100vh",
        background: `url("data:image/svg+xml,${encodeURIComponent(
          `<svg xmlns='http://www.w3.org/2000/svg' width='60' height='60'><rect fill='%2300FF00' width='60' height='60'/><text x='10' y='35' font-size='24'>✏️</text></svg>`
        )}") repeat`,
        cursor: "none",
        fontFamily: "Comic Sans MS, cursive",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Star trail */}
      {stars.map((s) => (
        <div
          key={s.id}
          style={{
            position: "fixed",
            left: s.x - 10,
            top: s.y - 10,
            width: 20,
            height: 20,
            fontSize: "20px",
            pointerEvents: "none",
            zIndex: 9999,
            animation: "star-fade 0.6s forwards",
          }}
        >
          ⭐
        </div>
      ))}

      {/* Marquee */}
      <div style={{ background: "#000080", padding: "8px 0", overflow: "hidden", whiteSpace: "nowrap" }}>
        <div style={{ display: "inline-block", animation: "marquee 8s linear infinite" }}>
          <span style={{ fontSize: "20px", fontWeight: "bold" }}>
            <span style={{ color: "#FF0000" }}>🚨 </span>
            <span style={{ color: "#FF0000" }}>WELCOME </span>
            <span style={{ color: "#FF8800" }}>TO </span>
            <span style={{ color: "#FFFF00" }}>THE </span>
            <span style={{ color: "#00FF00" }}>MOST </span>
            <span style={{ color: "#0000FF" }}>IMPORTANT </span>
            <span style={{ color: "#FF00FF" }}>WEBSITE </span>
            <span style={{ color: "#FF0000" }}>ON </span>
            <span style={{ color: "#FFFF00" }}>THE </span>
            <span style={{ color: "#00FF00" }}>INTERNET </span>
            <span style={{ color: "#FF0000" }}>🚨</span>
          </span>
        </div>
      </div>

      {/* Spinning globe */}
      <div style={{ position: "absolute", top: 20, right: 20, width: 80, height: 80, fontSize: "60px", animation: "spin 3s linear infinite", zIndex: 10 }}>
        🌍
      </div>

      {/* Main content */}
      <div style={{ padding: "40px", textAlign: "center" }}>
        {/* WordArt Title */}
        <h1
          style={{
            fontFamily: "Comic Sans MS, cursive",
            fontSize: "72px",
            fontWeight: "bold",
            color: "#FFFFFF",
            WebkitTextStroke: "3px #000000",
            textShadow: "4px 4px #FF00FF, 0 0 20px #FFFF00",
            transform: "rotate(-3deg)",
            margin: "40px 0",
            animation: "rainbow-text 3s linear infinite",
          }}
        >
          THE LAST PENCIL ON EARTH
        </h1>

        {/* Navy section */}
        <div style={{ background: "#000080", border: "4px solid #FF00FF", padding: "30px", margin: "20px auto", maxWidth: "700px" }}>
          <p style={{ color: "#FFFF00", fontSize: "24px", lineHeight: 1.8 }}>
            The factories have fallen. The mines are empty. The graphite is gone.
          </p>
          <p style={{ color: "#FFFF00", fontSize: "20px", lineHeight: 1.8, marginTop: "16px" }}>
            One pencil remains. You have found it.
          </p>

          {/* Counter */}
          <div style={{ margin: "30px 0", padding: "20px", background: "#000", border: "2px solid #00FF00", display: "inline-block" }}>
            <div style={{ color: "#00FF00", fontFamily: "Courier New, monospace", fontSize: "14px", marginBottom: "8px", animation: "blink-text 1s infinite" }}>
              ⚠️ PEOPLE WHO STILL HAVE A PENCIL ⚠️
            </div>
            <div style={{ color: "#00FF00", fontFamily: "Courier New, monospace", fontSize: "48px", animation: "pencil-counter 0.5s infinite" }}>
              {counter.toLocaleString()}
            </div>
          </div>

          {/* CTA */}
          <div style={{ marginTop: "30px" }}>
            <button
              onClick={onNext}
              style={{
                fontFamily: "Comic Sans MS, cursive",
                fontSize: "24px",
                fontWeight: "bold",
                padding: "16px 32px",
                background: "linear-gradient(to bottom, #FF0000, #FF6600)",
                color: "#FFFFFF",
                border: "4px outset #FF00FF",
                cursor: "pointer",
                boxShadow: "8px 8px 0 #000000",
                textShadow: "2px 2px #000",
              }}
            >
              ✨ Are you ready to know the truth? ✨
            </button>
          </div>
        </div>

        {/* Horizontal rule */}
        <hr style={{ border: "none", height: "6px", background: "linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)", margin: "30px 0" }} />

        {/* Visitor counter */}
        <div style={{ background: "#000", border: "2px solid #FFFFFF", padding: "8px 16px", display: "inline-block", margin: "20px 0" }}>
          <span style={{ color: "#00FF00", fontFamily: "Courier New, monospace", fontSize: "14px" }}>
            You are visitor #<span style={{ animation: "blink-text 1s infinite", display: "inline-block" }}>000047</span>
          </span>
        </div>

        {/* IE Badge */}
        <div style={{ position: "fixed", bottom: 20, right: 20, background: "#000080", border: "2px outset #C0C0C0", padding: "4px 8px", zIndex: 100 }}>
          <span style={{ color: "#FFFFFF", fontFamily: "Arial, sans-serif", fontSize: "10px" }}>
            🌐 BEST VIEWED IN<br />INTERNET EXPLORER 6
          </span>
        </div>
      </div>
    </div>
  );
};

export default Stage0;
