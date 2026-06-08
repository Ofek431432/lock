import { ImageResponse } from "next/og";

export const size = {
  width: 64,
  height: 64,
};
export const contentType = "image/png";

export default function Icon() {
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
          borderRadius: 14,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div
            style={{
              width: 24,
              height: 24,
              borderRadius: 9999,
              background: "#e0a526",
              display: "flex",
            }}
          />
          <div
            style={{
              width: 11,
              height: 19,
              background: "#e0a526",
              marginTop: -5,
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
