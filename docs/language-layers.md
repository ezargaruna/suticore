# SUTI.world language layers

## 13 visitor-language entry previews

The website has static visitor-entry previews under `/entry/{locale}/` for all 13 language layers. The Pages workflow generates these routes from [`locales/entries/`](../locales/entries/); provenance and route hashes are recorded in [`locales/built/manifest.json`](../locales/built/manifest.json).

The pages explain the public entry points, user choice, status boundaries, and next route. They are transcreation drafts and are marked `noindex` until language, culture, accessibility, rights, product, and owner review are complete. The Yazekh page is an authorial experiment, not a historical reconstruction. Sanskrit and Latin require specialist review.

## Current runtime state

The public entry page offers 13 language and authorial-language layers:

| Layer | Runtime text | State | Open |
|---|---|---|---|
| Russian (`ru`) | Russian | Reviewed source locale | [ru](https://suti.world/?lang=ru) |
| English (`en`) | English | Available | [en](https://suti.world/?lang=en) |
| Spanish (`es`) | Spanish | Available | [es](https://suti.world/?lang=es) |
| Brazilian Portuguese (`pt-BR`) | Portuguese (`pt`) | Available; legacy `pt` links remain supported | [pt-BR](https://suti.world/?lang=pt-BR) |
| Simplified Chinese (`zh-Hans`) | Russian fallback | Translation not reviewed | [zh-Hans](https://suti.world/?lang=zh-Hans) |
| Hindi (`hi`) | Russian fallback | Translation not reviewed | [hi](https://suti.world/?lang=hi) |
| French (`fr`) | Russian fallback | Translation not reviewed | [fr](https://suti.world/?lang=fr) |
| Arabic (`ar`) | Russian fallback | Translation not reviewed | [ar](https://suti.world/?lang=ar) |
| Bengali (`bn`) | Russian fallback | Translation not reviewed | [bn](https://suti.world/?lang=bn) |
| Esperanto (`eo`) | Russian fallback | Translation not reviewed | [eo](https://suti.world/?lang=eo) |
| Sanskrit (`sa`) | Russian fallback | Translation not reviewed | [sa](https://suti.world/?lang=sa) |
| Latin (`la`) | Russian fallback | Translation not reviewed | [la](https://suti.world/?lang=la) |
| Yazekh (`yzh`) | Russian fallback | Authorial transcreation not reviewed | [yzh](https://suti.world/?lang=yzh) |

The selector exposes the intended language layer. It does not claim that all
13 layers have complete translations. For a layer without full runtime content,
the page keeps the selection visible, labels the Russian fallback, and links to
a static visitor-entry preview. The preview has `noindex` until its editorial
review and publication decision are complete. The app `lang` attribute continues
to describe the language actually rendered. Russian is the default only when a
visitor has not saved another locale or supplied an explicit language query.

The matching SUTI.os language catalog is [`language-packs/manifest.json`](https://github.com/ezargaruna/SUTI.os/blob/main/language-packs/manifest.json). It records all 13 layer identifiers, but only the Russian full vault and partial English, Spanish, and Brazilian Portuguese entry packs have downloadable files. The remaining nine layers have no SUTI.os archive. These boundaries are also summarized in [repository contours](repository-contours.v1.md).

## NITYA and .todeus passport

The public NITYA page is currently Russian-first. Its linked [NITYA × .todeus passport](../nitya-todeus.html) adds a short concept-level phrase in the 13 language layers and records the status of each string. Draft strings in that passport do not activate new runtime locales or mean that the NITYA interface has been fully translated. The English source and Russian page remain distinct; Simplified Chinese, Hindi, French, Arabic, Bengali, Esperanto, Sanskrit, and Latin drafts need language review. Yazekh remains an authorial seed pending the author's grammar and transcreation review.

“Available” means that a runtime dictionary is active and covers the page's
translation markers. It is not independent certification of native-speaker or
cultural quality. The 2026-11-04 reverse UI audit found and corrected seven
visible labels that had bypassed those markers; all 300 marked strings now have
values in each active runtime dictionary. See
[`docs/audits/2026-11-04-suti-world-language-audit.md`](audits/2026-11-04-suti-world-language-audit.md).

## Research collaboration brief

`docs/research/SUTI_RESEARCH_COLLABORATION.md` has an English canonical edition.
The short invitation on the public home page is transcreated for the four
runtime interfaces. Those summaries are not translations of the full brief.

| Layer | Full brief | Home-page invitation |
|---|---|---|
| English (`en`) | Source edition | Available |
| Russian (`ru`) | `HOLD` — full edition not started | Available |
| Spanish (`es`) | `HOLD` — full edition not started | Available |
| Brazilian Portuguese (`pt-BR`) | `HOLD` — full edition not started | Available |
| Simplified Chinese (`zh-Hans`) | `HOLD` — not started | Russian fallback |
| Hindi (`hi`) | `HOLD` — not started | Russian fallback |
| French (`fr`) | `HOLD` — not started | Russian fallback |
| Arabic (`ar`) | `HOLD` — not started | Russian fallback |
| Bengali (`bn`) | `HOLD` — not started | Russian fallback |
| Esperanto (`eo`) | `HOLD` — not started | Russian fallback |
| Sanskrit (`sa`) | `HOLD` — not started | Russian fallback |
| Latin (`la`) | `HOLD` — not started | Russian fallback |
| Yazekh (`yzh`) | `HOLD` — authorial transcreation not started | Russian fallback |

`HOLD` here means that no full-language edition is being represented as
available. It is not a negative judgment about the language or a translation.

## Adding a reviewed translation

1. Translate all user-facing strings, accessible names, page metadata, and
   generated practice output for the target locale.
2. Review the translation in its intended cultural and reading context.
3. Add it to the runtime locale map only after that review.
4. Verify locale selection, URL `?lang=`, persistence, RTL behavior where
   relevant, and the visible and screen-reader fallback state.

Yazekh is an authored language experiment. Treat its forms as authorial
transcreation, not as historical reconstruction or a verified translation.
