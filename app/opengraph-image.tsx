import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Which Font? — Identify fonts instantly on any website";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const logoPath = join(process.cwd(), "public/logo.png");
  const logoData = await readFile(logoPath);
  const logoSrc = `data:image/png;base64,${logoData.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background:
            "linear-gradient(135deg, #09090b 0%, #18181b 40%, #312e81 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Grid overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(129,140,248,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(129,140,248,0.08) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* Glow orb */}
        <div
          style={{
            position: "absolute",
            top: -80,
            right: -40,
            width: 480,
            height: 480,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(99,102,241,0.45) 0%, transparent 70%)",
          }}
        />

        {/* Header row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            position: "relative",
          }}
        >
          <img src={logoSrc} width={72} height={72} style={{ borderRadius: 16 }} alt="" />
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <span
              style={{
                fontSize: 36,
                fontWeight: 700,
                color: "#fafafa",
                letterSpacing: "-0.02em",
              }}
            >
              Which Font?
            </span>
            <span
              style={{
                fontSize: 18,
                color: "#a1a1aa",
                fontWeight: 500,
              }}
            >
              Chrome Extension
            </span>
          </div>
        </div>

        {/* Main copy */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
            position: "relative",
            maxWidth: 820,
          }}
        >
          <span
            style={{
              fontSize: 64,
              fontWeight: 800,
              color: "#fafafa",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
            }}
          >
            Identify Any Font Instantly
          </span>
          <span
            style={{
              fontSize: 26,
              color: "#d4d4d8",
              lineHeight: 1.4,
              fontWeight: 400,
            }}
          >
            Inspect typography, colors, and CSS styles on any webpage.
          </span>
        </div>

        {/* Footer badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 20px",
              borderRadius: 9999,
              background: "rgba(99,102,241,0.2)",
              border: "1px solid rgba(129,140,248,0.4)",
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#818cf8",
              }}
            />
            <span style={{ fontSize: 18, color: "#c7d2fe", fontWeight: 600 }}>
              whichfont.dev
            </span>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
