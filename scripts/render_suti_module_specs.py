#!/usr/bin/env python3
"""Render the English SUTI module Markdown sources as static HTML pages."""
from pathlib import Path
import re
import shutil
import subprocess

ROOT = Path(__file__).resolve().parents[1]
MODULE_DIR = ROOT / "modules" / "suti"
TEMPLATE = MODULE_DIR / "spec-page.template.html"
SOURCES = (
    "suticore-2026.11.en.md",
    "synaura-2026.11.en.md",
    "syntaxium-2026.11.en.md",
)


def metadata_and_body(text: str) -> tuple[str, str]:
    if not text.startswith("---\n"):
        raise ValueError("missing YAML metadata")
    _, front, body = text.split("---\n", 2)
    title = re.search(r"(?m)^title:\s*(.+)$", front)
    if not title:
        raise ValueError("missing title")
    return title.group(1).strip(), body.lstrip()


def main() -> None:
    pandoc = shutil.which("pandoc")
    if not pandoc:
        raise SystemExit("pandoc is required to refresh the committed HTML pages")
    for filename in SOURCES:
        source = MODULE_DIR / filename
        title, body = metadata_and_body(source.read_text(encoding="utf-8"))
        output = source.with_suffix(".html")
        subprocess.run(
            [pandoc, "--from=gfm", "--to=html5", "--standalone",
             f"--template={TEMPLATE}", f"--metadata=title:{title}",
             f"--metadata=source:{filename}", "--output", str(output)],
            input=body, text=True, check=True,
        )
        print(f"rendered :: {output.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
