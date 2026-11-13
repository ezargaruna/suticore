#!/usr/bin/env python3
"""Assemble the portable NITYA practice page from its public components."""

from argparse import ArgumentParser
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ASSETS = "https://ezargaruna.github.io/suticore/assets"

SHELL = """<!doctype html>
<html lang="ru" data-theme="day">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>NITYA · SUTI.world</title>
  <meta name="description" content="атлас Нитьи · 90 дней практики, голос и забота">
  <link rel="stylesheet" href="{assets}/css/suti-angels-editorial.css?v=20261111-clean1">
  <style>
    @font-face {{font-family:NotoArabic;src:url("{assets}/fonts/notosansarabic/regular.woff2") format("woff2");font-display:swap}}
    @font-face {{font-family:NotoDevanagari;src:url("{assets}/fonts/notosansdevanagari/regular.woff2") format("woff2");font-display:swap}}
    @font-face {{font-family:NotoBengali;src:url("{assets}/fonts/notosansbengali/regular.ttf") format("truetype");font-display:swap}}
    * {{box-sizing:border-box}}
    body {{margin:0}}
    :lang(ar) {{font-family:NotoArabic,system-ui,sans-serif}}
    :lang(hi),:lang(sa) {{font-family:NotoDevanagari,system-ui,sans-serif}}
    :lang(bn) {{font-family:NotoBengali,system-ui,sans-serif}}
    .nitya-page {{inline-size:min(100% - 1.5rem,48rem);margin-inline:auto;padding-block:clamp(1rem,4vw,3.5rem);overflow-wrap:anywhere}}
    [data-nitya-practice]:lang(ar) {{font-family:NotoArabic,system-ui,sans-serif}}
    [data-nitya-practice]:is(:lang(hi),:lang(sa)) {{font-family:NotoDevanagari,system-ui,sans-serif}}
    [data-nitya-practice]:lang(bn) {{font-family:NotoBengali,system-ui,sans-serif}}
    .nitya-page__brand {{display:inline-flex;align-items:center;min-block-size:44px;margin-block-end:1rem;font-weight:750}}
    @media(prefers-reduced-motion:reduce) {{html {{scroll-behavior:auto}}}}
{styles}
  </style>
</head>
<body>
  <main class="nitya-page">
    <a class="nitya-page__brand" href="https://suti.world/">SUTI.world</a>
    <header data-atlas-top></header>
    <section id="nitya-90-day-practice" data-nitya-practice
      data-samurai-url="https://ezargaruna.github.io/suticore/samurai-dharma.html"
      data-angels-locales data-angels-url="https://ezargaruna.github.io/suticore/suti-angels.html"></section>
    <section data-nitya-route></section>
    <section id="care-questionnaire" data-atlas-care></section>
    <div data-atlas-paths></div>
    <noscript>
      <p lang="ru">для практики NITYA нужен JavaScript</p>
      <p lang="en">NITYA practice requires JavaScript</p>
    </noscript>
  </main>
  <script>
    const pageBrand = document.querySelector(".nitya-page__brand");
    window.addEventListener("nitya:language", (event) => {{
      const {{language, contentLanguage, direction}} = event.detail;
      document.documentElement.lang = contentLanguage;
      document.documentElement.dir = direction;
      pageBrand.href = "https://suti.world/?lang=" + encodeURIComponent(language);
    }});
    if (window.parent !== window) {{
      pageBrand.target = "_blank";
      pageBrand.rel = "noopener noreferrer";
    }}
  </script>
  <script type="application/json" id="nitya-atlas-copy">{atlas_copy}</script>
  <script type="application/json" id="nitya-route-copy">{route_copy}</script>
  <script>
{atlas}
  </script>
  <script>
{practice}
  </script>
  <script>
{route}
  </script>
  <script>
{care}
  </script>
</body>
</html>
"""


def read_component(name, extension):
    source = (ROOT / f"assets/{extension}/{name}.{extension}").read_text(encoding="utf-8")
    close_tag = "</script" if extension == "js" else "</style"
    if close_tag in source.lower():
        raise SystemExit(f"{name}.{extension} cannot be embedded safely")
    return source.rstrip()


def embedded_json(data):
    return json.dumps(data, ensure_ascii=False, separators=(",", ":")).replace("<", r"\u003c")


def require_translation_shape(reference, edition, path):
    if isinstance(reference, dict):
        if not isinstance(edition, dict) or reference.keys() != edition.keys():
            raise SystemExit(f"Missing or unexpected NITYA route fields at {path}")
        for key, value in reference.items():
            if key == "id" and value != edition[key]:
                raise SystemExit(f"Changed choice ID at {path}: {edition[key]}")
            require_translation_shape(value, edition[key], f"{path}.{key}")
    elif isinstance(reference, list):
        if not isinstance(edition, list) or len(reference) != len(edition):
            raise SystemExit(f"Invalid NITYA route sequence at {path}")
        for index, (value, translation) in enumerate(zip(reference, edition)):
            require_translation_shape(value, translation, f"{path}[{index}]")
    elif not isinstance(edition, str) or not edition.strip():
        raise SystemExit(f"Empty NITYA route copy at {path}")


def main():
    parser = ArgumentParser()
    parser.add_argument("--check", action="store_true")
    options = parser.parse_args()
    styles = "\n".join(read_component(name, "css") for name in ("nitya-practice", "nitya-route", "nitya-atlas"))
    copy = json.loads((ROOT / "locales/nitya-atlas.json").read_text(encoding="utf-8"))
    routes = json.loads((ROOT / "locales/nitya-route.json").read_text(encoding="utf-8"))
    if routes.keys() != ((copy.keys() - {"es-419"}) | {"es"}):
        raise SystemExit("NITYA route needs one edition per atlas language")
    for code, edition in routes.items():
        require_translation_shape(routes["en"]["engine"], edition["engine"], f"{code}.engine")
        require_translation_shape(routes["en"]["labels"], edition["labels"], f"{code}.labels")
    html = SHELL.format(assets=ASSETS, styles=styles, atlas_copy=embedded_json(copy),
                        route_copy=embedded_json(routes),
                        atlas=read_component("nitya-atlas", "js"), care=read_component("nitya-atlas-care", "js"),
                        practice=read_component("nitya-practice", "js"), route=read_component("nitya-route", "js"))
    output = ROOT / "nitya-practice.html"
    if options.check:
        if not output.is_file() or output.read_text(encoding="utf-8") != html:
            raise SystemExit("Stale NITYA practice page")
    else:
        output.write_text(html, encoding="utf-8")


if __name__ == "__main__":
    main()
