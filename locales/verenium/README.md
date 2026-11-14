# Verenium · workshop editions

- Scope: the four workshop routes, interface and local profile status messages
- Source: public repository workshop at revision `8740977`, with editorial derivatives in this directory
- Review: RU is the source edition. EN, ES-419, PT-BR, FR, AR, zh-Hans, HI and BN await independent language review. EO awaits a fluent reviewer. SA and LA await qualified review. YZH displays labeled Russian pending authorial transcreation.
- Separate scope: existing links keep their own language and rights. The document and scripts load no resources on opening the workshop. The external Google form receives only what a visitor enters and submits there. Profile JSON stays local.
- Build: run `python3 -B scripts/build_verenium_workshop.py`, sync `verenium.html` into the homepage, then refresh both offline archives with `python3 -B scripts/rebuild_verenium_archive.py`.
