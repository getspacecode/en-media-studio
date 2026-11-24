import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "EN Media Studio, marketing agencija";

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#0b0a09",
        color: "#e9dfc8",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: 80,
      }}
    >
      <div style={{ color: "#c6a15b", fontSize: 28, letterSpacing: 6 }}>
        MARKETING STUDIO
      </div>
      <div style={{ fontSize: 96, marginTop: 24 }}>EN Media Studio</div>
    </div>,
    size,
  );
}
