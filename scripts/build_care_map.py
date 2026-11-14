#!/usr/bin/env python3
"""Assemble the standalone care map from public edition sources."""

from argparse import ArgumentParser
import json
from pathlib import Path
from re import sub

from build_verenium_workshop import CODES, check_shape

ROOT = Path(__file__).resolve().parents[1]
SOURCES = ROOT / "locales/care-map"


def main():
    parser = ArgumentParser()
    parser.add_argument("--check", action="store_true")
    args = parser.parse_args()
    editions = {code: json.loads((SOURCES / f"{code}.json").read_text(encoding="utf-8")) for code in CODES}
    for code, edition in editions.items():
        check_shape(editions["ru"], edition, code)
    payload = json.dumps(editions, ensure_ascii=False, separators=(",", ":")).replace("<", r"\u003c")
    template = (SOURCES / "map.template.html").read_text(encoding="utf-8")
    script = (SOURCES / "map.js").read_text(encoding="utf-8").rstrip()
    with (ROOT / "assets/css/suti-angels-editorial.css").open(encoding="utf-8") as source:
        theme = sub(r"@font-face\s*\{[^}]*\}", "", source.read()).strip()
    if "</script" in script.lower() or "</style" in theme.lower():
        raise SystemExit("Unsafe map template boundary")
    content = template.replace("<!-- map-copy -->", payload).replace("/* map-script */", script)
    content = content.replace("/* map-theme */", theme)
    path = ROOT / "care-map.html"
    if args.check:
        if path.read_text(encoding="utf-8") != content:
            raise SystemExit("Stale care map page")
    else:
        path.write_text(content, encoding="utf-8")
    print(f"Care map: {len(editions)} written editions, 13 threads and labeled Russian fallback for Yazekh")


if __name__ == "__main__":
    main()
