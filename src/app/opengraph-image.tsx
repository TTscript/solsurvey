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
          background: "#e6ecf1",
          color: "#0e1720",
          fontFamily: "Georgia, serif",
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
              "radial-gradient(ellipse at 80% 10%, rgba(15,158,138,0.18) 0%, transparent 55%), radial-gradient(ellipse at 10% 90%, rgba(14,23,32,0.06) 0%, transparent 50%)",
          }}
        />
        <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 18 }}>
          <p
            style={{
              fontSize: 22,
              color: "#0f9e8a",
              margin: 0,
              letterSpacing: 6,
              textTransform: "uppercase",
              fontFamily: "system-ui, sans-serif",
              fontWeight: 700,
            }}
          >
            Solana surveys
          </p>
          <p style={{ fontSize: 84, fontWeight: 600, margin: 0, lineHeight: 0.95, letterSpacing: -2 }}>
            SolSurvey
          </p>
          <p style={{ fontSize: 34, margin: 0, maxWidth: 820, fontFamily: "system-ui, sans-serif", color: "#3a4a58" }}>
            Rewarded feedback, paid on submit.
          </p>
        </div>
      </div>
    ),
    { ...size },
  );
}
