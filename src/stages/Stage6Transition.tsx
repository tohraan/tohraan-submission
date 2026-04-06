import { useState, useEffect, useRef } from "react";
import { flashBangSound } from "@/lib/xpSounds";

const GLITCH_CHARS = "█▓▒░╬╠╣╦╩┼├┤┬┴▄▀■□▪▫";
const LOADING_MSGS = [
  "Encrypting pencil data...",
  "Contacting graphite server...",
  "Buffering silk wrapper...",
  "Compiling gratitude.exe...",
  "ERROR: pencil_feelings overflow",
  "Rebooting sentiment module...",
];

const Stage6Transition = ({ onNext }: { onNext: () => void }) => {
  const [phase, setPhase] = useState<"loading" | "rickroll" | "flash" | "jk">("loading");
  const [glitchText, setGlitchText] = useState("");
  const [msgIndex, setMsgIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = "Processing...";
    const loadTimer = setTimeout(() => setPhase("rickroll"), 3000);

    const glitchInterval = setInterval(() => {
      let t = "";
      for (let i = 0; i < 40; i++) t += GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
      setGlitchText(t);
    }, 80);
    const msgInterval = setInterval(() => setMsgIndex(i => (i + 1) % LOADING_MSGS.length), 600);
    const progInterval = setInterval(() => {
      setProgress(p => Math.max(0, Math.min(p + Math.random() * 15 - 5, 92)));
    }, 200);

    return () => { clearTimeout(loadTimer); clearInterval(glitchInterval); clearInterval(msgInterval); clearInterval(progInterval); };
  }, []);

  useEffect(() => {
    if (phase === "rickroll") {
      const vid = videoRef.current;
      if (vid) {
        vid.currentTime = 0;
        vid.volume = 1;
        vid.muted = false;
        vid.play().catch(() => {
          // Autoplay blocked - try muted then unmute
          vid.muted = true;
          vid.play().then(() => { vid.muted = false; }).catch(() => {});
        });
        // Try fullscreen on the container
        try {
          const el = containerRef.current || vid;
          (el as any).requestFullscreen?.().catch(() => {});
        } catch {}
      }
      const t = setTimeout(() => {
        flashBangSound();
        if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
        setPhase("flash");
      }, 10000);
      return () => clearTimeout(t);
    }
    if (phase === "flash") {
      const t = setTimeout(() => setPhase("jk"), 400);
      return () => clearTimeout(t);
    }
    if (phase === "jk") {
      const t = setTimeout(() => onNext(), 3000);
      return () => clearTimeout(t);
    }
  }, [phase, onNext]);

  if (phase === "flash") {
    return (
      <div style={{
        width: "100vw", height: "100vh", background: "#FFFFFF",
        display: "flex", alignItems: "center", justifyContent: "center",
        animation: "flash-bang 0.4s ease-out",
      }} />
    );
  }

  if (phase === "jk") {
    return (
      <div style={{
        width: "100vw", height: "100vh", background: "#000",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", gap: "20px",
      }}>
        <div style={{
          fontSize: "120px", fontFamily: "Impact, Arial Black, sans-serif",
          background: "linear-gradient(135deg, #FF0000, #FF8800, #FFFF00, #00FF00, #0088FF, #FF00FF)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          filter: "drop-shadow(4px 4px 0 rgba(255,0,255,0.5))",
          animation: "xp-shake 0.3s infinite",
        }}>
          JK
        </div>
        <div style={{ fontSize: "80px", animation: "jk-bounce 0.5s ease-in-out infinite alternate" }}>
          🤣😂🤣😂🤣
        </div>
        <div style={{
          fontFamily: "Comic Sans MS, cursive", fontSize: "24px",
          background: "linear-gradient(90deg, #FF0000, #FFFF00, #00FF00, #00FFFF, #FF00FF)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          animation: "blink-text 0.5s infinite",
        }}>
          YOU THOUGHT 💀
        </div>
      </div>
    );
  }

  if (phase === "rickroll") {
    return (
      <div
        ref={containerRef}
        style={{
          width: "100vw", height: "100vh", background: "#000",
          display: "flex", alignItems: "center", justifyContent: "center",
          position: "relative", overflow: "hidden",
        }}
      >
        <video
          ref={videoRef}
          src="/rickroll.mp4"
          autoPlay
          playsInline
          loop
          style={{ width: "100vw", height: "100vh", objectFit: "cover" }}
        />
        <div style={{
          position: "absolute", bottom: "40px", left: 0, right: 0, textAlign: "center",
          fontFamily: "Comic Sans MS, cursive", fontSize: "28px", color: "#00FF00",
          animation: "blink-text 0.4s infinite", textShadow: "2px 2px 4px #000",
          pointerEvents: "none",
        }}>
          🎵 GET PENCIL ROLLED 🎵
        </div>
        {/* Block all interaction */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: 10 }} />
      </div>
    );
  }

  // Loading phase
  return (
    <div style={{
      width: "100vw", height: "100vh", background: "#000080",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      fontFamily: "Courier New, monospace", color: "#C0C0C0",
      position: "relative", overflow: "hidden",
    }}>
      {/* Preload video */}
      <video ref={videoRef} src="/rickroll.mp4" preload="auto" style={{ display: "none" }} />

      <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, opacity: 0.08, fontSize: "14px", lineHeight: "16px", overflow: "hidden", whiteSpace: "pre-wrap", wordBreak: "break-all", color: "#00FF00", pointerEvents: "none" }}>
        {Array(50).fill(glitchText).join("\n")}
      </div>

      <div style={{ fontSize: "18px", marginBottom: "30px", color: "#FFFFFF" }}>
        ⏳ PROCESSING YOUR PENCIL ORDER...
      </div>

      <div style={{
        width: "400px", maxWidth: "80vw", height: "24px",
        border: "2px solid #C0C0C0", background: "#000",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ width: `${progress}%`, height: "100%", background: "linear-gradient(90deg, #00AA00, #00FF00, #AAFF00)", transition: "width 0.2s" }} />
        <div style={{ position: "absolute", top: 0, left: `${(progress + 10) % 100}%`, width: "20px", height: "100%", background: "#FF0000", animation: "blink-text 0.2s infinite" }} />
      </div>
      <div style={{ marginTop: "8px", fontSize: "12px" }}>
        {Math.floor(progress)}% — {LOADING_MSGS[msgIndex]}
      </div>

      <div style={{ position: "absolute", top: "60%", fontSize: "10px", color: "#808080", textAlign: "center", animation: "blink-text 3s infinite" }}>
        WARNING: pencil.sys has encountered an unexpected emotion
      </div>
    </div>
  );
};

export default Stage6Transition;
