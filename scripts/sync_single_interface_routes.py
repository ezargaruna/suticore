#!/usr/bin/env python3
"""Embed selected standalone HTML pages in index.html's single-file router."""

from __future__ import annotations

import argparse
import base64
import json
import re
from html.parser import HTMLParser
from pathlib import Path


class TitleParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.in_title = False
        self.in_head = False
        self.parts: list[str] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        if tag == "head":
            self.in_head = True
        if tag == "title" and self.in_head:
            self.in_title = True

    def handle_endtag(self, tag: str) -> None:
        if tag == "head":
            self.in_head = False
        if tag == "title":
            self.in_title = False

    def handle_data(self, data: str) -> None:
        if self.in_title:
            self.parts.append(data)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("routes", nargs="+", help="standalone HTML route files")
    parser.add_argument("--index", default="index.html")
    args = parser.parse_args()

    index_path = Path(args.index)
    source = index_path.read_text(encoding="utf-8")
    marker = re.compile(
        r'(<script type="application/json" id="suti-single-interface-data">)(.*?)(</script>)',
        re.DOTALL,
    )
    match = marker.search(source)
    if not match:
        raise SystemExit("single-interface route data block not found")
    data = json.loads(match.group(2))

    for route in args.routes:
        path = Path(route)
        html = path.read_bytes()
        title_parser = TitleParser()
        title_parser.feed(html.decode("utf-8"))
        title = "".join(title_parser.parts).strip()
        if not title:
            raise SystemExit(f"route has no document title: {path}")
        data[path.name] = {
            "title": title,
            "html": base64.b64encode(html).decode("ascii"),
        }

    encoded = json.dumps(data, ensure_ascii=False, separators=(",", ":"))
    updated = source[: match.start(2)] + encoded + source[match.end(2) :]
    index_path.write_text(updated, encoding="utf-8")
    print(f"embedded {len(args.routes)} route(s); {len(data)} routes total")


if __name__ == "__main__":
    main()
