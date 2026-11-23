#!/usr/bin/env python3
"""Package the public OpenAI audit notes for Obsidian and record provenance."""

from argparse import ArgumentParser
from hashlib import sha256
from io import BytesIO
import json
from pathlib import Path
import re
from zipfile import ZipFile, ZipInfo

from build_verenium_workshop import CODES

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "audit-crystal.zip"
FOLDER = ROOT / "locales/audits/openai-crystal"
BASELINE = "97dfb96382ee4ff1ce8a78ecc2cc023d8d55e30f"
MEMBERS = ("README.md", "audit.md", "test.md")
REVIEW = {
    "en": "source-edition",
    "eo": "independent-fluent-review-pending",
    "sa": "qualified-review-pending",
    "la": "qualified-review-pending",
}


def sha(data):
    return sha256(data).hexdigest()


def zip_notes(notes, language, review, notice, source_hash):
    buffer = BytesIO()
    readme = "\n".join((notes["README.md"].rstrip(), "", review, "",
                        f"[SUTI.world · {language}](https://suti.world/openai-crystal.html?lang={language}) · [[LICENSE]]",
                        "", f"`SHA-256 / audit-crystal.zip` · `{source_hash}`", ""))
    with ZipFile(buffer, "w") as pack:
        for name, content in (("README.md", readme), ("audit.md", notes["audit.md"]),
                              ("test.md", notes["test.md"]), ("LICENSE.md", notice)):
            member = ZipInfo(f"OpenAI/{name}", (2026, 11, 14, 0, 0, 0))
            member.create_system = 3
            member.external_attr = 0o100644 << 16
            pack.writestr(member, content.rstrip() + "\n")
    return buffer.getvalue()


def main():
    parser = ArgumentParser()
    parser.add_argument("--check", action="store_true")
    parser.add_argument("--output-dir", type=Path)
    args = parser.parse_args()
    source_hash = sha(SOURCE.read_bytes())
    notice = (ROOT / "LICENSE").read_text(encoding="utf-8")
    with ZipFile(SOURCE) as source:
        original = {name: source.read(f"OpenAI/{name}").decode("utf-8") for name in MEMBERS}
    external = set(re.findall(r"https://[^)\s]+", original["audit.md"]))
    ledger = {"baseline": BASELINE, "sourceLocale": "en",
              "pageSha256": sha((ROOT / "openai-crystal.html").read_bytes()), "original": {"path": "/audit-crystal.zip", "sha256": source_hash},
              "rights": "MIT for the SUTI-authored audit notes. Linked sources and third-party marks retain their own rights.",
              "scope": "Editorial notes and proposed test. External sources are linked, not reproduced.", "routes": {}}
    for language in CODES:
        notes = original if language == "en" else json.loads((FOLDER / "notes" / f"{language}.json").read_text(encoding="utf-8"))
        if set(notes) != set(MEMBERS) or any(not text.strip() for text in notes.values()):
            raise SystemExit(f"Invalid Obsidian notes: {language}")
        if any(f"[[{name}]]" not in notes["README.md"] for name in ("audit", "test")):
            raise SystemExit(f"Broken Obsidian cross-references: {language}")
        if set(re.findall(r"https://[^)\s]+", notes["audit.md"])) != external:
            raise SystemExit(f"Source links changed in archive: {language}")
        words = json.loads((FOLDER / f"{language}.json").read_text(encoding="utf-8"))
        content = zip_notes(notes, language, words["review"], notice, source_hash)
        path = f"/downloads/openai-crystal/{language}.zip"
        ledger["routes"][language] = {
            "path": path,
            "lang": language,
            "review": REVIEW.get(language, "independent-language-review-pending"),
            "archiveSha256": sha(content),
            "page": f"/openai-crystal.html?lang={language}",
        }
        if args.output_dir:
            args.output_dir.mkdir(parents=True, exist_ok=True)
            (args.output_dir / f"{language}.zip").write_bytes(content)
    ledger["routes"]["yzh"] = {**ledger["routes"]["en"], "page": "/openai-crystal.html?lang=yzh",
                               "review": "authorial-hold-english-fallback"}
    encoded = json.dumps(ledger, ensure_ascii=False, indent=2) + "\n"
    target = FOLDER / "coverage.json"
    if args.check:
        if not target.exists() or target.read_text(encoding="utf-8") != encoded:
            raise SystemExit("Stale OpenAI archive manifest")
    else:
        target.write_text(encoded, encoding="utf-8")
    if args.output_dir:
        (args.output_dir / "coverage.json").write_text(encoded, encoding="utf-8")
    print(f"{len(CODES)} OpenAI archives verified against original note links and terms")


if __name__ == "__main__":
    main()
