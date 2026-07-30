<!--
document    :: SYSTEM_MAP
version     :: 0.1
category    :: repository topology
status      :: draft
authority   :: informational
-->

# s u t i c o r e

## system map

---

# ∴ purpose

This document provides a structural overview of the SUTI ecosystem.

It defines the organization of the repository, the relationships between its modules and the responsibility boundaries of each architectural layer.

This document is informational.

It does not define normative concepts or engineering requirements.

---

# ⟁ ecosystem topology

```text
                         SUTI.world
                semantic civilization platform

                               │
                               ▼

                         SUTIcore
                 semantic operating system

                               │
         ┌───────────────┬───────────────┬───────────────┐
         ▼               ▼               ▼               ▼

   Specifications    Standards      Protocols       Runtime

         │               │               │               │
         └───────────────┴───────┬───────┴───────────────┘
                                 ▼

                        Implementations

                                 │
                                 ▼

                            Applications

                                 │
                                 ▼

                              Feedback

                                 │
                                 ▼

                              Research
```

---

# ⟐ repository structure

```text
README.md
    project entry

SYSTEM_MAP.md
    repository topology

LICENSE
    legal framework

index.html
    interactive ecosystem map

────────────────────────────────────────────

specifications/
    canonical specifications

standards/
    engineering standards

protocols/
    operational frameworks

runtime/
    execution architecture

implementations/
    reference implementations

research/
    investigations
    hypotheses
    working papers

examples/
    reference examples

website/
    public platform

assets/
    visual resources
```

---

# ⚙ architectural hierarchy

```text
SUTI.world

↓

SUTIcore

↓

Specifications

↓

Standards

↓

Protocols

↓

Runtime

↓

Implementations

↓

Applications
```

Each layer derives its requirements from the layer above while introducing no contradictions.

---

# ∴ module responsibilities

## SUTI.world

Public ecosystem.

Community.

Education.

Documentation.

Research dissemination.

Applications.

---

## SUTIcore

Semantic operating system.

Constraint model.

Architectural foundations.

Reference specifications.

---

## Specifications

Canonical engineering specifications.

Define concepts, principles, models and invariants.

---

## Standards

Derived normative documents.

Specify implementation-independent requirements.

---

## Protocols

Operational frameworks.

Transformation methodologies.

Interaction models.

---

## Runtime

Execution environments.

Automation.

Semantic processing.

AI integration.

---

## Implementations

Reference software.

Libraries.

Services.

Experimental systems.

---

## Research

Working papers.

Comparative studies.

Experimental investigations.

Future specifications.

---

# ↺ development workflow

```text
Research

↓

Specification

↓

Standard

↓

Protocol

↓

Implementation

↓

Validation

↓

Feedback

↓

Research
```

Repository evolution is iterative.

Research generates specifications.

Specifications govern standards.

Standards constrain implementations.

Implementations produce evidence for future refinement.

---

# ⟡ document authority

| document | authority |
|-----------|-----------|
| README.md | public entry |
| SYSTEM_MAP.md | repository topology |
| specifications/* | normative |
| standards/* | normative |
| protocols/* | operational |
| runtime/* | execution |
| research/* | exploratory |
| implementations/* | reference |

---

# ∴ navigation

New visitors should follow this sequence.

```text
README

↓

SYSTEM_MAP

↓

Specification

↓

Standard

↓

Protocol

↓

Implementation
```

Interactive exploration of the complete ecosystem is available through:

```text
index.html
```

---

# ⚙ scope

This document defines only the structural organization of the repository.

It does not define:

- semantic concepts
- constraint models
- engineering requirements
- protocol semantics
- implementation behavior

These concerns belong to the corresponding specifications.

---

# ◉ status

```text
document        :: SYSTEM_MAP

version         :: 0.1

category        :: repository topology

authority       :: informational

repository      :: SUTIcore

ecosystem       :: SUTI.world

status          :: active
```

---

<div align="center">

```text
README

↓

SYSTEM_MAP

↓

Specifications

↓

Standards

↓

Protocols

↓

Runtime

↓

Implementations

↓

Applications
```

**repository topology**

⟁ → ∅ → ㄄

</div>
