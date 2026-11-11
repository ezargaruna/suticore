# SUTI.world language layers

## Three public entrances and the first reflection

All 13 layers now have independently selectable entry labels, action phrases, QR disclosure and reflection prompts. The council and companion links carry the chosen layer. Each of the 26 companion/council QR images carries the same locale and route as its text link. A notice in each layer identifies the Russian Google Form and the limited scope of the workshop translation. At 360 px, all 13 entrance sets and 26 opening reflections were checked in Chrome. Run tests/check-entry-layers.py with Playwright and Chromium from the repository root (CHROME_BIN optionally specifies a browser). The public form is a separate Russian Google Form. The remaining interface and vault retain the coverage below. The new texts are editorial drafts; Sanskrit, Latin and the authored Yazekh register have not received independent linguistic or author review.

## Current state

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
| Simplified Chinese (`zh-Hans`) | Russian fallback | Translation not reviewed | [zh-Hans](https://suti.world/?lang=zh-Hans) |
| Hindi (`hi`) | Russian fallback | Translation not reviewed | [hi](https://suti.world/?lang=hi) |
| French (`fr`) | Russian fallback for the homepage; French research brief linked separately | Page translation not reviewed | [fr](https://suti.world/?lang=fr) |
| Arabic (`ar`) | Russian fallback | Translation not reviewed | [ar](https://suti.world/?lang=ar) |
| Bengali (`bn`) | Russian fallback | Translation not reviewed | [bn](https://suti.world/?lang=bn) |
| Esperanto (`eo`) | Russian fallback | Translation not reviewed | [eo](https://suti.world/?lang=eo) |
| Sanskrit (`sa`) | Russian fallback | Translation not reviewed | [sa](https://suti.world/?lang=sa) |
| Latin (`la`) | Russian fallback | Translation not reviewed | [la](https://suti.world/?lang=la) |
| Yazekh (`yzh`) | Russian fallback | Authorial transcreation not reviewed | [yzh](https://suti.world/?lang=yzh) |

The Bengali care constellation is a separately linked editorial page; it does not change the Bengali Russian-fallback state of the home-page runtime. Its independent linguistic and cultural review remains pending. The Esperanto edition is also a separate editorial page; the Esperanto homepage layer remains Russian fallback pending full runtime translation and review.

The selector exposes the intended language layer. It does not claim that all
13 layers have complete translations. For a layer without reviewed runtime
content, the page keeps the selected layer visible and displays a notice that
the Russian source text is being shown. The page's `lang` attribute continues
to describe the language actually rendered.

The matching SUTI.os language catalog is [`language-packs/manifest.json`](https://github.com/ezargaruna/SUTI.os/blob/main/language-packs/manifest.json). It records all 13 layer identifiers, but only the Russian full vault and partial English, Spanish, and Brazilian Portuguese entry packs have downloadable files. The remaining nine layers have no SUTI.os archive. These boundaries are also summarized in [repository contours](repository-contours.v1.md).

## NITYA and .todeus passport

The original public NITYA page remains Russian-first. A complete English interface edition is available at [`nitya-en.html`](../nitya-en.html), and the home-page language selector routes English users to that edition. The current live root response contains the unified NITYA-first shell, while the standalone `/nitya-en.html` path resolves to that same shell; the GitHub Pages mirror was observed returning an older shell without the standalone route. This is a deployment parity gap, not proof that all locale routes are current. It is an editorial translation; independent native-language review has not been completed. Its linked [NITYA × .todeus passport](../nitya-todeus.html) adds a short concept-level phrase in the 13 language layers and records the status of each string. Draft strings in that passport do not activate new runtime locales or mean that the NITYA interface has been fully translated. The English source and Russian page remain distinct; Simplified Chinese, Hindi, French, Arabic, Bengali, Esperanto, Sanskrit, and Latin drafts need language review. Yazekh remains an authorial seed pending the author's grammar and transcreation review.

“Available” means that a runtime dictionary is active and covers the page's
translation markers. It is not independent certification of native-speaker or
cultural quality. The 2026-11-04 reverse UI audit found and corrected seven
visible labels that had bypassed those markers; all 300 marked strings now have
values in each active runtime dictionary. See
[`docs/audits/2026-11-04-suti-world-language-audit.md`](audits/2026-11-04-suti-world-language-audit.md).

## Research collaboration brief

`docs/research/SUTI_RESEARCH_COLLABORATION.md` has an English canonical edition.
The short invitation on the public home page is transcreated for the four
runtime interfaces. Those summaries are not translations of the full brief. A
compact disclosure links the translated brief editions; the link identifies the
content language, and the Arabic link sets RTL direction.

| Layer | Full brief | Home-page invitation |
|---|---|---|
| English (`en`) | Source edition | Available |
| Russian (`ru`) | Editorial edition at `docs/research/SUTI_RESEARCH_COLLABORATION.ru.md`; author comparison pending | Available |
| Spanish (`es`) | Editorial Spanish translation at `docs/research/SUTI_INVESTIGACION_COLABORACION.es.md`; independent review pending | Available |
| Brazilian Portuguese (`pt-BR`) | Editorial translation at `docs/research/SUTI_PESQUISA_COLABORACAO.pt-BR.md`; independent review pending | Available |
| Simplified Chinese (`zh-Hans`) | Editorial translation at `docs/research/SUTI_RESEARCH_COLLABORATION.zh-Hans.md`; independent review pending | Russian fallback on homepage |
| Hindi (`hi`) | Editorial translation at `docs/research/SUTI_RESEARCH_COLLABORATION.hi.md`; independent review pending | Russian fallback on homepage |
| French (`fr`) | Editorial translation at `docs/research/SUTI_RECHERCHE_COLLABORATION.fr.md`; independent review pending | Russian fallback on homepage |
| Arabic (`ar`) | Editorial translation at `docs/research/SUTI_RESEARCH_COLLABORATION.ar.md`; independent review pending; RTL metadata recorded | Russian fallback on homepage |
| Bengali (`bn`) | Editorial translation at `docs/research/SUTI_RESEARCH_COLLABORATION.bn.md`; independent review pending | Russian fallback on homepage |
| Esperanto (`eo`) | Editorial translation at `docs/research/SUTI_RESEARCH_COLLABORATION.eo.md`; independent review pending | Russian fallback on homepage |
| Sanskrit (`sa`) | Editorial translation at `docs/research/SUTI_RESEARCH_COLLABORATION.sa.md`; qualified review pending | Russian fallback on homepage |
| Latin (`la`) | Editorial translation at `docs/research/SUTI_RESEARCH_COLLABORATION.la.md`; qualified review pending | Russian fallback on homepage |
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

The pages are cross-linked and embedded in the unified single-file interface. Per-page inclusion does not localize the homepage, Google Form, or the other SUTI destinations. Each translation retains its own canonical route and `lang` metadata.

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
