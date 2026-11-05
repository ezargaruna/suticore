# .veche · исследование коллективного решения

**id:** `suti.research.veche-consensus.v1`
**revision:** 1.0 · 2026-11-04
**state:** `RESEARCH PROPOSAL · EDITORIAL ONLY`
**implementation:** `not implemented / not verified`
**participants:** `0` · **consensus:** `false`
**decision authority:** none
**scope:** comparative study of historical assemblies and contemporary decision protocols

## essence

`.veche` is a research and review module for making collective decisions legible.

It does not claim to reconstruct one timeless ancient protocol. It does not infer consent from silence, classify whose argument matters, cast votes, or authorize code and asset movement.

```text
question → evidence → options → explicit response
→ human decision → bounded action → review
```

## research question

Which documented practices of particular medieval assemblies can inform accessible, accountable group decision processes today, and where does the analogy fail?

The supplied proposal offers a design hypothesis: local discussion, visible grounds, explicit dissent, a recorded decision, and a reviewable action may help groups coordinate. Those properties need direct study; they are not established by labeling the design “veche”, “fractal”, or “trustless”.

## claim audit

| claim in submitted draft | status | bounded finding |
|---|---|---|
| chronicles record assemblies in different Rus’ cities and periods | `SUPPORTED IN GENERAL; DATES HOLD` | Each event in the submitted list requires its own chronicle passage, edition, date convention, and context. A dated mention does not establish a standing, uniform institution. |
| Novgorod and Pskov had the same stable five-phase protocol | `UNSUPPORTED AS STATED` | The draft's five phases are a modern analytical model. They should not be attributed to medieval actors without direct evidence. |
| participation meant one household, one vote, including a widow inheriting representation | `UNKNOWN / SOURCE REQUIRED` | No evidence supplied for this general rule. Do not encode it as historical fact or modern identity policy. |
| the assembly was either a broad democracy or a fixed elite of “300 golden belts” | `DISPUTED / OVERSIMPLIFIED` | Scholarship debates composition and periodization. P. V. Lukin's source-based account argues for a changing political community of full-status male townsmen organized through territorial groups, with elite leadership; this remains a scholarly interpretation, not proof of equal participation. |
| local “street / end / city” bodies form a proven fractal consensus network | `ANALOGY / NOT ESTABLISHED` | Territorial organization can inspire a model. “Fractal” is a present-day systems analogy unless separately operationalized and evidenced. |
| silence at an assembly signified consent | `UNSUPPORTED AND UNSAFE AS A RULE` | Non-participation is ambiguous. The interface must record no response as no response, never as agreement or authorization. |
| acclamation measured preference intensity by acoustic energy | `UNSUPPORTED / CATEGORY ERROR` | Sound level is not a reliable proxy for preference, inclusion, or legitimacy. It is affected by access, location, coercion, group size, and physical conditions. |
| Semaphore proves each member is one unique person | `FALSE AS A GENERAL CLAIM` | Semaphore can prove membership in a configured group and prevent repeat signaling per scope; it does not itself establish real-world uniqueness, fair admission, informed consent, or correct eligibility. |
| ZK makes voting absolutely private and Sybil-proof | `OVERCLAIM` | Privacy and duplicate-signal properties depend on group admission, implementation, threat model, metadata, key custody, and deployment. A proof does not validate the membership process. |
| Louvain discovers consensus or “factions” in real time | `CATEGORY ERROR` | Louvain is a heuristic for graph community partitions by modularity. A cluster is not a shared position, a vote, or a legitimate constituency. Modularity has resolution limits; clustering can mislead. |
| QV is the mathematical equivalent of a loud crowd | `ANALOGY ONLY` | Quadratic voting prices votes quadratically under specified mechanism-design assumptions. It is not a measurement of historical sound or a universal anti-majority guarantee. Funding, identity, collusion, coercion, and distribution assumptions matter. |
| semantic embeddings can score the legitimacy or density of arguments | `REJECTED AS DECISION RULE` | Similarity, repetition, confidence, or length do not determine truth or legitimacy. AI may draft a source-linked summary for review, but must not filter dissent or set vote weight. |
| smart contracts can instantly execute collective intent without a human buffer | `REJECTED FOR SUTI` | A proposal, vote, contract, and execution are separate states. Critical actions require a separately authorized, tested, reversible implementation and an accountable human/operator path. |
| timelock, snapshot, delegation, or ragequit alone prevent capture | `FALSE AS A GUARANTEE` | These are design components with distinct assumptions and residual risks. No single mechanism proves safety, fair representation, or an effective exit. |

### historical source note

The present review consulted P. V. Lukin's dissertation abstract and selected conclusions, which explicitly frame the social composition of Novgorod's veche as a source-based scholarly question and describe changing participation through territorial organizations and elite leadership. It does not settle every city, century, or event. The supplied draft's claims about dates, bell procedure, sanctions, widow representation, “300 golden belts”, street assemblies, acclamation, and expulsion remain individually unverified here unless a source is cited in the table above.

## reverse-engineering the proposal

The submitted design can be decomposed into these layers. The arrows show a proposed dependency, not a currently implemented system.

```text
signal or request
  → human convenor checks scope and urgency
  → membership and access rules are stated
  → evidence and options are recorded
  → discussion preserves counterclaims and unknowns
  → participants choose an explicit decision rule
  → result and dissent are recorded
  → authorized operator reviews a bounded action
  → implementation, recovery path, and outcome are checked
```

| submitted mechanism | what it can do in principle | failure modes / SUTI boundary |
|---|---|---|
| anomaly detector / “bell” | surface a measured signal for human review | false positives, blind spots, model drift, adversarial inputs. It may notify; it may not freeze funds, lock people out, or initiate binding votes by itself. |
| DID, Merkle tree, ZK proof | prove a cryptographic relation to an enrolled group without disclosing a particular membership leaf, depending on protocol and setup | admission remains a governance decision; compromised keys, coercive enrollment, exclusion, metadata leakage, and group-admin capture remain. Never call this proof of personhood. |
| discourse graph | preserve claims, support, challenge, sources, and revisions | graph structure depends on annotators and interface; unlinked or minority claims can disappear. Keep a readable linear/text alternative and user correction. |
| Louvain clustering | propose a partition for exploratory navigation | not consensus detection; sensitive profiling risk; unstable partitions and resolution limits. Off by default for person-linked data. |
| “silence” / optimistic governance | none as consent evidence | silence means only no recorded response. A proposal cannot pass due to non-response. |
| QV / voice credits | represent preference intensity in a specified voting design | identity and credit distribution, collusion, vote buying, coercion, and accessibility require explicit analysis. Optional experiment only; never inferred from vocal or textual features. |
| semantic filter / embeddings | help find paraphrases or draft issue summaries | cannot rank truth, legitimacy, importance, or dissent. Show source spans, uncertainty, and counterexamples; a human must edit or reject the summary. |
| snapshot / timelock | define a voting reference point and add a delay before execution in a particular implementation | does not prevent every flash-loan or governance attack. A snapshot is not identity proof. Timelock does not make a harmful action safe. |
| delegation / revocation | represent a revocable delegation if rules and contracts support it | revocation timing, bundled powers, conflicts, and non-chain procedures matter. Default is direct participation; proxy cannot override a later direct choice. |
| ragequit / exit | provide a designed exit path in some systems | may be unavailable, costly, too late, or inapplicable to non-financial groups. SUTI requires a non-punitive human exit path independent of assets. |
| executable proposal | automate a previously specified action | code may encode a mistake or exploit. No NLP-to-contract path; no automatic treasury, credential, access, or data change. |

## SUTI module contract

### purpose

Support a group in clarifying a shared question, comparing options, recording explicit choices and unresolved disagreement, and preparing a reviewable decision record.

### non-purpose

`.veche` is not a historical reconstruction engine, voting service, identity provider, legal entity, DAO, token system, case-management system, consensus oracle, or autonomous agent.

### input

- a question and its decision owner;
- scope, people affected, and time constraints;
- permitted source material and rights status;
- options, constraints, and known consequences;
- an explicit participation and decision rule selected by the responsible group.

Do not require personal disclosures. Exclude private or third-party data unless necessity, consent, rights, and access controls are established.

### output

- a source-linked claim map;
- options and consequences, including “defer”, “no change”, and “stop”;
- a record of explicit responses, abstentions, non-responses, and dissent as distinct states;
- the human decision, decision owner, date, scope, and rationale;
- unresolved items, appeal route, review date, and rollback/exit conditions.

The output is a draft until the named decision owner accepts it. AI-produced synthesis is labeled `assistant synthesis`; it is not a vote or group endorsement.

## protocol · bounded deliberation

1. **frame** — write one answerable question, a named decision owner, and the limit of the decision.
2. **ground** — separate `FACT`, `OBSERVATION`, `INTERPRETATION`, `HYPOTHESIS`, `SYMBOL`, and `UNKNOWN`; cite sources and counterevidence.
3. **open** — state who may participate, how they can access the discussion, and how to raise an objection or request accommodation.
4. **compare** — show options, tradeoffs, impact, uncertainty, and affected parties. Keep an explicit “none / defer / stop” option.
5. **deliberate** — allow asynchronous and accessible contributions; do not score people, sentiment, speech volume, or semantic “density”.
6. **decide** — use only a decision rule the responsible group has explicitly selected in advance. Non-response is not agreement. If quorum, access, or criteria fail, record `NO DECISION`.
7. **record** — preserve votes or consent only at the detail level agreed by participants. Record minority reports without attributing them unless permitted.
8. **review** — identify who can correct the record, appeal, pause, revoke delegation, or exit; set a review date and measurable outcome.
9. **act** — prepare a human-readable action plan. Any executable or financial change requires a separate authorization and technical/security review.
10. **learn** — compare intended and observed outcomes; keep the record private or delete it according to the stated retention rule.

### decision states

| state | meaning |
|---|---|
| `DRAFT` | options or claims are being assembled |
| `OPEN` | explicit participation window is active |
| `NO DECISION` | insufficient participation, evidence, or agreement under the declared rule |
| `DECIDED` | the authorized human/group decision is recorded with scope and criteria |
| `HOLD` | unresolved rights, consent, safety, identity, security, or implementation gate |
| `REVOKED` | a decision or delegation was explicitly withdrawn under its rules |
| `IMPLEMENTED` | a separately authorized action has implementation evidence |
| `ROLLED BACK` | an implemented change was reversed under its recovery procedure |

`PASS` describes a bounded check only. It does not change a decision state, create authority, or authorize publication.

## SUTI architecture mapping

| layer | `.veche` use | limit |
|---|---|---|
| SUTIcore | constraints: explicit scope, source lineage, human authority, correction, exit, reversible action | a spec does not prove runtime behavior |
| synaura | low-pressure flow: question → enough context → chosen depth → pause/exit | does not infer emotional state or readiness |
| Syntaxium | typed records and explicit relations among claim, source, option, response, decision, and action | schema validity is not factual validity |
| VereNITYA | assertion type, provenance, counterevidence, confidence, bounded check result | no metaphysical truth score or consensus oracle |
| LinguaFUSION | translation/transcreation of options and ballots with uncertainty and terms preserved | machine translation is not participant comprehension or native review |
| Eidographica | optional, labeled visualization of claims and relations | a graphic is not a decision; provide text equivalent |
| Psychonetica | at most voluntary attention/pace prompts, if separately designed and reviewed | no psychological inference, scoring, or diagnosis |
| SRETENIYA_OS | a research workflow and local record model | no claim of a running DAO or autonomous execution |
| SUTI.os | optional local-first storage of a user's own decision notes and exports | no automatic sync, shared vault, or participant registry |
| SUTI.world | public explanation and downloadable research artifact | no live vote, account, matching, or hosted deliberation is implied |
| SUTI.care | accessibility, non-coercion, clear exit, safeguarding boundaries | no care triage or emergency monitoring |

## threat and harm model

Review these before any pilot, even one without blockchain:

- **capture:** convenor, funder, administrator, delegate, or software supplier shapes the agenda or access rules;
- **coercion:** a person cannot safely decline, abstain, or disagree;
- **exclusion:** language, disability, bandwidth, schedule, identity rules, or cost prevent participation;
- **privacy:** a supposedly anonymous record can be linked through metadata, timing, small groups, or reused identifiers;
- **re-identification:** graph edges or quotations reveal a participant;
- **ranking:** language models or moderators make dissent less visible by calling it noise, low-density, or off-topic;
- **Sybil / duplicate participation:** the enrollment mechanism admits multiple controlled identities or excludes legitimate participants;
- **delegation capture:** a delegate accumulates power or a revocation arrives too late;
- **contract risk:** a formally valid proposal executes harmful or misunderstood code;
- **oracle / model failure:** anomaly detector, classifier, embedding, or data source is wrong or manipulated;
- **irreversibility:** money, credentials, access, publication, or personal data changes cannot be restored;
- **historical laundering:** an attractive modern policy is presented as an established medieval custom.

Mitigations must be assigned to a named owner and tested. A list of risks without controls is not a security review.

## evidence and implementation gates

| gate | evidence needed | current state |
|---|---|---|
| historical | passage-level source register across city, period, and claim; opposing scholarship; editorial review | `PARTIAL / HOLD` |
| mechanism | declared decision rule, accessibility review, adversarial scenarios, participation/exit analysis | `PROPOSAL` |
| identity/privacy | threat model, group admission policy, key recovery, metadata analysis, independent cryptographic review | `NOT STARTED` |
| software | named implementation, version, reproducible build, test vectors, security audit, rollback plan | `NOT IMPLEMENTED` |
| language | reviewed versions for each language; ballot equivalence and participant comprehension checks | `NOT STARTED` |
| pilot | explicit opt-in, accountable convenor, safeguarding plan, data minimization, withdrawal route | `NOT AUTHORIZED` |
| release | owner approval, rights review, public-content allowlist, scoped accessibility/runtime checks | `HOLD` |

No gate is inferred from the presence of this document, a successful static check, a GitHub repository, or an AI-generated summary.

## minimal data schema

```yaml
artifact_id: suti.veche.record.local-id
kind: research_note | deliberation_draft | decision_record
visibility: private | shared | public | hold
question: ""
scope: ""
decision_owner: unknown
participants: [] # use aggregate counts unless names are necessary and consented
claims:
  - text: ""
    type: FACT | OBSERVATION | INTERPRETATION | HYPOTHESIS | SYMBOL | UNKNOWN
    source: unknown
    counterevidence: []
    review: UNKNOWN
options: []
decision_rule: not_selected
responses: [] # explicit response, abstention, no response are distinct
decision_state: DRAFT
decision: unknown
dissent: []
action: none
rollback_or_exit: ""
retention: ""
rights: unknown
implementation: not_implemented
version: 1
```

Store only what is necessary. Do not publish names, raw speech, identity commitments, private discussion, or vulnerability data by default.

## research plan

1. Build a claim-by-claim source register from critical editions and current historiography; include date, place, genre, transmission, and disagreement.
2. Compare at least two interpretations of participation and authority for each selected city and period.
3. Treat “fractal”, bell-as-interrupt, acclamation-as-intensity, household representation, and social Sybil resistance as separate hypotheses with falsification conditions.
4. Compare the digital components against current protocol specifications and peer-reviewed security research; record version and threat model.
5. Prototype only a local, synthetic deliberation record with explicit abstention, dissent, correction, and exit.
6. Test usability with voluntary reviewers across access modes and languages, without collecting sensitive personal material.
7. Publish only after source, rights, language, security, and owner reviews; keep implementation and deployment claims separate.

## source register

Sources below support only the bounded statements adjacent to them. They do not substantiate the complete submitted proposal.

| source | supports | does not establish |
|---|---|---|
| [P. V. Lukin, dissertation abstract, Institute of Russian History RAS](https://iriran.ru/sites/default/files/Lukin_Avtoreferat.pdf) | one modern scholarly interpretation of Novgorod's composition and development; explicitly source-based and historically differentiated | every Rus’ assembly, exact procedures, equality, a universal protocol, or a digital analogy |
| [Semaphore documentation](https://docs.semaphore.pse.dev/) and [Semaphore v4 specification](https://github.com/ethereum/access-layer-specs/blob/main/specs/3-semaphore-v4/README.md) | group membership proofs and scoped duplicate-signal prevention as protocol functions; the linked v4 spec is marked draft | personhood, fair enrollment, absolute anonymity, or total Sybil resistance |
| [Lalley & Weyl, “Quadratic Voting”, AEA Papers and Proceedings (2018)](https://www.aeaweb.org/articles?id=10.1257/pandp.20181002) | the voice-credit mechanism and its stated design assumptions | analogy to acoustics, universal fairness, or immunity to collusion and identity abuse |
| [Blondel et al., “Fast unfolding of communities in large networks”](https://arxiv.org/abs/0803.0476) | Louvain's purpose as a fast heuristic for graph community detection | consensus or ground-truth community membership |
| [Fortunato & Barthélemy, “Resolution limit in community detection”](https://pmc.ncbi.nlm.nih.gov/articles/PMC1765466/) | modularity optimization may miss real subcommunities and needs validation | a reliable social or political partition |
| [Traag, Waltman & van Eck, “From Louvain to Leiden”](https://doi.org/10.1038/s41598-019-41695-z) | Louvain may return poorly connected communities; Leiden was proposed with connectivity guarantees under its algorithmic formulation | that Leiden resolves normative or consent problems |
| [OpenZeppelin Governor documentation](https://docs.openzeppelin.com/contracts/5.x/api/governance) | snapshots/timepoints, quorum, voting delay/period and implementation-specific governance mechanics | safety of a deployment, fair membership, or authorization by this SUTI document |
| [Beanstalk incident account](https://bean.money/blog/beanstalk-governance-exploit) | a documented governance exploit involving a flash loan | that one snapshot/timelock recipe prevents all governance attacks |

## change record

- `1.0` — converted the supplied narrative into a bounded research module; separated historical claims, design hypotheses, technical mechanisms, and unimplemented proposals; rejected silence-as-consent and automatic execution as SUTI rules.

## related artifacts

- [Veche module protocol](../../app/docs/protocols/veche.md)
- [SUTI.care architecture](../care/suti-care-architecture.v1.md)
- [repository contours](../repository-contours.v1.md)

---

`assistant synthesis · local editorial review · not a human vote`
`UNKNOWN/HOLD preserved · no runtime · no publication authorization`
