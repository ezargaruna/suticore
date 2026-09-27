---
title: verification · evidence and scope
version: 2026.9-r3
status: authorial protocol
---

# verification

Verification checks a defined claim against evidence within a stated scope. It does not make an unchecked claim true by repetition or presentation.

## before checking

Record:

- the exact claim
- the source or expected condition
- the scope of the check
- what could count against the claim
- the applicable decision authority

## result states

| state | meaning |
|---|---|
| PASS | the defined check succeeded within scope |
| PARTIAL | some evidence supports the result; limits remain |
| FAIL | the defined check did not succeed |
| UNKNOWN | evidence does not establish a result |
| HOLD | action awaits authority or missing evidence |

State both the result and its limit. A successful file checksum, for example, confirms byte identity; it does not confirm ownership or permission to publish.

## claim types

Distinguish fact, observation, interpretation, hypothesis, evaluation, authorial convention, symbolic reading, and unknown. Cite sources for material factual claims. Mark an inference as an inference.

## stop conditions

Use `HOLD` when scope, source, consent, ownership, privacy, or authority is unclear. Preserve evidence and state the smallest next check. Do not replace uncertainty with intuition, visual polish, or an unverified symbol.
