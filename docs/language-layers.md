# SUTI.world language layers

## Current state

The public entry page offers 13 language and authorial-language layers:

| Layer | Runtime text | State |
|---|---|---|
| Russian (`ru`) | Russian | Reviewed source locale |
| English (`en`) | English | Available |
| Spanish (`es`) | Spanish | Available |
| Brazilian Portuguese (`pt-BR`) | Portuguese (`pt`) | Available; legacy `pt` links remain supported |
| Simplified Chinese (`zh-Hans`) | Russian fallback | Translation not reviewed |
| Hindi (`hi`) | Russian fallback | Translation not reviewed |
| French (`fr`) | Russian fallback | Translation not reviewed |
| Arabic (`ar`) | Russian fallback | Translation not reviewed |
| Bengali (`bn`) | Russian fallback | Translation not reviewed |
| Esperanto (`eo`) | Russian fallback | Translation not reviewed |
| Sanskrit (`sa`) | Russian fallback | Translation not reviewed |
| Latin (`la`) | Russian fallback | Translation not reviewed |
| Yazekh (`yzh`) | Russian fallback | Authorial transcreation not reviewed |

The selector exposes the intended language layer. It does not claim that all
13 layers have complete translations. For a layer without reviewed runtime
content, the page keeps the selected layer visible and displays a notice that
the Russian source text is being shown. The page's `lang` attribute continues
to describe the language actually rendered.

## Adding a reviewed translation

1. Translate all user-facing strings, accessible names, page metadata, and
   generated practice output for the target locale.
2. Review the translation in its intended cultural and reading context.
3. Add it to the runtime locale map only after that review.
4. Verify locale selection, URL `?lang=`, persistence, RTL behavior where
   relevant, and the visible and screen-reader fallback state.

Yazekh is an authored language experiment. Treat its forms as authorial
transcreation, not as historical reconstruction or a verified translation.
