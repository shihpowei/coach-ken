import fs from "node:fs";
import path from "node:path";
import { getCliClient } from "sanity/cli";

const root = process.cwd();
const articlePath = path.join(root, "content/social/protein-training/website-article.md");
const heroPath = path.join(root, "public/uploads/protein-training-hero.png");
const slug = "protein-and-strength-training";
const documentId = `post-${slug}`;
const draft = process.argv.includes("--draft");

function key(prefix, index) {
  return `${prefix}${String(index).padStart(3, "0")}`;
}

function span(text, index) {
  return {
    _type: "span",
    _key: key("s", index),
    text,
    marks: [],
  };
}

function block(text, style, index) {
  return {
    _type: "block",
    _key: key("b", index),
    style,
    markDefs: [],
    children: [span(text, index)],
  };
}

function parseArticle(markdown) {
  const [, bodyPart = ""] = markdown.split("## 文章全文");
  const lines = bodyPart
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  const blocks = [];
  let blockIndex = 1;

  for (const line of lines) {
    if (line.startsWith("## ")) {
      blocks.push(block(line.replace(/^##\s+/, ""), "h2", blockIndex));
    } else if (line.startsWith("> ")) {
      blocks.push(block(line.replace(/^>\s+/, ""), "blockquote", blockIndex));
    } else {
      blocks.push(block(line, "normal", blockIndex));
    }
    blockIndex += 1;
  }

  return blocks;
}

function readMeta(markdown, label) {
  const match = markdown.match(new RegExp(`^${label}:\\\\s*(.+)$`, "m"));
  return match?.[1]?.trim();
}

async function main() {
  const markdown = fs.readFileSync(articlePath, "utf8");
  const client = getCliClient({ apiVersion: "2024-01-01" });

  const asset = await client.assets.upload("image", fs.createReadStream(heroPath), {
    filename: path.basename(heroPath),
    contentType: "image/png",
  });

  const doc = {
    _id: draft ? `drafts.${documentId}` : documentId,
    _type: "post",
    title: "蛋白質吃夠就會長肌肉嗎？為什麼重訓才是關鍵",
    slug: {
      _type: "slug",
      current: slug,
    },
    seoTitle:
      readMeta(markdown, "SEO title") ||
      "蛋白質吃夠就會長肌肉嗎？重訓才是增肌關鍵｜阿Ken教練 施柏瑋",
    seoDescription:
      readMeta(markdown, "SEO description") ||
      "蛋白質是肌肉修復與成長的材料，但重訓才是讓身體開始建立肌肉的關鍵刺激。",
    mainImage: {
      _type: "image",
      asset: {
        _type: "reference",
        _ref: asset._id,
      },
    },
    publishedAt: new Date().toISOString(),
    body: parseArticle(markdown),
  };

  await client.createOrReplace(doc);
  console.log(JSON.stringify({ id: doc._id, slug, imageAssetId: asset._id }, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
