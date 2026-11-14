# SUTI.world · public localization inventory

date :: 2026-11-11
source :: audit checkout against `origin/main` at `5893602` (2026-11-11)
scope :: public HTML files selected by `.github/workflows/pages.yml`, linked open materials, language routes, and declared rights boundaries
review type :: static source inventory; no native-speaker review claimed

## Initial deployment observation :: PR #37 baseline

A live HTTP spot check returned `200` for `https://suti.world/` and
`https://suti.world/nitya-en.html`. Both responses served the same 376,876-byte
HTML shell (SHA-256 `ae083d25761fe82acd5999fcec9154d38dac200225ad09f74e272062b3fa598f`).
This confirms availability and that the English path resolves, but the path is a
shell alias rather than a distinct English document. The GitHub Pages root returned
`200` with a different 355,673-byte response; `/suticore/nitya-en.html` returned
`404`, and its shell lacks the current English route marker. The two public origins
are therefore not in parity. HTTP status and page markers do not establish that all
interactive language routes, linked assets, or accessibility states work.

## Current deployment recheck :: 2026-11-11

Fresh `curl` requests with a browser user-agent returned HTTP 200 for
`https://suti.world/`, `https://suti.world/nitya-en.html`,
`https://suti.world/care-constellation-la.html`,
`https://ezargaruna.github.io/suticore/`,
`https://ezargaruna.github.io/suticore/nitya-en.html`, and
`https://ezargaruna.github.io/suticore/care-constellation-la.html`.
The two root URLs currently serve the same 1,283,004-byte shell
(SHA-256 `6b280bc1db848bda0dabdd2ecc7bc80efa7cde930f6dcd93efac050ce31db7e0`).
On `suti.world`, the NITYA and Latin care paths resolve to that shared shell;
the route map embeds the pages. On GitHub Pages, those paths serve standalone
files: NITYA is 67,956 bytes (SHA-256
`e0d3b75c80c9362db7dc0b1f0f4238203aff79a951d03a94e75c5b02ce14f351`) and the
Latin care page is 14,811 bytes (SHA-256
`7d45430acc9d339d41eb942d2e948e2ac85b2ecb28f4e82851123811d8d147a7`). Both
match the corresponding checkout files byte-for-byte. The local unified shell
contains 38 mapped routes, including all twelve care editions; each embedded
care document decodes byte-for-byte to its standalone source. This confirms
current availability and source parity for these checked artifacts, not full
interactive, accessibility, localization, or Workers-runtime certification.

## State summary

- Update, 2026-11-13. The separate NITYA 90-day practice offers twelve written editions with explicit Yazekh fallback. The optional four-decision branch also renders in twelve written languages. Review is pending on editorial translations. The authorial Yazekh translation is pending, with a labeled Russian fallback. See the [route and review notes](../language-layers.md#nitya-and-todeus-passport).

- Thirteen language settings are exposed on the home page. The homepage has twelve runtime dictionaries, including the Sanskrit and Latin editorial drafts. Yazekh retains a visible Russian fallback. Linked pages, forms and the vault have separate coverage.
- The home page has short entry, disclosure, and reflection copy for thirteen language layers. These small strings do not localize the rest of the page, the linked Google Form, or every destination.
- NITYA has a Russian edition and an English edition. The English edition is an editorial translation; independent native-language review is not recorded.
- NITYA × `.todeus` contains one short phrase in thirteen layers. It is a phrase ledger, not thirteen translated pages.
- The care constellation has twelve written-language page editions (EN, RU, FR, ES-419, PT-BR, zh-Hans, HI, AR, BN, EO, SA, LA); Yazekh remains `HOLD` with no generated care page until its authorial grammar and vocabulary are confirmed.
- Public copy now has short NITYA announcements in twelve written languages. The eight new drafts below remain explicitly unreviewed. Yazekh is held for authorial grammar and transcreation review.
- The open SUTI.os package declares `locale: ru`; its release manifest reports 124 payload files. The nine remaining language packages are not represented by that release artifact.
- No blanket reuse license is inferred from a public URL, an open page, or the repository code license. Each page, image, font, brand element, linked form, and third-party work requires its own applicable rights record.

## Public HTML surfaces

The publisher copies the following root HTML files into `_site`. “Available language” describes the authored page/runtime surface observed in source; it is not native-language certification.

| Artifact | Source/rendered language | Current locale coverage | Translation/review state |
|---|---|---|---|
| `index.html?lang=…` | Homepage with locale-aware interaction and generated practice copy | Twelve written editions and a labeled Russian fallback for Yazekh | Eight added dictionaries cover 479 strings, 83 supplementary strings and six tracks each. See the [homepage coverage record](../../locales/homepage/coverage.json). Independent or qualified review pending. |
| `nitya-practice.html?lang=…` | Interactive atlas, care questionnaire and games | Twelve written editions and a labeled Russian fallback for Yazekh | Care prompts, countdown controls, atlas and four-decision game are localized. Linked legacy and third-party content retains its own edition and rights. |
| `nitya.html` | Russian | RU | Russian source edition; no complete 13-language runtime. |
| `nitya-en.html` | English | EN | Editorial English edition; independent native review pending. |
| `nitya-todeus.html` | English | EN page + 13 phrase entries | Twelve written-language phrase drafts and one Yazekh authorial seed; no full-page transcreation. |
| `modules.html?lang=…` | Localized catalog with separate source language labels | 12 written-language editions and Russian fallback for YZH | 74 records. Two older references to sources marked internal were removed from public navigation. Native review remains pending. See the [catalog coverage and rights record](../../locales/module-catalog/coverage.json). |
| `care-map.html?lang=…` | Personal reflection, 13 threads, seasonal prompts and text export | 12 written editions and labeled Russian fallback for Yazekh | Local drafts with independent or qualified review pending. The offline ZIP contains the same interface. Existing art and linked forms retain separate rights and coverage. |
| `care-atlas.html` | Russian | RU | Source guide; discloses that it is not medical/emergency support and requests are not auto-routed; links to all written editions and marks YZH `HOLD`. |
| `care-atlas-en.html` | English (`en`) | EN | Full editorial draft; age/consent boundaries and service limits retained; independent review pending. |
| `care-atlas-es.html` | Latin American Spanish (`es-419`) | ES-419 | Full editorial draft; age/consent boundaries and service limits retained; independent linguistic/cultural review pending. |
| `care-atlas-pt.html` | Brazilian Portuguese (`pt-BR`) | PT-BR | Full editorial draft; age/consent boundaries and service limits retained; independent linguistic/cultural review pending. |
| `care-atlas-zh-Hans.html` | Simplified Chinese (`zh-Hans`) | ZH-HANS | Full editorial draft; independent linguistic/cultural review pending. |
| `care-atlas-hi.html` | Hindi (`hi`) | HI | Full editorial draft; bundled Noto Sans Devanagari and OFL; independent linguistic/cultural review pending. |
| `care-atlas-fr.html` | French (`fr`) | FR | Full editorial draft; independent linguistic/cultural review pending. |
| `care-atlas-ar.html` | Arabic (`ar`, RTL) | AR | Full editorial draft with RTL; bundled Noto Sans Arabic and OFL; independent linguistic/cultural review pending. |
| `care-atlas-bn.html` | Bengali (`bn`) | BN | Full editorial draft; bundled Noto Sans Bengali and OFL; independent linguistic/cultural review pending. |
| `care-atlas-eo.html` | Esperanto (`eo`) | EO | Full editorial draft; independent linguistic review pending. |
| `care-atlas-sa.html` | Sanskrit (`sa`) | SA | Full editorial draft; bundled Devanagari font and OFL; qualified linguistic/cultural review pending. |
| `care-atlas-la.html` | Latin (`la`) | LA | Full editorial draft; explicitly not certified as Classical Latin; qualified linguistic/cultural review pending. |
| `care-constellation.html` | English | EN | Source edition; links to RU, FR, ES-419, PT-BR, zh-Hans, HI, AR, BN, EO, SA, and LA editions. |
| `care-constellation-fr.html` | French (`fr`) | FR | Complete French editorial edition of the care concept, age routes, boundaries, controls, and image description; cross-linked and embedded in the unified HTML route data; independent review pending; no live service is claimed. |
| `care-constellation-es.html` | Latin American Spanish (`es-419`) | ES-419 | Complete editorial translation of the care concept, age routes, boundaries, controls, and image description; cross-linked and embedded in the unified HTML route data; independent review pending; no live service is claimed. |
| `care-constellation-pt.html` | Brazilian Portuguese (`pt-BR`) | PT-BR | Complete editorial translation of the care concept, age routes, boundaries, controls, and image description; included in the unified HTML route data and cross-linked; independent review pending; no live service is claimed. |
| `care-constellation-ru.html` | Russian (`ru`) | RU | Complete Russian editorial edition of the care concept, age routes, boundaries, controls, and image description; author comparison pending; no live service is claimed. |
| `care-constellation-zh-Hans.html` | Simplified Chinese (`zh-Hans`) | ZH-HANS | Complete editorial translation of the care concept, age routes, boundaries, controls, and image description; independent language and cultural review pending; no live service is claimed. |
| `care-constellation-hi.html` | Hindi (`hi`) | HI | Complete editorial translation with matching `lang` metadata and a locally bundled Noto Sans Devanagari font; font OFL is included in the Pages artifact; independent linguistic and cultural review pending; no live service is claimed. |
| `care-constellation-ar.html` | Arabic (`ar`, RTL) | AR | Complete editorial translation with RTL metadata/layout and a locally bundled Noto Sans Arabic font; font OFL is included in the Pages artifact; independent linguistic and cultural review pending; no live service is claimed. |
| `care-constellation-bn.html` | Bengali (`bn`) | BN | Complete editorial translation with matching `lang` metadata and a locally bundled Noto Sans Bengali font; font OFL is included in the Pages artifact; independent linguistic and cultural review pending; no live service is claimed. |
| `care-constellation-eo.html` | Esperanto (`eo`) | EO | Complete editorial translation of the care concept, age routes, boundaries, controls, and image description; embedded in the unified HTML route data and cross-linked; independent linguistic and cultural review pending; no live service is claimed. |
| `care-constellation-sa.html` | Sanskrit (`sa`) | SA | Complete editorial draft with matching `lang` metadata and a locally bundled Noto Sans Devanagari font; font OFL is included in the Pages artifact; qualified linguistic and cultural review pending; no live service is claimed. |
| `care-constellation-la.html` | Latin (`la`) | LA | Complete editorial draft of the care concept, age routes, boundaries, controls, and image description; embedded and cross-linked; qualified linguistic and cultural review pending; no live service is claimed. |
| `care-app-audit.html` | Russian | RU | Single-language audit page. |
| `suti-angels*.html` | Russian source; standalone editorial editions | RU, EN, ES-419, PT-BR, FR, zh-Hans, HI, AR, BN, EO, SA, LA; YZH Russian fallback | 13 routes in the 2026-11-13 candidate. The 11 translations are drafts pending independent review. See the [coverage and rights record](../../locales/suti-angels/coverage.json). |
| `samurai-dharma.html?lang=…` | Route, symbolic prompts and local Markdown download | Twelve written editions and labeled Russian fallback for Yazekh | Complete editorial page localization, including the copy and download controls. Review pending. Linked archives retain their own language and rights. |
| `verenium.html?lang=…` | Local workshop, four routes, import and export | 12 written editions and labeled Russian fallback for Yazekh | Complete workshop interface, including the offline copy. Independent or qualified review pending. Linked protocol and forms have their own coverage. |
| `virenium.html` | Compatibility alias | Same language support as the canonical workshop | Byte-identical to `verenium.html` and kept in both offline ZIP aliases. |
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
| `modules/index.html`, `modules/architecture/*.html` | Russian source and full editorial architecture map editions | 12 written-language editions plus YZH Russian fallback | All 24 cards, scope and resource labels are localized. Destination languages are disclosed. See [architecture coverage and rights](../../modules/architecture/coverage.json). |
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
| `modules/synaura/guide/` | Russian original plus localized HTML and Markdown | RU, EN, ES-419, PT-BR, FR, zh-Hans, HI, AR, BN, EO, SA, LA, YZH Russian fallback | The full optional editorial guide is covered. The [review and rights record](../../modules/synaura/guide/coverage.json) records independent review pending, YZH HOLD, original version, and the module-specific MIT notice. |
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

## Live recheck after Arabic care-route integration :: 2026-11-11

PR #49 (`d275f3c`) merged, and the main Pages workflow run
[`43110203057`](https://github.com/ezargaruna/suticore/actions/runs/43110203057)
completed successfully. `https://suti.world/` and the direct path
`https://suti.world/care-constellation-ar.html` both returned HTTP 200. The
production shell contains all eight care constellation editions; the embedded
Arabic document parses as `lang="ar"` and `dir="rtl"`, includes Arabic copy,
and points to the locally bundled Noto Sans Arabic font plus its OFL notice.
The font and license URLs returned HTTP 200 (`font/woff2` and `text/plain`).
This confirms published route data and asset availability, not visual RTL,
keyboard, screen-reader, or independent language/cultural review. Those reviews
remain pending. The Workers Builds status is a separate deployment surface and
is not certified by this Pages result.

The Spanish Latin American care edition (`care-constellation-es.html`, `lang="es-419"`) is published in the unified router and Pages artifact after PR #39. On 2026-11-11, both the Pages preview and `https://suti.world/` returned HTTP 200; the production shell contains 29 routes and the embedded Spanish HTML decodes byte-for-byte to the standalone source. A Node runtime check of the production dispatcher opened the direct Spanish route in the embedded frame with the expected title and `lang="es-419"`. Visual, keyboard, and screen-reader review remain outstanding. The translation is editorial and independent language/cultural review is still pending. The Workers Builds check failed separately; the Pages deployment succeeded, and no Workers change is claimed.

The Brazilian Portuguese care edition (`care-constellation-pt.html`, `lang="pt-BR"`) was merged in PR #41. The main Pages deployment run `43106798193` completed successfully. On 2026-11-11, `https://suti.world/` returned HTTP 200 with 30 embedded pages; the Portuguese page is present with the expected language and title. A Node runtime check of the production dispatcher opened the direct Portuguese route in the embedded frame. Independent language/cultural review and visual, keyboard, and screen-reader review remain outstanding. Workers Builds failed separately; the Pages workflow succeeded.

The Russian care edition (`care-constellation-ru.html`, `lang="ru"`) was merged in PR #43. Pages deployment run `43107472287` succeeded. On 2026-11-11, the production shell returned HTTP 200 with 31 embedded pages; the Russian HTML is present with the expected language and title. A Node runtime check of the published dispatcher opened the direct Russian route in its embedded frame. Author comparison and visual, keyboard, and screen-reader review remain outstanding. Workers Builds failed separately; Pages deployment succeeded.

The Simplified Chinese care edition (`care-constellation-zh-Hans.html`, `lang="zh-Hans"`) was merged in PR #45. Pages deployment run `43108184032` succeeded. On 2026-11-11, the production shell returned HTTP 200 with 32 embedded pages; the Chinese HTML is present with the expected locale and title. A Node runtime check of the production dispatcher opened the direct Chinese route in its embedded frame. Independent linguistic/cultural review and visual, keyboard, and screen-reader review remain outstanding. Workers Builds failed separately; the Pages deployment succeeded.

The Hindi care edition (`care-constellation-hi.html`, `lang="hi"`) was merged in PR #47. Pages deployment run `43109419257` succeeded. On 2026-11-11, the production shell returned HTTP 200 with 33 embedded pages; a Node runtime check opened the direct Hindi route in the embedded frame. The deployed Noto Sans Devanagari font and its SIL Open Font License both returned HTTP 200 from the project asset host; the font response had `font/woff2` and `Access-Control-Allow-Origin: *`. Independent Hindi language/cultural review and visual, keyboard, and screen-reader review remain outstanding. Workers Builds failed separately; the Pages deployment succeeded.

## Live recheck after Bengali care-route integration :: 2026-11-11

PR #51 (`84404d7`) merged, and the main Pages workflow run
[`43111251903`](https://github.com/ezargaruna/suticore/actions/runs/43111251903)
completed successfully. The production root and direct path
`https://suti.world/care-constellation-bn.html` returned HTTP 200. The
production route map contains all nine care constellation editions, and the
embedded Bengali HTML is byte-identical to the checked-in page (`lang="bn"`).
The bundled Noto Sans Bengali font and its OFL text both returned HTTP 200 from
GitHub Pages with `font/ttf` and `text/plain` content types and permissive CORS.
Independent linguistic and cultural review remains pending; this check does not
certify visual rendering, keyboard or screen-reader behavior, nor full Bengali
homepage coverage. At the time of that recheck, Bengali was still a Russian fallback in the homepage runtime.

## Live recheck after Esperanto care-route integration :: 2026-11-11

PR #53 merged, and the main Pages workflow run
[`43111784776`](https://github.com/ezargaruna/suticore/actions/runs/43111784776)
completed successfully. The production root and direct path
`https://suti.world/care-constellation-eo.html` returned HTTP 200. The
production route map contains all ten care constellation editions; the
Esperanto document is embedded byte-for-byte with `lang="eo"`. The public
page visibly identifies itself as an editorial translation and says that
independent linguistic and cultural review is still pending. This check does
not certify native-language quality, keyboard/screen-reader behavior, or full
Esperanto homepage runtime coverage; the homepage remains on its Russian
fallback for Esperanto.

## Live recheck after Sanskrit care-route integration :: 2026-11-11

PR #55 merged, and the main Pages workflow run
[`43112279633`](https://github.com/ezargaruna/suticore/actions/runs/43112279633)
completed successfully. The production root and direct path
`https://suti.world/care-constellation-sa.html` returned HTTP 200. The
published route map contains eleven care constellation editions; the Sanskrit
page is embedded byte-for-byte with `lang="sa"`. Noto Sans Devanagari and its
OFL text both returned HTTP 200 from GitHub Pages with `font/woff2` and
`text/plain` content types. The page remains an editorial draft pending
qualified linguistic and cultural review. This is not a Sanskrit homepage
runtime release or an accessibility certification.

## Live recheck after Latin care-route integration :: 2026-11-11

PR #57 merged, and the main Pages workflow run
[`43112721126`](https://github.com/ezargaruna/suticore/actions/runs/43112721126)
completed successfully. The production root and direct path
`https://suti.world/care-constellation-la.html` returned HTTP 200. The
production route map contains twelve care constellation editions; the Latin
page is embedded byte-for-byte with `lang="la"`. Its visible status identifies
it as an editorial draft and says that qualified linguistic and cultural
review is still needed. This does not certify specialist review, accessibility,
or Latin homepage runtime coverage.


## Care atlas localization wave 1 :: 2026-11-11

The Russian source guide now links to eleven translated written-language
editions: English, Latin American Spanish, Brazilian Portuguese, Simplified
Chinese, Hindi, French, Arabic, Bengali, Esperanto, Sanskrit, and Latin. The
translated pages preserve the source's practical flow, role descriptions, child-with-adult requirement,
consent and privacy boundaries, and add explicit notice that the guide is not
a staffed, medical, or emergency service and does not automatically route
requests. Each page displays its locale and pending-review status. Their shared
illustrations are unchanged; this translation work does not establish new
asset rights. The pages are in the single-file route map and the Pages copy
list; a repository check verifies locale metadata, disclosures, local links,
assets, byte-identical embeddings, and workflow inclusion. See the live recheck
below.

Coverage after this wave :: twelve written-language editions available for this
artifact (RU, EN, ES-419, PT-BR, zh-Hans, HI, FR, AR, BN, EO, SA, LA); YZH
`HOLD` pending author-approved grammar and vocabulary.


## Live recheck after Care Atlas localization wave :: 2026-11-11

PRs [#60](https://github.com/ezargaruna/suticore/pull/60) and
[#61](https://github.com/ezargaruna/suticore/pull/61) merged. The main Pages
workflow [run 43116221058](https://github.com/ezargaruna/suticore/actions/runs/43116221058)
completed successfully after the allowlisted Care Atlas source was refreshed in
both Verenium archive aliases. A fresh request to `https://suti.world/` returned
HTTP 200 and a 1,423,044-byte shell (SHA-256
`b0ab22e8a54d887d9968858fce9b67c56d112334aa09ba73563fdef0dccaf8df`). Its
route map contains 49 entries. All twelve Care Atlas entries decode byte-for-byte
to their checked-in standalone files.

The twelve GitHub Pages standalone URLs
(`/suticore/care-atlas.html` and the eleven translated paths) returned HTTP 200;
each response matched its corresponding repository file by SHA-256. On
`suti.world`, those same paths return the shared shell, whose embedded router
contains the matching pages. The six bundled font and OFL URLs for Bengali,
Arabic, and Devanagari returned HTTP 200 with expected font/text content types
and permissive CORS.

This verifies deployment, route data, and source parity. It does not certify
visual rendering, keyboard or screen-reader behavior, independent linguistic
or cultural review, or asset reuse rights. The separate Workers build is not
certified by the Pages deployment. Yazekh remains `HOLD`.
