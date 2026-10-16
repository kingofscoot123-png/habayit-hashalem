const sharp = require("sharp");
const path = require("path");

const src =
  "C:/Users/Shaked/.cursor/projects/c-Users-Shaked-cursor/assets/c__Users_Shaked_AppData_Roaming_Cursor_User_workspaceStorage_d8c7e9dff6589caeedb4740e26df23a6_images_ChatGPT_Image_Oct_9__2026__07_12_07_PM-92a1d698-26e6-41df-a7c9-da5cc843d7d7.png";
const outDir = "C:/Users/Shaked/.cursor/מיכאל מרום/public/images";

(async () => {
  const { data, info } = await sharp(src).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: w, height: h } = info;
  const n = w * h;
  for (let i = 0; i < n; i++) {
    const o = i * 4;
    const r = data[o];
    const g = data[o + 1];
    const b = data[o + 2];
    const mx = Math.max(r, g, b);
    const mn = Math.min(r, g, b);
    const L = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    if (L > 248 && mx - mn < 10) {
      data[o + 3] = 0;
    } else if (L > 236 && mx - mn < 14) {
      data[o + 3] = Math.round(((248 - L) / 12) * 255);
    }
  }

  let minX = w;
  let minY = h;
  let maxX = 0;
  let maxY = 0;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (data[(y * w + x) * 4 + 3] > 12) {
        if (x < minX) minX = x;
        if (y < minY) minY = y;
        if (x > maxX) maxX = x;
        if (y > maxY) maxY = y;
      }
    }
  }
  const pad = 12;
  minX = Math.max(0, minX - pad);
  minY = Math.max(0, minY - pad);
  maxX = Math.min(w - 1, maxX + pad);
  maxY = Math.min(h - 1, maxY + pad);

  const png = await sharp(data, { raw: { width: w, height: h, channels: 4 } })
    .extract({ left: minX, top: minY, width: maxX - minX + 1, height: maxY - minY + 1 })
    .png()
    .toBuffer();

  await sharp(png).webp({ quality: 95, alphaQuality: 100 }).toFile(path.join(outDir, "hero-sculpture.webp"));
  await sharp(png).png().toFile(path.join(outDir, "hero-sculpture.png"));
  const m = await sharp(png).metadata();
  console.log("sculpture", m.width, m.height);
})();
