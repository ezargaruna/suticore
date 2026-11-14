#!/usr/bin/env python3
"""Build the public Samurai Dharma page from its editorial editions."""

from argparse import ArgumentParser
import json
from pathlib import Path
import re

from build_verenium_workshop import CODES, check_shape

ROOT = Path(__file__).resolve().parents[1]
SOURCES = ROOT / "locales/samurai-dharma"


def main():
    parser = ArgumentParser()
    parser.add_argument("--check", action="store_true")
    arguments = parser.parse_args()
    editions = {code: json.loads((SOURCES / f"{code}.json").read_text(encoding="utf-8")) for code in CODES}
    for code, words in editions.items():
        check_shape(editions["ru"], words, code)
    template = (SOURCES / "template.html").read_text(encoding="utf-8")
    runtime = (SOURCES / "runtime.js").read_text(encoding="utf-8").rstrip()
    style = (SOURCES / "editions.css").read_text(encoding="utf-8").rstrip()
    if "</script" in runtime.lower() or "</style" in style.lower():
        raise SystemExit("Unsafe template boundary")
    if re.findall(r'data-copy="([^"]+)"', template) != [key for key in editions["ru"] if key.startswith("t")]:
        raise SystemExit("Template and source copy keys differ")
    copy = json.dumps(editions, ensure_ascii=False, separators=(",", ":")).replace("<", r"\u003c")
    result = template.replace("<!-- samurai-copy -->", copy)
    result = result.replace("/* samurai-runtime */", runtime).replace("/* samurai-style */", style)
    output = ROOT / "samurai-dharma.html"
    if arguments.check:
        if output.read_text(encoding="utf-8") != result:
            raise SystemExit("Stale Samurai Dharma editions")
    else:
        output.write_text(result, encoding="utf-8")
    print(f"Samurai Dharma: {len(editions)} editions, {len(editions['ru'])} strings each and labeled Yazekh fallback")


if __name__ == "__main__":
    main()
