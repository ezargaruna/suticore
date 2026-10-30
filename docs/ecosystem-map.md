# SUTI ecosystem map

**Source language:** English  
**Status:** public architecture map; reviewed against repository `main` at `37dc9f0` on 2026-10-30  
**Purpose:** show how current artifacts, research directions, and possible products relate without implying that a proposal is already deployed.

## 1. The system in one view

SUTI is a family of related work, not one finished application. Its public form combines a semantic framework, a website, a portable workspace, language practices, and proposals for research and community participation.

```text
SUTIcore · shared concepts and constraints
    ├── SUTI.world · public interface and routes
    │     ├── NITYA · optional experiential and world-building route
    │     └── SOTKAN · proposed source-linked research commons
    ├── SUTI.os · portable Markdown workspace
    ├── LinguaFUSION · language practice and transcreation
    └── VECHE / SUTI.dao · proposed review and governance patterns
```

The diagram expresses intended relationships. It is not a runtime dependency graph. A module name does not prove an integration, service, community, DAO, or institutional endorsement.

## 2. Layers and present maturity

| Layer | User need | Public artifact in this repository | Maturity and limit |
|---|---|---|---|
| **SUTIcore** | Keep intent, evidence, uncertainty, and action distinguishable | `core/`, `meta/00_KERNEL/`, templates, research brief | Author-created framework and code samples; no independent efficacy or scientific validation is claimed |
| **SUTI.world** | Find an understandable entry and a useful next step | `index.html`, `app/`, `docs/`, `ru/`, `es/`, `pt/` | Public website; each route and interaction must be checked separately |
| **SUTI.os** | Use a local, portable workspace without requiring a hosted account | [`ezargaruna/SUTI.os`](https://github.com/ezargaruna/SUTI.os) and this repository's release artifacts | A separately versioned public package; verify its release manifest and file licenses for each release |
| **LinguaFUSION** | Express and transfer meaning across language and context | `meta/linguafusion/`, locale layers, site language selector | Language-practice and transcreation direction; current reviewed runtime coverage is limited to the locales stated in `docs/language-layers.md` |
| **NITYA** | Enter a short, optional creative or reflective route | `docs/modules/nitya-portal.md`, website routes and prototypes | Its own feature and safety review applies; no diagnosis, personality inference, or promised transformation |
| **SOTKAN / research commons** | Connect research questions, sources, artifacts, and contributors | Research questions and a proposed commons role in the research brief | Proposal only; no shared graph, journal network, or automatic research agent is claimed as deployed |
| **VECHE** | Bring distinct perspectives and counterexamples into a review | Review patterns in public specifications | Method name for structured review; it is not a real vote, committee, or decision authority |
| **SUTI.dao** | Explore transparent community rules and stewardship | No dedicated DAO runtime in this repository | Future governance proposal; no token, treasury, member registry, voting contract, or legal entity is claimed |

## 3. Shared workflow

1. **Name the question.** Identify the person or team, their intended use, and the decision they own.
2. **Select material.** Include only sources needed for that purpose; record provenance and rights.
3. **Separate claim types.** Keep direct facts, observations, interpretations, hypotheses, and unknowns visible.
4. **Structure relationships.** Use explicit labels and traceable links; do not let a metaphor silently become evidence.
5. **Adapt the language and interface.** Preserve meaning, audience context, accessibility, and uncertainty.
6. **Return control.** Let the user inspect, correct, decline, export, or remove their contribution where the artifact supports it.
7. **Review the result.** State what was actually tested, by whom, against which criterion, and what remains unknown.

This workflow is a design contract. Only implementation-specific checks establish what a given route or tool currently does.

## 4. Development potential by stage

| Stage | Smallest useful outcome | Evidence to collect | Possible value model | Gate before advancing |
|---|---|---|---|---|
| **A · orientation** | A consistent README, system map, contribution path, and accurate download links | Broken-link check; reader can identify what exists and what is proposed | Free public documentation | Source, rights, language, and claim review |
| **B · one applied pilot** | A bounded language or clarity-audit service using a synthetic or client-approved sample | Time saved, correction effort, meaning retention, user comprehension | Fixed-scope professional service or workshop | Written scope, permissions, data handling, price, and success measure |
| **C · repeatable toolkit** | Reusable templates, schemas, and a documented handoff for one proven workflow | Reproducible results across more than one task and reviewer | Licensed materials or training, only where rights permit | Rights matrix, support burden, maintenance owner, and transparent terms |
| **D · integration adapters** | One documented connector that calls a chosen external function | Reliability, latency, failure recovery, data minimization, user control | Implementation fee or support contract | Security review, provider terms, consent, and a working rollback path |
| **E · research commons** | A small, moderated index of public research records and source links | Source quality, correction rate, contributor burden, accessibility | Sponsorship or paid curation may be explored; no revenue is assumed | Editorial policy, moderation, licenses, governance, and sustainable operations |
| **F · community governance** | A written charter and accountable human review process | Participation quality, conflicts, appeal route, and auditability | Do not presume tokenization or financial returns | Legal, tax, security, governance, and participant review before any DAO implementation |

The most testable near-term commercial path is usually a clearly scoped service around language, information architecture, or semantic review. This is a hypothesis about product sequencing, not a revenue forecast. Begin with a real buyer problem and a paid or unpaid pilot whose terms are explicit; do not promise impact before measurement.

## 5. Open and commercial use can coexist

Open documentation can make the core legible while specialist work pays for careful application, localization, facilitation, implementation, and maintenance. Keep the boundary visible:

- free access to general principles and blank examples does not imply unlimited consulting or support;
- a service offer names its deliverable, limits, price, data use, and cancellation terms;
- a license is stated per artifact and cannot grant rights the author does not hold;
- no payment buys authority over people, private profiles, or community decisions;
- any future collective funding model needs an accountable operator and independently reviewed legal and financial terms.

No active subscription, token economy, DAO treasury, or guaranteed commercial result is represented by this map.

## 6. Research questions

The following questions are suitable for bounded evaluation with public or synthetic inputs:

- Does explicit provenance help reviewers find unsupported statements?
- Does an editable intermediate map reduce correction effort during multilingual handoff?
- Which labels best help people distinguish evidence from interpretation?
- Which interface choices reduce avoidable steps without hiding user control?
- How do results change by task, language, model, and reviewer expertise?

Publish negative and inconclusive results as well as positive findings. Avoid collecting personal or sensitive data for an initial evaluation.

## 7. Open questions and owners

Before treating this map as a delivery roadmap, name a responsible maintainer for each public artifact and answer:

- Which one real user problem will be addressed first?
- Which repository and release are the source of truth for each component?
- What work is implemented, what is a prototype, and what remains a proposal?
- Which files have clear authorship, source, license, and redistribution permission?
- Who reviews each language edition and maintains it after release?
- Who responds to security, accessibility, correction, and support reports?
- What would make the team stop or roll back a feature?

Until these questions have evidence and an accountable owner, the relevant item remains `PROPOSED`, `UNKNOWN`, or `HOLD`.

## 8. Language editions

English is the source edition for this map. Translation status is tracked separately in [`ecosystem-map-locales.md`](ecosystem-map-locales.md). Do not describe a `HOLD` edition as translated or reviewed.

## Related materials

- [SUTI research collaboration brief](research/SUTI_RESEARCH_COLLABORATION.md)
- [NITYA portal specification](modules/nitya-portal.md)
- [Website language-layer status](language-layers.md)
- [Public style guide](style/SUTI_PUBLIC_STYLE.md)
- [SUTI.os public repository](https://github.com/ezargaruna/SUTI.os)
