#!/usr/bin/env python3
"""Build standalone language editions of the public SUTI.world architecture map."""

from argparse import ArgumentParser
from hashlib import sha256
from html import escape
import json
from pathlib import Path
from posixpath import dirname, relpath
from string import Template

from build_synaura_guide import LANGUAGES

ROOT = Path(__file__).resolve().parents[1]
LOCAL = ROOT / "locales/module-architecture"
MANIFEST = "modules/architecture/coverage.json"
SOURCE_REVISION = "07318700aa4adec741cdd20617d27e4ca2b6b886"
SOURCE_SHA256 = "2236003d830cf3de570c8982534550323272a73c904fbae24dc3a7a11e818ba9"
GITHUB = "https://github.com/ezargaruna/suticore"


def route(slug):
    return "modules/index.html" if slug == "ru" else f"modules/architecture/{slug}.html"


def relative(target, page):
    return target if target.startswith("https://") else relpath(target, dirname(page))


def digest(body):
    return sha256(body.encode("utf-8")).hexdigest()


def is_same_shape(value, source):
    if isinstance(source, dict):
        return isinstance(value, dict) and value.keys() == source.keys() and all(
            is_same_shape(value[key], source[key]) for key in source
        )
    if isinstance(source, list):
        return isinstance(value, list) and len(value) == len(source) and all(
            is_same_shape(target, original) for target, original in zip(value, source)
        )
    return isinstance(value, str) and bool(value.strip()) == bool(source.strip())


def render(template, slug, language, menu, words):
    page = route(slug)
    direction = "rtl" if language == "ar" else "ltr"
    home = f"index.html?lang={menu}#library"
    angels_suffix = {"ru": "", "pt-br": "-pt", "zh-hans": "-zh-Hans"}.get(slug, f"-{slug}")
    resources = (
        ("modules/suti/suticore-2026.11.en.html", "en", 0),
        ("modules/suti/synaura-2026.11.en.html", "en", 0),
        ("modules/suti/syntaxium-2026.11.en.html", "en", 0),
        ("modules/suti/synaura-2026.9.md", "ru", 1),
        (f"modules/synaura/guide/{slug}.html", language, 2 if slug == "yzh" else None),
        ("modules/suti/catalog.v1.json", "", 3),
        (GITHUB + "/tree/main/modules", "", 4),
        ("verenium.html", "ru", 1),
        ("samurai-dharma.html", "ru", 1),
        (f"suti-angels{angels_suffix}.html", language, 2 if slug == "yzh" else None),
        ("modules/synaura/manifest.json", "", 3),
        (GITHUB, "", None),
        (MANIFEST, "", 3),
    )

    def resource(index):
        target, lang, label = resources[index]
        tag = f' hreflang="{lang}"' if lang else ""
        suffix = f' · {escape(words["destinationLabels"][label])}' if label is not None else ""
        return f'<a href="{escape(relative(target, page))}"{tag}>{escape(words["resources"][index])}{suffix}</a>'

    links = []
    alternates = []
    for other, lang, _, name in LANGUAGES:
        target = route(other)
        current = ' aria-current="page"' if other == slug else ""
        other_dir = "rtl" if lang == "ar" else "ltr"
        links.append(
            f'        <li><a href="{relative(target, page)}" lang="{lang}" dir="{other_dir}" '
            f'hreflang="{lang}"{current}>{escape(name)}</a></li>'
        )
        if other != "yzh":
            alternates.append(f'  <link rel="alternate" hreflang="{lang}" href="https://suti.world/{target}">')

    def cards(start, stop):
        result = []
        for index in range(start, stop):
            kind, title, description = words["cards"][index]
            kind_markup = f'<p class="type">{escape(kind)}</p>' if kind else ""
            # The registered module names are unchanged across editorial editions.
            heading = f'<bdi>{escape(title)}</bdi>' if index < 21 else escape(title)
            resource_index = {17: 7, 18: 8, 20: 9}.get(index)
            link = f"<p>{resource(resource_index)}</p>" if resource_index is not None else ""
            result.append(f'        <article class="card">{kind_markup}<h3>{heading}</h3><p>{escape(description)}</p>{link}</article>')
        return '<div class="grid">\n' + "\n".join(result) + '\n      </div>'

    bodies = (
        cards(0, 17),
        cards(17, 21),
        cards(21, 24) + f'<p class="note">{escape(words["numericNote"])}</p>',
        f'<p>{escape(words["styleNote"])}</p><p>{resource(4)} · {resource(10)}</p>',
        f'<p>{escape(words["versionNote"])}</p><p>{resource(11)} · {resource(12)}</p>',
    )
    section_ids = ("architecture-title", "applied-title", "docs-title", "style-title", "versions-title")
    sections = "\n".join(
        f'    <section class="section" aria-labelledby="{section_id}"><h2 id="{section_id}">'
        f'{escape(heading)}</h2>\n      {body}\n    </section>'
        for section_id, heading, body in zip(section_ids, words["sections"], bodies)
    )
    fields = {key: escape(value) for key, value in words.items() if isinstance(value, str)}
    return template.substitute(
        **fields, language=language, direction=direction, canonical=f"https://suti.world/{page}",
        alternates="\n".join(alternates) if slug != "yzh" else '  <meta name="robots" content="noindex">',
        assets=relative("assets", page), homeLink=relative(home, page),
        catalogLink=relative(f"modules.html?lang={menu}", page), languageLinks="\n".join(links),
        resources="".join(f"<li>{resource(i)}</li>" for i in range(7)), sections=sections,
    )


def main():
    parser = ArgumentParser()
    parser.add_argument("--check", action="store_true", help="reject stale generated editions")
    args = parser.parse_args()
    template = Template((LOCAL / "map.html.tmpl").read_text(encoding="utf-8"))
    source = json.loads((LOCAL / "ru.json").read_text(encoding="utf-8"))
    outputs = {}
    review = {}
    for slug, language, menu, _ in LANGUAGES:
        if slug == "yzh":
            words = source | {"review": "Язэхъ · HOLD. Показан русский текст до утверждения автором грамматики и словаря."}
        else:
            words = json.loads((LOCAL / f"{menu}.json").read_text(encoding="utf-8"))
        if not is_same_shape(words, source) or [row[1] for row in words["cards"][:21]] != [row[1] for row in source["cards"][:21]]:
            raise SystemExit(f"Missing sections, unexpected fields or changed module names: {slug}")
        text = render(template, slug, language, menu, words)
        page = route(slug)
        outputs[page] = text
        status = {"ru": "source-editorial-edition", "yzh": "hold-author-grammar-and-lexicon",
                  "eo": "fluent-review-pending", "sa": "qualified-review-pending",
                  "la": "qualified-review-pending"}.get(slug, "native-review-pending")
        review[menu] = {"path": page, "lang": language, "dir": "rtl" if language == "ar" else "ltr",
                        "review": status, "notice": words["review"], "sha256": digest(text)}
    coverage = {
        "artifact": "SUTI.world architecture map",
        "source": {"revision": SOURCE_REVISION, "path": "modules/index.html", "sha256": SOURCE_SHA256,
                   "url": f"{GITHUB}/blob/{SOURCE_REVISION}/modules/index.html"},
        "scope": {"cardCount": 24, "sectionCount": 5, "resourceLinks": "Destination languages are identified separately from translated labels."},
        "rights": {"basis": "Editorial translation of the repository's public authorial architecture map.",
                   "notice": f"{GITHUB}/blob/{SOURCE_REVISION}/LICENSE",
                   "linkedResources": "Reuse terms apply per destination. No additional grant is made for linked documents, code, names, or logos."},
        "routes": review,
    }
    outputs[MANIFEST] = json.dumps(coverage, ensure_ascii=False, indent=2) + "\n"
    for name, body in outputs.items():
        path = ROOT / name
        if args.check:
            if not path.is_file() or path.read_bytes() != body.encode("utf-8"):
                raise SystemExit(f"Stale architecture edition: {name}")
        else:
            path.parent.mkdir(parents=True, exist_ok=True)
            path.write_text(body, encoding="utf-8")
    print(f"Architecture map: {len(review)} routes, 24 cards each; {'verified' if args.check else 'generated'}")


if __name__ == "__main__":
    main()
