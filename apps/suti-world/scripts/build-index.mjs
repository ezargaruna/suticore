import fg from "fast-glob";
import fs from "node:fs";

const files = await fg([
  "../../README.md",
  "../../SYSTEM_MAP.md",
  "../../llms.md",
  "../../notice.md",
  "../../ai-policy.md",
  "../../sreteniya-manifest.md",
  "../../specificationes/**/*.md",
  "../../normae/**/*.md",
  "../../protocolla/**/*.md",
  "../../docs/**/*.md",
  "../../core/**/*.md"
]);

const docs = files.map(file => ({
  path: file,
  slug: file
    .replace("../../","")
    .replace(/\.md$/,"")
}));

fs.mkdirSync("./public/index",{recursive:true});

fs.writeFileSync(
  "./public/index/documents.json",
  JSON.stringify(docs,null,2)
);

console.log("indexed",docs.length,"documents");
