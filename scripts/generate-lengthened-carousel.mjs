import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const outDir = path.join(root, "public/social/lengthened-partials");
const heroPath = path.join(root, "public/uploads/lengthened-partials-training-hero.png");

const W = 1080;
const H = 1350;

const slides = [
  {
    kicker: "TRAINING SCIENCE",
    title: "半程動作\n不是偷懶",
    body: "關鍵在於：你練的是哪一段？",
    cover: true,
  },
  {
    kicker: "01",
    title: "全行程\n仍然重要",
    body: "但近年研究提醒我們：\n肌肉在拉長位置承受張力，\n可能是增肌刺激裡\n很值得重視的一塊。",
  },
  {
    kicker: "02",
    title: "不是所有\n半程都一樣",
    body: "重量太重、做不到完整，多半是代償。\n刻意留在拉長段，才是訓練策略。",
  },
  {
    kicker: "03",
    title: "什麼是\n拉長段局部訓練？",
    body: "把刺激放在肌肉被拉長、\n張力高的位置。\n例如小腿提踵下放到底，\n腿伸展保留在較拉長區間。",
  },
  {
    kicker: "04",
    title: "研究怎麼說？",
    body: "部分研究發現：\n拉長段局部訓練，\n在某些肌群肥大效果上，\n可能比縮短段更有優勢。",
  },
  {
    kicker: "05",
    title: "活動度\n會變差嗎？",
    body: "不一定。\n但如果長期只練短行程，\n身體會越來越不熟悉\n完整角度。",
  },
  {
    kicker: "06",
    title: "教練建議",
    body: "新手：先把全行程練穩。\n有經驗者：最後幾下可加入拉長段 3 到 5 下。",
  },
  {
    kicker: "CONCLUSION",
    title: "不是半程有效",
    body: "是「拉長段有張力的半程」才有討論價值。",
  },
];

function esc(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function lines(text) {
  return esc(text).split("\n");
}

function tspan(text, x, y, size, lineHeight, weight = 700) {
  return lines(text)
    .map((line, index) => {
      const yy = y + index * lineHeight;
      return `<text x="${x}" y="${yy}" font-size="${size}" font-weight="${weight}" fill="#f7f4ed">${line}</text>`;
    })
    .join("");
}

function bodyTspan(text, x, y) {
  return lines(text)
    .map((line, index) => {
      const yy = y + index * 52;
      return `<text x="${x}" y="${yy}" font-size="34" font-weight="500" fill="#e8e2d7">${line}</text>`;
    })
    .join("");
}

function svg(slide, index) {
  const page = `${index + 1}`.padStart(2, "0");
  const titleY = slide.cover ? 610 : 360;
  const bodyY = slide.cover ? 840 : 650;
  const titleSize = slide.title.length > 14 ? 74 : 88;

  return Buffer.from(`
  <svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
    <rect width="${W}" height="${H}" fill="#101411"/>
    <rect x="54" y="54" width="972" height="1242" rx="34" fill="none" stroke="#d87234" stroke-width="3" opacity="0.9"/>
    <rect x="86" y="86" width="908" height="1178" rx="28" fill="#141916" opacity="0.76"/>
    <text x="118" y="152" font-size="25" letter-spacing="3" font-weight="800" fill="#d87234">${esc(slide.kicker)}</text>
    <text x="904" y="152" font-size="25" font-weight="800" fill="#9aa18f">${page}/08</text>
    ${tspan(slide.title, 118, titleY, titleSize, titleSize * 1.12, 900)}
    ${bodyTspan(slide.body, 122, bodyY)}
    <line x1="118" y1="1138" x2="962" y2="1138" stroke="#d87234" stroke-width="2" opacity="0.65"/>
    <text x="118" y="1204" font-size="30" font-weight="800" fill="#f7f4ed">阿Ken教練 施柏瑋</text>
    <text x="118" y="1248" font-size="24" font-weight="600" fill="#9aa18f">高雄・屏東｜私人教練</text>
  </svg>`);
}

async function coverBackground() {
  if (!fs.existsSync(heroPath)) return null;

  return sharp(heroPath)
    .resize(W, H, { fit: "cover" })
    .modulate({ brightness: 0.62, saturation: 0.72 })
    .blur(1.2)
    .png()
    .toBuffer();
}

async function makeSlide(slide, index, bg) {
  const base = slide.cover && bg
    ? sharp(bg).composite([
        {
          input: Buffer.from(`<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg"><rect width="${W}" height="${H}" fill="#101411" opacity="0.48"/></svg>`),
          top: 0,
          left: 0,
        },
      ])
    : sharp({
        create: {
          width: W,
          height: H,
          channels: 4,
          background: "#101411",
        },
      });

  await base
    .composite([{ input: svg(slide, index), top: 0, left: 0 }])
    .png()
    .toFile(path.join(outDir, `lengthened-partials-${String(index + 1).padStart(2, "0")}.png`));
}

fs.mkdirSync(outDir, { recursive: true });
const bg = await coverBackground();
for (const [index, slide] of slides.entries()) {
  await makeSlide(slide, index, bg);
}

console.log(`Generated ${slides.length} slides in ${path.relative(root, outDir)}`);
