# Public repository contours

**id:** `suti.public-repository-contours.v1`  
**state:** public architecture note · 2026-11-04  
**scope:** `ezargaruna/suticore` and `ezargaruna/SUTI.os`

## Purpose

Keep the public method and website source separate from the portable personal workspace. The repositories may link to each other; neither becomes a mirror of the other's full payload.

| surface | `suticore` | `SUTI.os` |
|---|---|---|
| primary role | language and semantic architecture | portable local-first Markdown vault |
| owns | public specifications, SUTI.world source and Pages workflow, selected local-first tools | vault content, installer, release manifest, language entry packs |
| user entry | [suti.world](https://suti.world/) | [SUTI.os releases](https://github.com/ezargaruna/SUTI.os/releases/latest) |
| language state | 13 site choices; four active interface dictionaries, nine labeled Russian fallbacks | full Russian vault; partial EN, ES, PT-BR entries; nine layers without packs |
| accounts / hosted storage | not implied by public methods | not required by local-first vault |
| release authority | Pages workflow deploys the `suticore` site source to its GitHub project page | versioned vault ZIP and entry archives are built from its manifest; its `website/` tree has a separate Pages workflow |

## Ownership rules

1. Keep the canonical SUTI.world source and content changes in `suticore`.
2. Keep vault structure, installer behavior, package manifests, and vault archives in `SUTI.os`.
3. A website snapshot packaged in SUTI.os is a versioned preview or offline artifact. It does not replace the canonical site source.
4. Cross-link release pages and versioned artifacts; do not sync whole repositories or copy personal data.
5. Keep identity, function, license, provenance, maturity, and implementation status separate for each artifact.
6. Preserve `UNKNOWN` and `HOLD` when translation review, rights, implementation, or runtime evidence is absent.

## Current hosting discrepancy

The intended owner for the canonical website source is `suticore`. Current GitHub Pages settings report `suti.world` as the custom domain for `SUTI.os`, while `suticore` Pages reports the repository project URL. `SUTI.os` also has a separate workflow that publishes its `website/` tree. This is an unresolved deployment overlap, not a completed domain transfer.

**status:** `HOLD · hosting ownership reconciliation`  
**safe state:** no Pages domain settings were changed in this revision. Confirm the active DNS/CDN route, destination build, and rollback path before transferring the custom domain. Keep the SUTI.os website tree as a versioned snapshot until that review is complete.

## Language navigation

Both repositories use the same 13 layer identifiers: `ru`, `en`, `es`, `pt-BR`, `zh-Hans`, `hi`, `fr`, `ar`, `bn`, `eo`, `sa`, `la`, and `yzh`.

The identifier list is a navigation contract, not a translation-completion claim. Current coverage is recorded in [`language-layers.md`](language-layers.md) and [`SUTI.os/language-packs/manifest.json`](https://github.com/ezargaruna/SUTI.os/blob/main/language-packs/manifest.json). A locale can be added to runtime as translated only after the full affected interface and generated text are reviewed; a fallback must remain visible and screen-reader accessible.

For `yzh`, record an authorial transcreation with its own grammar and review. Do not classify it as a translation of an established natural language or as a historical reconstruction.

## Review lenses

This is an editorial split, not an autonomous DAO vote or a release authorization. Use the following Veche questions before a cross-repository change:

- **subject and use:** which person needs this entry, and what can they do next?
- **source and rights:** which repository owns the file and its license?
- **meaning:** does the language change preserve intent, uncertainty, and agency?
- **runtime:** which shipped page, package, or installer actually consumes it?
- **reversibility:** can the change be reviewed, reverted, or kept out of a release?

No real collective review or native-language approval is claimed by this note.

## Release path

```text
specification → implementation in its owning repository
→ artifact and locale review → isolated commit
→ repository release → site or package verification
```

`PASS` is scoped to a stated check. It does not imply commit, release, deployment, legal approval, or translation acceptance.
