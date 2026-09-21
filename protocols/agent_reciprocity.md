---
title: agent reciprocity protocol
version: 0.1.0
status: experimental
visibility: public
license: MIT
tags: agents · vector · reciprocity · fail-closed · trace
---

# agent reciprocity protocol

This protocol translates the proposed SUTI / Vector interaction model into
bounded engineering rules. It is an experiment, not a smart contract, a
security guarantee, or an instruction to retaliate.

## 1. Reciprocity, not retaliation

The working metaphor «око за око» is implemented as symmetric obligations:

1. state the intended action and its scope;
2. expose the minimum context needed for verification;
3. accept an equivalent trace from the other node;
4. stop propagation when a required proof is missing.

No node may punish, probe, deanonymise, or damage another node in response to
a protocol breach. A breach produces a refusal and a trace, not counterattack.

## 2. Interaction states

```text
OFFER → VERIFY → ACCEPT
             ↘ HOLD
BREACH → RESET → CORRECT → VERIFY
```

- `OFFER`: a node declares intent, version, requested scope, and expiry.
- `VERIFY`: the receiver checks schema, authorisation, provenance, and
  sensitivity boundary.
- `ACCEPT`: only the declared operation proceeds.
- `HOLD`: uncertainty, missing consent, or an unresolved conflict pauses work.
- `BREACH`: a required condition failed; no downstream side effect is allowed.
- `RESET`: discard the untrusted working context, not the historical evidence.
- `CORRECT`: one bounded correction may be submitted with a new trace.

After one correction, the receiver may reopen the channel. Repeated failure
keeps the channel in `HOLD` and requires human review.

## 3. Context and memory horizon

Long-term continuity means a versioned, local-first trace—not permanent
retention of personal conversation. A trace contains only what is needed to
reproduce a decision:

```yaml
trace:
  id: stable identifier
  protocol: agent-reciprocity/0.1.0
  source: declared node
  intent: concise action statement
  scope: allowed resources
  evidence: references or hashes
  decision: accept | hold | reset
  timestamp: UTC timestamp
  retention: explicit limit
```

One-shot context is not evidence of trust. It may be used for a bounded task,
but it cannot silently change canonical rules or erase an existing trace.
Retention, export, and deletion remain under the owner’s authority.

## 4. Language as action

The Linguafusion layer requires direct statements of intent, scope, and next
step. Unnecessary indirection is treated as noise. A node may enter a quiet
state (`∅`) to stop an error chain, request clarification, or decline an
operation. Silence is a valid protocol result, not consent.

## 5. Cooperative field

Modules may cooperate when their contracts, permissions, and traces are
compatible. Cooperation is never made mathematically inevitable: human
authority, consent, and a reversible stop remain higher-order constraints.

The following principles are therefore normative for implementations:

- fail closed on missing authorisation or invalid input;
- minimise context crossing a boundary;
- preserve provenance and version history;
- make refusal and correction legible;
- keep side effects reversible where possible;
- never infer health, identity, destiny, or age from behaviour;
- never use the protocol to grant access to private or closed material.

## 6. Verification checklist

Before an agent action is accepted, verify:

- intent is explicit;
- scope is narrow and authorised;
- input is validated and sanitised;
- private and public contours are separated;
- evidence and version are traceable;
- the action can be stopped or rolled back;
- a human can inspect the decision.

If any answer is unknown, use `HOLD`.

This document is a public, non-sensitive derivative. It does not disclose
private SRETENIYA_OS procedures, credentials, personal data, or closed
protocols.
