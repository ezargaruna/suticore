#!/usr/bin/env python3
"""Build localized public audit pages with their original evidence boundaries."""

from argparse import ArgumentParser
import json
from pathlib import Path
import re

from build_verenium_workshop import CODES, check_shape

ROOT = Path(__file__).resolve().parents[1]
SOURCES = ROOT / "locales/audits"
PAGES = {"audits": "en", "care-app-audit": "ru"}


def main():
    parser = ArgumentParser()
    parser.add_argument("--check", action="store_true")
    args = parser.parse_args()
    script = (SOURCES / "runtime.js").read_text(encoding="utf-8").rstrip()
    style = (SOURCES / "editions.css").read_text(encoding="utf-8").rstrip()
    if "</script" in script.lower() or "</style" in style.lower():
        raise SystemExit("Unsafe audit template boundaries")
    for name, source in PAGES.items():
        folder = SOURCES / name
        template = (folder / "template.html").read_text(encoding="utf-8")
        editions = {code: json.loads((folder / f"{code}.json").read_text(encoding="utf-8")) for code in CODES}
        for code, words in editions.items():
            check_shape(editions[source], words, f"{name}.{code}")
        keys = set(re.findall(r'data-copy(?:-aria-label|-data-label|-content)?="([^"]+)"', template))
        if keys | {"language", "review"} != editions[source].keys():
            raise SystemExit(f"Audit template and copy keys differ: {name}")
        payload = json.dumps(editions, ensure_ascii=False, separators=(",", ":")).replace("<", r"\u003c")
        result = template.replace("<!-- audit-locales -->", payload)
        result = result.replace("/* audit-runtime */", script).replace("/* audit-edition-style */", style)
        target = ROOT / f"{name}.html"
        if args.check:
            if target.read_text(encoding="utf-8") != result:
                raise SystemExit(f"Stale audit editions: {name}")
        else:
            target.write_text(result, encoding="utf-8")
        print(f"{name}: {len(editions)} written editions, {len(editions[source])} translated fields and labeled Yazekh source fallback")


if __name__ == "__main__":
    main()
