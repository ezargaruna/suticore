# SUTI.world · public localization inventory

date :: 2026-11-11
source :: current checkout of PR #37 against `origin/main` at `e92e523`
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

- Thirteen language choices are exposed on the home page. Four full home-page runtime dictionaries are present: Russian, English, Spanish, and Brazilian Portuguese. Other language choices retain a visible Russian fallback for the rest of the interface. The translated research briefs are individual open materials and do not change full homepage runtime coverage.
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
| `care-constellation.html` | English | EN | Source edition; links to French, Latin American Spanish, Brazilian Portuguese, and Russian editorial editions. |
| `care-constellation-fr.html` | French (`fr`) | FR | Complete French editorial edition of the care concept, age routes, boundaries, controls, and image description; cross-linked and embedded in the unified HTML route data; independent review pending; no live service is claimed. |
| `care-constellation-es.html` | Latin American Spanish (`es-419`) | ES-419 | Complete editorial translation of the care concept, age routes, boundaries, controls, and image description; cross-linked and embedded in the unified HTML route data; independent review pending; no live service is claimed. |
| `care-constellation-pt.html` | Brazilian Portuguese (`pt-BR`) | PT-BR | Complete editorial translation of the care concept, age routes, boundaries, controls, and image description; included in the unified HTML route data and cross-linked; independent review pending; no live service is claimed. |
| `care-constellation-ru.html` | Russian (`ru`) | RU | Complete Russian editorial edition of the care concept, age routes, boundaries, controls, and image description; author comparison pending; no live service is claimed. |
| `care-constellation-zh-Hans.html` | Simplified Chinese (`zh-Hans`) | ZH-HANS | Complete editorial translation of the care concept, age routes, boundaries, controls, and image description; independent language and cultural review pending; no live service is claimed. |
| `care-constellation-hi.html` | Hindi (`hi`) | HI | Complete editorial translation with matching `lang` metadata and a locally bundled Noto Sans Devanagari font; font OFL is included in the Pages artifact; independent linguistic and cultural review pending; no live service is claimed. |
| `care-app-audit.html` | Russian | RU | Single-language audit page. |
| `suti-angels.html` | Russian | RU | Single-language page. |
| `samurai-dharma.html` | Russian | RU | Single-language page. |
| `verenium.html` | Russian | RU page + short entry locale data | `entry-locales.json` contains 13 short-copy sets; page body is not thereby fully translated. |
| `virenium.html` | Russian | RU compatibility alias | Same source as `verenium.html`; keep legacy route only for compatibility. |
| `synaura.html` | Russian | RU | Single-language page. |
| `synaura-modules.html` | Russian | RU | Single-language page. |
| `openai-crystal.html` | English UI; RU/EN examples | EN | Bilingual examples are not a translated interface. |
| `audits.html` | English | EN | Single-language index page. |
| `clear-water.html` | English | EN | Original practice page; links to RU, ES, FR, and PT-BR editions. |
| `clear-water-es.html` | Spanish (`es`) | ES | Complete editorial translation of the thirteen prompts and interaction labels; independent review pending; Russian destinations are disclosed. |
| `clear-water-fr.html` | French (`fr`) | FR | Complete editorial translation of the thirteen prompts, interaction labels, and resource notes; independent review pending; Russian destinations are disclosed. |
| `clear-water-pt.html` | Brazilian Portuguese (`pt-BR`) | PT-BR | Complete editorial translation of the thirteen prompts, interaction labels, and resource notes; independent review pending; Russian destinations are disclosed. |
| `clear-water-ru.html` | Russian (`ru`) | RU | Complete editorial translation of the thirteen prompts, interaction labels, and resource notes; author comparison and final review pending. |
| `clear-water-zh-Hans.html` | Simplified Chinese (`zh-Hans`) | zh-Hans | Complete editorial translation of the thirteen prompts, interaction labels, and resource notes; independent linguistic and cultural review pending; Russian destinations are disclosed. |
| `clear-water-hi.html` | Hindi (`hi`) | HI | Complete editorial translation of the thirteen prompts, interaction labels, and resource notes; independent linguistic and cultural review pending; Russian destinations are disclosed. |
| `clear-water-bn.html` | Bengali (`bn`) | BN | Complete editorial translation of the thirteen prompts, interaction labels, and resource notes; independent linguistic and cultural review pending; Russian destinations are disclosed. |
| `clear-water-eo.html` | Esperanto (`eo`) | EO | Complete editorial translation of the thirteen prompts, interaction labels, and resource notes; independent linguistic review pending; Russian destinations are disclosed. |
| `clear-water-ar.html` | Arabic (`ar`, RTL) | AR | Complete editorial translation of the thirteen prompts, interaction labels, and resource notes; independent linguistic and cultural review pending; RTL metadata and Russian destinations are disclosed. |
| `clear-water-sa.html` | Sanskrit (`sa`) | SA | Editorial draft of the thirteen prompts, interaction labels, and resource notes; qualified Sanskrit review pending; Russian destinations are disclosed. |
| `clear-water-la.html` | Latin (`la`) | LA | Editorial draft of the thirteen prompts, interaction labels, and resource notes; qualified Latin review pending; it is explicitly not labeled a verified classical text; Russian destinations are disclosed. |

The workflow publishes the English research master and linked RU, ES, PT-BR, FR, zh-Hans, HI, AR, BN, EO, SA, and LA editions under `docs/research/`. The homepage exposes them in a compact language disclosure with per-link `lang` values and RTL direction for Arabic. RU awaits author comparison; ES, PT-BR, FR, zh-Hans, HI, AR, BN, and EO await independent language review; SA and LA await qualified review. Yazekh has a public `HOLD` record, not a fabricated translation.

The English clear-water practice and its Russian, Spanish, French, Brazilian Portuguese, Simplified Chinese, Hindi, Bengali, Esperanto, Arabic, Sanskrit, and Latin editions are linked directly to each other and embedded in the homepage single-file interface data. Each translated edition uses matching `lang` metadata, accessible labels, visible focus, and live progress announcements; the Arabic page additionally declares RTL direction. The external Russian care form is identified before navigation. These are page-level translations only, not translation of every linked destination.

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
| `docs/research/SUTI_RESEARCH_COLLABORATION.*` | EN master + RU, ES, PT-BR, FR, zh-Hans, HI, AR, BN, EO, SA, LA drafts; Yazekh HOLD record | EN / RU / ES / PT-BR / FR / zh-Hans / HI / AR / BN / EO / SA / LA; yzh HOLD | RU author comparison pending; ES/PT-BR/FR/zh-Hans/HI/AR/BN/EO language review pending; SA/LA qualified review pending; Arabic marked RTL. Pages copies these files; each remains subject to source/license and study-scope limits. |
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
2. Compare the Russian brief with the English master; obtain independent language review for ES, PT-BR, FR, zh-Hans, HI, AR, BN, and EO, plus qualified review for SA and LA.
3. Complete RU, ES, and PT-BR editions for the highest-use public routes, with page-level coverage rather than isolated labels.
4. Expand the remaining language layers from one consent-first care entry and one NITYA introduction; show the Russian fallback explicitly wherever content is still missing.
5. Keep Sanskrit, Latin, and Yazekh in separate editorial lanes. Sanskrit and Latin need qualified language review; Yazekh needs author-approved grammar and vocabulary before transcreation.
6. Add a per-artifact, per-locale review record and rights record before promoting drafts to runtime or redistribution.

status :: inventory stage complete for the listed publish workflow
full 13-language localization :: INCOMPLETE
native-speaker / cultural review :: NOT RECORDED for the new drafts
rights clearance :: per artifact; UNKNOWN where no file-level record exists

## Live recheck after care-route integration :: 2026-11-11

The production route `https://suti.world/care-constellation-fr.html` returned HTTP 200 after PRs #37 and #38. The published shell contains 28 embedded pages, including the French care edition with `lang="fr"`. The page dispatcher recognizes a direct path and opens the matching embedded document; closing a directly opened document returns to `/`. A node-level behavior check covered the French route; keyboard and screen-reader review remain outstanding.

The Spanish Latin American care edition (`care-constellation-es.html`, `lang="es-419"`) is published in the unified router and Pages artifact after PR #39. On 2026-11-11, both the Pages preview and `https://suti.world/` returned HTTP 200; the production shell contains 29 routes and the embedded Spanish HTML decodes byte-for-byte to the standalone source. A Node runtime check of the production dispatcher opened the direct Spanish route in the embedded frame with the expected title and `lang="es-419"`. Visual, keyboard, and screen-reader review remain outstanding. The translation is editorial and independent language/cultural review is still pending. The Workers Builds check failed separately; the Pages deployment succeeded, and no Workers change is claimed.

The Brazilian Portuguese care edition (`care-constellation-pt.html`, `lang="pt-BR"`) was merged in PR #41. The main Pages deployment run `43106798193` completed successfully. On 2026-11-11, `https://suti.world/` returned HTTP 200 with 30 embedded pages; the Portuguese page is present with the expected language and title. A Node runtime check of the production dispatcher opened the direct Portuguese route in the embedded frame. Independent language/cultural review and visual, keyboard, and screen-reader review remain outstanding. Workers Builds failed separately; the Pages workflow succeeded.

The Russian care edition (`care-constellation-ru.html`, `lang="ru"`) was merged in PR #43. Pages deployment run `43107472287` succeeded. On 2026-11-11, the production shell returned HTTP 200 with 31 embedded pages; the Russian HTML is present with the expected language and title. A Node runtime check of the published dispatcher opened the direct Russian route in its embedded frame. Author comparison and visual, keyboard, and screen-reader review remain outstanding. Workers Builds failed separately; Pages deployment succeeded.

The Simplified Chinese care edition (`care-constellation-zh-Hans.html`, `lang="zh-Hans"`) was merged in PR #45. Pages deployment run `43108184032` succeeded. On 2026-11-11, the production shell returned HTTP 200 with 32 embedded pages; the Chinese HTML is present with the expected locale and title. A Node runtime check of the production dispatcher opened the direct Chinese route in its embedded frame. Independent linguistic/cultural review and visual, keyboard, and screen-reader review remain outstanding. Workers Builds failed separately; the Pages deployment succeeded.

The Hindi care edition (`care-constellation-hi.html`, `lang="hi"`) was merged in PR #47. Pages deployment run `43109419257` succeeded. On 2026-11-11, the production shell returned HTTP 200 with 33 embedded pages; a Node runtime check opened the direct Hindi route in the embedded frame. The deployed Noto Sans Devanagari font and its SIL Open Font License both returned HTTP 200 from the project asset host; the font response had `font/woff2` and `Access-Control-Allow-Origin: *`. Independent Hindi language/cultural review and visual, keyboard, and screen-reader review remain outstanding. Workers Builds failed separately; the Pages deployment succeeded.
