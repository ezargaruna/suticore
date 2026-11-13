#!/usr/bin/env python3
"""Render the MIT-licensed .synaura editorial guide into static language editions."""

from argparse import ArgumentParser
from collections import Counter
from hashlib import sha256
from html import escape
import json
from pathlib import Path
import re
from string import Template

from build_system_publication import prepare_markdown, render_markdown

ROOT = Path(__file__).resolve().parents[1]
MODULE = ROOT / "modules/synaura"
GUIDE = MODULE / "guide"
LOCALES = ROOT / "locales/synaura"
PREFIX = "https://suti.world/modules/synaura/guide/"
GUIDE_SOURCE_SHA = "9890ec8e960611424f792cda26f69886e6261614333b3c140b6d93c1117e5b9b"

# URL slug, HTML language, home menu language, language name
LANGUAGES = (
    ("ru", "ru", "ru", "Русский"),
    ("en", "en", "en", "English"),
    ("es", "es-419", "es", "Español latinoamericano"),
    ("pt-br", "pt-BR", "pt-BR", "Português brasileiro"),
    ("fr", "fr", "fr", "Français"),
    ("zh-hans", "zh-Hans", "zh-Hans", "简体中文"),
    ("hi", "hi", "hi", "हिन्दी"),
    ("ar", "ar", "ar", "العربية"),
    ("bn", "bn", "bn", "বাংলা"),
    ("eo", "eo", "eo", "Esperanto"),
    ("sa", "sa", "sa", "संस्कृतम्"),
    ("la", "la", "la", "Latina"),
    ("yzh", "ru", "yzh", "язэхъ · HOLD"),
)


def digest(data):
    return sha256(data).hexdigest()


def headings(text):
    return re.findall(r"^(#{1,3})\s+.+$", text, re.M)


def code_tokens(text):
    return Counter(re.findall(r"`([^`\n]+)`", text))


def navigation(slug):
    links = []
    for other, lang, _, name in LANGUAGES:
        current = ' aria-current="page"' if slug == other else ""
        direction = "rtl" if other == "ar" else "ltr"
        links.append(
            f'        <li><a href="{other}.html" lang="{lang}" dir="{direction}" '
            f'hreflang="{lang}"{current}>{escape(name)}</a></li>'
        )
    return "\n".join(links)


def main():
    parser = ArgumentParser()
    parser.add_argument("--check", action="store_true", help="reject stale generated files")
    args = parser.parse_args()
    original = MODULE / "README.md"
    license_path = MODULE / "LICENSE"
    if license_path.read_bytes() != (ROOT / "LICENSE").read_bytes():
        raise SystemExit("Module MIT license must match the repository notice")
    source_bytes = original.read_bytes()
    if digest(source_bytes) != GUIDE_SOURCE_SHA:
        raise SystemExit("Source guide changed; compare editions against the new source before regenerating")
    source = prepare_markdown(source_bytes.decode("utf-8"))
    source_headings = headings(source)
    source_code = code_tokens(source)
    template = Template((LOCALES / "guide.html.tmpl").read_text(encoding="utf-8"))
    interface = json.loads((LOCALES / "ui.json").read_text(encoding="utf-8"))
    if set(interface) != {slug for slug, _, _, _ in LANGUAGES}:
        raise SystemExit("Guide UI must cover all 13 language layers")
    outputs = {}
    routes = {}
    for slug, lang, home_lang, _ in LANGUAGES:
        ui = interface[slug]
        md = GUIDE / f"{slug}.md"
        if slug in {"ru", "yzh"}:
            body = source
        else:
            body = md.read_text(encoding="utf-8")
        title, separator, rest = body.partition("\n")
        if not separator or not title.startswith("# .synaura"):
            raise SystemExit(f"Missing guide title for {slug}")
        notice = (
            f'> {ui["review"]}\n'
            "> Copyright © 2026 Ezar Garuna · "
            "[MIT](https://ezargaruna.github.io/suticore/modules/synaura/LICENSE)\n\n"
        )
        if slug in {"ru", "yzh"}:
            body = title + "\n\n" + notice + rest.lstrip("\n")
            outputs[md] = body
        elif not rest.lstrip("\n").startswith(notice):
            raise SystemExit(f"Missing or stale editorial and rights notice in {md.name}")
        if headings(body) != source_headings or code_tokens(body) != source_code:
            raise SystemExit(f"Heading hierarchy or protected tokens differ from the source for {slug}")
        direction = "rtl" if slug == "ar" else "ltr"
        alternates = "\n".join(
            f'  <link rel="alternate" hreflang="{tag}" href="{PREFIX}{other}.html">'
            for other, tag, _, _ in LANGUAGES if other != "yzh"
        ) if slug != "yzh" else '  <meta name="robots" content="noindex">'
        html = GUIDE / f"{slug}.html"
        page = template.substitute(
            lang=lang, direction=direction, alternates=alternates, canonical=f"{PREFIX}{slug}.html",
            home=f"../../../index.html?lang={home_lang}#synaura", markdown=md.name,
            body=render_markdown(body, md), language_links=navigation(slug),
            **{key: escape(value) for key, value in ui.items() if key != "review"},
        )
        outputs[html] = page
        status = {
            "ru": "source-edition", "sa": "qualified-review-pending",
            "la": "qualified-review-pending", "eo": "independent-fluent-review-pending",
            "yzh": "hold-author-grammar-and-lexicon",
        }.get(slug, "native-review-pending")
        routes[slug] = {
            "html": html.name, "markdown": md.name, "lang": lang, "dir": direction,
            "review_status": status, "notice": ui["review"],
            "html_sha256": digest(page.encode("utf-8")),
            "markdown_sha256": digest(body.encode("utf-8")),
        }
    coverage = {
        "artifact": "module.synaura.preferred-style",
        "source": {"file": "../README.md", "language": "ru", "version": "1.0.0", "sha256": GUIDE_SOURCE_SHA},
        "scope": "Complete optional editorial guide, sections 01–10 and compact instructions.",
        "rights": {"license": "MIT", "notice": "../LICENSE", "source_declaration": "../manifest.json",
                   "copyright": "2026 Ezar Garuna"},
        "routes": routes,
    }
    outputs[GUIDE / "coverage.json"] = json.dumps(coverage, indent=2, ensure_ascii=False) + "\n"
    for path, content in outputs.items():
        data = content.encode("utf-8")
        if args.check:
            if not path.is_file() or path.read_bytes() != data:
                raise SystemExit(f"Stale guide output: {path.relative_to(ROOT)}")
        else:
            path.write_bytes(data)
    print(f".synaura: {len(routes)} language routes {'verified' if args.check else 'rendered'}")


if __name__ == "__main__":
    main()
