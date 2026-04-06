import { useState, useEffect } from "react";

const FONTS = ["Comic Sans MS, cursive", "Impact, sans-serif", "Papyrus, fantasy", "Courier New, monospace", "'Times New Roman', serif", "Arial Black, sans-serif", "fantasy"];
const FIELD_COLORS = ["#FFFF00", "#00FF00", "#FF69B4", "#00FFFF", "#FFA500", "#FF6347"];

const Stage4 = ({ onNext }: { onNext: () => void }) => {
  const [captchaStep, setCaptchaStep] = useState(0); // 0=checkbox, 1=failed, 2=camera, 3=form, 4=shipping, 5=payment
  const [checkboxDone, setCheckboxDone] = useState(false);
  const [formData, setFormData] = useState({
    coords: "",
    smell: "",
    secret: "",
    shipping: "",
    card1: "",
    card2: "",
  });
  const [showCard2, setShowCard2] = useState(false);
  const [expressionDetected, setExpressionDetected] = useState(false);

  useEffect(() => {
    document.title = "CHECKOUT — Do Not Close This Tab";
  }, []);

  const argyleBg = `url("data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='60' height='60'>
      <rect fill='%238B0000' width='60' height='60'/>
      <polygon fill='%234B0082' opacity='0.5' points='30,0 60,30 30,60 0,30'/>
      <polygon fill='%238B0000' opacity='0.3' points='30,5 55,30 30,55 5,30'/>
    </svg>`
  )}")`;

  const RansomLabel = ({ children, idx }: { children: React.ReactNode; idx: number }) => (
    <label style={{
      fontFamily: FONTS[idx % FONTS.length],
      fontSize: `${12 + (idx % 4) * 4}px`,
      color: FIELD_COLORS[idx % FIELD_COLORS.length],
      display: "block",
      marginBottom: "4px",
      transform: `rotate(${(idx % 5) - 2}deg)`,
    }}>
      {children}
    </label>
  );

  return (
    <div style={{
      minHeight: "100vh",
      background: argyleBg,
      backgroundSize: "60px 60px",
      backgroundColor: "#8B0000",
      padding: "40px 20px",
      fontFamily: "Comic Sans MS, cursive",
    }}>
      <h1 style={{
        textAlign: "center",
        fontFamily: "Impact, sans-serif",
        fontSize: "36px",
        color: "#FFFF00",
        textShadow: "3px 3px #000",
        marginBottom: "30px",
        transform: "rotate(-1deg)",
      }}>
        🔒 SECURE PENCIL CHECKOUT 🔒
      </h1>

      {/* CAPTCHA Section */}
      {captchaStep === 0 && (
        <div style={{ maxWidth: "500px", margin: "0 auto", background: "#FFF", border: "2px solid #ccc", padding: "20px", borderRadius: "4px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <input
              type="checkbox"
              style={{ width: 24, height: 24, cursor: "pointer" }}
              checked={checkboxDone}
              onChange={() => {
                setCheckboxDone(true);
                setTimeout(() => setCaptchaStep(1), 1000);
              }}
            />
            <span style={{ fontFamily: "Arial, sans-serif", fontSize: "14px", color: "#000" }}>I'm not a robot</span>
            <div style={{ marginLeft: "auto", opacity: 0.5, fontSize: "10px", fontFamily: "Arial, sans-serif", color: "#555" }}>reCAPTCHA</div>
          </div>
        </div>
      )}

      {captchaStep === 1 && (
        <div style={{ maxWidth: "500px", margin: "0 auto", background: "#FFF", border: "3px solid #FF0000", padding: "20px", textAlign: "center" }}>
          <p style={{ fontFamily: "Arial, sans-serif", color: "#FF0000", fontSize: "18px", fontWeight: "bold" }}>
            ❌ VERIFICATION FAILED
          </p>
          <p style={{ fontFamily: "Arial, sans-serif", color: "#333", fontSize: "14px", margin: "12px 0" }}>
            That was too easy. Advanced Human Verification required.
          </p>
          <button
            onClick={() => setCaptchaStep(2)}
            style={{
              padding: "8px 24px",
              background: "#FF0000",
              color: "#FFF",
              border: "none",
              fontFamily: "Arial, sans-serif",
              fontSize: "14px",
              cursor: "pointer",
            }}
          >
            Begin Advanced Verification →
          </button>
        </div>
      )}

      {captchaStep === 2 && (
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <div style={{ display: "flex", gap: "20px", alignItems: "center", justifyContent: "center", flexWrap: "wrap" }}>
            {/* Camera feed mockup */}
            <div style={{
              width: "280px",
              height: "220px",
              border: "6px solid #FFFF00",
              background: "#1a1a1a",
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
              <div style={{ fontSize: "80px", filter: "grayscale(0.5)" }}>😐</div>
              <div style={{
                position: "absolute",
                bottom: 8,
                left: "50%",
                transform: "translateX(-50%)",
                fontFamily: "Comic Sans MS, cursive",
                fontSize: "14px",
                color: "#FFFF00",
                animation: "ransom-blink 1.5s infinite",
                whiteSpace: "nowrap",
              }}>
                YOU (nervous)
              </div>
            </div>

            <div style={{ fontFamily: "Comic Sans MS, cursive", fontSize: "36px", color: "#FFFF00" }}>VS</div>

            {/* Meme panel */}
            <div style={{
              width: "280px",
              height: "220px",
              background: "#FFF",
              border: "4px solid #000",
              boxShadow: "6px 6px 0 #000",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}>
              <div style={{ fontSize: "80px" }}>😮</div>
              <div style={{ fontFamily: "Comic Sans MS, cursive", fontSize: "12px", color: "#333", marginTop: "8px" }}>
                VERIFIED HUMAN RESPONSE
              </div>
            </div>
          </div>

          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <p style={{ color: "#FFFF00", fontSize: "14px", marginBottom: "12px" }}>
              {expressionDetected ? "✅ Expression verified: Correct reaction." : "⏳ Analyzing your face... (Click to simulate)"}
            </p>
            <button
              onClick={() => {
                setExpressionDetected(true);
                setTimeout(() => setCaptchaStep(3), 1500);
              }}
              style={{
                padding: "10px 30px",
                background: "#FF0000",
                color: "#FFF",
                border: "3px outset #FF6600",
                fontFamily: "Comic Sans MS, cursive",
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              {expressionDetected ? "Proceeding..." : "😮 Make Surprised Face"}
            </button>
          </div>
        </div>
      )}

      {captchaStep === 3 && (
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <div style={{ background: "rgba(0,0,0,0.7)", padding: "30px", border: "3px dashed #FFFF00" }}>
            <RansomLabel idx={0}>📍 Your Exact Coordinates:</RansomLabel>
            <input
              type="text"
              placeholder="e.g. 25.2048° N, 55.2708° E"
              value={formData.coords}
              onChange={(e) => setFormData({ ...formData, coords: e.target.value })}
              style={{ width: "80%", padding: "8px", background: FIELD_COLORS[0], border: "3px inset #999", fontSize: "14px", marginBottom: "20px" }}
            />

            <RansomLabel idx={1}>🏠 What does your house smell like?</RansomLabel>
            <input
              type="text"
              placeholder="Be specific"
              value={formData.smell}
              onChange={(e) => setFormData({ ...formData, smell: e.target.value })}
              style={{ width: "60%", padding: "8px", background: FIELD_COLORS[1], border: "3px inset #999", fontSize: "14px", marginBottom: "20px" }}
            />

            <RansomLabel idx={2}>🤫 Tell us one secret:</RansomLabel>
            <textarea
              placeholder="This will be kept between you and the pencil"
              value={formData.secret}
              onChange={(e) => setFormData({ ...formData, secret: e.target.value })}
              style={{ width: "100%", height: "60px", padding: "8px", background: FIELD_COLORS[2], border: "3px inset #999", fontSize: "12px", fontFamily: "Courier New, monospace", marginBottom: "20px" }}
            />

            <div style={{ textAlign: "center" }}>
              <button
                onClick={() => setCaptchaStep(4)}
                style={{
                  padding: "10px 30px",
                  background: "#FF0000",
                  color: "#FFF",
                  border: "4px outset #FF6600",
                  fontFamily: "Comic Sans MS, cursive",
                  fontSize: "18px",
                  cursor: "pointer",
                  transform: "rotate(2deg)",
                }}
              >
                Continue to Shipping →
              </button>
            </div>
          </div>
        </div>
      )}

      {captchaStep === 4 && (
        <div style={{ maxWidth: "700px", margin: "0 auto", background: "rgba(0,0,0,0.7)", padding: "30px", border: "3px dashed #00FFFF" }}>
          <h2 style={{ fontFamily: "Impact, sans-serif", color: "#00FFFF", fontSize: "24px", marginBottom: "20px" }}>
            SHIPPING OPTIONS
          </h2>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <tbody>
              {[
                { name: "Standard", time: "3-5 business decades", price: "Free", font: "10px" },
                { name: "Express", time: "3-5 decades (think harder)", price: "AED 299", font: "16px" },
                { name: "Teleportation BETA", time: "Instant (maybe)", price: "AED 4", font: "22px" },
              ].map((opt, i) => (
                <tr key={opt.name} style={{ borderBottom: "1px dashed #FF69B4" }}>
                  <td style={{ padding: "12px", fontFamily: FONTS[i], fontSize: opt.font, color: FIELD_COLORS[i] }}>
                    <label style={{ cursor: "pointer" }}>
                      <input
                        type="radio"
                        name="shipping"
                        value={opt.name}
                        onChange={(e) => setFormData({ ...formData, shipping: e.target.value })}
                      />
                      {" "}{opt.name}
                    </label>
                  </td>
                  <td style={{ padding: "12px", fontFamily: FONTS[i + 3], fontSize: opt.font, color: FIELD_COLORS[i + 2] }}>{opt.time}</td>
                  <td style={{ padding: "12px", fontFamily: FONTS[i + 1], fontSize: opt.font, color: "#FFFF00" }}>{opt.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <button onClick={() => setCaptchaStep(5)} style={{ padding: "10px 30px", background: "#FF0000", color: "#FFF", border: "4px outset #FF6600", fontFamily: "Comic Sans MS, cursive", fontSize: "18px", cursor: "pointer" }}>
              Proceed to Payment →
            </button>
          </div>
        </div>
      )}

      {captchaStep === 5 && (
        <div style={{ maxWidth: "500px", margin: "0 auto", background: "rgba(0,0,0,0.7)", padding: "30px", border: "3px dashed #FF00FF" }}>
          <RansomLabel idx={4}>💳 Card Number:</RansomLabel>
          <input
            type="text"
            placeholder="0000 0000 0000 0000"
            value={formData.card1}
            onChange={(e) => {
              setFormData({ ...formData, card1: e.target.value });
              if (e.target.value.length > 10 && !showCard2) setShowCard2(true);
            }}
            style={{ width: "100%", padding: "10px", background: FIELD_COLORS[3], border: "3px inset #999", fontSize: "16px", fontFamily: "Courier New, monospace", marginBottom: "16px" }}
          />

          {showCard2 && (
            <>
              <RansomLabel idx={5}>💳 Please re-enter your card number (we forgot it already):</RansomLabel>
              <input
                type="text"
                placeholder="0000 0000 0000 0000 (again)"
                value={formData.card2}
                onChange={(e) => setFormData({ ...formData, card2: e.target.value })}
                style={{ width: "90%", padding: "10px", background: FIELD_COLORS[4], border: "3px inset #999", fontSize: "14px", fontFamily: "Papyrus, fantasy", marginBottom: "16px" }}
              />
            </>
          )}

          {/* SSL Badge */}
          <div style={{ textAlign: "center", margin: "16px 0" }}>
            <div style={{
              display: "inline-block",
              background: "#00AA00",
              color: "#FFF",
              padding: "6px 16px",
              fontFamily: "Comic Sans MS, cursive",
              fontSize: "12px",
              transform: "rotate(-3deg)",
              border: "2px solid #008800",
            }}>
              🔒 SSL SECURED (we drew this ourselves)
            </div>
          </div>

          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <button
              onClick={onNext}
              style={{
                padding: "14px 40px",
                background: "#FF0000",
                color: "#FFF",
                border: "4px outset #FF6600",
                fontFamily: "Impact, sans-serif",
                fontSize: "20px",
                cursor: "pointer",
                boxShadow: "6px 6px 0 #000",
              }}
            >
              SUBMIT ORDER →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Stage4;
