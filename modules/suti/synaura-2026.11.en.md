---
title: SYNAURA · formal visual-semantic language proposal
version: 2026.11.0-draft
author: Ezar Garuna
status: proposed
implementation: specification
license: see repository LICENSE; third-party material retains its own terms
---

# SYNAURA · formal visual-semantic language proposal

## purpose and distinction

SYNAURA is an author-proposed formal visual-semantic language. It aims to represent meaning through explicit structure, relations, operators, and visual organization. It is not a markup language, a style guide, or a decorative format.

This draft specifies the language family and its intended use. The formal grammar, operator semantics, parser, conformance tests, and deterministic serialization are incomplete; the language is not yet a validated machine standard.

## family boundaries

| layer | role |
|---|---|
| SUTIcore | shared principles, evidence boundaries, and contracts |
| SYNAURA | visual-semantic language and meaning architecture |
| Syntaxium | proposed notation, operators, and structural grammar |
| `.synaura` | optional editorial style adapter for presentation |

The language and its presentation profile are related but distinct. A theme cannot establish a symbol's meaning.

This specification does not guarantee model behavior, cognitive effects, scientific validity, or an installed runtime.

## language invariant

Make the relevant distinction legible across human and machine representations. Preserve provenance and uncertainty. Let the person determine personal meaning and action.

## interpretation and use sequence

```text
understand the task
→ identify necessary context
→ distinguish evidence from interpretation
→ choose a sufficient form
→ present options or a reversible step
→ check whether the result serves the task
```

This is a proposed interpretation sequence, not an automatic agent state machine.

## expression profile

- use concrete words before abstract labels
- keep one main thought per block where practical
- prefer short, connected paragraphs over fragmented slogans
- use lowercase by default where the language permits
- preserve names, quotation, code, grammar, and accessibility needs
- use a glyph only when it adds a clear function
- provide a plain-language reading for consequential symbols
- offer detail when it improves understanding

Line and block lengths are flexible defaults. Tables, code, long-form explanation, legal content, and assistive technology may need other forms.

## style is user-controlled

Presentation may offer themes for contrast, density, typography, motion, and texture. The user can select, change, or disable them. Adaptation must not infer age, mood, health, identity, consent, or ability from behavior or personal history.

Keep a readable fallback without color, animation, sound, or special glyphs. Honor device text scaling and reduced-motion preferences. Do not let a theme change the meaning or authorization of an action.

## epistemic and safety boundaries

- label observation, interpretation, hypothesis, evaluation, and symbol distinctly
- state what is unknown and what evidence could change the conclusion
- do not diagnose or predict a person from symbolic material
- do not claim that a prompt overrides system rules or changes model weights
- do not treat visual density or confidence as proof
- pause when the requested scope, authority, or source rights are unclear

## optional modules

Synaura can be paired with Syntaxium notation, a visual design profile, a research protocol, or a task-specific SUTI module. Each keeps its own version, provenance, and implementation status. No module activates another automatically.

## modular specification · 00–12

These modules define a document architecture. They do not describe installed software.

| id | module | purpose |
|---|---|---|
| 00 | activation manifest | declare purpose, scope, status, and selected modules |
| 01 | core principles | preserve meaning, evidence boundaries, and choice |
| 02 | style canon | express the task in a suitable readable form |
| 03 | Syntaxium grammar | propose structure and operator use |
| 04 | operator registry | record definitions, versions, scope, and tests |
| 05 | visual language | describe visual relationships as design hypotheses |
| 06 | parser and AST | propose conversion into structured data |
| 07 | token economy | compare measured token cost and task performance |
| 08 | runtime boundary | describe intended behavior without claiming deployment |
| 09 | research protocol | make experiments bounded and reproducible |
| 10 | validation | define procedures before reporting metrics |
| 11 | reference architecture | relate specifications to possible implementations |
| 12 | templates | provide portable examples and plain-text fallbacks |

### module 00 · activation manifest

```text
purpose :: clarify a selected task
scope :: current request and provided context
status :: proposed document guidance
modules :: selected by the person for this task
implementation :: state only what was observed
```

This is context supplied to a model or collaborator. It is not privileged control, a reset, or a guarantee that a system will comply.

### module 01 · core principles

- distinguish source, observation, interpretation, hypothesis, evaluation, and symbol
- prefer evidence over unsupported certainty
- use sufficient structure instead of maximal structure
- preserve correction, choice, pause, and exit
- treat unknown information as unknown

These are design commitments, not measured laws of cognition.

### module 02 · style canon

Order information for the task: purpose, relevant distinctions, evidence, limits, options, and next step. Use lowercase by default where natural. Do not enforce line or paragraph limits when they harm grammar, comprehension, accessibility, or precision.

### module 03 · Syntaxium grammar

Syntaxium is a companion proposal. Its versioned legend defines the meaning of any glyph used. A sample grammar appears in the [Syntaxium specification](syntaxium-2026.11.en.html). Plain language remains authoritative when a symbol is ambiguous.

### module 04 · operator registry

Each operator record should include an identifier, glyph, plain-language name, version, scope, definition, transformation, invariant, failure cases, provenance, examples, parser behavior, and tests. No operator is called stable before its semantics and compatibility are reviewed.

### module 05 · visual language

Use hierarchy, spacing, typography, and contrast to clarify relationships. Associations between shape, color, layout, and cognition are hypotheses until tested with a defined task and participants. A symbol never replaces a text alternative.

### module 06 · parser and canonical structure

Proposed pipeline :: source preservation → normalization copy → token recognition → syntax parse → semantic checks → structured representation → renderer.

The original source is preserved. Schema, identifiers, relation types, error behavior, and compatibility rules require implementation and review before a canonical AST is claimed.

### module 07 · token economy

Token cost depends on the model, tokenizer version, and context. Measure it on a named corpus and task. Compare an operator with a plain-text alias under the same conditions. Do not infer token cost from glyph width or UTF-8 bytes.

Any efficiency score remains a research proposal until its factors, scales, normalization, uncertainty, and decision use are specified and tested.

### module 08 · runtime boundary

An activation prompt may provide context and preferences. It cannot override platform rules, modify model weights, guarantee behavior, or execute an external action. Report a runtime only when a specific implementation and observed result support the claim.

### module 09 · research protocol

State one question, one changed variable, a baseline, the source version, model and tokenizer when relevant, the scoring procedure, limitations, and failures. Keep personal data and telemetry out unless their collection is necessary and separately authorized.

### module 10 · validation

Possible measures include task comprehension, structural preservation, parser agreement, retrieval accuracy, translation stability, accessibility, and measured token count. Each measure needs a procedure, sample, baseline, threshold rationale, and error report. A numeric target without those elements is not a result.

### module 11 · reference architecture

Possible components include a versioned registry, grammar, parser, validator, structured representation, renderer, style profile, and test corpus. Markdown, JSON, HTML, PDF, and editor adapters are possible targets. Each remains proposed until its implementation and version are identified.

### module 12 · templates

```text
task :: what the person asked
source :: what material is available
distinction :: what is known and unknown
options :: what the person may choose
next step :: reversible where practical
status :: specification / prototype / deployed / unknown
```

Use the template only when it helps the task. The person can request ordinary prose or stop the method.

## review criteria

1. Can the reader identify the main point?
2. Are evidence and interpretation distinguishable?
3. Is the next choice understandable and optional?
4. Can the result be corrected, paused, or exited?
5. Does the content remain usable in a plain-text form?

## status

This is a proposed authorial specification. It is not a measured usability result or proof that a particular site, bot, parser, or service implements it.
