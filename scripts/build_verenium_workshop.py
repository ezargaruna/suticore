#!/usr/bin/env python3
"""Assemble the standalone and offline Verenium workshop with all editions."""

from argparse import ArgumentParser
import json
from pathlib import Path
from re import sub

ROOT = Path(__file__).resolve().parents[1]
SOURCES = ROOT / "locales/verenium"
CODES = ("ru", "en", "es-419", "pt-BR", "fr", "ar", "zh-Hans", "hi", "bn", "eo", "sa", "la")


def check_shape(reference, current, field):
    if isinstance(reference, dict):
        if not isinstance(current, dict) or reference.keys() != current.keys():
            raise SystemExit(f"Missing or extra workshop keys at {field}")
        for key in reference:
            check_shape(reference[key], current[key], f"{field}.{key}")
    elif isinstance(reference, list):
        if not isinstance(current, list) or len(reference) != len(current):
            raise SystemExit(f"Invalid workshop list at {field}")
        for index, (expected, found) in enumerate(zip(reference, current)):
            check_shape(expected, found, f"{field}.{index}")
    elif not isinstance(current, str) or not current.strip():
        raise SystemExit(f"Empty workshop copy at {field}")


def main():
    parser = ArgumentParser()
    parser.add_argument("--check", action="store_true")
    args = parser.parse_args()
    editions = {code: json.loads((SOURCES / f"{code}.json").read_text(encoding="utf-8")) for code in CODES}
    for code, edition in editions.items():
        check_shape(editions["en"], edition, code)
    payload = json.dumps(editions, ensure_ascii=False, separators=(",", ":")).replace("<", r"\u003c")
    template = (SOURCES / "workshop.template.html").read_text(encoding="utf-8")
    script = (SOURCES / "workshop.js").read_text(encoding="utf-8").rstrip()
    if "</script" in script.lower():
        raise SystemExit("Unsafe script boundary")
    theme = (ROOT / "assets/css/suti-angels-editorial.css").read_text(encoding="utf-8")
    # Local and sandboxed copies are usable without downloading web fonts.
    theme = sub(r"@font-face\s*\{[^}]*\}", "", theme)
    if "</style" in theme.lower():
        raise SystemExit("Unsafe style boundary")
    output = template.replace("<!-- workshop-locales -->", payload).replace("/* workshop-script */", script)
    output = output.replace("/* workshop-theme */", theme.rstrip())
    for name in ("verenium.html", "virenium.html"):
        path = ROOT / name
        if args.check:
            if not path.is_file() or path.read_text(encoding="utf-8") != output:
                raise SystemExit(f"Stale workshop page: {name}")
        else:
            path.write_text(output, encoding="utf-8")
    print(f"Verenium workshop: {len(editions)} editions and an explicit Yazekh Russian fallback")


if __name__ == "__main__":
    main()
