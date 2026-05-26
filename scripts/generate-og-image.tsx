import { OgImageContent } from "@/lib/og-image-content";
import { ogImageSize } from "@/lib/og-image";
import { ImageResponse } from "next/og";
import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

async function main() {
  const logoPath = join(process.cwd(), "public/logo.png");
  const logoData = await readFile(logoPath);
  const logoSrc = `data:image/png;base64,${logoData.toString("base64")}`;

  const image = new ImageResponse(<OgImageContent logoSrc={logoSrc} />, {
    ...ogImageSize,
  });

  const outputPath = join(process.cwd(), "public/og.png");
  await writeFile(outputPath, Buffer.from(await image.arrayBuffer()));
  console.log(`Wrote ${outputPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
