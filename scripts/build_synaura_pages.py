#!/usr/bin/env python3
"""Render the Synaura public landing and method specification in each edition."""

from argparse import ArgumentParser
from hashlib import sha256
import json
from pathlib import Path
import re

from build_synaura_guide import LANGUAGES
from build_verenium_workshop import CODES, check_shape

ROOT = Path(__file__).resolve().parents[1]
PAGES = ROOT / "locales/synaura/pages"
NAMES = ("synaura", "synaura-modules")
BASELINE = "8e2f22263c8dae4ee8f1d797522f6c5522c68d17"


def emit(path, contents, check):
    if check:
        if not path.is_file() or path.read_text(encoding="utf-8") != contents:
            raise SystemExit(f"Stale generated Synaura edition: {path}")
    else:
        path.write_text(contents, encoding="utf-8")


def main():
    parser = ArgumentParser()
    parser.add_argument("--check", action="store_true")
    args = parser.parse_args()
    script = (PAGES / "runtime.js").read_text(encoding="utf-8").rstrip()
    style = (PAGES / "editions.css").read_text(encoding="utf-8").rstrip()
    theme = (ROOT / "assets/css/suti-angels-editorial.css").read_text(encoding="utf-8")
    theme = re.sub(r"@font-face\s*\{[^}]*\}", "", theme).strip()
    if "</script" in script.lower() or "</style" in (style + theme).lower():
        raise SystemExit("Unsafe inline Synaura boundaries")
    manifest = {
        "baseline": BASELINE,
        "rights": "Editorial derivatives of two public first-party documents; repository MIT notice and separate rights of linked materials apply.",
        "artifactStatus": "method and design drafts; software implementation and validation are separate",
        "pages": {},
    }
    languages = [(slug, tag, name) for slug, tag, _, name in LANGUAGES]
    for name in NAMES:
        folder = PAGES / name
        template = (folder / "template.html").read_text(encoding="utf-8")
        editions = {code: json.loads((folder / f"{code}.json").read_text(encoding="utf-8")) for code in CODES}
        fields = set(re.findall(r'data-copy(?:-aria-label|-content)?="([^"]+)"', template))
        if fields | {"language", "review"} != editions["ru"].keys():
            raise SystemExit(f"Invalid Synaura template mapping: {name}")
        for code, words in editions.items():
            check_shape(editions["ru"], words, f"{name}.{code}")
            if name == "synaura-modules" and len(words["t098"].splitlines()) != 3:
                raise SystemExit(f"Invalid Syntaxium example line count: {code}")
        payload = json.dumps({"editions": editions, "languages": languages}, ensure_ascii=False,
                             separators=(",", ":")).replace("<", r"\u003c")
        page = template.replace("<!-- edition-locales -->", payload)
        page = page.replace("/* edition-runtime */", script).replace("/* edition-style */", style)
        page = page.replace("/* edition-theme */", theme)
        emit(ROOT / f"{name}.html", page, args.check)
        routes = {}
        for slug, rendered, _ in languages:
            code = "yzh" if slug == "yzh" else rendered
            status = {
                "ru": "source-edition", "yzh": "authorial-hold-russian-fallback",
                "eo": "independent-fluent-review-pending", "sa": "qualified-review-pending",
                "la": "qualified-review-pending",
            }.get(code, "independent-language-review-pending")
            routes[code] = {"href": f"/{name}.html?lang={code}", "lang": rendered,
                            "dir": "rtl" if rendered == "ar" else "ltr", "review": status}
        manifest["pages"][name] = {
            "fieldsPerWrittenEdition": len(editions["ru"]),
            "writtenEditions": len(editions),
            "sha256": sha256(page.encode("utf-8")).hexdigest(),
            "routes": routes,
        }
        print(f"{name}: {len(editions)} written editions and Russian fallback for Yazekh")
    emit(PAGES / "coverage.json", json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", args.check)


if __name__ == "__main__":
    main()
