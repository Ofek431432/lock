import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

function reverseHebrew(s: string) {
  return s
    .split(" ")
    .map((w) => [...w].reverse().join(""))
    .reverse()
    .join(" ");
}

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0f1b2d",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            background:
              "radial-gradient(circle at 50% 35%, rgba(224,165,38,0.16), rgba(15,27,45,0) 60%)",
          }}
        />
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 9999,
              background: "#e0a526",
              display: "flex",
            }}
          />
          <div
            style={{
              width: 28,
              height: 50,
              background: "#e0a526",
              marginTop: -13,
              display: "flex",
              clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)",
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 40,
            fontSize: 76,
            fontWeight: 800,
            color: "#f4f1ec",
            letterSpacing: -1,
          }}
        >
          {reverseHebrew(siteConfig.name)}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 20,
            fontSize: 34,
            fontWeight: 500,
            color: "#e0a526",
          }}
        >
          {reverseHebrew("מנעולן זמין סביב השעון בחיפה והקריות")}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 36,
            fontSize: 30,
            fontWeight: 700,
            color: "#f4f1ec",
            direction: "ltr",
          }}
        >
          {siteConfig.phoneDisplay}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
