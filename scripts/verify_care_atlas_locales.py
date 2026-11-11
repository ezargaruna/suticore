#!/usr/bin/env python3
"""Check Care Atlas locale metadata, translated safeguards, links, and embeds."""

from __future__ import annotations

import base64
import json
import re
from html.parser import HTMLParser
from pathlib import Path


class Page(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.lang = ""
        self.direction = ""
        self.title = ""
        self.title_open = False
        self.h1_count = 0
        self.links: list[str] = []
        self.images: list[str] = []
        self.nav_label = False

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        attrs = dict(attrs)
        if tag == "html":
            self.lang = attrs.get("lang", "") or ""
            self.direction = attrs.get("dir", "") or ""
        elif tag == "title":
            self.title_open = True
        elif tag == "h1":
            self.h1_count += 1
        elif tag == "a":
            self.links.append(attrs.get("href", "") or "")
        elif tag == "img":
            self.images.append(attrs.get("src", "") or "")
        elif tag == "nav" and attrs.get("aria-label"):
            self.nav_label = True

    def handle_endtag(self, tag: str) -> None:
        if tag == "title":
            self.title_open = False

    def handle_data(self, data: str) -> None:
        if self.title_open:
            self.title += data


ROUTES = {
    "care-atlas.html": ("ru", "care-atlas.html"),
    "care-atlas-en.html": ("en", "care-atlas-en.html"),
    "care-atlas-es.html": ("es-419", "care-atlas-es.html"),
    "care-atlas-pt.html": ("pt-BR", "care-atlas-pt.html"),
    "care-atlas-zh-Hans.html": ("zh-Hans", "care-atlas-zh-Hans.html"),
    "care-atlas-hi.html": ("hi", "care-atlas-hi.html"),
    "care-atlas-fr.html": ("fr", "care-atlas-fr.html"),
    "care-atlas-ar.html": ("ar", "care-atlas-ar.html"),
    "care-atlas-bn.html": ("bn", "care-atlas-bn.html"),
    "care-atlas-eo.html": ("eo", "care-atlas-eo.html"),
    "care-atlas-sa.html": ("sa", "care-atlas-sa.html"),
    "care-atlas-la.html": ("la", "care-atlas-la.html"),
}
SAFETY_TEXT = {
    "care-atlas.html": ("медицин", "автоматически"),
    "care-atlas-en.html": ("not medical", "not automatically routed"),
    "care-atlas-es.html": ("servicio médico", "no se derivan automáticamente"),
    "care-atlas-pt.html": ("serviço médico", "não são encaminhados automaticamente"),
    "care-atlas-zh-Hans.html": ("不是医疗或紧急救助服务", "请求不会自动转交"),
    "care-atlas-hi.html": ("चिकित्सा या आपातकालीन सेवा नहीं", "अनुरोध अपने-आप आगे नहीं भेजे जाते"),
    "care-atlas-fr.html": ("ni un service médical ni un service d’urgence", "ne sont pas transmises automatiquement"),
    "care-atlas-ar.html": ("ليست خدمة طبية أو خدمة طوارئ", "لا تُحال الطلبات تلقائيًا"),
    "care-atlas-bn.html": ("চিকিৎসা বা জরুরি সহায়তা পরিষেবা নয়", "অনুরোধ নিজে থেকে পাঠানো হয় না"),
    "care-atlas-eo.html": ("ne estas medicina aŭ krizhelpa servo", "ne estas plusendataj aŭtomate"),
    "care-atlas-sa.html": ("न चिकित्सासेवा, न आपत्कालीनसेवा", "याचनाः स्वयमेव न प्रेष्यन्ते"),
    "care-atlas-la.html": ("Neque ministerium medicum neque auxilium subitum", "petitiones sponte non transmittuntur"),
}

for name, (locale, route) in ROUTES.items():
    path = Path(name)
    body = path.read_text(encoding="utf-8")
    page = Page()
    page.feed(body)
    assert page.lang == locale, (name, "lang", page.lang)
    if locale == "ar":
        assert page.direction == "rtl", (name, "Arabic page must declare RTL")
    assert page.title.strip(), (name, "missing title")
    assert page.h1_count == 1, (name, "expected one h1", page.h1_count)
    assert page.nav_label, (name, "language navigation needs an accessible name")
    assert all(phrase in body for phrase in SAFETY_TEXT[name]), (name, "care boundary missing")
    for href in page.links:
        if href and not href.startswith(("https://", "http://", "#", "mailto:")):
            target = path.parent / href.split("#", 1)[0].split("?", 1)[0]
            assert target.exists(), (name, "missing local link", href)
    for src in page.images:
        if src and not src.startswith(("https://", "http://", "data:")):
            assert (path.parent / src).exists(), (name, "missing local image", src)
    if locale in ("bn", "hi", "sa", "ar"):
        font_license = f"assets/fonts/notosans{'bengali' if locale == 'bn' else 'arabic' if locale == 'ar' else 'devanagari'}/OFL.txt"
        assert (path.parent / font_license).exists(), (name, "missing font license")

index = Path("index.html").read_text(encoding="utf-8")
match = re.search(
    r'<script type="application/json" id="suti-single-interface-data">(.*?)</script>',
    index,
    re.DOTALL,
)
assert match, "route map not found"
route_data = json.loads(match.group(1))
for name in ROUTES:
    assert name in route_data, (name, "missing from unified route map")
    assert base64.b64decode(route_data[name]["html"]) == Path(name).read_bytes(), (
        name,
        "embedded page differs from standalone source",
    )

workflow = Path(".github/workflows/pages.yml").read_text(encoding="utf-8")
for name in ROUTES:
    if name != "care-atlas.html":
        assert name in workflow, (name, "missing from Pages workflow")

print("Care Atlas locale metadata, disclosures, local links, assets, embeds, and Pages routes: PASS")
