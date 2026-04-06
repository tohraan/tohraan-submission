import { useState, useEffect, useRef, useCallback } from "react";
import { xpError, xpNotify, xpClick, xpShutdown, sirenSound } from "@/lib/xpSounds";

const XPButton = ({ children, onClick, disabled }: { children: React.ReactNode; onClick?: () => void; disabled?: boolean }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    style={{
      fontFamily: "Tahoma, sans-serif",
      fontSize: "11px",
      padding: "4px 20px",
      background: "#ECE9D8",
      border: "2px outset #FFFFFF",
      borderRight: "2px outset #ACA899",
      borderBottom: "2px outset #ACA899",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.5 : 1,
    }}
  >
    {children}
  </button>
);

const Stage2 = ({ onNext }: { onNext: () => void }) => {
  const [step, setStep] = useState(0);
  const [shake, setShake] = useState(false);
  const [checkbox, setCheckbox] = useState(false);
  const [sliderVal, setSliderVal] = useState(50);
  const [textVal, setTextVal] = useState("");
  const [phoneVal, setPhoneVal] = useState("");
  const [phoneWaiting, setPhoneWaiting] = useState(false);
  const [viewers, setViewers] = useState(2847);
  const [showPopup, setShowPopup] = useState(true);
  const [wordError, setWordError] = useState("");
  const textRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    document.title = "SECURITY CHECK IN PROGRESS";
    const interval = setInterval(() => {
      setViewers((v) => v + Math.floor(Math.random() * 21 - 10));
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (step === 2) setTimeout(() => textRef.current?.focus(), 50);
    if (step === 3) setTimeout(() => phoneRef.current?.focus(), 50);
  }, [step]);

  const doShake = useCallback(() => {
    xpError();
    setShake(true);
    setTimeout(() => setShake(false), 500);
  }, []);

  const handleWordSubmit = () => {
    const words = textVal.trim().split(/\s+/).filter(Boolean);
    if (words.length !== 3) {
      doShake();
      setWordError(words.length < 3 ? `That's ${words.length} word${words.length !== 1 ? "s" : ""}. We said THREE.` : `That's ${words.length} words. We said THREE. Not ${words.length}. Three.`);
      setTimeout(() => textRef.current?.focus(), 100);
    } else {
      xpNotify();
      setWordError("");
      setStep(3);
    }
  };

  const handlePhone = () => {
    setPhoneWaiting(true);
    setTimeout(() => setStep(4), 4000);
  };

  const dialogStyle: React.CSSProperties = {
    background: "#ECE9D8",
    border: "2px solid #0A246A",
    boxShadow: "4px 4px 8px rgba(0,0,0,0.3)",
    width: "450px",
    maxWidth: "90vw",
    position: "relative",
    ...(shake ? { animation: "xp-shake 0.3s" } : {}),
  };

  const titleBarStyle: React.CSSProperties = {
    background: "linear-gradient(to bottom, #0A246A, #A6CAF0, #0A246A)",
    padding: "4px 8px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const renderTitleBar = (title: string, onClose?: () => void) => (
    <div style={titleBarStyle}>
      <span style={{ fontFamily: "Tahoma, sans-serif", fontSize: "11px", fontWeight: "bold", color: "#FFFFFF" }}>{title}</span>
      <div style={{ display: "flex", gap: "2px" }}>
        <button style={{ width: 21, height: 21, background: "#ECE9D8", border: "1px outset #FFF", fontSize: "10px", cursor: "pointer" }}>_</button>
        <button style={{ width: 21, height: 21, background: "#ECE9D8", border: "1px outset #FFF", fontSize: "10px", cursor: "pointer" }}>□</button>
        <button onClick={onClose} style={{ width: 21, height: 21, background: "#C85250", border: "1px outset #FFF", color: "#FFF", fontSize: "10px", fontWeight: "bold", cursor: "pointer" }}>✕</button>
      </div>
    </div>
  );

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "4px 8px",
    fontFamily: "Tahoma, sans-serif",
    fontSize: "11px",
    border: "2px inset #ACA899",
    boxSizing: "border-box",
  };

  return (
    <div style={{
      width: "100%",
      minHeight: "100vh",
      backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(
        `<svg xmlns='http://www.w3.org/2000/svg' width='1920' height='1080'>
          <defs><linearGradient id='sky' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='%2340A0FF'/><stop offset='1' stop-color='%2380C8FF'/></linearGradient>
          <linearGradient id='grass' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='%234CAF50'/><stop offset='1' stop-color='%232E7D32'/></linearGradient></defs>
          <rect fill='url(%23sky)' width='1920' height='600'/><rect y='500' fill='url(%23grass)' width='1920' height='580'/></svg>`
      )}")`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "60px 20px 80px",
      position: "relative",
    }}>
      {/* Viewer counter */}
      <div style={{
        position: "fixed", top: 10, right: 10,
        background: "#ECE9D8", border: "2px outset #FFF",
        padding: "4px 12px", fontFamily: "Tahoma, sans-serif", fontSize: "11px", zIndex: 100,
      }}>
        👁️ {viewers.toLocaleString()} people are viewing this pencil
      </div>

      {/* Initial popup */}
      {showPopup && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200 }}>
          <div style={dialogStyle}>
            {renderTitleBar("⚠ Internet Explorer - Security Warning", () => setShowPopup(false))}
            <div style={{ padding: "16px", fontFamily: "Tahoma, sans-serif", fontSize: "11px" }}>
              <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                <span style={{ fontSize: "32px" }}>🛡️</span>
                <div>
                  <p style={{ margin: "0 0 12px", fontWeight: "bold" }}>This site wants to access your pencil.</p>
                  <p style={{ margin: "0 0 16px" }}>The Global Pencil Authority requires verification before you can proceed. Do you want to allow this?</p>
                  <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
                    <XPButton onClick={() => { xpClick(); setShowPopup(false); }}>Allow</XPButton>
                    <XPButton onClick={() => { sirenSound(); setShowPopup(false); }}>Deny</XPButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main verification dialog - inline, no wrapper component */}
      {!showPopup && (
        <div style={dialogStyle}>
          {renderTitleBar("Global Pencil Authority — Verification Protocol")}
          <div style={{ padding: "16px", fontFamily: "Tahoma, sans-serif", fontSize: "11px" }}>

            {step === 0 && (
              <div>
                <p style={{ margin: "0 0 16px" }}>Step 1 of 4: Confirm you are not a pencil.</p>
                <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                  <input type="checkbox" checked={checkbox} onChange={(e) => setCheckbox(e.target.checked)} />
                  I confirm that I am not a pencil
                </label>
                <div style={{ marginTop: "16px", textAlign: "right" }}>
                  <XPButton onClick={() => { if (checkbox) { xpNotify(); setStep(1); } else doShake(); }} disabled={!checkbox}>Next &gt;</XPButton>
                </div>
              </div>
            )}

            {step === 1 && (
              <div>
                <p style={{ margin: "0 0 16px" }}>Step 2 of 4: How much do you want this pencil?</p>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <span style={{ fontSize: "10px" }}>Not really</span>
                  <input type="range" min="0" max="100" value={sliderVal} onChange={(e) => setSliderVal(Number(e.target.value))} style={{ flex: 1 }} />
                  <span style={{ fontSize: "10px" }}>More than life itself</span>
                </div>
                <div style={{ marginTop: "16px", textAlign: "right" }}>
                  <XPButton onClick={() => { if (sliderVal >= 95) { xpNotify(); setStep(2); } else doShake(); }}>Next &gt;</XPButton>
                </div>
                {sliderVal < 95 && <p style={{ color: "#FF0000", marginTop: "8px", fontSize: "10px" }}>⚠ You must want it more than life itself to proceed.</p>}
              </div>
            )}

            {step === 2 && (
              <div>
                <p style={{ margin: "0 0 8px" }}>Step 3 of 4: In exactly 3 words, explain why you deserve this pencil.</p>
                <input
                  ref={textRef}
                  type="text"
                  value={textVal}
                  onChange={(e) => { setTextVal(e.target.value); setWordError(""); }}
                  placeholder="Exactly three words..."
                  style={inputStyle}
                  onKeyDown={(e) => { if (e.key === "Enter") handleWordSubmit(); }}
                />
                {wordError && <p style={{ color: "#FF0000", marginTop: "6px", fontSize: "10px", fontWeight: "bold" }}>⚠ {wordError}</p>}
                <div style={{ marginTop: "16px", textAlign: "right" }}>
                  <XPButton onClick={handleWordSubmit}>Submit</XPButton>
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <p style={{ margin: "0 0 8px" }}>Step 4 of 4: Phone verification required.</p>
                <input
                  ref={phoneRef}
                  type="tel"
                  value={phoneVal}
                  onChange={(e) => setPhoneVal(e.target.value)}
                  placeholder="Enter any phone number"
                  style={inputStyle}
                  onKeyDown={(e) => { if (e.key === "Enter" && phoneVal && !phoneWaiting) handlePhone(); }}
                />
                <div style={{ marginTop: "16px", textAlign: "right" }}>
                  <XPButton onClick={handlePhone} disabled={phoneWaiting || !phoneVal}>
                    {phoneWaiting ? "Calling..." : "Verify"}
                  </XPButton>
                </div>
                {phoneWaiting && (
                  <p style={{ marginTop: "8px", fontStyle: "italic", color: "#666" }}>
                    📞 We tried calling. We understand. Proceeding anyway...
                  </p>
                )}
              </div>
            )}

            {step === 4 && (
              <div style={{ textAlign: "center" }}>
                <p style={{ fontSize: "14px", margin: "0 0 8px" }}>✅ Verification Complete</p>
                <p style={{ margin: "0 0 16px" }}>The Global Pencil Authority has deemed you... acceptable.</p>
                <XPButton onClick={() => { xpShutdown(); onNext(); }}>Proceed to Pencil →</XPButton>
              </div>
            )}

          </div>
        </div>
      )}

      {/* Fake taskbar */}
      <div style={{
        position: "fixed", bottom: 0, left: 0, right: 0, height: "36px",
        background: "linear-gradient(to bottom, #3168D5, #2B5FAE)",
        display: "flex", alignItems: "center", padding: "0 4px", zIndex: 999,
      }}>
        <button style={{
          background: "linear-gradient(to bottom, #3C9B34, #268A1D)",
          border: "none", borderRadius: "0 8px 8px 0",
          padding: "4px 16px", color: "#FFFFFF",
          fontFamily: "Tahoma, sans-serif", fontSize: "12px", fontWeight: "bold",
          cursor: "pointer", display: "flex", alignItems: "center", gap: "4px",
        }}>
          <span style={{ fontSize: "14px" }}>🪟</span> start
        </button>
        <div style={{ flex: 1 }} />
        <div style={{
          background: "linear-gradient(to bottom, #1F8DEA, #166BBA)",
          padding: "4px 12px", fontFamily: "Tahoma, sans-serif", fontSize: "11px",
          color: "#FFFFFF", border: "1px inset rgba(255,255,255,0.2)",
        }}>
          🔊 4:47 PM
        </div>
      </div>
    </div>
  );
};

export default Stage2;
