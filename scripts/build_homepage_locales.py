#!/usr/bin/env python3
"""Validate and embed the homepage locale payloads and review statuses."""

from argparse import ArgumentParser
from hashlib import sha256
import json
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
LOCALES = ROOT / "locales/homepage"
ADDED = {"fr": "ltr", "ar": "rtl", "zh-Hans": "ltr", "hi": "ltr", "bn": "ltr", "eo": "ltr"}
SCRIPT = re.compile(r'(<script type="application/json" id="homepage-locale-data">).*?(</script>)', re.S)
ROUTE_KEYS = {"speak", "listen", "read", "write", "study", "travel"}


def read(name):
    return json.loads((LOCALES / name).read_text(encoding="utf-8"))


def sha(value):
    return sha256(value.encode("utf-8")).hexdigest()


def main():
    parser = ArgumentParser()
    parser.add_argument("--check", action="store_true")
    args = parser.parse_args()
    static = read("static-source.json")
    required = set(read("required-keys.json"))
    ui = read("edition-ui.json")
    editions = {}
    review = {
        locale: {"renderedLanguage": "pt-BR" if locale == "pt" else ("es-419" if locale == "es" else locale),
                 "direction": "ltr", "status": "source-edition" if locale == "ru" else "native-review-pending"}
        for locale in ("ru", "en", "es", "pt")
    }
    review["pt-BR"] = review.pop("pt")
    for locale, direction in ADDED.items():
        words = read(f"{locale}.json")
        extras = read(f"{locale}-static.json")
        route = read(f"{locale}-routes.json")
        if set(words) != required or set(extras) != set(static):
            raise SystemExit(f"Missing or unexpected homepage keys in {locale}")
        if not all(isinstance(value, str) and value.strip() for value in [*words.values(), *extras.values()]):
            raise SystemExit(f"Invalid or empty homepage wording in {locale}")
        if (set(route) != {"title", "items"} or not isinstance(route["title"], str)
                or not route["title"].strip() or set(route["items"]) != ROUTE_KEYS
                or any(not isinstance(steps, list) or len(steps) != 3
                       or not all(isinstance(step, str) and step.strip() for step in steps)
                       for steps in route["items"].values())):
            raise SystemExit(f"Invalid practice route in {locale}")
        editions[locale] = {
            "words": words, "routes": route,
            "staticText": {item["source"]: extras[key] for key, item in static.items() if item["kind"] == "text"},
            "staticAttributes": {item["source"]: extras[key] for key, item in static.items() if item["kind"] == "attribute"},
        }
        review[locale] = {
            "renderedLanguage": locale, "direction": direction,
            "status": "fluent-review-pending" if locale == "eo" else "native-review-pending",
            "dictionaryKeys": len(words), "additionalStrings": len(extras), "practiceTracks": len(ROUTE_KEYS),
        }
    for locale in ("sa", "la", "yzh"):
        review[locale] = {"renderedLanguage": "ru", "direction": "ltr",
                          "status": "hold-authorial-language" if locale == "yzh" else "russian-fallback"}
    payload = json.dumps({"editions": editions, "ui": ui}, ensure_ascii=False, separators=(",", ":")).replace("<", r"\u003c")
    path = ROOT / "index.html"
    original = path.read_text(encoding="utf-8")
    updated, count = SCRIPT.subn(lambda match: match[1] + payload + match[2], original)
    if count != 1:
        raise SystemExit("Homepage locale data slot missing or duplicated")
    coverage = {
        "scope": "Homepage interface and local practice outputs. Linked materials, games and external forms have separate coverage.",
        "baseline": "ab525f4f50521beb3154d5ac54d179d7db32dbb0",
        "rights": "Editorial derivatives of the public homepage. Existing media and external services retain their own terms.",
        "payloadSha256": sha(payload),
        "routes": {locale: {"href": f"?lang={locale}", **record} for locale, record in review.items()},
    }
    ledger = LOCALES / "coverage.json"
    manifest = json.dumps(coverage, ensure_ascii=False, indent=2) + "\n"
    if args.check:
        if updated != original or not ledger.is_file() or ledger.read_text(encoding="utf-8") != manifest:
            raise SystemExit("Stale homepage locale data or coverage record")
    else:
        path.write_text(updated, encoding="utf-8")
        ledger.write_text(manifest, encoding="utf-8")
    print(f"Homepage locale payload: {len(required)} dictionary keys, {len(static)} supplementary strings and six practice tracks per new edition")


if __name__ == "__main__":
    main()
