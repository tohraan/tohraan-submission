import { useState, useEffect, useRef } from "react";
import meme1 from "@/assets/meme1.jpg";
import meme2 from "@/assets/meme2.jpg";
import meme3 from "@/assets/meme3.jpg";
import meme4 from "@/assets/meme4.jpg";
import meme5 from "@/assets/meme5.jpg";
import meme6 from "@/assets/meme6.jpg";
import meme7 from "@/assets/meme7.jpg";
import meme8 from "@/assets/meme8.jpg";
import meme9 from "@/assets/meme9.jpg";
import meme10 from "@/assets/meme10.jpg";

const MEMES = [meme1, meme2, meme3, meme4, meme5, meme6, meme7, meme8, meme9, meme10];

const LINES = [
  { text: "You did it.", delay: 0, duration: 2000 },
  { text: "The pencil is yours.", delay: 3000, duration: 2500 },
  { text: "It will be wrapped in silk.", delay: 6500, duration: 2500 },
  { text: "The box will be too large.", delay: 10000, duration: 2500 },
  { text: "You will receive it in 3 to 5 business decades.", delay: 13500, duration: 3500 },
  { text: "We are proud of you.", delay: 18000, duration: 3000 },
  { text: "", delay: 22000, duration: 3000 },
  { text: "Also your card was not charged.", delay: 26000, duration: 3000 },
  { text: "We don't have your card details.", delay: 30000, duration: 3000 },
  { text: "Or a pencil.", delay: 34000, duration: 2000 },
  { text: "__STOCK_PHOTO__", delay: 37000, duration: 4000 },
  { text: "This is what you would have received.", delay: 42000, duration: 3000 },
  { text: "__SILENCE__", delay: 46000, duration: 2000 },
  { text: "__FINAL__", delay: 49000, duration: 5000 },
];

const CONFETTI_COLORS = ["#FF0000", "#FFFF00", "#00FF00", "#FF00FF", "#00FFFF", "#FF8800", "#8800FF", "#FFD700"];
const RETRO_SYMBOLS = ["✦", "★", "✿", "❖", "◆", "▲", "●", "♦", "✸", "⚡", "☆", "♠", "♣", "♥"];

interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  color: string;
  symbol: string;
  rotation: number;
  size: number;
  duration: number;
}

const Stage6 = () => {
  const [currentLine, setCurrentLine] = useState(-1);
  const [typedText, setTypedText] = useState("");
  const [showFinal, setShowFinal] = useState(false);
  const [showPhoto, setShowPhoto] = useState(false);
  const [currentMeme, setCurrentMeme] = useState(0);
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);
  const intervalRef = useRef<number | null>(null);
  const confettiIdRef = useRef(0);

  useEffect(() => {
    document.title = "Thank You. We Are Proud.";

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "Are you sure you want to leave? The pencil will know.";
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    const handleKeydown = (e: KeyboardEvent) => {
      if ([" ", "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key)) {
        e.preventDefault();
      }
    };
    window.addEventListener("keydown", handleKeydown);

    LINES.forEach((line, i) => {
      setTimeout(() => setCurrentLine(i), line.delay);
    });

    // Meme rotation
    const memeInterval = setInterval(() => {
      setCurrentMeme((m) => (m + 1) % MEMES.length);
    }, 2000);

    // Confetti bursts
    const confettiInterval = setInterval(() => {
      const burst: ConfettiPiece[] = [];
      const count = Math.floor(Math.random() * 8) + 5;
      for (let i = 0; i < count; i++) {
        confettiIdRef.current++;
        burst.push({
          id: confettiIdRef.current,
          x: Math.random() * 100,
          y: Math.random() * 100,
          color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
          symbol: RETRO_SYMBOLS[Math.floor(Math.random() * RETRO_SYMBOLS.length)],
          rotation: Math.random() * 360,
          size: Math.random() * 30 + 14,
          duration: Math.random() * 1.5 + 0.8,
        });
      }
      setConfetti((prev) => [...prev.slice(-40), ...burst]);
    }, 800);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("keydown", handleKeydown);
      if (intervalRef.current) clearInterval(intervalRef.current);
      clearInterval(memeInterval);
      clearInterval(confettiInterval);
    };
  }, []);

  // Typewriter effect
  useEffect(() => {
    if (currentLine < 0) return;
    const line = LINES[currentLine];

    if (line.text === "__STOCK_PHOTO__") {
      setTypedText("");
      setShowPhoto(true);
      return;
    }
    if (line.text === "__SILENCE__") {
      setTypedText("");
      setShowPhoto(false);
      return;
    }
    if (line.text === "__FINAL__") {
      setTypedText("");
      setShowFinal(true);
      return;
    }
    if (line.text === "") {
      setTypedText("");
      setShowPhoto(false);
      return;
    }

    setShowPhoto(false);
    setShowFinal(false);
    setTypedText("");

    let charIndex = 0;
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = window.setInterval(() => {
      charIndex++;
      if (charIndex <= line.text.length) {
        setTypedText(line.text.slice(0, charIndex));
      } else {
        if (intervalRef.current) clearInterval(intervalRef.current);
      }
    }, 70);
  }, [currentLine]);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "#000",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
      onContextMenu={(e) => e.preventDefault()}
    >
      {/* Meme slideshow background */}
      <div style={{
        position: "absolute",
        top: 0, left: 0, right: 0, bottom: 0,
        zIndex: 0,
        opacity: 0.35,
      }}>
        <img
          src={MEMES[currentMeme]}
          alt=""
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "grayscale(0.3) contrast(1.2)",
          }}
        />
      </div>

      {/* Meme corner cards */}
      <div style={{
        position: "absolute",
        top: 20,
        right: 20,
        width: "180px",
        height: "140px",
        zIndex: 5,
        border: "4px solid #FFFF00",
        boxShadow: "0 0 20px rgba(255,255,0,0.3)",
        overflow: "hidden",
      }}>
        <img src={MEMES[currentMeme]} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          background: "rgba(0,0,0,0.7)",
          fontFamily: "Comic Sans MS, cursive",
          fontSize: "9px",
          color: "#FFFF00",
          textAlign: "center",
          padding: "2px",
        }}>
          MOOD #{currentMeme + 1}
        </div>
      </div>

      <div style={{
        position: "absolute",
        bottom: 20,
        left: 20,
        width: "150px",
        height: "120px",
        zIndex: 5,
        border: "3px solid #FF00FF",
        boxShadow: "0 0 15px rgba(255,0,255,0.3)",
        overflow: "hidden",
        transform: "rotate(-5deg)",
      }}>
        <img src={MEMES[(currentMeme + 5) % MEMES.length]} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>

      {/* Confetti / retro particles */}
      {confetti.map((c) => (
        <div
          key={c.id}
          style={{
            position: "absolute",
            left: `${c.x}%`,
            top: `${c.y}%`,
            color: c.color,
            fontSize: `${c.size}px`,
            transform: `rotate(${c.rotation}deg)`,
            animation: `star-fade ${c.duration}s forwards`,
            pointerEvents: "none",
            zIndex: 4,
            textShadow: `0 0 10px ${c.color}`,
          }}
        >
          {c.symbol}
        </div>
      ))}

      {/* Navy title card at start */}
      {currentLine < 0 && (
        <div style={{
          background: "#000080",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          animation: "fade-to-black 2s forwards",
          zIndex: 10,
          position: "absolute",
        }}>
          <span style={{ fontFamily: "Arial, sans-serif", color: "#FFF", fontSize: "24px" }}>
            A Global Pencil Authority Production
          </span>
        </div>
      )}

      {/* Typewriter text */}
      {currentLine >= 0 && !showFinal && !showPhoto && (
        <div style={{
          fontFamily: "Courier New, monospace",
          fontSize: "24px",
          color: "#FFFFFF",
          textAlign: "center",
          maxWidth: "700px",
          padding: "20px",
          minHeight: "80px",
          zIndex: 6,
          textShadow: "0 0 20px rgba(255,255,255,0.3)",
        }}>
          {typedText}
          {typedText && <span style={{ animation: "blink-text 1s infinite" }}>|</span>}
        </div>
      )}

      {/* Stock photo */}
      {showPhoto && (
        <div style={{ textAlign: "center", animation: "star-wipe 1s ease-out forwards", zIndex: 6 }}>
          <div style={{
            width: "300px",
            height: "60px",
            background: "linear-gradient(to right, #C4A46B 0%, #C4A46B 15%, #E8C44A 15%, #E8C44A 85%, #EEBB99 85%, #EEBB99 92%, #444 92%)",
            borderRadius: "0 3px 3px 0",
            margin: "0 auto",
            filter: "sepia(0.3) saturate(1.5)",
            border: "1px solid #666",
          }} />
          <div style={{ fontFamily: "Comic Sans MS, cursive", fontSize: "14px", color: "#FF0000", marginTop: "8px" }}>
            ↑ the pencil
          </div>
          <p style={{ fontFamily: "Comic Sans MS, cursive", fontSize: "14px", color: "#FFFF00", marginTop: "12px" }}>
            {typedText}
          </p>
        </div>
      )}

      {/* Final WordArt frame */}
      {showFinal && (
        <div style={{ textAlign: "center", zIndex: 6 }}>
          <div style={{
            fontFamily: "Arial Black, Impact, sans-serif",
            fontSize: "96px",
            fontWeight: "bold",
            animation: "rainbow-fill 2s linear infinite",
            textShadow: "4px 4px 0 #000, -2px -2px 0 #000",
            WebkitTextStroke: "2px rgba(255,255,255,0.3)",
            transform: "scaleY(1.2)",
          }}>
            AED 0.50
          </div>
        </div>
      )}
    </div>
  );
};

export default Stage6;
