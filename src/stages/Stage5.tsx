import { useEffect } from "react";
import { comedyLaugh, crowdCheer } from "@/lib/xpSounds";

const Stage5 = ({ onNext }: { onNext: () => void }) => {
  useEffect(() => {
    document.title = "Almost There... (Do Not Refresh)";
  }, []);

  return (
    <div style={{ background: "#F5F5F5", minHeight: "100vh", fontFamily: "Arial, sans-serif" }}>
      {/* Header */}
      <div style={{ background: "#003366", padding: "16px 30px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{
          border: "2px dashed #999",
          background: "#DDD",
          padding: "8px 20px",
          fontFamily: "Arial Narrow, Arial, sans-serif",
          fontSize: "14px",
          color: "#999",
          fontWeight: "bold",
        }}>
          YOUR LOGO HERE
        </div>
        <span style={{ color: "#FFF", fontFamily: "Arial Narrow, Arial, sans-serif", fontSize: "13px" }}>
          Secure Checkout Portal v2.3.1
        </span>
      </div>

      {/* SECURE CHECKOUT banner */}
      <div style={{
        position: "absolute",
        top: "120px",
        right: "60px",
        background: "linear-gradient(135deg, #00AA00, #008800)",
        color: "#FFF",
        padding: "12px 30px",
        fontFamily: "Arial Black, sans-serif",
        fontSize: "18px",
        transform: "rotate(12deg)",
        boxShadow: "5px 5px 15px rgba(0,0,0,0.4)",
        zIndex: 10,
        animation: "secure-rotate 3s ease-in-out infinite",
      }}>
        🔒 SECURE CHECKOUT 🔒
      </div>

      {/* Order summary */}
      <div style={{ maxWidth: "600px", margin: "50px auto", padding: "0 20px" }}>
        <h2 style={{ fontFamily: "Arial, sans-serif", fontSize: "14px", fontWeight: "bold", borderBottom: "1px solid #ccc", paddingBottom: "8px", marginBottom: "20px" }}>
          Order Summary
        </h2>

        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#003366", color: "#FFF" }}>
              <th style={{ padding: "10px", textAlign: "left", fontSize: "13px" }}>Item</th>
              <th style={{ padding: "10px", textAlign: "right", fontSize: "13px" }}>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ background: "#FFF" }}>
              <td style={{ padding: "10px", fontSize: "13px" }}>1× Pencil (HB, Yellow, Last One)</td>
              <td style={{ padding: "10px", textAlign: "right", fontSize: "13px" }}>AED 0.50</td>
            </tr>
            <tr style={{ background: "#F0F0F0" }}>
              <td style={{ padding: "10px", fontFamily: "Courier New, monospace", fontSize: "14px" }}>
                🔒 Pencil Insurance (mandatory)
                <span style={{ fontSize: "10px", color: "#999", display: "block" }}>Required by pencil law. Cannot be removed.</span>
              </td>
              <td style={{ padding: "10px", textAlign: "right", fontFamily: "Courier New, monospace", fontSize: "14px", background: "#FF0000", color: "#FFF" }}>
                AED 847.00
              </td>
            </tr>
            <tr style={{ background: "#FFF" }}>
              <td style={{ padding: "10px", fontSize: "13px" }}>Global Pencil Authority Processing Fee</td>
              <td style={{ padding: "10px", textAlign: "right", fontSize: "13px" }}>AED 12.00</td>
            </tr>
            <tr style={{ background: "#F0F0F0" }}>
              <td style={{ padding: "10px", fontSize: "13px" }}>"You Found It" Commemorative Fee</td>
              <td style={{ padding: "10px", textAlign: "right", fontSize: "13px" }}>AED 35.00</td>
            </tr>
            <tr style={{ background: "#000", color: "#FFF" }}>
              <td style={{ padding: "12px", fontSize: "18px", fontFamily: "Arial Black, sans-serif" }}>TOTAL</td>
              <td style={{ padding: "12px", textAlign: "right", fontSize: "36px", fontFamily: "Arial Black, sans-serif", color: "#FF0000", fontWeight: "bold" }}>
                AED 894.50
              </td>
            </tr>
          </tbody>
        </table>

        {/* Fine print */}
        <p style={{ fontFamily: "'Times New Roman', serif", fontSize: "8px", color: "#999", marginTop: "16px", lineHeight: 1.4 }}>
          By completing this purchase you acknowledge that the pencil may or may not exist, that Pencil Insurance is non-refundable, that the Global Pencil Authority is not a real organization, and that you accept full pencil responsibility for the remainder of your natural life and/or afterlife.
        </p>

        {/* CTA */}
        <div style={{ textAlign: "center", margin: "30px 0" }}>
          <button
            onClick={() => { crowdCheer(); comedyLaugh(); onNext(); }}
            style={{
              fontFamily: "Arial, sans-serif",
              fontSize: "16px",
              padding: "14px 40px",
              background: "#003870",
              color: "#FFF",
              border: "2px solid #002244",
              cursor: "pointer",
              width: "calc(100% + 40px)",
              marginLeft: "-20px",
            }}
          >
            Complete Purchase and Accept Pencil Responsibility →
          </button>
        </div>

        {/* Trust badges */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          alignItems: "center",
          margin: "20px 0",
          background: "linear-gradient(90deg, transparent, rgba(0,51,102,0.05), transparent)",
          backgroundSize: "200% 100%",
          animation: "shimmer 3s linear infinite",
          padding: "16px",
        }}>
          {[
            { name: "Norton Secured", w: 100, h: 40 },
            { name: "McAfee Safe", w: 80, h: 50 },
            { name: "Pencil Authority Certified", w: 140, h: 35 },
          ].map((badge) => (
            <div
              key={badge.name}
              style={{
                width: badge.w,
                height: badge.h,
                background: "#EEE",
                border: "1px solid #CCC",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "Arial, sans-serif",
                fontSize: "8px",
                color: "#666",
                textAlign: "center",
                padding: "4px",
              }}
            >
              ✅ {badge.name}
            </div>
          ))}
        </div>

        {/* Footer */}
        <p style={{ textAlign: "center", fontFamily: "'Times New Roman', serif", fontSize: "8px", color: "#999", marginTop: "30px" }}>
          © 2003–2026 Global Pencil Authority International LLC. All pencils reserved.
        </p>
      </div>
    </div>
  );
};

export default Stage5;
