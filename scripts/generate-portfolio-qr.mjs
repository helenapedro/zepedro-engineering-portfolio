import QRCode from "qrcode";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const url = process.argv[2] || "https://zepedro-portfolio.hmpedro.com/";
const outputDir = path.resolve("public", "assets", "qr");

const options = {
  errorCorrectionLevel: "H",
  margin: 2,
  width: 1024,
  color: {
    dark: "#000000",
    light: "#FFFFFF",
  },
};

await mkdir(outputDir, { recursive: true });

const pngPath = path.join(outputDir, "portfolio-qr.png");
const svgPath = path.join(outputDir, "portfolio-qr.svg");

await QRCode.toFile(pngPath, url, options);
await QRCode.toFile(svgPath, url, options);

console.log(`Generated QR files for ${url}`);
console.log(`- ${pngPath}`);
console.log(`- ${svgPath}`);
