#!/usr/bin/env python3
"""Refresh allowlisted source members in the existing Verenium ZIP aliases.

Unlisted entries are preserved. The script does not establish rights, privacy,
or provenance for preserved payloads; those remain separate release checks.
"""
from __future__ import annotations

from pathlib import Path
from tempfile import NamedTemporaryFile
from zipfile import ZIP_DEFLATED, ZipFile

ROOT = Path(__file__).resolve().parents[1]
ARCHIVE = ROOT / "downloads" / "Verenium.zip"
ALIAS = ROOT / "downloads" / "Virenium.zip"
ALLOWLIST = {
    "nitya.html": "nitya.html",
    "nitya-todeus.html": "nitya-todeus.html",
    "verenium.html": "verenium.html",
    "virenium.html": "virenium.html",
    "care-map.html": "care-map.html",
    "care-atlas.html": "care-atlas.html",
    "modules/verenium/README.md": "modules/verenium/README.md",
    "modules/verenium/manifest.json": "modules/verenium/manifest.json",
    "modules/verenium/build_core_lite.py": "modules/verenium/build_core_lite.py",
}


def main() -> None:
    with ZipFile(ARCHIVE) as original:
        names = original.namelist()
        if len(names) != len(set(names)):
            raise SystemExit("duplicate member names; refusing rebuild")
        selected = {name: source for name, source in ALLOWLIST.items() if name in names}
        if "nitya-todeus.html" not in selected:
            raise SystemExit("required site source is absent from archive")
        for source in selected.values():
            if not (ROOT / source).is_file():
                raise SystemExit(f"allowlisted source is absent: {source}")

        with NamedTemporaryFile(dir=ARCHIVE.parent, suffix=".zip.part", delete=False) as tmp:
            temp_path = Path(tmp.name)
        try:
            with ZipFile(temp_path, "w", ZIP_DEFLATED, compresslevel=9) as rebuilt:
                for info in original.infolist():
                    if info.is_dir():
                        rebuilt.writestr(info, b"")
                    else:
                        payload = (ROOT / selected[info.filename]).read_bytes() if info.filename in selected else original.read(info.filename)
                        rebuilt.writestr(info, payload)
            with ZipFile(temp_path) as rebuilt:
                if rebuilt.testzip() is not None:
                    raise SystemExit("CRC validation failed")
                for name, source in selected.items():
                    if rebuilt.read(name) != (ROOT / source).read_bytes():
                        raise SystemExit(f"source/member mismatch: {name}")
            temp_path.replace(ARCHIVE)
            ALIAS.write_bytes(ARCHIVE.read_bytes())
        finally:
            temp_path.unlink(missing_ok=True)
    print(f"refreshed {len(selected)} allowlisted members; preserved {len(names) - len(selected)} other entries")


if __name__ == "__main__":
    main()
