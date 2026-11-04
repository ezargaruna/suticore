# SUTI.world language audit

Date: 2026-11-04

Scope: public static entry page, `index.html`

Review type: reverse UI-string inventory and structural locale audit

## Findings and correction

The selector exposes 13 language layers. Four runtime dictionaries are active:
Russian (`ru`), English (`en`), Spanish (`es`), and Brazilian Portuguese
(`pt-BR`, using the `pt` dictionary). Nine other layers remain explicit
Russian fallbacks with a per-language notice. Their complete site-wide
transcreations have not been reviewed and are not represented as complete.

The reverse inventory found seven visible Russian labels that were outside the
translation markers. They are now wired to the existing four runtime
dictionaries. EN, ES, and PT-BR use localized copy; Russian remains the source.

## Structural verification

- All 285 distinct visible/accessibility translation markers have dictionary
  values in each of the four active runtime locales.
- No unmarked Cyrillic text remains in visible page text outside the Russian
  locale, language names, and deliberately untranslated language examples.
- The selector retains all 13 language layers and the nine fallback notices.
- Document language follows the rendered text (`ru` on fallback layers), so a
  selected but untranslated language is not falsely announced as page language.
- The fallback notice carries the selected layer's language; Arabic notice text
  uses RTL direction while the Russian fallback content remains LTR.
- Static structure check: no duplicate IDs and no broken local fragment links.

These checks establish key coverage and structural consistency. They do not
establish native-speaker review, cultural suitability, or complete reviewed
transcreation for all 13 layers. Those nine layers remain `HOLD` pending
authored/reviewed content and locale-specific runtime review, including RTL
behavior for Arabic.

## Status

Four runtime locales: structural key coverage `PASS`; linguistic and cultural
quality: not independently certified.

Nine fallback layers: truthful fallback behavior `PASS`; full transcreation
`HOLD`.
