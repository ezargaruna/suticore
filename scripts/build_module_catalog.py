#!/usr/bin/env python3
"""Render the public module catalog from source-linked records and editorial labels."""

from argparse import ArgumentParser
from hashlib import sha256
from html import escape
import json
from pathlib import Path
from string import Template
from urllib.parse import quote

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "locales/module-catalog"
GITHUB = "https://github.com/ezargaruna/suticore/blob/"
LOCALES = {
    "ru": "Русский", "en": "English", "es": "Español latinoamericano",
    "pt-BR": "Português brasileiro", "fr": "Français", "zh-Hans": "简体中文",
    "hi": "हिन्दी", "ar": "العربية", "bn": "বাংলা", "eo": "Esperanto",
    "sa": "संस्कृतम्", "la": "Latina", "yzh": "язэхъ · HOLD",
}
GROUPS = ("group-core", "group-proposed", "group-verenium")
SOURCE_LABELS = {"unknown": "unknownLanguage", "mixed": "mixedLanguage", "structured": "structuredLanguage"}


def read(name):
    return json.loads((SOURCE / name).read_text(encoding="utf-8"))


def digest(data):
    return sha256(data).hexdigest()


def render_card(index, record, title, ui, revision):
    path = record["path"]
    url = GITHUB + revision + "/" + quote(path)
    lang = record["sourceLanguage"]
    if lang in ("ru", "en"):
        label = f'<span lang="{lang}">{LOCALES[lang]}</span>'
    else:
        key = SOURCE_LABELS[lang]
        label = f'<span data-copy="{key}">{escape(ui[key])}</span>'
    return (
        f'        <article class="module" data-card="{index}">\n'
        f'          <h3 id="record-{index}">{escape(title)}</h3>\n'
        f'          <p class="source-meta" id="source-{index}">'
        f'<span data-copy="source-label">{escape(ui["source-label"])}</span> · {label}</p>\n'
        f'          <code dir="ltr">{escape(path)}</code>\n'
        f'          <a href="{url}" rel="noreferrer" target="_blank" '
        f'aria-describedby="record-{index} source-{index}" '
        f'data-copy="sourceLink">{escape(ui["sourceLink"])}</a>\n'
        '        </article>'
    )


def main():
    parser = ArgumentParser()
    parser.add_argument("--check", action="store_true")
    args = parser.parse_args()
    base = read("base-ui.json")
    extra = read("edition-ui.json")
    titles = read("titles.json")
    inventory = read("records.json")
    records = inventory["cards"]
    if any(set(table) != set(LOCALES) for table in (base, extra, titles)):
        raise SystemExit("Catalog locale registry must cover all 13 language layers")
    if len({record["path"] for record in records}) != len(records):
        raise SystemExit("Duplicate catalog source")
    revision = inventory["sourceRevision"]
    if len(records) + inventory["excludedInternalCount"] != inventory["baselineRecordCount"]:
        raise SystemExit("Catalog coverage counts do not match the source inventory")
    editions = {}
    review = {}
    for locale in LOCALES:
        ui = base[locale] | extra[locale]
        words = titles[locale]
        if (set(ui) != set(base["ru"]) | set(extra["ru"]) or len(words) != len(records)
                or not all(isinstance(value, str) and value.strip() for value in [*ui.values(), *words])
                or ui["count"].count("{count}") != 1):
            raise SystemExit(f"Incomplete catalog edition: {locale}")
        lang = {"yzh": "ru", "es": "es-419"}.get(locale, locale)
        direction = "rtl" if locale == "ar" else "ltr"
        editions[locale] = {"ui": ui, "titles": words,
                            "lang": lang, "dir": direction}
        status = {"ru": "editorial-russian-edition", "yzh": "hold-author-grammar-and-lexicon",
                  "eo": "fluent-review-pending", "sa": "qualified-review-pending",
                  "la": "qualified-review-pending"}.get(locale, "native-review-pending")
        review[locale] = {"route": f"modules.html?lang={locale}", "renderedLanguage": lang,
                          "direction": direction, "review": status, "notice": ui["review"]}
    ui = editions["ru"]["ui"]
    sections = []
    for group in GROUPS:
        cards = [render_card(i, record, titles["ru"][i], ui, revision)
                 for i, record in enumerate(records) if record["group"] == group]
        sections.append(
            f'    <section data-group="{group}" aria-labelledby="{group}">\n'
            f'      <h2 id="{group}" data-copy="{group}">{escape(ui[group])}</h2>\n'
            '      <div class="catalog">\n' + "\n".join(cards) + '\n      </div>\n    </section>'
        )
    options = "\n".join(
        f'<option value="{locale}" lang="{editions[locale]["lang"]}" dir="{editions[locale]["dir"]}">{name}</option>'
        for locale, name in LOCALES.items()
    )
    locale_data = json.dumps({
        "editions": editions,
        "originalTitles": [record["title"] for record in records],
    }, ensure_ascii=False, separators=(",", ":")).replace("<", r"\u003c")
    template = Template((SOURCE / "catalog.html.tmpl").read_text(encoding="utf-8"))
    page = template.substitute(
        **{name: escape(ui[name]) for name in ("nav", "skip", "introLabel", "filterLabel", "review", "empty", "register", "returnLabel", "moduleMap")},
        description=escape(ui["page-intro"]), title=escape(ui["page-title"]),
        caveat=escape(ui["page-caveat"]), languageLabel=escape(ui["language-label"]),
        count=escape(ui["count"].replace("{count}", str(len(records)))), rights=escape(ui["rights-note"]),
        options=options, sections="\n".join(sections), localeData=locale_data,
        runtime=(SOURCE / "runtime.js").read_text(encoding="utf-8").strip(),
    )
    coverage = {
        "artifact": "SUTI.world public module catalog",
        "baseline": {key: inventory[key] for key in ("sourceRevision", "sourcePath", "sourceSha256")},
        "sourceRecords": inventory["baselineRecordCount"], "publicRecords": len(records),
        "excludedInternalRecords": inventory["excludedInternalCount"],
        "rights": "Catalog labels are editorial derivatives. Linked sources retain individual terms. A declared license is reported only when found in source front matter; null means no such declaration found.",
        "sourceLanguageMethod": "Editorial reading of the principal prose language, mixed prose, structured/code or undetermined when absent. Catalog titles do not change the document language.",
        "reviewByLocale": review,
        "publicSources": records,
        "catalogSha256": digest(page.encode("utf-8")),
    }
    outputs = {ROOT / "modules.html": page, SOURCE / "coverage.json": json.dumps(coverage, ensure_ascii=False, indent=2) + "\n"}
    for path, content in outputs.items():
        if args.check:
            if path.read_bytes() != content.encode("utf-8"):
                raise SystemExit(f"Stale catalog output: {path.relative_to(ROOT)}")
        else:
            path.write_text(content, encoding="utf-8")
    print(f"Module catalog: {len(records)} public records, {len(editions)} routes; {'verified' if args.check else 'generated'}")


if __name__ == "__main__":
    main()
