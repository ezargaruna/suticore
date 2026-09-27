# structure map

## public website

```text
index.html                  public SUTI.world portal and PWA shell
manifest.webmanifest        install metadata and app icons
service-worker.js           offline cache for the app shell
site/assets/css/            visual tokens and responsive layout
site/assets/js/             local style builder and install behavior
site/assets/icons/          SUTI symbol in SVG and PNG sizes
.github/workflows/pages.yml copies this explicit public surface
```

The portal begins with Punctum, then shows three directions and four shared
work depths. Its optional style builder stores fixed-choice preferences in
browser storage and exports JSON or CSS tokens. The PWA does not read other
apps or files, and it does not install an operating-system-wide overlay.

## application prototype

`apps/suti-world/` is a separate Vite application for browsing repository
documents. The Pages workflow does not build or deploy it.

## specifications and protocols

`README.md` is the repository's SUTIcore specification. `core/`, `normae/`,
`specificationes/`, `protocolla/`, and `protocols/` contain source documents.
The homepage exposes only links reviewed in its own content; filenames and
folder labels do not establish publication status.

## command-line implementation

`cmd/` and `internal/` contain the Go CLI. This website does not install or
invoke that CLI.
