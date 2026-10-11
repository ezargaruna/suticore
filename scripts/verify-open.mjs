#!/usr/bin/env node
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const root = process.cwd();
const openRoot = path.join(root, 'open');
const failures = [];
const ids = new Map();
const markdownFiles = [];

async function walk(directory) {
  for (const item of await readdir(directory, { withFileTypes: true })) {
    const full = path.join(directory, item.name);
    const relative = path.relative(root, full);
    if (/[A-Z]/.test(item.name)) failures.push(`${relative}: uppercase filename`);
    if (item.isDirectory()) await walk(full);
    else if (item.isFile() && item.name.endsWith('.md')) markdownFiles.push(full);
  }
}

function targetExists(fromFile, href) {
  const decoded = decodeURIComponent(href.split('#')[0].split('?')[0]);
  if (!decoded) return true;
  const target = path.resolve(path.dirname(fromFile), decoded);
  return target === root || target.startsWith(`${root}${path.sep}`);
}

await walk(openRoot);
for (const file of markdownFiles) {
  const relative = path.relative(root, file);
  const body = await readFile(file, 'utf8');
  const frontmatter = body.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
  if (!frontmatter) {
    failures.push(`${relative}: missing frontmatter`);
    continue;
  }
  const fields = new Map(frontmatter[1].split(/\r?\n/).flatMap(line => {
    const match = line.match(/^([a-z_]+):\s*(.*?)\s*$/);
    return match ? [[match[1], match[2]]] : [];
  }));
  for (const [key, expected] of Object.entries({ status: 'public', access: 'open', privacy: 'public', license: 'MIT' })) {
    if (fields.get(key) !== expected) failures.push(`${relative}: ${key} must be ${expected}`);
  }
  const id = fields.get('id');
  if (!id) failures.push(`${relative}: missing id`);
  else if (ids.has(id)) failures.push(`${relative}: duplicate id ${id} also in ${ids.get(id)}`);
  else ids.set(id, relative);

  const links = [...body.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)].map(match => match[1].trim().replace(/^<|>$/g, ''));
  for (const href of links) {
    if (/^(https?:|mailto:|obsidian:|#)/i.test(href)) continue;
    if (!targetExists(file, href)) failures.push(`${relative}: link escapes repository: ${href}`);
    else {
      const target = path.resolve(path.dirname(file), decodeURIComponent(href.split('#')[0].split('?')[0]));
      if (target !== root) {
        try { await readFile(target); }
        catch { failures.push(`${relative}: missing link target: ${href}`); }
      }
    }
  }

  const lines = body.split(/\r?\n/);
  lines.forEach((line, index) => {
    if (/-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----|\b(?:api[_ -]?key|secret[_ -]?key|access[_ -]?token)\s*[:=]\s*\S+/i.test(line)) {
      failures.push(`${relative}:${index + 1}: possible secret marker`);
    }
    if (/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i.test(line)) {
      failures.push(`${relative}:${index + 1}: possible email address`);
    }
  });
}

if (failures.length) {
  console.error(`open contour: FAIL (${failures.length})`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log(`open contour: PASS (${markdownFiles.length} markdown files, ${ids.size} unique ids)`);
  console.log('checks: frontmatter · ids · local links · path boundaries · basic secret markers');
}
