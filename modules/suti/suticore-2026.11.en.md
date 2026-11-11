---
title: SUTIcore · principles and system contract
version: 2026.11.0-draft
author: Ezar Garuna
status: proposed
implementation: specification
license: see repository LICENSE; third-party material retains its own terms
---

# SUTIcore · principles and system contract

## purpose

SUTIcore is the shared principles and contract layer for SUTI methods and products. It describes how a task, its sources, its limits, and a chosen next step remain legible across tools.

This document defines an authorial architecture. It does not claim a deployed engine, autonomous agent, scientific validation, clinical efficacy, or universal compatibility.

## core invariant

Language helps distinguish. Distinction preserves choice. Choice can take the form of an action.

The person sets the purpose, interprets personal meaning, and decides whether to act. A system may organize material and offer alternatives; it does not acquire authority from its structure or vocabulary.

## working cycle

```text
question → source → observation → distinction
→ relation → evidence check → options → chosen step
→ observable trace → review or exit
```

The sequence is optional and revisable. Stop when the question is answered sufficiently. Do not add a module merely because it exists.

## evidence and claim states

Keep these kinds of material distinct:

- fact or sourced statement
- direct observation
- a person's report
- interpretation
- hypothesis
- evaluation
- symbolic or creative expression
- unknown or unavailable evidence

For each consequential claim, record its source, date or version when known, scope, and verification criterion. `UNKNOWN` means the available evidence does not support a conclusion. It does not mean false.

## independent decision axes

Do not collapse these labels into one status:

| axis | values | question |
|---|---|---|
| evidence | supported · partial · contradicted · unknown | what supports the claim? |
| check | pass · partial · fail · unknown | did it meet a stated criterion? |
| decision | hold · commit · rollback | what should happen to this change? |
| implementation | specification · prototype · deployed · unknown | what exists in the target environment? |
| release | private · review candidate · public | where may this artifact be used? |

Passing a text check does not prove runtime, rights, accessibility, safety, or publication approval.

## module selection

1. State the task and the desired result.
2. Check whether ordinary language is sufficient.
3. Offer the smallest relevant method or module.
4. Use only the inputs needed for that purpose.
5. Show material uncertainty and consequences.
6. Leave correction, pause, refusal, export, and exit available.

`available ≠ selected ≠ enabled ≠ executed`

## data and agency

- collect only what the current task needs
- do not infer identity, emotion, age, diagnosis, or consent from style
- do not treat silence as agreement
- keep personal data local unless a separate, informed transfer is chosen
- separate consent for retention, sharing, profiling, and publication
- allow a person to correct, decline, pause, and leave
- do not turn a symbolic system into a factual, medical, or predictive claim

## system family

| layer | responsibility |
|---|---|
| SUTIcore | principles, contracts, limits, and status distinctions |
| synaura | interaction and expression protocol |
| Syntaxium | proposed notation and structural grammar |
| VereNITYA | source, claim, and review method |
| SRETENIYA_OS | proposed task-specific orchestration |
| domain methods | language, maps, research, play, or media under separate scopes |

These boundaries describe an architecture. A named layer does not prove an application or integration exists.

## release and provenance

Every public artifact should identify its author or source, version, status, scope, and applicable license. Record derivative sources and exclusions. Keep private, third-party, medical, intimate, and client material outside a public package unless separately reviewed and authorized.

## review questions

- What question does this answer?
- Which parts are observed, inferred, or symbolic?
- What remains unknown?
- Can a person correct or stop the process?
- Does the target environment actually implement this contract?

## status

This is a proposed public specification. It is not a certification, product guarantee, or runtime report. Implementation and evaluation require separate artifacts and evidence.
