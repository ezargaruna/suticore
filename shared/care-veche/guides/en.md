# shared space for care and veche

clear question · distinct voices · manageable step · preserved trace

design specification and local prototype candidate; networked agents, messages, money, legal organisation and publication are off

a shared, depersonalised foundation for individual and collective systems; a local discussion workshop

connect knowledge, a care agency and joint deliberation so that a person can configure the system independently and check the next step

read the method, record a contribution or position, see the differences and save a portable discussion package

useful methods, versions and unresolved materials are preserved; originals are not destroyed, and selected transfers are reversible and have source → target, SHA and a receipt

the common layer contains methods, roles and empty templates; personal stories, contacts, correspondence and sensitive information remain within the chosen private area

care angel is an optional interface metaphor; people and agents can use a plain role description without assigning identity or experiences

participant type and name in this local workshop are declared by the record's author; other participants' identities, authority and consent have not been verified here

workshop records are held in the page's memory; save the JSON before closing. import adds checked records without replacing the original history

## completeness and preservation

first preserve the original and its context, then identify the distinction that can be carried over. similar files do not automatically become a single canon. unresolved material remains available with a clear label; working archives are kept outside the clean common assembly

## depersonalised common core

each method describes its purpose, invariant, input, action, result, source, rights, version and boundaries. a personal name or story is not needed for the method to work. depersonalisation preserves a useful distinction without presenting a private case as a universal law

## individual and collective configuration

a personal profile, chosen language, pace and accessibility are connected separately. a collective defines its own roles, visibility and decision-making scope. settings can be edited and exported; another person's identity, consent or participation cannot be inferred from a template

## care agency

entry begins with a chosen question. identify a manageable action, the resource needed and the person making the decision. a bot does not allocate assistance, grants, payments or representation. a request can be clarified, passed to a suitable person or brought to a close

## care in agent work

an agent receives a clear task, permitted sources, a data boundary and an available budget. it records uncertainty, recurring failure, a pause and a handover. this is an operational arrangement of the process; feelings, suffering, consciousness or human needs are not attributed to the agent

## a place for communication

people and agents can prepare a contribution with explicit provenance. a message is material for consideration, not an execution command. hidden reasoning, secrets, raw private correspondence and unsolicited personal records are not included in the common package

## the veche process

each proposal receives a question, context and a way to check it. support, objection, abstention and no response are stored separately. silence is not consent. an AI perspective is not a human vote; the outcome has a responsible human and remains a draft until that person's separate decision

## checking the basis

claim type, source, verification and decision are separate fields. PASS applies to an explicit criterion and environment. UNKNOWN is retained when data is insufficient; elegant wording does not increase certainty. COMMIT is not publication, and a specification is not a working service

## participation boundaries

the metaphor, play and participation are voluntary. plain language, correction, pause and exit are available. age-specific routes do not replace an official classification; youth intake is off pending separate conditions, and the first pilot is for consenting adults. emergency and clinical assistance are not claimed here

## connecting existing agents

a proposed adapter transfers only the selected contribution, role, source, version and permission scope. import does not verify the author, rights or consent. network transport, secrets, permissions, an operator and a log require separate implementation and verification; they are currently off

## languages and meaning transfer

each edition is linked to the Russian source and its SHA. names, IDs, enums and code are preserved. negations, uncertainty, choice and consequences are checked. язэхъ receives a separate experimental status; its unknown meanings are not filled in by guesswork

## an accessible result

choose an area and a question; add a contribution, proposal or position; check the source; save the JSON; if needed, import selected records into another local workshop. your own export does not automatically become shared or public

## all areas

### care angel roles · .angels

voluntary helping roles, task handover and clear participation boundaries

ID :: SUTI.angels

### care as action · .care

a question, a manageable step, a resource, a responsible human and feedback

ID :: SUTI.care

### a considerate interface · .verenium

a clear proposal, plain language, pause, correction and exit

ID :: SUTI.verenium

### joint deliberation · .veche

proposals, distinct positions, bases and an outcome with human responsibility

ID :: SUTI.veche

### working core · .os

contracts, roles, versions, data boundaries and reversibility

ID :: SUTI.os

### laboratory · .lab

synthetic examples, bounded experiments and reproducible checks

ID :: SUTI.lab

### learning · .uni

short practice, a personal example and a check of understanding

ID :: SUTI.uni

### shared entry point · .world

accessible navigation through methods and routes chosen by the person

ID :: SUTI.world

### voluntary circle · .clan

invitation, acceptance of a role, agreed conditions and exit

ID :: SUTI.clan

### audit · .audit

precise verification scope, evidence, errors and corrections

ID :: SUTI.audit

### knowledge crystal · .crystal

a method understandable on its own, with a source, boundaries and version

ID :: SUTI.crystal

### alternative questions · .oracle

several perspectives with explicit hypothesis or symbol status

ID :: SUTI.oracle

### connections · .sotkan

entities, relationships, dependencies and provenance without hidden merging

ID :: SUTI.sotkan

### play and practice · .game

a voluntary quest with plain wording and an observable step

ID :: SUTI.game

### language and expression · .logos

terms, voice, direct transcreations and a check for meaning loss

ID :: SUTI.logos

## role

### initiator

formulates the question, context and criterion of usefulness

ID :: initiator

### contributor

adds a basis, option, example or limitation

ID :: contributor

### reviewer

compares sources, consequences and losses of meaning

ID :: reviewer

### responsible human

makes a separate decision within their verified scope; a local role label does not confer authority

ID :: human_steward

## proposal ID

### question

what is important to understand, express or check?

### context

what has been selected for joint consideration, and on what basis?

### proposal

what manageable step is proposed, and how can its result be observed?

### distinguishing positions

what has been supported, challenged, deferred or left unanswered?

### review

have the basis, boundaries and right to choose been preserved?

### draft outcome

what remains on HOLD, and what decision must a person make?

### trace and return

save what was selected, check the result, correct it or finish

## position

### support

support for the stated proposal within the named scope

ID :: support

### objection

a specific limitation, risk or alternative explanation

ID :: objection

### abstention

no position is being taken for now; the reason may remain unknown

ID :: abstain

### no response

no response has been received; this is neither consent nor abstention

ID :: no_response

## claim type

- fact :: FACT
- observation :: OBSERVATION
- interpretation :: INTERPRETATION
- hypothesis :: HYPOTHESIS
- evaluation :: EVALUATION
- symbol :: SYMBOL
- unknown :: UNKNOWN

## discussion workshop

[discussion workshop](../index.html?lang=en) · [source or basis](../source.ru.json) · [boundaries and states](../locale-status.v1.json)

export is private; publication requires a separate selection

counters show local records, not verified human votes or a quorum

## boundaries and states

CANON ≠ RUNTIME ≠ PUBLIC · PASS ≠ COMMIT ≠ PUBLICATION

visibility :: private · identity :: UNVERIFIED · consent :: UNVERIFIED · decision :: HOLD · execution :: OFF · transport :: OFF

[source or basis · JSON Schema](../room-envelope.schema.v1.json) · [source or basis · JS](../room-core.js)

~~~javascript
const state = SutiRoomCore.createState();
const next = SutiRoomCore.addContribution(state, input);
const envelope = SutiRoomCore.exportEnvelope(next);
const merged = SutiRoomCore.importEnvelope(state, envelope);
const review = SutiRoomCore.summarize(merged, proposalId);
~~~

[source or basis · individual.template](../settings/individual.template.v1.json) · [source or basis · collective.template](../settings/collective.template.v1.json)
