#!/usr/bin/env python3
"""Render the SUTI.angels public text and its locale coverage record."""

from argparse import ArgumentParser
from hashlib import sha256
from html import escape
import json
from pathlib import Path
from string import Template

ROOT = Path(__file__).resolve().parent.parent
COPY_DIR = ROOT / "locales/suti-angels"
PAGES = "https://ezargaruna.github.io/suticore/"
POSTER = "assets/suti-angels/suti-angels-cycle-2026-11-11.png"
FORM = "https://docs.google.com/forms/d/e/1FAIpQLScXLTMQ3UUywSRd73n-817sHVL3bfWpas5jlu9KWCAdSDXlyg/viewform"
CHANNEL = "https://t.me/SUTIangels"

LANGUAGES = {
    "ru": "Русский", "en": "English", "es": "Español latinoamericano",
    "pt-BR": "Português brasileiro", "fr": "Français", "zh-Hans": "简体中文",
    "hi": "हिन्दी", "ar": "العربية", "bn": "বাংলা", "eo": "Esperanto",
    "sa": "संस्कृतम्", "la": "Latina", "yzh": "язэхъ · HOLD",
}
DOCUMENT_LANGUAGE = {"es": "es-419", "yzh": "ru"}
ROUTE_SUFFIX = {"pt-BR": "pt"}
FIELDS = set("""
    title description skip library h1 lead optional form channel formNotice
    posterAlt posterCaption cycleTitle steps practice distinguish meaningTitle
    meaning privacy help notice languages back
""".split())


def page_name(layer: str) -> str:
    return "suti-angels.html" if layer == "ru" else f"suti-angels-{ROUTE_SUFFIX.get(layer, layer)}.html"


def rendered_language(layer: str) -> str:
    return DOCUMENT_LANGUAGE.get(layer, layer)


def hash_text(text: str) -> str:
    return sha256(text.encode("utf-8")).hexdigest()


def links(layer: str) -> str:
    items = []
    for other, label in LANGUAGES.items():
        current = ' aria-current="page"' if other == layer else ""
        language = rendered_language(other)
        direction = "rtl" if other == "ar" else "ltr"
        items.append(
            f'        <li><a href="{page_name(other)}" lang="{language}" '
            f'dir="{direction}" hreflang="{language}"{current}>{escape(label)}</a></li>'
        )
    return "\n".join(items)


def render(template: Template, layer: str, copy: dict) -> str:
    if set(copy) != FIELDS or not isinstance(copy["steps"], list) or len(copy["steps"]) != 5:
        raise SystemExit(f"Invalid SUTI.angels text keys or steps for {layer}")
    if any(not isinstance(value, str) or not value.strip() for value in
           [copy[key] for key in FIELDS - {"steps"}] + copy["steps"]):
        raise SystemExit(f"Empty SUTI.angels text for {layer}")
    values = {key: escape(value) for key, value in copy.items() if key != "steps"}
    for key in ("form", "channel"):
        values[key] = values[key].removesuffix(" ↗")
    variants = [
        f'  <link rel="alternate" hreflang="{rendered_language(other)}" '
        f'href="https://suti.world/{page_name(other)}">'
        for other in LANGUAGES if other != "yzh"
    ]
    return template.substitute(
        values,
        lang=rendered_language(layer), direction="rtl" if layer == "ar" else "ltr",
        canonical=f"https://suti.world/{page_name(layer)}",
        alternates="\n".join(variants) if layer != "yzh" else '  <meta name="robots" content="noindex">',
        stylesheet=PAGES + "assets/css/suti-angels-editorial.css?v=20261111-clean1",
        assets=PAGES + "assets/fonts/",
        poster=PAGES + POSTER, formUrl=FORM, channelUrl=CHANNEL,
        libraryUrl=f"index.html?lang={layer}#library",
        languageLinks=links(layer), steps="".join(f"<li>{escape(step)}</li>" for step in copy["steps"]),
    )


def main() -> None:
    parser = ArgumentParser()
    parser.add_argument("--check", action="store_true", help="reject stale generated files")
    args = parser.parse_args()
    copy_file = COPY_DIR / "copy.json"
    copies = json.loads(copy_file.read_text(encoding="utf-8"))
    if set(copies) != set(LANGUAGES):
        raise SystemExit("The Angels language registry must have all 13 layers")
    template = Template((COPY_DIR / "page.html.tmpl").read_text(encoding="utf-8"))
    outputs = {ROOT / page_name(layer): render(template, layer, copies[layer]) for layer in LANGUAGES}
    coverage = {
        "artifact": "SUTI.angels public welcome and practice",
        "source_revision": "e341955cc6c44fc1c2d341dab823f06c198e84c0",
        "source_path": "suti-angels.html",
        "source_sha256": "cf24f91109033d7b077ff8c8ef65fbb01e69f27aa2b5c1e63819056c608b28ba",
        "editorial_text_path": "locales/suti-angels/copy.json",
        "editorial_text_sha256": sha256(copy_file.read_bytes()).hexdigest(),
        "poster": {
            "path": POSTER, "language": "ru", "first_public_source_commit": "0f44bf9",
            "sha256": sha256((ROOT / POSTER).read_bytes()).hexdigest(),
            "rights": "Existing public display reference. Separate redistribution license unverified.",
        },
        "rights": {
            "scope": "Editorial derivatives of the existing public SUTI.angels page only.",
            "repository_license": "LICENSE (MIT for repository software and associated documentation within its scope).",
            "excluded": "No new license for the poster, brand, external form or channel. No private sources used.",
        },
        "routes": {
            layer: {
                "path": page_name(layer),
                "rendered_language": rendered_language(layer),
                "direction": "rtl" if layer == "ar" else "ltr",
                "status": {"ru": "source-edition", "yzh": "hold-russian-fallback"}.get(layer, "editorial-draft"),
                "independent_language_review": {
                    "ru": "source-edition", "sa": "qualified-review-pending",
                    "la": "qualified-review-pending", "yzh": "author-grammar-and-lexicon-pending",
                }.get(layer, "native-review-pending"),
                "sha256": hash_text(outputs[ROOT / page_name(layer)]),
            }
            for layer in LANGUAGES
        },
    }
    outputs[COPY_DIR / "coverage.json"] = json.dumps(coverage, indent=2, ensure_ascii=False) + "\n"
    unexpected = set(ROOT.glob("suti-angels*.html")) - set(outputs)
    if unexpected:
        raise SystemExit("Unexpected Angels route: " + ", ".join(sorted(path.name for path in unexpected)))
    for path, content in outputs.items():
        if args.check:
            if not path.is_file() or path.read_bytes() != content.encode("utf-8"):
                raise SystemExit(f"Stale SUTI.angels output: {path.relative_to(ROOT)}")
        else:
            path.write_text(content, encoding="utf-8")
    print(f"SUTI.angels: {len(LANGUAGES)} routes and coverage {'verified' if args.check else 'rendered'}")


if __name__ == "__main__":
    main()
