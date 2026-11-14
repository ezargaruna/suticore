# SUTI.world language layers

## 13 visitor-language entry previews

The website has static visitor-entry previews under `/entry/{locale}/` for all 13 language layers. The Pages workflow generates these routes from [`locales/entries/`](../locales/entries/); provenance and route hashes are recorded in [`locales/built/manifest.json`](../locales/built/manifest.json).

The pages explain the public entry points, user choice, status boundaries, and next route. They are publicly accessible, `noindex` transcreation previews; publication does not mean the language, culture, accessibility, rights, product, or owner review is complete. The Yazekh page is an authorial experiment, not a historical reconstruction. Sanskrit and Latin require specialist review.

## Current runtime state

The file-level snapshot is maintained in
[`audits/2026-11-11-public-localization-inventory.md`](audits/2026-11-11-public-localization-inventory.md).
It covers every root HTML page copied by the Pages workflow plus the linked
open materials. The matrix distinguishes a full runtime edition from entry
copy, a phrase ledger, examples, or a Russian fallback.

The public entry page offers 13 language and authorial-language layers:

| Layer | Runtime text | State | Open |
|---|---|---|---|
| Russian (`ru`) | Russian | Reviewed source locale | [ru](https://suti.world/?lang=ru) |
| English (`en`) | English | Available | [en](https://suti.world/?lang=en) |
| Spanish (`es`) | Spanish | Available | [es](https://suti.world/?lang=es) |
| Brazilian Portuguese (`pt-BR`) | Portuguese (`pt`) | Available; legacy `pt` links remain supported | [pt-BR](https://suti.world/?lang=pt-BR) |
| Simplified Chinese (`zh-Hans`) | Simplified Chinese | Editorial translation, native review pending | [zh-Hans](https://suti.world/?lang=zh-Hans) |
| Hindi (`hi`) | Hindi | Editorial translation, native review pending | [hi](https://suti.world/?lang=hi) |
| French (`fr`) | French | Editorial translation, native review pending | [fr](https://suti.world/?lang=fr) |
| Arabic (`ar`) | Arabic (RTL) | Editorial translation, native review pending | [ar](https://suti.world/?lang=ar) |
| Bengali (`bn`) | Bengali | Editorial translation, native review pending | [bn](https://suti.world/?lang=bn) |
| Esperanto (`eo`) | Esperanto | Editorial translation, fluent-reader review pending | [eo](https://suti.world/?lang=eo) |
| Sanskrit (`sa`) | Sanskrit | Editorial draft, qualified review pending | [sa](https://suti.world/?lang=sa) |
| Latin (`la`) | Latin | Editorial draft, qualified review pending | [la](https://suti.world/?lang=la) |
| Yazekh (`yzh`) | Russian fallback | Authorial transcreation not reviewed | [yzh](https://suti.world/entry/yzh/) |

The Sanskrit and Latin homepage editions and the separate care editions await qualified review.

The selector exposes the intended language layer. It does not claim that all
13 layers have complete translations. For a layer without full runtime content,
the page keeps the selection visible, labels the Russian fallback, and links to
a static visitor-entry preview. The preview is publicly accessible but marked
`noindex` while its editorial review remains pending. The app `lang` attribute continues
to describe the language actually rendered. Russian is the default only when a
visitor has not saved another locale or supplied an explicit language query.

The matching SUTI.os language catalog is [`language-packs/manifest.json`](https://github.com/ezargaruna/SUTI.os/blob/main/language-packs/manifest.json). It records all 13 layer identifiers, but only the Russian full vault and partial English, Spanish, and Brazilian Portuguese entry packs have downloadable files. The remaining nine layers have no SUTI.os archive. These boundaries are also summarized in [repository contours](repository-contours.v1.md).

## Care atlas · page-level editions

[`care-atlas.html`](../care-atlas.html) is the Russian source guide to mutual-care practices. Its eleven translated routes are [`English`](../care-atlas-en.html), [`español`](../care-atlas-es.html), [`português brasileiro`](../care-atlas-pt.html), [`简体中文`](../care-atlas-zh-Hans.html), [`हिन्दी`](../care-atlas-hi.html), [`français`](../care-atlas-fr.html), [`العربية`](../care-atlas-ar.html), [`বাংলা`](../care-atlas-bn.html), [`Esperanto`](../care-atlas-eo.html), [`संस्कृतम्`](../care-atlas-sa.html), and [`Latina`](../care-atlas-la.html). All twelve written editions are linked from each page and embedded in the unified HTML router. Every translation carries a visible review status, preserves the age and consent boundaries, and states that this guide is not an emergency or medical service. Independent review is pending for all translations; Sanskrit and Latin additionally require qualified review. Local Noto fonts are used for Arabic, Bengali, Hindi, and Sanskrit with their SIL OFL notices linked. The same three illustrations appear across editions. Their per-asset provenance and reuse rights are not confirmed by this language audit; translation does not grant a new license. Yazekh is `HOLD` until the author confirms grammar and vocabulary.

## Personal care map

[The personal care map](https://suti.world/care-map.html?lang=en) offers twelve written editions. This covers all thirteen threads, the choice buttons, seasonal and depth controls, and generated map text. Yazekh opens the Russian edition with a visible explanation. Editorial translations are pending independent review. Esperanto needs a fluent reviewer and Sanskrit and Latin need qualified specialists.

The same page is available inside the VereNium offline ZIP. Switching the language keeps existing answers and choices in the current tab. An explicit text download contains the visible selection and answers available at the chosen depth. The map does not send notes to the linked Google form or contact. The offline care atlas remains Russian. The three existing decorative illustrations are unchanged, and their reuse rights remain separate from the translations. The public Russian page at revision `e4e14cd` is the source for this edition set.

## NITYA and .todeus passport

The NITYA atlas is linked from the home page as its main practice entry. The atlas, interactive care questionnaire, 13 threads, geographic invitations and quest prompts have twelve written editorial editions. Yazekh explicitly shows the Russian edition pending authorial review. Regional invitations are fictional or self-guided prompts and establish no participant affiliation. New atlas copy derives from the public SUTI vocabulary and newly written prompts. Local prototypes informed navigation only. The links to individual materials retain their respective terms and content languages. The form keeps optional text in page memory and does not send it. The countdown counts to a date the visitor chooses. A shared Finist start date remains unconfirmed.


The [90-day NITYA practice](https://suti.world/nitya-practice.html?lang=en) uses twelve written editions (RU, EN, ES-419, PT-BR, zh-Hans, HI, FR, AR, BN, EO, SA, LA). The Yazekh choice displays a labeled Russian fallback. Independent language review remains pending for translations, with qualified review for Sanskrit and Latin. The optional four-decision route uses the same twelve written editions, including prompts, the unknown branch, results and controls. Each edition exposes its review state. Yazekh displays the Russian route with an explicit note. The separate legacy Samurai Dharma page is labeled Russian. The practice window is 13 November 2026 to 10 February 2027, followed by five optional closing days through 15 February. Personal practice can start at any time. Choices and progress stay in page memory.


The original public NITYA page remains Russian-first. A complete English interface edition is available at [`nitya-en.html`](../nitya-en.html), and remains directly accessible. The latest checked live root responses at `suti.world` and the GitHub Pages mirror returned the same unified NITYA-first shell. On `suti.world`, `/nitya-en.html` resolves to that shell; on GitHub Pages, `/suticore/nitya-en.html` serves the standalone edition, byte-identical to the checked-in source in the 2026-11-11 audit. This parity check does not establish that all locale routes are current. The English text remains an editorial translation; independent native-language review has not been completed. Its linked [NITYA × .todeus passport](../nitya-todeus.html) adds a short concept-level phrase in the 13 language layers and records the status of each string. Draft strings in that passport do not activate new runtime locales or mean that the NITYA interface has been fully translated. The English source and Russian page remain distinct; Simplified Chinese, Hindi, French, Arabic, Bengali, Esperanto, Sanskrit, and Latin drafts need language review. Yazekh remains an authorial seed pending the author's grammar and transcreation review.

“Available” means that a runtime dictionary is active and covers the page's
translation markers. It is not independent certification of native-speaker or
cultural quality. The 2026-11-04 reverse UI audit found and corrected seven
visible labels that had bypassed those markers; all 300 marked strings now have
values in each active runtime dictionary. See
[`docs/audits/2026-11-04-suti-world-language-audit.md`](audits/2026-11-04-suti-world-language-audit.md).

## VereNium workshop

[The local workshop](https://ezargaruna.github.io/suticore/verenium.html?lang=en) has twelve written interface editions. This covers its four routes, prompts, depth controls and import and export messages. The Yazekh choice explicitly displays the Russian edition. Editorial translations await independent review, including a fluent Esperanto reviewer and qualified Sanskrit and Latin reviewers.

Language and route are carried through standalone and embedded links. The offline bundle includes the same workshop and retains v1/v2 profile compatibility. Notes remain in the tab until the visitor explicitly saves a local file. The separate Google form and linked PDFs, archives, protocol and care resources have their own languages and terms. In the offline bundle the linked care atlas is Russian.

Source: the existing public workshop and newly written editorial translations. The translated interface introduces no new external assets or media license. The ZIP keeps the previous bundle members and refreshes the workshop and its legacy alias. See [locale source and scope](../locales/verenium/README.md).

## Research collaboration brief

`docs/research/SUTI_RESEARCH_COLLABORATION.md` has an English canonical edition.
The initial homepage invitation was transcreated for the four
runtime interfaces. Those summaries are not translations of the full brief. A
compact disclosure links the translated brief editions; the link identifies the
content language, and the Arabic link sets RTL direction.

| Layer | Full brief | Home-page invitation |
|---|---|---|
| English (`en`) | Source edition | Available |
| Russian (`ru`) | Editorial edition at `docs/research/SUTI_RESEARCH_COLLABORATION.ru.md`; author comparison pending | Available |
| Spanish (`es`) | Editorial Spanish translation at `docs/research/SUTI_INVESTIGACION_COLABORACION.es.md`; independent review pending | Available |
| Brazilian Portuguese (`pt-BR`) | Editorial translation at `docs/research/SUTI_PESQUISA_COLABORACAO.pt-BR.md`; independent review pending | Available |
| Simplified Chinese (`zh-Hans`) | Editorial translation at `docs/research/SUTI_RESEARCH_COLLABORATION.zh-Hans.md`; independent review pending | Editorial translation, independent review pending |
| Hindi (`hi`) | Editorial translation at `docs/research/SUTI_RESEARCH_COLLABORATION.hi.md`; independent review pending | Editorial translation, independent review pending |
| French (`fr`) | Editorial translation at `docs/research/SUTI_RECHERCHE_COLLABORATION.fr.md`; independent review pending | Editorial translation, independent review pending |
| Arabic (`ar`) | Editorial translation at `docs/research/SUTI_RESEARCH_COLLABORATION.ar.md`; independent review pending; RTL metadata recorded | Editorial translation, independent review pending |
| Bengali (`bn`) | Editorial translation at `docs/research/SUTI_RESEARCH_COLLABORATION.bn.md`; independent review pending | Editorial translation, independent review pending |
| Esperanto (`eo`) | Editorial translation at `docs/research/SUTI_RESEARCH_COLLABORATION.eo.md`; independent review pending | Editorial translation, fluent-reader review pending |
| Sanskrit (`sa`) | Editorial translation at `docs/research/SUTI_RESEARCH_COLLABORATION.sa.md`; qualified review pending | Editorial draft, qualified review pending |
| Latin (`la`) | Editorial translation at `docs/research/SUTI_RESEARCH_COLLABORATION.la.md`; qualified review pending | Editorial draft, qualified review pending |
| Yazekh (`yzh`) | `HOLD` — author grammar and vocabulary not confirmed; see `docs/research/SUTI_RESEARCH_COLLABORATION.yzh-HOLD.md` | Russian fallback on homepage |

A linked editorial draft is not a reviewed edition and does not mean the homepage itself is localized. The Russian edition awaits author comparison; Spanish, Brazilian Portuguese, French, Simplified Chinese, Hindi, Arabic, Bengali, and Esperanto await independent language review; Sanskrit and Latin await qualified language review. Yazekh remains `HOLD` until the author confirms its grammar and vocabulary. These statuses describe review state, not the value of a language.

## Care constellation · page-level editions

The care constellation is a proposed self-guided concept, not a connected service. Its page editions describe `.angels`, `.demons`, `.hermes`, optional creative prompts, age/access routes, privacy limits, and review status. Each page keeps the teen service marked pending and does not promise diagnosis, staffed support, or message hand-off.

| Locale | Page | State | Review boundary |
|---|---|---|---|
| English (`en`) | [`care-constellation.html`](../care-constellation.html) | Source preview | English source; live functionality is not implied. |
| Russian (`ru`) | [`care-constellation-ru.html`](../care-constellation-ru.html) | Editorial translation | Author comparison and final review pending. |
| French (`fr`) | [`care-constellation-fr.html`](../care-constellation-fr.html) | Editorial translation | Independent linguistic and cultural review pending. |
| Latin American Spanish (`es-419`) | [`care-constellation-es.html`](../care-constellation-es.html) | Editorial translation | Independent linguistic and cultural review pending. |
| Brazilian Portuguese (`pt-BR`) | [`care-constellation-pt.html`](../care-constellation-pt.html) | Editorial translation | Independent linguistic and cultural review pending. |
| Simplified Chinese (`zh-Hans`) | [`care-constellation-zh-Hans.html`](../care-constellation-zh-Hans.html) | Editorial translation | Independent linguistic and cultural review pending. |
| Hindi (`hi`) | [`care-constellation-hi.html`](../care-constellation-hi.html) | Editorial translation | Independent linguistic and cultural review pending; Devanagari font file and OFL are shipped locally. |
| Arabic (`ar`, RTL) | [`care-constellation-ar.html`](../care-constellation-ar.html) | Editorial translation | Independent linguistic and cultural review pending; RTL layout, Arabic font file, and OFL are shipped. |
| Bengali (`bn`) | [`care-constellation-bn.html`](../care-constellation-bn.html) | Editorial translation | Independent linguistic and cultural review pending; Bengali font file and OFL are shipped locally. |
| Esperanto (`eo`) | [`care-constellation-eo.html`](../care-constellation-eo.html) | Editorial translation | Independent linguistic review pending. |
| Sanskrit (`sa`) | [`care-constellation-sa.html`](../care-constellation-sa.html) | Editorial draft | Qualified Sanskrit review pending; Devanagari font file and OFL are shipped locally. |
| Latin (`la`) | [`care-constellation-la.html`](../care-constellation-la.html) | Editorial draft | Qualified Latin review pending; this is not represented as verified classical Latin. |
| Yazekh (`yzh`) | — | `HOLD` · no care-page edition | Author-confirmed grammar and vocabulary are needed before transcreation; see the [Yazekh review record](../docs/research/SUTI_RESEARCH_COLLABORATION.yzh-HOLD.md). |

The twelve written-language editions are cross-linked and embedded byte-for-byte in the unified single-file interface. Yazekh has no fabricated page or route. Per-page inclusion does not localize the homepage, Google Form, or other SUTI destinations. Each published edition retains its own canonical route and `lang` metadata.

## Adding a reviewed translation

1. Translate all user-facing strings, accessible names, page metadata, and
   generated practice output for the target locale.
2. Review the translation in its intended cultural and reading context.
3. Add it to the runtime locale map only after that review.
4. Verify locale selection, URL `?lang=`, persistence, RTL behavior where
   relevant, and the visible and screen-reader fallback state.

Yazekh is an authored language experiment. Treat its forms as authorial
transcreation, not as historical reconstruction or a verified translation.

## NITYA-first homepage update · 2026-11-11

The home page now opens with NITYA as its primary heading and links directly to
the NITYA portal. The optional care questionnaire remains a separate route
from that hero. Its external Google Forms link now states that submitted data
leaves SUTI.world and is handled by Google and the form owner.

The welcome line “Angels of Care ∴ SUTI.world :: …” is available in the twelve
provided written languages (EN, RU, ES, PT-BR, zh-Hans, HI, FR, AR, BN, EO, SA,
LA). The Yazekh selector currently uses the Russian authorial line. These welcome lines are interface copy only; they do not mean that the complete
home page, NITYA portal, or Google Form is translated into all thirteen layers.
Current runtime coverage remains the matrix above. The English NITYA edition
does not activate additional home-page locales.

The public module atlas is available at [`modules.html`](../modules.html). Its
76 selected public source records are a navigable index, not a runtime
activation statement or blanket license.

## NITYA launch copy · 13-layer ledger

`docs/launch/VERENIUM_SOCIAL_CHANNEL_KIT.v1.md` now contains short launch copy
in Russian, English, Spanish, Brazilian Portuguese, Simplified Chinese, Hindi,
French, Arabic, Bengali, Esperanto, Sanskrit, and Latin. The Yazekh row is
`HOLD`: its authorial grammar and vocabulary are not yet confirmed for this
copy. Each added version is an editorial draft awaiting language/editor review;
none of the twelve short posts activates a full interface locale. The links for
English, Spanish, and Brazilian Portuguese route to their matching interface
entry. The other routes visibly retain the site's Russian fallback for the
untranslated portions.

Rights and publication remain separate gates: the kit is a local copy draft,
not a post log or a blanket license. Native review, cultural context, link
behavior, accessibility, and permission for any visual asset require their own
records before the copy is treated as ready to publish.

## Clear-water practice

[`clear-water.html`](../clear-water.html) is the English source practice. A complete
Spanish editorial edition is available at [`clear-water-es.html`](../clear-water-es.html).
Russian, French, Spanish, Brazilian Portuguese, Simplified Chinese, Hindi, Bengali, Esperanto, Arabic, Sanskrit, and Latin editions are available at
[`clear-water-ru.html`](../clear-water-ru.html),
[`clear-water-fr.html`](../clear-water-fr.html), [`clear-water-es.html`](../clear-water-es.html),
[`clear-water-pt.html`](../clear-water-pt.html), [`clear-water-zh-Hans.html`](../clear-water-zh-Hans.html), [`clear-water-hi.html`](../clear-water-hi.html), [`clear-water-bn.html`](../clear-water-bn.html), [`clear-water-eo.html`](../clear-water-eo.html), [`clear-water-ar.html`](../clear-water-ar.html), [`clear-water-sa.html`](../clear-water-sa.html), and [`clear-water-la.html`](../clear-water-la.html). Each edition translates all
thirteen prompts, controls, and open-material notes; each marks independent review
as pending (Russian author comparison remains pending) and identifies Russian-only
linked materials. The pages link to each other and are embedded in the homepage
single-file interface. This does not translate those destinations, and the practice
is not a full translation of the wider SUTI.world site.
The Chinese, Hindi, Bengali, and Arabic editions are editorial drafts pending
independent linguistic and cultural review. The Esperanto edition is an editorial
draft pending independent linguistic review. The Arabic edition uses RTL direction.
The Sanskrit edition is a draft pending qualified review by a Sanskrit specialist.
The Latin edition is a draft pending qualified review and is not represented as a
verified classical text.

## Care constellation

[`care-constellation.html`](../care-constellation.html) is the English source page.
[`care-constellation-fr.html`](../care-constellation-fr.html) is its French editorial
edition. Both pages are available as direct routes and embedded in the unified
HTML router. The French edition translates page content, theme controls, age routes,
SVG text, and care boundaries; it retains the explicit `HOLD` equivalent for teen-facing service
and does not claim that any care service or hand-off is active. Independent French
review is pending. The page contains links to Russian-language destinations, which
remain identified before navigation.

## SUTI.angels welcome and practice · 2026-11-13

The [Russian source edition](../suti-angels.html) and eleven editorial
translations cover the welcome, five-step practice, help boundaries, link
labels, metadata and poster text alternative. The homepage library links to
the edition selected in its language menu. The pages link back to that menu
selection and link directly to one another without JavaScript.

The [per-route coverage and rights record](../locales/suti-angels/coverage.json)
identifies the reviewed source revision, rendered language, direction and
pending language review. Sanskrit and Latin await specialist review. The
Yazekh route remains on HOLD and displays labeled Russian copy.

The original poster still contains Russian text. Its provenance is recorded
and separate reuse rights remain unverified. The external Google Forms
questionnaire and Telegram channel retain their own language and conditions.
See `scripts/build_suti_angels_editions.py` for generation and drift checks.

## .synaura editorial guide · 2026-11-13

The [optional editorial guide](../modules/synaura/guide/ru.html) has 13 routes
in static HTML and downloadable Markdown. Its Russian source and 11 editorial
translations contain all 10 numbered sections and the compact instructions.
The Yazekh route displays Russian copy with a HOLD notice until the author
approves a grammar and lexicon. The homepage links to the selected edition.

The [coverage record](../modules/synaura/guide/coverage.json) includes exact
file hashes and individual review states. Native review remains pending for
living-language translations, independent fluent review for Esperanto, and
qualified review for Sanskrit and Latin. The [MIT notice](../modules/synaura/LICENSE)
applies to this module. The guide is distinct from the `synaura.html` landing
page, the 2026.11 interaction protocol, and the release announcement. Their
coverage is recorded separately.

## Public module catalog · 2026-11-13

The [module catalog](../modules.html?lang=en) localizes all 74 displayed
record titles and the search, navigation, metadata and review labels. Search
matches the current title, original title and source path. The chosen language
has a shareable query route. A labeled Russian edition remains readable when
JavaScript is unavailable. The catalog links to the architecture map in the
selected language.

The [catalog coverage and rights record](../locales/module-catalog/coverage.json)
distinguishes the editor's source language assessment from the interface
language and records individual declarations of rights, where present. Catalog
links are pinned to the revision used for those assessments.
Two older references to documents marked internal were removed from the public
catalog. One source index is empty and its language is undetermined.
The 11 translation editions await independent language review. Sanskrit and
Latin require specialist review. Yazekh displays Russian copy on HOLD.

## Module architecture map · 2026-11-13

The [architecture map](../modules/index.html) has 13 standalone routes that
preserve all 24 cards and five thematic sections. The home page and module
catalog link to the corresponding edition. The map keeps resource names and
destination languages visible and offers a return to the matching catalog.
The original English technical specifications and the older Russian
specification retain their source languages and distinct revision status.

The [architecture coverage record](../modules/architecture/coverage.json)
captures the baseline, rights scope, per-edition hashes and review states.
Eleven editorial translations await independent review. Esperanto awaits
fluent review, Sanskrit and Latin await specialist review, and the Yazekh
route remains a labeled Russian fallback pending the author's grammar and lexicon.

## Homepage interface · 2026-11-13

French, Arabic and Simplified Chinese have homepage dictionaries, supplementary
static and accessible labels, and six language-practice tracks. The review
notice is visible for editorial editions. Arabic uses right-to-left page
direction. The URL preserves a language selection and accepts the common
ES-419, PT-BR and zh-CN aliases.

The [homepage record](../locales/homepage/coverage.json) lists Russian,
English, Spanish, Brazilian Portuguese, French, Arabic and Simplified
Chinese as runtime editions. HI, BN, EO, SA and LA have labeled Russian
fallbacks on the homepage. YZH remains on HOLD pending authorial grammar
and lexicon. Existing translated visitor entries and standalone pages have
their own coverage. The NITYA link discloses an English destination where
a matching edition is absent. The external form language may differ from
the homepage language. Existing assets and linked services retain their own terms.
