import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const outputDir = path.join(root, "public/social/protein-training");
const heroPath = path.join(root, "public/uploads/protein-training-hero.png");

const palette = {
  ink: "#1d2320",
  muted: "#5f6b63",
  olive: "#7d8f69",
  orange: "#e36f2c",
  cream: "#f7f3ea",
  white: "#ffffff",
  line: "#d8ddd2",
  dark: "#25332c",
};

function escapeXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function wrapText(text, maxChars) {
  const tokens = String(text).split("");
  const lines = [];
  let line = "";

  for (const token of tokens) {
    if (line.length >= maxChars && /[，。？！、：；]/.test(token) === false) {
      lines.push(line);
      line = token;
    } else {
      line += token;
    }
  }

  if (line) lines.push(line);
  return lines;
}

function textLines(lines, x, y, options = {}) {
  const {
    size = 44,
    weight = 600,
    color = palette.ink,
    lineHeight = Math.round(size * 1.45),
    maxChars = 18,
  } = options;

  const expanded = lines.flatMap((line) => wrapText(line, maxChars));
  return expanded
    .map(
      (line, index) =>
        `<text x="${x}" y="${y + index * lineHeight}" fill="${color}" font-size="${size}" font-weight="${weight}">${escapeXml(line)}</text>`
    )
    .join("\n");
}

function svgFrame({ width, height, title, kicker, lines, page, accent = palette.orange }) {
  const body = textLines(lines, 92, 405, {
    size: 48,
    weight: 650,
    lineHeight: 72,
    maxChars: 16,
    color: palette.ink,
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${width}" height="${height}" fill="${palette.cream}"/>
  <rect x="50" y="50" width="${width - 100}" height="${height - 100}" rx="34" fill="${palette.white}" stroke="${palette.line}" stroke-width="2"/>
  <rect x="74" y="${height - 390}" width="${width - 148}" height="250" rx="28" fill="${palette.cream}" opacity="0.52"/>
  <circle cx="${width - 170}" cy="175" r="70" fill="${accent}" opacity="0.14"/>
  <circle cx="${width - 105}" cy="250" r="30" fill="${palette.olive}" opacity="0.24"/>
  <rect x="${width - 315}" y="${height - 280}" width="170" height="28" rx="14" fill="${palette.dark}" opacity="0.9"/>
  <rect x="${width - 275}" y="${height - 238}" width="86" height="120" rx="18" fill="${palette.olive}" opacity="0.95"/>
  <rect x="${width - 350}" y="${height - 205}" width="250" height="32" rx="16" fill="${palette.ink}" opacity="0.86"/>
  <line x1="${width - 355}" y1="${height - 182}" x2="${width - 95}" y2="${height - 182}" stroke="${palette.ink}" stroke-width="18" stroke-linecap="round" opacity="0.86"/>
  <circle cx="${width - 390}" cy="${height - 182}" r="32" fill="${accent}" opacity="0.92"/>
  <circle cx="${width - 60}" cy="${height - 182}" r="32" fill="${accent}" opacity="0.92"/>
  <text x="92" y="125" fill="${accent}" font-size="28" font-weight="700">${escapeXml(kicker)}</text>
  <text x="92" y="205" fill="${palette.ink}" font-size="62" font-weight="800">${escapeXml(title)}</text>
  <line x1="92" y1="280" x2="250" y2="280" stroke="${accent}" stroke-width="8" stroke-linecap="round"/>
  ${body}
  <text x="92" y="${height - 92}" fill="${palette.muted}" font-size="26" font-weight="600">阿Ken教練 施柏瑋｜高雄・屏東專業健身教練</text>
  <text x="${width - 150}" y="${height - 92}" fill="${palette.muted}" font-size="26" font-weight="600">${page}</text>
</svg>`;
}

function heroSvg() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0" stop-color="#25332c"/>
      <stop offset="1" stop-color="#7d8f69"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect x="64" y="64" width="1072" height="502" rx="40" fill="#ffffff" opacity="0.92"/>
  <circle cx="970" cy="225" r="108" fill="#e36f2c" opacity="0.14"/>
  <rect x="835" y="360" width="182" height="30" rx="15" fill="#25332c"/>
  <rect x="880" y="292" width="90" height="132" rx="20" fill="#7d8f69"/>
  <line x1="800" y1="390" x2="1050" y2="390" stroke="#25332c" stroke-width="20" stroke-linecap="round"/>
  <circle cx="770" cy="390" r="34" fill="#e36f2c"/>
  <circle cx="1084" cy="390" r="34" fill="#e36f2c"/>
  <circle cx="870" cy="190" r="26" fill="#f7f3ea" stroke="#25332c" stroke-width="7"/>
  <path d="M861 186 L879 186 L879 266 L861 266 Z" fill="#25332c"/>
  <ellipse cx="986" cy="470" rx="86" ry="28" fill="#d8ddd2"/>
  <rect x="912" y="436" width="154" height="38" rx="19" fill="#f7f3ea" stroke="#25332c" stroke-width="4"/>
  <text x="110" y="160" fill="#e36f2c" font-size="30" font-weight="700">教練專欄</text>
  <text x="110" y="250" fill="#1d2320" font-size="72" font-weight="850">蛋白質是建材</text>
  <text x="110" y="335" fill="#1d2320" font-size="72" font-weight="850">重訓才是開工訊號</text>
  <text x="110" y="430" fill="#5f6b63" font-size="32" font-weight="600">吃夠很重要，訓練刺激才會開始重建。</text>
  <text x="110" y="515" fill="#5f6b63" font-size="27" font-weight="650">阿Ken教練 施柏瑋｜高雄・屏東專業健身教練</text>
</svg>`;
}

async function renderPng(svg, file, width, height) {
  await sharp(Buffer.from(svg)).png().resize(width, height).toFile(file);
}

async function main() {
  await fs.mkdir(outputDir, { recursive: true });
  await fs.mkdir(path.dirname(heroPath), { recursive: true });

  await renderPng(heroSvg(), heroPath, 1200, 630);

  const cards = [
    {
      title: "蛋白質吃夠就會長肌肉嗎？",
      kicker: "教練專欄",
      lines: ["你可以把蛋白質想成建材。", "但真正讓身體開始蓋肌肉的，是訓練刺激。"],
    },
    {
      title: "蛋白質是材料",
      kicker: "重點 1",
      lines: ["乳清、雞胸肉、豆腐都很好。", "但如果沒有訓練，身體不一定會想增加肌肉。"],
    },
    {
      title: "重訓是開工通知",
      kicker: "重點 2",
      lines: ["訓練給身體訊號：", "這些肌肉我需要，請幫我修復、適應、變強。"],
    },
    {
      title: "不是越多越好",
      kicker: "重點 3",
      lines: ["蛋白質要夠。", "但無限加量，不會讓肌肉無限成長。"],
    },
    {
      title: "生活版怎麼吃？",
      kicker: "實作",
      lines: ["先問自己：", "每一餐有沒有一份明確的蛋白質？"],
    },
    {
      title: "減脂更要重訓",
      kicker: "減脂",
      lines: ["少吃只會讓體重下降。", "重訓和蛋白質，幫你盡量保留肌肉。"],
    },
    {
      title: "年長者更需要吃夠 + 練對",
      kicker: "年長者",
      lines: ["肌肉不只是外觀。", "它關係到走路、上下樓梯、站起來和跌倒風險。"],
    },
    {
      title: "教練結論",
      kicker: "記住一句話",
      lines: ["蛋白質是建材。", "重訓才是開工訊號。"],
    },
  ];

  for (let index = 0; index < cards.length; index += 1) {
    const file = path.join(outputDir, `protein-training-${String(index + 1).padStart(2, "0")}.png`);
    const svg = svgFrame({
      width: 1080,
      height: 1350,
      ...cards[index],
      page: `${index + 1}/${cards.length}`,
    });
    await renderPng(svg, file, 1080, 1350);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
