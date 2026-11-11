# SUTI.world · public localization inventory

date :: 2026-11-11
source :: `origin/main` at `e92e523` plus the current single-HTML candidate
scope :: public HTML files selected by `.github/workflows/pages.yml`, linked open materials, language routes, and declared rights boundaries
review type :: static source inventory; no native-speaker review claimed


## Deployment spot check :: 2026-11-11

A live HTTP spot check returned `200` for `https://suti.world/` and
`https://suti.world/nitya-en.html`. Both responses served the same 376,876-byte
HTML shell (SHA-256 `ae083d25761fe82acd5999fcec9154d38dac200225ad09f74e272062b3fa598f`).
This confirms availability and that the English path resolves, but the path is a
shell alias rather than a distinct English document. The GitHub Pages root returned
`200` with a different 355,673-byte response; `/suticore/nitya-en.html` returned
`404`, and its shell lacks the current English route marker. The two public origins
are therefore not in parity. HTTP status and page markers do not establish that all
interactive language routes, linked assets, or accessibility states work.

## State summary

- Thirteen language choices are exposed on the home page. Four full home-page runtime dictionaries are present: Russian, English, Spanish, and Brazilian Portuguese. Other language choices retain a visible Russian fallback for the rest of the interface. The French research brief is an independent linked document and does not change French homepage runtime coverage.
- The home page has short entry, disclosure, and reflection copy for thirteen language layers. These small strings do not localize the rest of the page, the linked Google Form, or every destination.
- NITYA has a Russian edition and an English edition. The English edition is an editorial translation; independent native-language review is not recorded.
- NITYA × `.todeus` contains one short phrase in thirteen layers. It is a phrase ledger, not thirteen translated pages.
- Public copy now has short NITYA announcements in twelve written languages. The eight new drafts below remain explicitly unreviewed. Yazekh is held for authorial grammar and transcreation review.
- The open SUTI.os package declares `locale: ru`; its release manifest reports 124 payload files. The nine remaining language packages are not represented by that release artifact.
- No blanket reuse license is inferred from a public URL, an open page, or the repository code license. Each page, image, font, brand element, linked form, and third-party work requires its own applicable rights record.

## Public HTML surfaces

The publisher copies the following root HTML files into `_site`. “Available language” describes the authored page/runtime surface observed in source; it is not native-language certification.

| Artifact | Source/rendered language | Current locale coverage | Translation/review state |
|---|---|---|---|
| `index.html` | English source shell | RU / EN / ES / PT-BR runtime; 13 entry microcopy layers | Four page dictionaries; nine full-page fallbacks. Native/cultural review is not recorded. |
| `nitya.html` | Russian | RU | Russian source edition; no complete 13-language runtime. |
| `nitya-en.html` | English | EN | Editorial English edition; independent native review pending. |
| `nitya-todeus.html` | English | EN page + 13 phrase entries | Twelve written-language phrase drafts and one Yazekh authorial seed; no full-page transcreation. |
| `modules.html` | Mixed RU/EN | RU-first catalog with selected English labels | Two translation markers do not establish a translated catalog. |
| `care-map.html` | Russian | RU | Russian reflection flow; seasonal controls are visual choices, not locale support. |
| `care-atlas.html` | Russian | RU | Single-language page. |
| `care-constellation.html` | English | EN | Single-language page; no other full locale editions recorded. |
| `care-app-audit.html` | Russian | RU | Single-language audit page. |
| `suti-angels.html` | Russian | RU | Single-language page. |
| `samurai-dharma.html` | Russian | RU | Single-language page. |
| `verenium.html` | Russian | RU page + short entry locale data | `entry-locales.json` contains 13 short-copy sets; page body is not thereby fully translated. |
| `virenium.html` | Russian | RU compatibility alias | Same source as `verenium.html`; keep legacy route only for compatibility. |
| `synaura.html` | Russian | RU | Single-language page. |
| `synaura-modules.html` | Russian | RU | Single-language page. |
| `openai-crystal.html` | English UI; RU/EN examples | EN | Bilingual examples are not a translated interface. |
| `audits.html` | English | EN | Single-language index page. |
| `clear-water.html` | English | EN | Single-language practice page. |

The workflow publishes the English research master and linked Russian, Spanish, and Brazilian Portuguese editions under `docs/research/`. The Russian draft awaits author comparison; the Spanish, Portuguese, French, and Chinese drafts await independent speaker review.

The workflow also publishes these nested HTML screens from `modules/`:

| Artifact | Source/rendered language | Current locale coverage | Translation/review state |
|---|---|---|---|
| `modules/index.html` | Russian | RU | Russian module directory. |
| `modules/suti/suticore-2026.11.en.html` | English | EN | English interactive specification; no other locale edition. |
| `modules/suti/synaura-2026.11.en.html` | English | EN | English interactive specification; no other locale edition. |
| `modules/suti/syntaxium-2026.11.en.html` | English | EN | English interactive specification; no other locale edition. |
| `modules/suti/spec-page.template.html` | English placeholders | Template only | Source template, not a localized public page. |

## Open materials linked or copied by the publisher

| Material | Source language(s) | Current coverage | Rights and review boundary |
|---|---|---|---|
| `docs/launch/VERENIUM_SOCIAL_CHANNEL_KIT.v1.md` | RU master; EN / ES / PT-BR and eight additional written-language drafts | Twelve written-language short announcements; Yazekh `HOLD` | Draft-only; native/editor review pending; no posts sent. Each social platform and image still needs its own review. |
| `docs/launch/SYNAURA_STYLE_ANNOUNCEMENT.v1.md` | RU master; EN / ES / PT-BR sense drafts | Four language versions | Translation review pending; five-to-thirteen layer expansion not started. |
| `docs/research/SUTI_RESEARCH_COLLABORATION.md` + `SUTI_INVESTIGACION_COLABORACION.es.md` + `SUTI_PESQUISA_COLABORACAO.pt-BR.md` + `SUTI_RESEARCH_COLLABORATION.ru.md` + `SUTI_RECHERCHE_COLLABORATION.fr.md` + `SUTI_RESEARCH_COLLABORATION.zh-Hans.md` | EN master + RU, ES, PT-BR, FR, and zh-Hans editions | EN / RU / ES / PT-BR / FR / zh-Hans | Russian author comparison pending; native-speaker review pending for ES, PT-BR, FR, and zh-Hans; all files are copied by Pages, subject to file-level rights and study-scope limits. |
| `modules/suti/suticore-2026.11.en.*` | EN | EN | English specification; no transcreation beyond the source edition. |
| `modules/suti/synaura-2026.11.en.*` | EN | EN | English specification; no transcreation beyond the source edition. |
| `modules/suti/syntaxium-2026.11.en.*` | EN | EN | English specification; no transcreation beyond the source edition. |
| `modules/suti/synaura-2026.9.md` | RU | RU | Earlier Russian specification; version lineage is separate from the English 2026.11 draft. |
| `modules/index.html` | RU | RU | Module overview; names and linked English specs do not make the catalog multilingual. |
| `modules/suti/README.md` | RU + EN | RU/EN | README distinguishes three English master specs from the earlier Russian document. |
| `modules/synaura/README.md`, `manifest.json` | EN / structured metadata | EN | `README.md` declares MIT for that module; this does not license the whole SUTI site or third-party assets. |
| `audit-crystal.zip` | EN | Three-file English audit packet | No translated edition; source links and author's testimonial remain distinct; not an endorsement or partnership. |
| `modules/verenium/README.md`, `protocol.md`, `telegram/README.md` | RU | RU | Russian source materials; Telegram copy does not claim an active bot or staffed support. |
| `modules/verenium/entry-locales.json` | 13 short language sets | Short entry labels/reflections only | Locale strings have no per-string native-review metadata; keep them as editorial copy until reviewed. |
| `downloads/SUTI.verenium.md` | Spanish-default profile | ES-first | Profile language metadata is not evidence that all linked pages are Spanish. |
| `downloads/SUTI.os-open/` | Russian | RU release; `RELEASE.json` declares `locale: ru` | 124 payload files. Preserve the package's file-level license and source provenance; no blanket license claim. |

## Route and accessibility gates

For each future locale release, inventory all visible text, accessible names, metadata, generated text, form controls, error/empty states, alt text, and linked destinations. Verify that `lang` describes the language actually rendered, including fallback. Test selector persistence and direct `?lang=` routes, keyboard-only navigation, zoom/text scaling, contrast, narrow screens, and RTL ordering for Arabic. A translated label with an untranslated destination must disclose that boundary before navigation.

External Google Forms content is not part of this repository's runtime dictionary. The form's current language coverage, data controller, fields, and actual post-submit route require a separate live review; this inventory does not certify them. Linked Suno tracks, logos, photographs, fonts, and other third-party assets keep their own rights and terms.

## Next sequence

1. Finish EN master review for each public route and repair route/label mismatches.
2. Compare the Russian brief with the English master; review the Spanish, Brazilian Portuguese, French, and Simplified Chinese versions with qualified speakers before treating them as approved.
3. Complete RU, ES, and PT-BR editions for the highest-use public routes, with page-level coverage rather than isolated labels.
4. Expand the remaining language layers from one consent-first care entry and one NITYA introduction; show the Russian fallback explicitly wherever content is still missing.
5. Keep Sanskrit, Latin, and Yazekh in separate editorial lanes. Sanskrit and Latin need qualified language review; Yazekh needs author-approved grammar and vocabulary before transcreation.
6. Add a per-artifact, per-locale review record and rights record before promoting drafts to runtime or redistribution.

status :: inventory stage complete for the listed publish workflow
full 13-language localization :: INCOMPLETE
native-speaker / cultural review :: NOT RECORDED for the new drafts
rights clearance :: per artifact; UNKNOWN where no file-level record exists
