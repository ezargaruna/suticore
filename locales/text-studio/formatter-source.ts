export type TextProfile = "synaura" | "syntaxium" | "clear" | "message" | "compact" | "poetry" | "faithful";

export type TextStructureSummary = {
  lines: number;
  headings: number;
  paragraphs: number;
  listItems: number;
  quotes: number;
  codeBlocks: number;
  tableRows: number;
};

export type TextOptions = {
  lowercase: boolean;
  shortDashes: boolean;
  lightEndings: boolean;
  cleanSpacing: boolean;
  protectQuotes: boolean;
  protectMarkup: boolean;
  protectedTerms: string[];
};

export const profileOptions: Record<TextProfile, Omit<TextOptions, "protectedTerms">> = {
  synaura: { lowercase: true, shortDashes: true, lightEndings: true, cleanSpacing: true, protectQuotes: true, protectMarkup: true },
  syntaxium: { lowercase: false, shortDashes: false, lightEndings: false, cleanSpacing: true, protectQuotes: true, protectMarkup: true },
  clear: { lowercase: false, shortDashes: true, lightEndings: false, cleanSpacing: true, protectQuotes: true, protectMarkup: true },
  message: { lowercase: false, shortDashes: true, lightEndings: false, cleanSpacing: true, protectQuotes: true, protectMarkup: true },
  compact: { lowercase: false, shortDashes: true, lightEndings: true, cleanSpacing: true, protectQuotes: true, protectMarkup: true },
  poetry: { lowercase: false, shortDashes: false, lightEndings: true, cleanSpacing: false, protectQuotes: true, protectMarkup: true },
  faithful: { lowercase: false, shortDashes: false, lightEndings: false, cleanSpacing: false, protectQuotes: true, protectMarkup: true },
};

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function transformProse(source: string, options: TextOptions) {
  const protectedChunks: string[] = [];
  // A delimiter absent from the source keeps literal private-use glyphs intact.
  // Encode arbitrary-size indices as private-use digits so prose rules cannot edit them.
  let tokenPrefix = "\uE000";
  while (source.includes(tokenPrefix)) tokenPrefix += "\uE000";
  const tokenPattern = new RegExp(`${tokenPrefix}([\\uE100-\\uE109]+)\\uE001`, "g");
  const systemTerms = ["SUTI.world", "SUTIcore", "synaura", "Syntaxium", "LinguaFUSION", "VereNITYA", "Psychonetica", "Eidographica", "SRETENIYA_OS", "NITYA", "VereNium", "ChatGPT"];
  const terms = [...new Set([...options.protectedTerms, ...systemTerms])].filter(Boolean).sort((a, b) => b.length - a.length);
  const protect = (value: string) => {
    const index = protectedChunks.push(value) - 1;
    const digits = String(index).replace(/\d/g, digit => String.fromCharCode(0xE100 + Number(digit)));
    return `${tokenPrefix}${digits}\uE001`;
  };

  let text = source.replace(/`[^`\n]*`|https?:\/\/[^\s<>“”„«»‘’"]+|[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}|@[\p{L}\p{N}_]{2,}/gu, protect);
  // Preserve machine syntax and conventional quoted spans before prose rules run.
  if (options.protectMarkup) {
    text = text.replace(/<!--[\s\S]*?-->|<\/?[A-Za-z][^>\n]*>/g, protect);
    text = text.replace(/\b(?:[A-Z]{2,}[A-Za-z0-9]*|[A-Z][a-z]+(?:[A-Z][A-Za-z0-9]*)+)\b/g, protect);
    text = text.replace(/\b[A-Z][A-Z0-9]*(?:[._/-][A-Za-z0-9]+)+\b/g, protect);
  }
  if (options.protectQuotes) {
    text = text.replace(/“[^”\n]*”|„[^”\n]*”|«[^»\n]*»|‘[^’\n]*’|"[^"\n]*"/g, protect);
  }
  if (terms.length) {
    const termPattern = new RegExp(`(^|[^\\p{L}\\p{N}_])(${terms.map(escapeRegExp).join("|")})(?=$|[^\\p{L}\\p{N}_])`, "giu");
    const protectTerms = (value: string) => value.replace(termPattern, (_match, prefix: string, term: string) => `${prefix}${protect(term)}`);
    // Authored terms may themselves be private-use glyphs. Match only real-text
    // gaps so such terms cannot split the delimiters of an existing shield.
    let cursor = 0;
    let withProtectedTerms = "";
    for (const token of text.matchAll(tokenPattern)) {
      withProtectedTerms += protectTerms(text.slice(cursor, token.index));
      withProtectedTerms += token[0];
      cursor = token.index + token[0].length;
    }
    text = withProtectedTerms + protectTerms(text.slice(cursor));
  }

  // Later chunks can wrap earlier ones, such as a quote containing code or a URL.
  // Expand chunks in creation order so each outer chunk restores fully in one pass.
  const restoredChunks: string[] = [];
  const restore = (value: string) => value.replace(tokenPattern, (match, digits: string) => {
    const index = Number([...digits].map(digit => digit.charCodeAt(0) - 0xE100).join(""));
    return restoredChunks[index] ?? match;
  });
  for (const chunk of protectedChunks) restoredChunks.push(restore(chunk));

  if (options.cleanSpacing) {
    // Two trailing spaces are a Markdown hard line break; keep them intact.
    text = text.split("\n").map(line => line.replace(/[\t ]+$/g, trailing => trailing === "  " ? trailing : "")).join("\n");
    text = text.replace(/\n{3,}/g, "\n\n");
  }
  if (options.shortDashes) text = text.replace(/[–—]/g, "-");
  if (options.lowercase) text = text.toLowerCase();
  if (options.lightEndings) {
    text = text.split("\n").map(line => {
      const plain = restore(line).trim();
      const words = plain.match(/[\p{L}\p{N}]+/gu)?.length ?? 0;
      return words > 0 && words <= 7 ? line.replace(/(?<!\.)\.(\s*)$/, "$1") : line;
    }).join("\n");
  }

  return restore(text);
}

export function formatText(source: string, options: TextOptions) {
  const lines = source.match(/[^\n]*(?:\n|$)/g)?.filter(Boolean) ?? [];
  let output = "";
  let prose = "";
  let fence: { marker: string; length: number } | undefined;
  // Obsidian/YAML front matter is machine metadata, not ordinary prose.
  let frontMatter = lines[0]?.trim() === "---";
  let firstLine = true;

  for (const line of lines) {
    if (frontMatter) {
      output += line;
      if (!firstLine && (line.trim() === "---" || line.trim() === "...")) frontMatter = false;
      firstLine = false;
      continue;
    }
    const marker = line.match(/^\s*(`{3,}|~{3,})/);
    if (!fence && marker) {
      output += transformProse(prose, options);
      prose = "";
      fence = { marker: marker[1][0], length: marker[1].length };
      output += line;
      continue;
    }
    if (fence) {
      output += line;
      const closing = line.trim().match(/^(`+|~+)$/)?.[1];
      if (closing && closing[0] === fence.marker && closing.length >= fence.length) fence = undefined;
      continue;
    }
    prose += line;
  }
  return output + transformProse(prose, options);
}

/** A deterministic, read-only Syntaxium view. It classifies visible structure
 * without inserting markers or changing the source. */
export function inspectTextStructure(source: string): TextStructureSummary {
  const summary: TextStructureSummary = {
    lines: source ? source.split("\n").length : 0,
    headings: 0,
    paragraphs: 0,
    listItems: 0,
    quotes: 0,
    codeBlocks: 0,
    tableRows: 0,
  };
  const lines = source.split("\n");
  let codeFence: { marker: string; length: number } | undefined;
  let inParagraph = false;

  for (const rawLine of lines) {
    const line = rawLine.trim();
    const marker = line.match(/^(`{3,}|~{3,})/);
    if (!codeFence && marker) {
      summary.codeBlocks += 1;
      codeFence = { marker: marker[1][0], length: marker[1].length };
      inParagraph = false;
      continue;
    }
    if (codeFence) {
      const closing = line.match(/^(`+|~+)$/)?.[1];
      if (closing && closing[0] === codeFence.marker && closing.length >= codeFence.length) codeFence = undefined;
      continue;
    }
    if (!line) {
      inParagraph = false;
      continue;
    }
    if (/^#{1,6}\s+/.test(line)) {
      summary.headings += 1;
      inParagraph = false;
    } else if (/^(?:[-*+]\s+|\d+[.)]\s+)/.test(line)) {
      summary.listItems += 1;
      inParagraph = false;
    } else if (/^>\s?/.test(line)) {
      summary.quotes += 1;
      inParagraph = false;
    } else if (/^\|.*\|$/.test(line)) {
      summary.tableRows += 1;
      inParagraph = false;
    } else if (/^(?:[-*_]\s*){3,}$/.test(line)) {
      inParagraph = false;
    } else if (!inParagraph) {
      summary.paragraphs += 1;
      inParagraph = true;
    }
  }
  return summary;
}
