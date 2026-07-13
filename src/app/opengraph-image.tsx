import { ImageResponse } from "next/og";

export const alt = "SolSurvey — Rewarded surveys on Solana";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 72,
          background: "#0b0e11",
          color: "#fafafa",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "radial-gradient(ellipse at 30% 20%, rgba(153,69,255,0.35) 0%, transparent 55%), radial-gradient(ellipse at 80% 80%, rgba(240,185,11,0.15) 0%, transparent 50%)",
          }}
        />
        <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 20 }}>
          <p style={{ fontSize: 28, color: "#c4b5fd", margin: 0, letterSpacing: 4, textTransform: "uppercase" }}>
            Solana surveys
          </p>
          <p style={{ fontSize: 72, fontWeight: 800, margin: 0, lineHeight: 1.05, maxWidth: 900 }}>
            Rewarded feedback, paid instantly.
          </p>
          <p style={{ fontSize: 30, color: "#848e9c", margin: 0, maxWidth: 820 }}>
            Wallet-verified responses · SOL on submit · One shareable link
          </p>
        </div>
      </div>
    ),
    { ...size },
  );
}
