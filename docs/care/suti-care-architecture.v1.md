# SUTI.care · care architecture

**id:** `suti.care.architecture.proposed.v1`  
**revision:** 1.0 · 2026-11-04  
**owner:** SUTI.world · Ezar Garuna  
**state:** `PUBLIC DESIGN · PROPOSED CAPABILITIES · RUNTIME PARTIAL`  
**current implementation:** local self-guided note; no human connection, account, directory, storage, booking, or payment  
**scope:** inclusive care navigation for different people, situations, access needs, and preferred formats  

## 1. purpose

SUTI.care helps a person identify what kind of support might be useful, choose a comfortable format, prepare a small request, or stop. It must work without requiring a person to disclose a diagnosis, identity, history, or reason for needing support.

Care is a capability for making options clear. It does not make decisions about people, classify need, or replace professional and community services.

```text
notice → choose → distinguish → find a fit → try or pause → review → exit
```

**care != control**  
**planning != designing a person**

The person chooses the purpose, level of detail, language, pace, format, recipient, and whether any information leaves their device.

## 2. current state and non-claims

The site currently offers a browser-local self-reflection note. The note remains in the page; it is not sent to a care team and is not automatically saved. SUTI.world does not currently provide:

- a staffed or on-call care service;
- matching with volunteers, clinicians, or public agencies;
- a personal account, case-management portal, or private cloud;
- case notes, follow-up, referrals, or emergency monitoring;
- professional interpretation, sign-language service, audio, or in-person care;
- clinical assessment, treatment, diagnosis, legal advice, or guaranteed recovery.

A visible pathway in the catalog describes a possible need and a user-chosen next step. It does not mean a service exists for that pathway. The design status and runtime status must remain visible together.

## 3. care contours

| contour | purpose | access | state |
|---|---|---|---|
| self-guided care | organize a thought, need, boundary, or next step | public; no account | local text tool is implemented |
| peer and volunteer care | offer or receive bounded mutual support | opt-in people, with separate consent and working contact channel | proposed; no participants or matching runtime |
| professional and community resources | let a person choose qualified help or local services | person selects the provider and confirms access | no verified directory or handoff is connected |
| private care coordination | support a specifically agreed group or household | least access, explicit membership, review and revocation | not implemented; separate privacy and safeguarding review required |
| research and learning | improve the model using synthetic or properly consented material | bounded scope and human review | proposal only; no personal case study by default |

Open materials remain separate from private notes and from any future participant records. A contribution, donation, membership, or volunteer role never buys authority over a person or their information.

## 4. who may use the self-guided map

The navigator is for any person who finds it useful. It does not ask for demographics or require a person to select a group. A visitor may choose a pathway from the map without claiming membership in that population.

| possible situation or community | examples of self-chosen support questions | safeguards in the design |
|---|---|---|
| a person seeking a pause or orientation | What is one thing I need right now? | brief path, blank answers allowed, exit always visible |
| family, chosen family, and caregivers | What can be shared, and what boundary matters? | do not assume family is safe, available, or authorized |
| children and young people | What trusted adult or safe setting could help? | no volunteer matching or private contact for minors; child-safeguarding review before any dedicated service |
| disabled and neurodivergent people | Which format, sensory level, pace, or access support works for me? | ask preference, not diagnosis; do not infer capacity or needs |
| older people and people experiencing isolation | What kind of contact and practical support would feel welcome? | no age profiling; no assumption of dependence or loneliness |
| migrants, displaced people, and multilingual communities | Which language and communication form feel clearest? | language choice does not imply legal casework or immigration advice |
| people rebuilding after loss, interruption, illness, injury, or a life transition | What ordinary routine or connection would I like to rebuild? | recovery means user-defined everyday rebuilding here; no treatment or clinical plan |
| people navigating housing, food, income, work, education, or access barriers | What practical step or local resource should I look for? | no verified local referral directory is connected; do not promise material aid |
| survivors of violence, coercion, or exploitation | What boundary or safe contact do I choose? | no detailed story required; do not contact another person or alleged perpetrator; use local specialist support if the person chooses |
| community groups and volunteers | What task is appropriate, bounded, and sustainable? | no role assignment, recruitment, or workload tracking without explicit agreement |
| people who prefer not to name a category | What would help, in my own words? | no forced taxonomy; a blank or custom route remains valid |

These are navigation prompts, not eligibility categories, risk scores, or service commitments.

## 5. formats and access modes

The person names the format that works for them. Formats are independent options, not a ladder or test.

| format | design use | current site state |
|---|---|---|
| concise text | short statement or request | local text note available |
| plain-language text | one idea at a time, concrete words | interface language can be changed in RU, EN, ES, and PT-BR; content review is still version-specific |
| step list | break a chosen task into a few manageable actions | note can record the preference; no personalized task plan is generated |
| visual outline | show a few named relations or choices | preference may be recorded; visual care map generation is not implemented |
| voice or live conversation | speak with a person or use audio | not provided or connected by this site |
| sign language, AAC, or communication board | use a person's chosen communication aid | not provided or connected; the person may record this preference locally |
| offline or print | use a paper copy or work without a connection | the note can be copied by the user; no specialized print pack is currently published |
| low-bandwidth or device-light | reduce media, motion, and interaction | text-first page and reduced-motion support; full assistive-technology QA is a separate gate |
| interpreter or cultural mediator | communicate across language or context | not supplied or matched by this site |
| in-person support | meet in a place the person chooses | not arranged by this site |
| quiet / no-contact | read, pause, or leave without interaction | available as a self-guided route |
| another format | person names what is accessible | can be noted locally; no delivery promise |

The interface must not call a preference a delivered accommodation. When a requested format is unavailable, say so plainly and leave the user in control of the next choice.

The care interface is currently translated in RU, EN, ES, and PT-BR. The other nine language options use a labeled Russian fallback; they are not complete care transcreations.

## 6. self-guided flow

1. **arrive:** user chooses `ask`, `offer`, `explore`, or no selection.
2. **choose a need:** broad options such as listening, language, practical planning, access, rest, or recovery.
3. **choose depth:** brief, steady, or deeper; deeper is never the default.
4. **choose format:** the preference is included in the note, but does not trigger media or contact.
5. **choose a boundary:** privacy, energy, time, choice, or a custom boundary.
6. **make a local note:** produce text on this device only.
7. **review:** edit, copy, or clear; the person controls any later sharing.
8. **exit:** leaving the page requires no explanation.

No field is required to reveal a sensitive fact. Do not add a risk score, need score, personality inference, volunteer eligibility score, or hidden case profile.

## 7. proposed human-support flow

Any human-support channel remains inactive until there are identified, consenting adults; a bounded offer; a safe channel; a published availability statement; a named escalation boundary; and a deletion procedure.

```text
person requests contact
→ sees who will receive the message and why
→ chooses what to send
→ volunteer separately accepts the scope and time
→ both agree on boundaries and format
→ one bounded interaction
→ person decides whether to continue
→ close, delete, or retain only by explicit agreement
```

A volunteer may decline, pause, or refer the person to an independently chosen provider. No one is expected to be available around the clock. Silence is not consent; an unanswered request does not mean the person is being monitored.

The proposed DSO circle and symbolic roles are specified separately in [`dso-flamingo-care-architecture.v1.md`](dso-flamingo-care-architecture.v1.md). That model is not proof of a team, membership, or service runtime.

## 8. safety and safeguarding boundaries

- For immediate danger, serious injury, or urgent medical need, the page should direct the person to local emergency services or a trusted local professional. It must not guess a country's number or imply that SUTI monitors the page.
- If a person may be a child or otherwise legally dependent, do not invite private volunteer contact. A dedicated service needs local safeguarding review, accountable adults, safe reporting, and age-appropriate participation rules.
- Do not solicit details of abuse, self-harm, diagnosis, immigration status, finances, or third-party conduct in the general form.
- Do not encourage a person to confront an alleged abuser, leave a home, stop treatment, disclose to family, or take a legally consequential step.
- No breathwork, touch, ritual, exposure, confession, synchronization, or group disclosure is required.
- A volunteer cannot promise confidentiality beyond a disclosed, reviewed policy; in this prototype, there is no volunteer receiving the note.
- Any future local referral list needs source, territory, service scope, last-checked date, eligibility, cost/access notes, and a visible `not verified / expired` state.

## 9. data, privacy, and permissions

| data class | default | future use gate |
|---|---|---|
| anonymous interaction with the page | no account and no case record | analytics or tracking would require separate privacy review and disclosure |
| local note | stays in the current page unless the user copies it | transmission requires a separate user action and named recipient |
| contact details | not requested by the current form | if ever collected: purpose, recipient, retention, deletion, access and recovery plan first |
| third-party or family details | avoid | require necessity, minimization, and lawful basis/consent review |
| volunteer roster | no roster published | individual opt-in, visibility choice, scope, expiry, and removal route |
| group learning summary | synthetic or de-identified only by default | explicit review that re-identification and rights risks are acceptable |
| crisis or safety information | no monitoring | any service needs local professional and legal review before operating |

No personal care data moves into an open repository, research atlas, AI model, agent context, or public story by default. Deletion and revocation must remain possible; an archive is not permission to retain everything forever.

## 10. SUTI governance and editorial review

`suti.care` is a proposed capability over SUTI principles, not a new authority over people.

- **SUTIcore:** subject choice, correction, exit, and explicit scope.
- **synaura:** choose enough support, at the person's pace.
- **Syntaxium:** label need, preference, boundary, action, and unknown separately.
- **VereNITYA:** distinguish observation, report, proposal, evidence, and unknown.
- **SRETENIYA_OS:** keep a minimal, revisable trace only when useful and consented.
- **SUTI DAO:** plain-language decision rules; no token, rank, or automatic authority.
- **Neuroveche:** editorial question set; not real consensus, clinical triage, or authorization.

Before any pilot, review the design through these lenses: access, language, consent, safety, power, privacy, workload, cultural context, evidence, technical boundary, funding, and exit. Record disagreement and unresolved items as `UNKNOWN/HOLD` instead of forcing consensus.

## 11. implementation and maturity map

| capability | status | release condition |
|---|---|---|
| local choice and note | `IMPLEMENTED · SITE` | re-check current browser/runtime before making behavior claims |
| expanded group and format map | `PROPOSED · SITE CONTENT` | publish with honest status labels and current translations |
| open SUTI.os references | `PUBLISHED · PER-ARTIFACT RIGHTS` | retain exact release and license links |
| human contact or volunteer matching | `NOT IMPLEMENTED / HOLD` | consent, roster, scope, availability, safe channel, review and removal |
| local resource directory | `NOT IMPLEMENTED / HOLD` | jurisdiction-specific research, source verification, accessibility, cost and date |
| accounts, case management, cloud storage | `NOT IMPLEMENTED / HOLD` | threat model, data controller, access controls, retention and recovery review |
| formal clinical, legal, or crisis service | `OUT OF SCOPE / HOLD` | separate qualified operator and jurisdiction-specific governance |
| DSO volunteer circle | `PROPOSED / HOLD` | adopt the separate DSO charter and establish actual voluntary participation |

## 12. public-language contract

Prefer:

> SUTI.care helps you choose a format, organize a request, or pause. Your note stays in this page. The site does not connect you to a helper.

Avoid claims that SUTI.care provides treatment, safety, healing, recovery, representation, 24/7 support, verified referrals, or a functioning angel team. “Recovery” on this site means a person's own practical rebuilding or return; it is not a medical outcome.

## 13. next gates

1. publish the self-guided map only with a visible `not a connected service` boundary.
2. review four current runtime locales; mark other locale fallbacks honestly.
3. inspect keyboard use, narrow screens, screen-reader semantics, contrast, and reduced motion.
4. define a non-personal synthetic scenario set for future tabletop review.
5. decide whether the DSO proposal has willing adults and a bounded purpose.
6. complete local safeguarding, privacy, and legal review before contact collection or volunteer matching.
7. choose and verify local referral sources only for an explicit territory.
8. keep all runtime, account, cloud, payment, and emergency-response features `HOLD` until separately implemented and reviewed.

**Decision in this edition:** extend the public site as a self-guided care map and format preference, not as a human-support service. Human connection remains a later, separate decision.
