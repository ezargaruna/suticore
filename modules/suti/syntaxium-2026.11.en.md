---
title: Syntaxium · notation and grammar proposal
version: 2026.11.0-draft
author: Ezar Garuna
status: proposed
implementation: no reference parser claimed
license: see repository LICENSE; third-party material retains its own terms
---

# Syntaxium · notation and grammar proposal

## purpose

Syntaxium is a proposed notation for expressing selected structure: sections, relations, actions, boundaries, and review states. It is designed to accompany ordinary language, not replace it.

The current document is a human-readable proposal. A complete normative grammar, registered operator set, parser, conformance suite, and stable serialization format do not yet exist.

## relation to synaura and SUTIcore

```text
SUTIcore   principles and limits
synaura    interaction and expression protocol
Syntaxium  notation and structural grammar proposal
```

The same glyph can have different meanings in historical drafts. Only the versioned legend attached to a document governs its interpretation.

## core notation · author profile

| glyph | proposed local meaning | plain-language expansion |
|---|---|---|
| `∴` | core or principle | what is central here? |
| `⧖` | pause or process | what is unfolding or held? |
| `⟁` | step or action | what may happen next? |
| `〄` | assembly or integration | what is being brought together? |
| `↺` | review or return | what should be reconsidered? |

These meanings follow the current authoring profile. They are not yet a universally stable operator registry.

An extended proposal may use `∅` for stop or intentional absence and `→` for direction. Include those only with an explicit local legend. Other glyphs remain unassigned until reviewed.

## structural conventions

- one block carries one main relation or claim
- indentation may show nesting in an example
- a heading names the scope of the following blocks
- punctuation and whitespace remain readable prose unless a parser version defines them
- every consequential symbol has a nearby word-level explanation
- unknown or conflicting operators are quoted or replaced with plain text

## illustrative grammar

The following EBNF describes only a small document shape. It does not define all operator semantics or whitespace behavior.

```ebnf
document  = { section } ;
section   = marker, heading, newline, { block } ;
block     = line, { newline, line } ;
marker    = "∴" | "⧖" | "⟁" | "〄" | "↺" ;
heading   = text ;
line      = text ;
```

This grammar is illustrative, not machine-validated. A parser must not infer an action, permission, or factual status from visual form alone.

## operator record · proposed fields

```text
id · glyph · plain-language name · version
category · scope · input · transformation
output · invariant · failure cases · examples
source · status · parser rule · renderer rule
```

Suggested lifecycle :: `proposal → experiment → review → stable → deprecated`

Use `stable` only after a defined parser behavior, compatibility policy, representative corpus, error tests, and independent review are published.

## normalization and compatibility

Unicode normalization may be used for comparison or parsing if the chosen version declares it. Preserve the original source bytes and record any normalized form separately. Do not silently lowercase names, rewrite glyphs, or merge spellings.

Until a versioned parser exists, compatibility means that a reader can consult the attached legend and recover the intended plain-language relationships. It is not a guarantee of deterministic machine parsing.

## validation plan

For each proposed operator, define a small test corpus with:

- an unambiguous example
- a missing or unknown operator
- a conflicting legend
- nested structure
- a plain-text fallback
- a counterexample showing what the operator must not imply

Measure human interpretation agreement and parser agreement separately. Report the sample, method, failures, and uncertainty. A score without a reproducible procedure is not a result.

## status

Syntaxium is an authorial grammar proposal. No reference parser, language server, Obsidian plugin, validator, or runtime is asserted by this document.
