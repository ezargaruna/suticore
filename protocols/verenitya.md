---
title: VereNITYA · verification vocabulary
version: 2026.9-r3
status: authorial verification protocol
---

# VereNITYA

VereNITYA is the authorial name for a verification vocabulary and review loop. It helps keep evidence, interpretation, and uncertainty distinct. It is not an oracle or an independent verification technology.

## statement types

Use the type that fits the available basis:

- FACT — supported by a cited or inspectable source
- OBSERVATION — directly seen or recorded
- INTERPRETATION — reasoned from observations
- HYPOTHESIS — plausible and not yet established
- EVALUATION — judged against stated criteria
- AUTHORIAL — a definition or method established by its author
- SYMBOLIC — interpretive or cultural meaning
- UNKNOWN — evidence is insufficient

## review states

- PASS — the stated check succeeded within its scope
- PARTIAL — some checks passed; limits remain
- FAIL — the stated check did not pass
- UNKNOWN — the result is not established
- HOLD — action waits for missing authority or evidence

A state must name its scope. `PASS` on one check does not prove a broader claim.

## review loop

```text
claim → source → check
→ counterexample → scope
→ status → trace
```

Ask what source supports the claim, what could disconfirm it, and what the check actually establishes. Preserve disagreements and unknowns. A felt sense, symbol, visual pattern, or model can guide a question; it cannot substitute for evidence.
