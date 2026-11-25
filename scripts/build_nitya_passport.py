#!/usr/bin/env python3
"""Render the NITYA × .todeus passport with full editorial language editions."""

from argparse import ArgumentParser
from hashlib import sha256
from html import escape
from html.parser import HTMLParser
import json
from pathlib import Path
import re

from build_verenium_workshop import CODES, check_shape

ROOT = Path(__file__).resolve().parents[1]
FOLDER = ROOT / "locales/nitya-passport"
BASELINE = "c20695d6780502f96390ce87e89b9a87babfcff4"


class PhraseParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.language = None
        self.parts = []
        self.phrases = {}

    def handle_starttag(self, tag, attrs):
        if tag == "td":
            self.language = dict(attrs).get("lang")
            self.parts = []

    def handle_data(self, data):
        if self.language:
            self.parts.append(data)

    def handle_endtag(self, tag):
        if tag == "td":
            if self.language:
                text = "".join(self.parts).strip()
                if "sūt · nīt · dār" not in text:
                    code = "es-419" if self.language == "es" else self.language
                    self.phrases[code] = text
            self.language = None


def write(path, text, check):
    if check:
        if not path.is_file() or path.read_text(encoding="utf-8") != text:
            raise SystemExit(f"Stale generated NITYA passport: {path}")
    else:
        path.write_text(text, encoding="utf-8")


def main():
    parser = ArgumentParser()
    parser.add_argument("--check", action="store_true")
    args = parser.parse_args()
    editions = {code: json.loads((FOLDER / f"{code}.json").read_text(encoding="utf-8"))
                for code in CODES}
    template = (FOLDER / "template.html").read_text(encoding="utf-8")
    markers = set(re.findall(r'data-copy(?:-aria-label|-content)?="([^"]+)"', template))
    if markers | {"language", "review"} != editions["en"].keys():
        raise SystemExit("NITYA passport copy keys do not match template markers")
    for code, words in editions.items():
        check_shape(editions["en"], words, f"nitya-passport.{code}")

    phrases = PhraseParser()
    phrases.feed(template)
    original = json.loads((FOLDER / "original-phrases.json").read_text(encoding="utf-8"))
    if set(phrases.phrases) != set(CODES) or phrases.phrases != original["phrases"]:
        raise SystemExit("Original multilingual phrase samples changed")

    runtime = (ROOT / "locales/audits/runtime.js").read_text(encoding="utf-8").rstrip()
    theme = (ROOT / "assets/css/suti-angels-editorial.css").read_text(encoding="utf-8")
    theme = theme.replace('url("../fonts/', 'url("https://ezargaruna.github.io/suticore/assets/fonts/')
    css = (FOLDER / "editions.css").read_text(encoding="utf-8").rstrip()
    if "</script" in runtime.lower() or "</style" in (theme + css).lower():
        raise SystemExit("Unsafe inline NITYA passport boundary")

    template = re.sub(
        r'(<[^>]+data-copy="([^"]+)"[^>]*>)[^<]*(</[^>]+>)',
        lambda match: match[1] + escape(editions["en"][match[2]]) + match[3], template)
    payload = json.dumps(editions, ensure_ascii=False, separators=(",", ":")).replace("<", r"\u003c")
    page = template.replace("<!-- passport-locales -->", payload)
    page = page.replace("/* passport-theme */", theme).replace("/* passport-style */", css)
    page = page.replace("/* passport-runtime */", runtime)
    write(ROOT / "nitya-todeus.html", page, args.check)

    manifest = {
        "sourceRevision": BASELINE,
        "sourceLocale": "en",
        "sourceSha256": original["sourceSha256"],
        "rights": "Editorial derivative of the public first-party passport under the repository MIT notice. Linked materials retain their own terms.",
        "fieldsPerWrittenEdition": len(editions["en"]),
        "writtenEditions": len(editions),
        "pageSha256": sha256(page.encode("utf-8")).hexdigest(),
        "originalPhraseSha256": {
            code: sha256(text.encode("utf-8")).hexdigest()
            for code, text in original["phrases"].items()
        },
        "routes": {},
    }
    for code in (*CODES, "yzh"):
        lang = "en" if code == "yzh" else code
        review = {
            "en": "source-edition", "eo": "independent-fluent-review-pending",
            "la": "qualified-review-pending", "sa": "qualified-review-pending",
            "yzh": "authorial-hold-english-fallback",
        }.get(code, "independent-language-review-pending")
        manifest["routes"][code] = {"href": f"/nitya-todeus.html?lang={code}",
                                    "lang": lang, "dir": "rtl" if lang == "ar" else "ltr",
                                    "review": review}
    write(FOLDER / "coverage.json", json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", args.check)
    print("NITYA passport: 12 written editions, 13 routes and 12 intact source phrase samples")


if __name__ == "__main__":
    main()
