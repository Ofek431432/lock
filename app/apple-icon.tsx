import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0f1b2d",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div
            style={{
              width: 68,
              height: 68,
              borderRadius: 9999,
              background: "#e0a526",
              display: "flex",
            }}
          />
          <div
            style={{
              width: 30,
              height: 54,
              background: "#e0a526",
              marginTop: -14,
              display: "flex",
              clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)",
            }}
          />
        </div>
      </div>
    ),
    { ...size }
  );
}
